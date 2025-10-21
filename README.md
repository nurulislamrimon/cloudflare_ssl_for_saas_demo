# SSL control by Cloudflare

A guide to set up SSL for dynamic user's custom domain through Cloudflare in a multi-tenant Docker environment using Traefik as a reverse proxy.
[server setup](https://medium.com/@nurulislamrimon/multi-tenant-traefik-setup-for-docker-projects-080f039f1fd4)

### Environment Variables (`.env`)

```

PORT=5000

DATABASE_URL="mysql://root:pass@localhost:3306/saas_ssl"

CLOUDFLARE_API_TOKEN=your_api_token_from_cloudflare
CLOUDFLARE_ZONE_ID=zone_id_from_cloudflare_project_domain
CLOUDFLARE_API_BASE=https://api.cloudflare.com/client/v4


```
