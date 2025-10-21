import { prisma } from "../config/prisma.js";
import { cfRequest } from "../utils/cfClient.js";
import { cfConfig } from "../config/cloudflare.js";

/**
 * Add custom domain (issue SSL)
 */
export const addDomain = async (req, res) => {
  try {
    const { hostname } = req.body;
    if (!hostname)
      return res.status(400).json({ message: "Hostname is required" });

    // Create on Cloudflare
    const cf = await cfRequest(`/zones/${cfConfig.zoneId}/custom_hostnames`, {
      method: "POST",
      body: JSON.stringify({
        hostname,
        ssl: { method: "http", type: "dv" },
      }),
    });

    // Store in DB
    const domain = await prisma.customDomain.create({
      data: {
        hostname,
        status: cf.result.status,
        verification: cf.result.verification_records?.[0]?.value || null,
        ssl_status: cf.result.ssl?.status || null,
      },
    });

    res.json({ success: true, data: domain });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Verify custom domain (check SSL status)
 */
export const checkDomainStatus = async (req, res) => {
  try {
    const { hostname } = req.params;
    const domain = await prisma.customDomain.findUnique({
      where: { hostname },
    });
    if (!domain) return res.status(404).json({ message: "Domain not found" });

    const cf = await cfRequest(
      `/zones/${cfConfig.zoneId}/custom_hostnames?hostname=${hostname}`
    );

    const cfDomain = cf.result[0];
    if (!cfDomain)
      return res.status(404).json({ message: "Not found in Cloudflare" });

    await prisma.customDomain.update({
      where: { hostname },
      data: {
        status: cfDomain.status,
        ssl_status: cfDomain.ssl?.status,
      },
    });

    res.json({
      hostname,
      status: cfDomain.status,
      ssl_status: cfDomain.ssl?.status,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
