import type { MetadataRoute } from "next";

import { getCollections, getDiamonds } from "@/lib/site-data";

export const dynamic = "force-dynamic";

const baseUrl = "https://my-app-ebon-alpha-25.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, diamonds] = await Promise.all([getCollections(), getDiamonds()]);

  const staticRoutes = [
    "",
    "/collections",
    "/diamonds",
    "/build",
    "/about",
    "/custom",
    "/appointment",
    "/contact",
    "/journal",
    "/privacy",
    "/warranty",
    "/returns",
    "/search",
    "/wishlist",
    "/education/4cs",
    "/education/lab-diamonds",
    "/education/shapes",
    "/services/sizing",
    "/services/care",
    "/services/verify",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date(),
  }));

  const diamondRoutes = diamonds.map((diamond) => ({
    url: `${baseUrl}/diamonds/${diamond.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...collectionRoutes, ...diamondRoutes];
}
