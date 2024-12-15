"use client";

import React, { useState, useEffect } from "react";

interface ProduksiItem {
  idPh: string;
  namaPab: string;
  namaKar: string;
  jenisBahar: string;
  ukuranBahar: string;
  targetKar: string;
}

export default function ProduksiHarian() {
  const [produksi, setProduksi] = useState<ProduksiItem[]>([]);
  const [newItem, setNewItem] = useState<ProduksiItem>({
    idPh: "",
    namaPab: "",
    namaKar: "",
    jenisBahar: "",
    ukuranBahar: "",
    targetKar: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProduksi = async () => {
      try {
        const response = await fetch('/api/produksi-harian');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data: ProduksiItem[] = await response.json();
        setProduksi(data);
      } catch (error) {
        console.error("Error fetching produksi harian:", error);
      }
    };
    fetchProduksi();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      const method = editIndex !== null ? 'PUT' : 'POST';
      const response = await fetch('/api/produksi-harian', {
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

      const result: ProduksiItem = await response.json();
      if (editIndex !== null) {
        setProduksi((prev) => prev.map((item, index) => index === editIndex ? result : item));
        setEditIndex(null);
      } else {
        setProduksi((prev) => [...prev, result]);
      }
      setNewItem({
        idPh: "",
        namaPab: "",
        namaKar: "",
        jenisBahar: "",
        ukuranBahar: "",
        targetKar: "",
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
      const { idPh } = produksi[index];
      const response = await fetch('/api/produksi-harian', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPh }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      setProduksi((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting produksi harian:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const filteredProduksi = produksi.filter((item) =>
    item.namaPab.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.namaKar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenisBahar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ukuranBahar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.targetKar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="data-karyawan-container">
      <h1>DATA PRODUKSI HARIAN</h1>

      <button className="button-shared bg-[#AF8F6F] hover:bg-[#FF2E1] transition" onClick={() => setIsModalVisible(true)}>
        <i className="fas fa-plus"></i> Tambah
      </button>

      {isModalVisible && (
        <div className="modal-overlay bg-overlay">
          <div className="modal bg-[#EAD8C0]">
            <h2>{editIndex !== null ? "Edit Data" : "Tambah Data"}</h2>
            <input
              type="text"
              placeholder="ID Produksi Harian"
              value={newItem.idPh}
              onChange={(e) => setNewItem({ ...newItem, idPh: e.target.value })}
              disabled={editIndex !== null}
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
            <th>ID Produksi Harian</th>
            <th>Nama Pabrik</th>
            <th>Nama Karyawan</th>
            <th>Jenis Barang</th>
            <th>Ukuran Barang</th>
            <th>Target Karyawan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduksi.map((item, index) => (
            <tr key={item.idPh}>
              <td>{index + 1}</td>
              <td>{item.idPh}</td>
              <td>{item.namaPab}</td>
              <td>{item.namaKar}</td>
              <td>{item.jenisBahar}</td>
              <td>{item.ukuranBahar}</td>
              <td>{item.targetKar}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="edit-btn">
                  ✏️
                </button>
                <button onClick={() => handleDelete(index)} className="delete-btn">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
