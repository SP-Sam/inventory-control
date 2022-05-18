-- CreateTable
CREATE TABLE `raw_materials` (
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `raw_materials_name_key`(`name`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `price` DECIMAL(7, 2) NOT NULL,

    UNIQUE INDEX `products_name_key`(`name`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RawMaterialsOnProducts` (
    `raw_material_code` INTEGER NOT NULL,
    `product_code` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`raw_material_code`, `product_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RawMaterialsOnProducts` ADD CONSTRAINT `RawMaterialsOnProducts_raw_material_code_fkey` FOREIGN KEY (`raw_material_code`) REFERENCES `raw_materials`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RawMaterialsOnProducts` ADD CONSTRAINT `RawMaterialsOnProducts_product_code_fkey` FOREIGN KEY (`product_code`) REFERENCES `products`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;
