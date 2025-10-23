-- CreateTable
CREATE TABLE `CustomDomain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hostname` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `txt_name` VARCHAR(191) NULL,
    `txt_value` VARCHAR(191) NULL,
    `method` VARCHAR(191) NULL,
    `ssl_status` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CustomDomain_hostname_key`(`hostname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
