import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';

// Mengambil semua data karyawan
export async function GET() {
  try {
    const karyawan = await prisma.dataKaryawan.findMany();
    console.log("Data karyawan fetched:", karyawan);
    return NextResponse.json(karyawan);
  } catch (error) {
    console.error("Error fetching karyawan:", error);
    return NextResponse.json({ error: "Error fetching karyawan" }, { status: 500 });
  }
}

// Menambahkan data karyawan baru dengan idKar
export async function POST(request: Request) {
  try {
    const data: { idKar: string; namaKar: string; alamatKar: string; namaPab: string } = await request.json();
    console.log("Data diterima untuk pembuatan:", data);

    // Validasi data
    if (!data.idKar || !data.namaKar || !data.alamatKar || !data.namaPab) {
      console.error("Tipe data tidak valid:", data);
      return NextResponse.json({ error: "Tipe data tidak valid" }, { status: 400 });
    }

    // Simpan data dengan idKar
    const newKaryawan = await prisma.dataKaryawan.create({
      data: {
        idKar: data.idKar,
        namaKar: data.namaKar,
        alamatKar: data.alamatKar,
        namaPab: data.namaPab,
      },
    });
    return NextResponse.json(newKaryawan);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saat membuat karyawan:", error.message);
      return NextResponse.json({ error: error.message || "Error saat membuat karyawan" }, { status: 500 });
    }
    console.error("Error tidak diketahui saat membuat karyawan:", error);
    return NextResponse.json({ error: "Error tidak diketahui saat membuat karyawan" }, { status: 500 });
  }
}

// Memperbarui data karyawan yang ada
export async function PUT(request: Request) {
  try {
    const { idKar, ...data } = await request.json();
    const updatedKaryawan = await prisma.dataKaryawan.update({
      where: { idKar },
      data,
    });
    return NextResponse.json(updatedKaryawan);
  } catch (error) {
    console.error("Error updating karyawan:", error);
    return NextResponse.json({ error: "Error updating karyawan" }, { status: 500 });
  }
}

// Menghapus data karyawan berdasarkan ID
export async function DELETE(request: Request) {
  try {
    const { idKar } = await request.json();
    await prisma.dataKaryawan.delete({
      where: { idKar },
    });
    return NextResponse.json({ message: 'Karyawan deleted' });
  } catch (error) {
    console.error("Error deleting karyawan:", error);
    return NextResponse.json({ error: "Error deleting karyawan" }, { status: 500 });
  }
} 