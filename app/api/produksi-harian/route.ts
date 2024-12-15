import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';

// Mengambil semua data produksi harian
export async function GET() {
  try {
    const produksiHarian = await prisma.produksiHarian.findMany();
    return NextResponse.json(produksiHarian);
  } catch (error) {
    console.error("Error fetching produksi harian:", error);
    return NextResponse.json({ error: "Error fetching produksi harian" }, { status: 500 });
  }
}

// Menambahkan data produksi harian baru
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newProduksi = await prisma.produksiHarian.create({
      data: {
        idPh: data.idPh,
        namaPab: data.namaPab,
        namaKar: data.namaKar,
        jenisBahar: data.jenisBahar,
        ukuranBahar: data.ukuranBahar,
        targetKar: data.targetKar,
      },
    });
    return NextResponse.json(newProduksi);
  } catch (error) {
    console.error("Error creating produksi harian:", error);
    return NextResponse.json({ error: "Error creating produksi harian" }, { status: 500 });
  }
}

// Memperbarui data produksi harian yang ada
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updatedProduksi = await prisma.produksiHarian.update({
      where: { idPh: data.idPh },
      data: {
        namaPab: data.namaPab,
        namaKar: data.namaKar,
        jenisBahar: data.jenisBahar,
        ukuranBahar: data.ukuranBahar,
        targetKar: data.targetKar,
      },
    });
    return NextResponse.json(updatedProduksi);
  } catch (error) {
    console.error("Error updating produksi harian:", error);
    return NextResponse.json({ error: "Error updating produksi harian" }, { status: 500 });
  }
}

// Menghapus data produksi harian berdasarkan ID
export async function DELETE(request: Request) {
  try {
    const { idPh } = await request.json();
    await prisma.produksiHarian.delete({
      where: { idPh },
    });
    return NextResponse.json({ message: 'Produksi harian deleted' });
  } catch (error) {
    console.error("Error deleting produksi harian:", error);
    return NextResponse.json({ error: "Error deleting produksi harian" }, { status: 500 });
  }
}
