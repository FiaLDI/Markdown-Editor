-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "size" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_filename_key" ON "files"("filename");

-- CreateIndex
CREATE UNIQUE INDEX "files_url_key" ON "files"("url");

-- CreateIndex
CREATE UNIQUE INDEX "files_size_key" ON "files"("size");
