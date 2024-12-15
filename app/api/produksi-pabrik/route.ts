import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';

// Mengambil semua data produksi pabrik
export async function GET() {
  try {
    const produksiPabrik = await prisma.produksiPabrik.findMany();
    return NextResponse.json(produksiPabrik);
  } catch (error) {
    console.error("Error fetching produksi pabrik:", error);
    return NextResponse.json({ error: "Error fetching produksi pabrik" }, { status: 500 });
  }
}

// Menambahkan data produksi pabrik baru
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newProduksi = await prisma.produksiPabrik.create({
      data: {
        idPp: data.idPp,
        namaPab: data.namaPab,
        jenisBarang: data.jenisBarang,
        ukuranBarang: data.ukuranBarang,
        targetPab: data.targetPab,
        tanggalPp: new Date(data.tanggalPp),
      },
    });
    return NextResponse.json(newProduksi);
  } catch (error) {
    console.error("Error creating produksi pabrik:", error);
    return NextResponse.json({ error: "Error creating produksi pabrik" }, { status: 500 });
  }
}

// Memperbarui data produksi pabrik yang ada
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updatedProduksi = await prisma.produksiPabrik.update({
      where: { idPp: data.idPp },
      data: {
        namaPab: data.namaPab,
        jenisBarang: data.jenisBarang,
        ukuranBarang: data.ukuranBarang,
        targetPab: data.targetPab,
        tanggalPp: new Date(data.tanggalPp),
      },
    });
    return NextResponse.json(updatedProduksi);
  } catch (error) {
    console.error("Error updating produksi pabrik:", error);
    return NextResponse.json({ error: "Error updating produksi pabrik" }, { status: 500 });
  }
}

// Menghapus data produksi pabrik berdasarkan ID
export async function DELETE(request: Request) {
  try {
    const { idPp } = await request.json();
    await prisma.produksiPabrik.delete({
      where: { idPp },
    });
    return NextResponse.json({ message: 'Produksi pabrik deleted' });
  } catch (error) {
    console.error("Error deleting produksi pabrik:", error);
    return NextResponse.json({ error: "Error deleting produksi pabrik" }, { status: 500 });
  }
}
