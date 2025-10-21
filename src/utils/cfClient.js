import fetch from "node-fetch";
import { cfConfig } from "../config/cloudflare.js";

export const cfRequest = async (endpoint, options = {}) => {
  const res = await fetch(`${cfConfig.baseUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${cfConfig.token}`,
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data, null, 2));

  return data;
};
