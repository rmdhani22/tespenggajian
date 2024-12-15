-- CreateTable
CREATE TABLE `DataKaryawan` (
    `idKar` VARCHAR(3) NOT NULL,
    `namaKar` VARCHAR(50) NOT NULL,
    `alamatKar` VARCHAR(100) NOT NULL,
    `namaPab` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idKar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GajiKaryawan` (
    `idGaji` VARCHAR(5) NOT NULL,
    `namaKar` VARCHAR(50) NOT NULL,
    `namaPab` VARCHAR(50) NOT NULL,
    `jenisBahar` VARCHAR(10) NOT NULL,
    `ukuranBahar` VARCHAR(10) NOT NULL,
    `targetKar` VARCHAR(5) NOT NULL,
    `upah` DOUBLE NOT NULL,
    `totalUpah` DOUBLE NOT NULL,
    `dataKaryawanId` VARCHAR(3) NULL,

    PRIMARY KEY (`idGaji`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Laporan` (
    `idLaporan` VARCHAR(3) NOT NULL,
    `jenisLaporan` VARCHAR(50) NOT NULL,
    `tanggalLaporan` DATETIME(3) NOT NULL,
    `produksiPabrikIdPp` VARCHAR(3) NOT NULL,
    `gajiKaryawanIdGaji` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`idLaporan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProduksiHarian` (
    `idPh` VARCHAR(3) NOT NULL,
    `namaPab` VARCHAR(50) NOT NULL,
    `namaKar` VARCHAR(50) NOT NULL,
    `jenisBahar` VARCHAR(10) NOT NULL,
    `ukuranBahar` VARCHAR(10) NOT NULL,
    `targetKar` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`idPh`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProduksiPabrik` (
    `idPp` VARCHAR(3) NOT NULL,
    `namaPab` VARCHAR(50) NOT NULL,
    `jenisBarang` VARCHAR(10) NOT NULL,
    `ukuranBarang` VARCHAR(10) NOT NULL,
    `targetPab` VARCHAR(5) NOT NULL,
    `tanggalPp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idPp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GajiKaryawan` ADD CONSTRAINT `GajiKaryawan_dataKaryawanId_fkey` FOREIGN KEY (`dataKaryawanId`) REFERENCES `DataKaryawan`(`idKar`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Laporan` ADD CONSTRAINT `Laporan_gajiKaryawanIdGaji_fkey` FOREIGN KEY (`gajiKaryawanIdGaji`) REFERENCES `GajiKaryawan`(`idGaji`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Laporan` ADD CONSTRAINT `Laporan_produksiPabrikIdPp_fkey` FOREIGN KEY (`produksiPabrikIdPp`) REFERENCES `ProduksiPabrik`(`idPp`) ON DELETE RESTRICT ON UPDATE CASCADE;
