"use client";

import React, { useState, useEffect } from "react";

// Define the GajiKaryawan interface
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

export default function GajiKaryawanPage() {
  const [gajiKaryawan, setGajiKaryawan] = useState<GajiKaryawan[]>([]);
  const [newItem, setNewItem] = useState<Omit<GajiKaryawan, 'totalUpah'>>({
    idGaji: "",
    namaKar: "",
    namaPab: "",
    jenisBahar: "",
    ukuranBahar: "",
    targetKar: "",
    upah: 0,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGajiKaryawan = async () => {
      try {
        const response = await fetch('/api/gaji-karyawan');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data: GajiKaryawan[] = await response.json();
        setGajiKaryawan(data);
      } catch (error) {
        console.error("Error fetching gaji karyawan:", error);
      }
    };
    fetchGajiKaryawan();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      const targetKar = parseInt(newItem.targetKar.replace(/\D/g, '')); // Convert targetKaryawan to number
      const totalUpah = targetKar * newItem.upah; // Calculate totalUpah

      const method = editIndex !== null ? 'PUT' : 'POST';
      const response = await fetch('/api/gaji-karyawan', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newItem, totalUpah }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const result: GajiKaryawan = await response.json();
      if (editIndex !== null) {
        setGajiKaryawan((prev) => prev.map((item, index) => index === editIndex ? result : item));
        setEditIndex(null);
      } else {
        setGajiKaryawan((prev) => [...prev, result]);
      }
      setNewItem({
        idGaji: "",
        namaKar: "",
        namaPab: "",
        jenisBahar: "",
        ukuranBahar: "",
        targetKar: "",
        upah: 0,
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleEdit = (index: number) => {
    const itemToEdit = gajiKaryawan[index];
    setNewItem(itemToEdit);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const handleDelete = async (index: number) => {
    try {
      const { idGaji } = gajiKaryawan[index];
      const response = await fetch('/api/gaji-karyawan', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idGaji }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      setGajiKaryawan((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting gaji karyawan:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const filteredGajiKaryawan = gajiKaryawan.filter(item =>
    item.namaPab.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.namaKar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenisBahar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ukuranBahar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.targetKar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.upah.toString().includes(searchTerm) ||
    item.totalUpah.toString().includes(searchTerm)
  );

  return (
    <div className="data-karyawan-container">
      <h1>DATA GAJI KARYAWAN</h1>

      <button
        className="button-shared bg-[#AF8F6F] hover:bg-[#FF2E1] transition"
        onClick={() => setIsFormVisible(true)}
      >
        <i className="fas fa-plus"></i> Tambah
      </button>

      {isFormVisible && (
        <div className="modal-overlay bg-overlay">
          <div className="modal bg-[#EAD8C0]">
            <h2>{editIndex !== null ? "Edit Data" : "Tambah Data"}</h2>
            <input
              type="text"
              placeholder="ID Gaji"
              value={newItem.idGaji}
              onChange={(e) => setNewItem({ ...newItem, idGaji: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nama Pabrik"
              value={newItem.namaPab}
              onChange={(e) => setNewItem({ ...newItem, namaPab: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nama Karyawan"
              value={newItem.namaKar}
              onChange={(e) => setNewItem({ ...newItem, namaKar: e.target.value })}
            />
            <input
              type="text"
              placeholder="Jenis Barang"
              value={newItem.jenisBahar}
              onChange={(e) => setNewItem({ ...newItem, jenisBahar: e.target.value })}
            />
            <input
              type="text"
              placeholder="Ukuran Barang"
              value={newItem.ukuranBahar}
              onChange={(e) => setNewItem({ ...newItem, ukuranBahar: e.target.value })}
            />
            <input
              type="text"
              placeholder="Target Karyawan"
              value={newItem.targetKar}
              onChange={(e) => setNewItem({ ...newItem, targetKar: e.target.value })}
            />
            <input
              type="number"
              placeholder="Harga Upah"
              value={newItem.upah}
              onChange={(e) => setNewItem({ ...newItem, upah: Number(e.target.value) })}
            />
            <button onClick={handleAddOrUpdate} className="button-shared">
              Simpan
            </button>
            <button onClick={() => setIsFormVisible(false)} className="button-cancel">
              Batal
            </button>
          </div>
        </div>
      )}
      
      <div className="search-container">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Cari data..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredGajiKaryawan.map((item, index) => (
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
              <td>
                <button onClick={() => handleEdit(index)} className="edit-btn">✏️</button>
                <button onClick={() => handleDelete(index)} className="delete-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
