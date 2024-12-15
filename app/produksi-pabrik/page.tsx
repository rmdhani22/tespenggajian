"use client";

import React, { useState, useEffect } from "react";

// Define the type for a ProduksiPabrik object
interface ProduksiPabrik {
  idPp: string;
  namaPab: string;
  jenisBarang: string;
  ukuranBarang: string;
  targetPab: string;
  tanggalPp: string;
}

export default function ProduksiPabrik() {
  const [produksi, setProduksi] = useState<ProduksiPabrik[]>([]);
  const [newItem, setNewItem] = useState<ProduksiPabrik>({
    idPp: "",
    namaPab: "",
    jenisBarang: "",
    ukuranBarang: "",
    targetPab: "",
    tanggalPp: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProduksi = async () => {
      try {
        const response = await fetch('/api/produksi-pabrik');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data: ProduksiPabrik[] = await response.json();
        setProduksi(data);
      } catch (error) {
        console.error("Error fetching produksi pabrik:", error);
      }
    };
    fetchProduksi();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      const method = editIndex !== null ? 'PUT' : 'POST';
      const response = await fetch('/api/produksi-pabrik', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const result: ProduksiPabrik = await response.json();
      if (editIndex !== null) {
        setProduksi((prev) => prev.map((item, index) => index === editIndex ? result : item));
        setEditIndex(null);
      } else {
        setProduksi((prev) => [...prev, result]);
      }
      setNewItem({
        idPp: "",
        namaPab: "",
        jenisBarang: "",
        ukuranBarang: "",
        targetPab: "",
        tanggalPp: "",
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleEdit = (index: number) => {
    const itemToEdit = produksi[index];
    setNewItem(itemToEdit);
    setEditIndex(index);
    setIsModalVisible(true);
  };

  const handleDelete = async (index: number) => {
    try {
      const { idPp } = produksi[index];
      const response = await fetch('/api/produksi-pabrik', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPp }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      setProduksi((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting produksi pabrik:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const filteredProduksi = produksi.filter((item) =>
    item.namaPab.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenisBarang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ukuranBarang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.targetPab.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tanggalPp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="data-karyawan-container">
      <h1>DATA PRODUKSI PABRIK</h1>

      <button className="button-shared bg-[#AF8F6F] hover:bg-[#FF2E1] transition" onClick={() => setIsModalVisible(true)}>
        <i className="fas fa-plus"></i> Tambah
      </button>

      {isModalVisible && (
        <div className="modal-overlay bg-overlay">
          <div className="modal bg-[#EAD8C0]">
            <h2>{editIndex !== null ? "Edit Data" : "Tambah Data"}</h2>
            <input
              type="text"
              placeholder="ID Pabrik"
              value={newItem.idPp}
              onChange={(e) => setNewItem({ ...newItem, idPp: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nama Pabrik"
              value={newItem.namaPab}
              onChange={(e) => setNewItem({ ...newItem, namaPab: e.target.value })}
            />
            <input
              type="text"
              placeholder="Jenis Barang"
              value={newItem.jenisBarang}
              onChange={(e) => setNewItem({ ...newItem, jenisBarang: e.target.value })}
            />
            <input
              type="text"
              placeholder="Ukuran Barang"
              value={newItem.ukuranBarang}
              onChange={(e) => setNewItem({ ...newItem, ukuranBarang: e.target.value })}
            />
            <input
              type="text"
              placeholder="Target Pabrik"
              value={newItem.targetPab}
              onChange={(e) => setNewItem({ ...newItem, targetPab: e.target.value })}
            />
            <input
              type="date"
              value={newItem.tanggalPp}
              onChange={(e) => setNewItem({ ...newItem, tanggalPp: e.target.value })}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="button-shared" onClick={handleAddOrUpdate}>
                {editIndex !== null ? "Update" : "Simpan"}
              </button>
              <button className="button-cancel" onClick={() => setIsModalVisible(false)}>
                Batal
              </button>
            </div>
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
            <th>ID Pabrik</th>
            <th>Nama Pabrik</th>
            <th>Jenis Barang</th>
            <th>Ukuran Barang</th>
            <th>Target Pabrik</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduksi.map((item, index) => (
            <tr key={item.idPp}>
              <td>{index + 1}</td>
              <td>{item.idPp}</td>
              <td>{item.namaPab}</td>
              <td>{item.jenisBarang}</td>
              <td>{item.ukuranBarang}</td>
              <td>{item.targetPab}</td>
              <td>{item.tanggalPp}</td>
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
