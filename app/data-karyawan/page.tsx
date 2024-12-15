"use client";

import React, { useState, useEffect } from "react";

//Define the type for a Karyawan object
interface Karyawan {
  idKar: string;
  namaKar: string;
  alamatKar: string;
  namaPab: string;
}

export default function DataKaryawan() {
  const [karyawan, setKaryawan] = useState<Karyawan[]>([]); // Use the Karyawan type
  const [formData, setFormData] = useState<Karyawan>({
    idKar: "",
    namaKar: "",
    alamatKar: "",
    namaPab: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    const fetchKaryawan = async () => {
      try {
        const response = await fetch('/api/data-karyawan');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data: Karyawan[] = await response.json();
        setKaryawan(data);
      } catch (error) {
        console.error("Error fetching karyawan:", error);
      }
    };
    fetchKaryawan();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editIndex !== null ? 'PUT' : 'POST';
      const response = await fetch('/api/data-karyawan', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const result: Karyawan = await response.json();
      if (editIndex !== null) {
        setKaryawan((prev) => prev.map((item, index) => index === editIndex ? result : item));
        setEditIndex(null);
      } else {
        setKaryawan((prev) => [...prev, result]);
      }
      setFormData({ idKar: "", namaKar: "", alamatKar: "", namaPab: "" });
      setIsFormVisible(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error.message);
      } else {
        console.error("Unknown error submitting form:", error);
      }
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(karyawan[index]);
    setIsFormVisible(true);
  };

  const handleDelete = async (idKar: string) => {
    try {
      const response = await fetch('/api/data-karyawan', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idKar }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      setKaryawan((prev) => prev.filter((item) => item.idKar !== idKar));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting karyawan:", error.message);
      } else {
        console.error("Unknown error deleting karyawan:", error);
      }
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div className="data-karyawan-container">
      <h1>DATA KARYAWAN</h1>
      <button
        className="button-shared bg-[#AF8F6F] hover:bg-[#FF2E1] transition"
        onClick={() => setIsFormVisible(true)}
      >
        <i className="fas fa-plus"></i> Tambah
      </button>

      {isFormVisible && (
        <div className="modal-overlay bg-overlay">
          <div className="modal bg-[#f8f4e1]">
            <h2>{editIndex !== null ? "Edit Data" : "Tambah Data"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="idKar"
                placeholder="Masukan ID Karyawan"
                value={formData.idKar}
                onChange={handleInputChange}
                disabled={editIndex !== null} // Disable editing idKar
              />
              <input
                type="text"
                name="namaKar"
                placeholder="Masukan Nama"
                value={formData.namaKar}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="alamatKar"
                placeholder="Masukan Alamat"
                value={formData.alamatKar}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="namaPab"
                placeholder="Masukan Nama Pabrik"
                value={formData.namaPab}
                onChange={handleInputChange}
              />
              <button type="submit" className="button-shared">
                {editIndex !== null ? "Update" : "Simpan"}
              </button>
              <button onClick={() => setIsFormVisible(false)} className="button-cancel">
                Batal
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="data-table bg-[#f8f4e1]">
        <thead>
          <tr>
            <th>No</th>
            <th>ID Karyawan</th>
            <th>Nama Karyawan</th>
            <th>Alamat</th>
            <th>Nama Pabrik</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {karyawan.map((item, index) => (
            <tr key={item.idKar}>
              <td>{index + 1}</td>
              <td>{item.idKar}</td>
              <td>{item.namaKar}</td>
              <td>{item.alamatKar}</td>
              <td>{item.namaPab}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="edit-btn">✏️</button>
                <button onClick={() => handleDelete(item.idKar)} className="delete-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
