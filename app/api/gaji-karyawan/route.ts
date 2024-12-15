import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';

// Mengambil semua data gaji karyawan
export async function GET() {
  try {
    const gajiKaryawan = await prisma.gajiKaryawan.findMany();
    return NextResponse.json(gajiKaryawan);
  } catch (error) {
    console.error("Error fetching gaji karyawan:", error);
    return NextResponse.json({ error: "Error fetching gaji karyawan" }, { status: 500 });
  }
}

// Menambahkan data gaji karyawan baru
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const targetKar = parseInt(data.targetKar.replace(/\D/g, '')); // Convert targetKaryawan to number
    const totalUpah = targetKar * data.upah; // Calculate totalUpah

    const newGaji = await prisma.gajiKaryawan.create({
      data: {
        idGaji: data.idGaji, // Use idGaji
        namaKar: data.namaKar,
        namaPab: data.namaPab,
        jenisBahar: data.jenisBahar,
        ukuranBahar: data.ukuranBahar,
        targetKar: data.targetKar,
        upah: data.upah,
        totalUpah: totalUpah,
      },
    });
    return NextResponse.json(newGaji);
  } catch (error) {
    console.error("Error creating gaji karyawan:", error);
    return NextResponse.json({ error: "Error creating gaji karyawan" }, { status: 500 });
  }
}

// Memperbarui data gaji karyawan yang ada
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const targetKar = parseInt(data.targetKar.replace(/\D/g, '')); // Convert targetKaryawan to number
    const totalUpah = targetKar * data.upah; // Calculate totalUpah

    const updatedGaji = await prisma.gajiKaryawan.update({
      where: { idGaji: data.idGaji }, // Use idGaji
      data: {
        namaKar: data.namaKar,
        namaPab: data.namaPab,
        jenisBahar: data.jenisBahar,
        ukuranBahar: data.ukuranBahar,
        targetKar: data.targetKar,
        upah: data.upah,
        totalUpah: totalUpah,
      },
    });
    return NextResponse.json(updatedGaji);
  } catch (error) {
    console.error("Error updating gaji karyawan:", error);
    return NextResponse.json({ error: "Error updating gaji karyawan" }, { status: 500 });
  }
}

// Menghapus data gaji karyawan berdasarkan ID
export async function DELETE(request: Request) {
  try {
    const { idGaji } = await request.json(); // Use idGaji
    await prisma.gajiKaryawan.delete({
      where: { idGaji },
    });
    return NextResponse.json({ message: 'Gaji karyawan deleted' });
  } catch (error) {
    console.error("Error deleting gaji karyawan:", error);
    return NextResponse.json({ error: "Error deleting gaji karyawan" }, { status: 500 });
  }
}
