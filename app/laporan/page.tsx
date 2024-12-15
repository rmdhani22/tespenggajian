"use client";

import React, { useState, useEffect } from "react";

interface ProduksiPabrik {
  idPp: string;
  namaPab: string;
  jenisBarang: string;
  ukuranBarang: string;
  targetPab: string;
  tanggalPp: string;
}

interface LaporanItem {
  namaPab: string;
  jenisBarang: string;
  ukuranBarang: string;
  totalProduksi: number;
  targetPab: number;
}

interface GajiKaryawan {
  idGaji: string;
  namaKar: string;
  namaPab: string;
  jenisBahar: string;
  ukuranBahar: string;
  targetKar: string;
  upah: number;
  totalUpah: number;
}

export default function LaporanPage() {
  const [jenisLaporan, setJenisLaporan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [showLaporan, setShowLaporan] = useState(false);
  const [produksiData, setProduksiData] = useState<ProduksiPabrik[]>([]);
  const [laporanData, setLaporanData] = useState<LaporanItem[]>([]);
  const [gajiKaryawanData, setGajiKaryawanData] = useState<GajiKaryawan[]>([]);

  useEffect(() => {
    const fetchProduksiData = async () => {
      try {
        const response = await fetch('/api/produksi-pabrik');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data: ProduksiPabrik[] = await response.json();
        setProduksiData(data);
      } catch (error) {
        console.error("Error fetching produksi pabrik:", error);
      }
    };
    fetchProduksiData();
  }, []);

  useEffect(() => {
    const fetchGajiKaryawanData = async () => {
      try {
        const response = await fetch('/api/gaji-karyawan');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data: GajiKaryawan[] = await response.json();
        setGajiKaryawanData(data);
      } catch (error) {
        console.error("Error fetching gaji karyawan:", error);
      }
    };
    fetchGajiKaryawanData();
  }, []);

  const handleTampilkan = () => {
    if (jenisLaporan === "produksi") {
      const laporanByPabrik = produksiData.reduce((acc, item) => {
        const key = `${item.namaPab}-${item.jenisBarang}-${item.ukuranBarang}`;
        if (!acc[key]) {
          acc[key] = {
            namaPab: item.namaPab,
            jenisBarang: item.jenisBarang,
            ukuranBarang: item.ukuranBarang,
            totalProduksi: 0,
            targetPab: parseInt(item.targetPab.replace(/\D/g, '')),
          };
        }
        acc[key].totalProduksi += parseInt(item.targetPab.replace(/\D/g, ''));
        return acc;
      }, {} as { [key: string]: LaporanItem });

      setLaporanData(Object.values(laporanByPabrik));
    }
    setShowLaporan(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="data-karyawan-container">
      <h1>Laporan Produksi & Gaji</h1>

      {/* Jenis Laporan Dropdown */}
      <div className="menu">
        <label htmlFor="jenisLaporan">Jenis Laporan:</label>
        <select
          id="jenisLaporan"
          value={jenisLaporan}
          onChange={(e) => setJenisLaporan(e.target.value)}
          className="dropdown"
        >
          <option value="">Pilih Jenis Laporan</option>
          <option value="produksi">Laporan Produksi</option>
          <option value="gaji">Laporan Gaji</option>
        </select>
      </div>

      {/* Tanggal Picker */}
      <div className="menu">
        <label htmlFor="tanggal">Tanggal:</label>
        <input
          type="date"
          id="tanggal"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="input-field"
        />
      </div>

      {/* Tampilkan Button */}
      <div className="menu">
        <button onClick={handleTampilkan} className="tampilkan-button">
          Tampilkan
        </button>
      </div>

      {/* Displaying the selected report based on dropdown and date */}
      {showLaporan && jenisLaporan === "produksi" && (
        <div className="laporan-content">
          <h2>Laporan Produksi</h2>
          <p>Tanggal: {tanggal}</p>
          
          {/* Tabel Produksi */}
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Pabrik</th>
                <th>Jenis Barang</th>
                <th>Ukuran Barang</th>
                <th>Total Produksi</th>
                <th>Target Pabrik</th>
              </tr>
            </thead>
            <tbody>
              {laporanData.map((item, index) => (
                <tr key={`${item.namaPab}-${item.jenisBarang}-${item.ukuranBarang}`}>
                  <td>{index + 1}</td>
                  <td>{item.namaPab}</td>
                  <td>{item.jenisBarang}</td>
                  <td>{item.ukuranBarang}</td>
                  <td>{item.totalProduksi}</td>
                  <td>{item.targetPab}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Print Button */}
          <div className="print-button-container">
            <button onClick={handlePrint} className="print-button bg-[#74512D] hover:bg-[#543310] transition">
              Cetak
            </button>
          </div>
        </div>
      )}

      {showLaporan && jenisLaporan === "gaji" && (
        <div className="laporan-content">
          <h2>Laporan Gaji</h2>
          <p>Tanggal: {tanggal}</p>
          
          {/* Tabel Gaji */}
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID Gaji</th>
                <th>Nama Pabrik</th>
                <th>Nama Karyawan</th>
                <th>Jenis Barang</th>
                <th>Ukuran Barang</th>
                <th>Target Karyawan</th>
                <th>Harga Upah</th>
                <th>Total Upah</th>
              </tr>
            </thead>
            <tbody>
              {gajiKaryawanData.map((item, index) => (
                <tr key={item.idGaji}>
                  <td>{index + 1}</td>
                  <td>{item.idGaji}</td>
                  <td>{item.namaPab}</td>
                  <td>{item.namaKar}</td>
                  <td>{item.jenisBahar}</td>
                  <td>{item.ukuranBahar}</td>
                  <td>{item.targetKar}</td>
                  <td>Rp {item.upah.toLocaleString()}</td>
                  <td>Rp {item.totalUpah.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Print Button */}
          <div className="print-button-container">
            <button onClick={handlePrint} className="print-button bg-[#74512D] hover:bg-[#543310] transition">
              Cetak
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
