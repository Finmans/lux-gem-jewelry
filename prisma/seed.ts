import { PrismaClient, DiamondLab } from "@prisma/client";
import { collections, diamonds, featuredProducts } from "../lib/mock-data";

const prisma = new PrismaClient();

const settingSeeds = [
  {
    id: "solitaire",
    slug: "classic-solitaire",
    name: "Classic Solitaire",
    description: "Minimal four-prong solitaire emphasizing center stone brilliance.",
    metals: ["White Gold 18k", "Yellow Gold 18k", "Rose Gold 18k", "Platinum 950"],
    priceAddTHB: 0,
  },
  {
    id: "halo",
    slug: "diamond-halo",
    name: "Diamond Halo",
    description: "Micro-pave halo adding additional scintillation around the center stone.",
    metals: ["White Gold 18k", "Platinum 950"],
    priceAddTHB: 15000,
  },
  {
    id: "pave",
    slug: "pave-band",
    name: "Pave Band",
    description: "Fine pave-set accent stones along the shank.",
    metals: ["White Gold 18k", "Yellow Gold 18k", "Rose Gold 18k"],
    priceAddTHB: 12000,
  },
  {
    id: "three-stone",
    slug: "three-stone",
    name: "Three Stone",
    description: "Classic trilogy setting with balanced side stones.",
    metals: ["White Gold 18k", "Yellow Gold 18k", "Platinum 950"],
    priceAddTHB: 22000,
  },
];

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  await prisma.inquiry.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.buildDraft.deleteMany();
  await prisma.certificateRecord.deleteMany();
  await prisma.product.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.diamond.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.siteSettings.deleteMany();

  const collectionIdBySlug: Record<string, string> = {};

  for (const row of collections) {
    const created = await prisma.collection.create({
      data: {
        id: `collection_${row.id}`,
        slug: row.id,
        name: row.name,
        nameTH: row.nameTH,
        description: row.description,
        startingPriceTHB: row.startingPriceTHB,
        pieceCount: row.count,
        gradient: row.gradient,
      },
    });

    collectionIdBySlug[row.id] = created.id;
  }

  for (const row of featuredProducts) {
    await prisma.product.create({
      data: {
        id: row.id,
        slug: toSlug(row.name),
        name: row.name,
        category: row.category,
        collectionId: collectionIdBySlug[row.collection],
        metals: JSON.stringify(row.metals),
        centerStone: row.centerStone,
        priceTHB: row.priceTHB,
        priceUSD: row.priceUSD,
        badge: row.badge,
        description: row.description,
        gradient: row.gradient,
        isFeatured: true,
      },
    });
  }

  for (const row of diamonds) {
    const lab = row.lab as DiamondLab;

    await prisma.diamond.create({
      data: {
        id: row.id,
        shape: row.shape,
        carat: row.carat,
        color: row.color,
        clarity: row.clarity,
        cut: row.cut,
        polish: row.polish,
        symmetry: row.symmetry,
        fluorescence: row.fluorescence,
        lab,
        certificateNumber: row.certificate,
        priceTHB: row.priceTHB,
        priceUSD: row.priceUSD,
        available: row.available,
      },
    });

    await prisma.certificateRecord.create({
      data: {
        certificateNumber: row.certificate,
        lab,
        diamondId: row.id,
        notes: "Seeded certificate record",
      },
    });
  }

  for (const row of settingSeeds) {
    await prisma.setting.create({
      data: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        description: row.description,
        metals: JSON.stringify(row.metals),
        priceAddTHB: row.priceAddTHB,
      },
    });
  }

  await prisma.siteSettings.createMany({
    data: [
      {
        key: "diamond_inventory_claim",
        value: String(diamonds.length),
        description: "Displayed live inventory count",
      },
      {
        key: "brand_positioning",
        value: "consultation-first",
        description: "Commerce mode for launch",
      },
    ],
  });

  console.log(`Seed completed: ${collections.length} collections, ${featuredProducts.length} products, ${diamonds.length} diamonds.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
