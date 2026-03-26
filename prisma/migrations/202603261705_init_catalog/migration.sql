-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameTH" TEXT,
    "description" TEXT NOT NULL,
    "startingPriceTHB" INTEGER NOT NULL,
    "pieceCount" INTEGER NOT NULL,
    "gradient" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "metals" TEXT NOT NULL,
    "centerStone" TEXT NOT NULL,
    "priceTHB" INTEGER NOT NULL,
    "priceUSD" INTEGER NOT NULL,
    "badge" TEXT,
    "description" TEXT NOT NULL,
    "gradient" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Diamond" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shape" TEXT NOT NULL,
    "carat" REAL NOT NULL,
    "color" TEXT NOT NULL,
    "clarity" TEXT NOT NULL,
    "cut" TEXT NOT NULL,
    "polish" TEXT NOT NULL,
    "symmetry" TEXT NOT NULL,
    "fluorescence" TEXT NOT NULL,
    "lab" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "priceTHB" INTEGER NOT NULL,
    "priceUSD" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "metals" TEXT NOT NULL,
    "priceAddTHB" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BuildDraft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "referenceCode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "customerName" TEXT,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "diamondId" TEXT,
    "settingId" TEXT,
    "selectedMetal" TEXT,
    "ringSize" TEXT,
    "budgetMinTHB" INTEGER,
    "budgetMaxTHB" INTEGER,
    "notes" TEXT,
    "estimatedPriceTHB" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BuildDraft_diamondId_fkey" FOREIGN KEY ("diamondId") REFERENCES "Diamond" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "BuildDraft_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Setting" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT,
    "category" TEXT,
    "sourcePage" TEXT,
    "budgetMinTHB" INTEGER,
    "budgetMaxTHB" INTEGER,
    "metadataJson" TEXT,
    "diamondId" TEXT,
    "buildDraftId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Inquiry_diamondId_fkey" FOREIGN KEY ("diamondId") REFERENCES "Diamond" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Inquiry_buildDraftId_fkey" FOREIGN KEY ("buildDraftId") REFERENCES "BuildDraft" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'REQUESTED',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "consultationType" TEXT,
    "preferredDate" DATETIME,
    "preferredTime" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "sourcePage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CertificateRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "certificateNumber" TEXT NOT NULL,
    "lab" TEXT NOT NULL,
    "diamondId" TEXT,
    "notes" TEXT,
    "issuedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CertificateRecord_diamondId_fkey" FOREIGN KEY ("diamondId") REFERENCES "Diamond" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_collectionId_idx" ON "Product"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Diamond_certificateNumber_key" ON "Diamond"("certificateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_slug_key" ON "Setting"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BuildDraft_referenceCode_key" ON "BuildDraft"("referenceCode");

-- CreateIndex
CREATE INDEX "BuildDraft_diamondId_idx" ON "BuildDraft"("diamondId");

-- CreateIndex
CREATE INDEX "BuildDraft_settingId_idx" ON "BuildDraft"("settingId");

-- CreateIndex
CREATE INDEX "Inquiry_type_idx" ON "Inquiry"("type");

-- CreateIndex
CREATE INDEX "Inquiry_diamondId_idx" ON "Inquiry"("diamondId");

-- CreateIndex
CREATE INDEX "Inquiry_buildDraftId_idx" ON "Inquiry"("buildDraftId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CertificateRecord_certificateNumber_key" ON "CertificateRecord"("certificateNumber");

-- CreateIndex
CREATE INDEX "CertificateRecord_diamondId_idx" ON "CertificateRecord"("diamondId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSettings_key_key" ON "SiteSettings"("key");

