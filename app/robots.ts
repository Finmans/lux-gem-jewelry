import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://my-app-ebon-alpha-25.vercel.app/sitemap.xml",
  };
}
