import { NextResponse } from 'next/server';
import prisma from '../../../libs/prisma';

// Mengambil total jumlah karyawan dan total produksi pabrik berdasarkan target
export async function GET() {
  try {
    // Hitung total karyawan
    const totalKaryawan = await prisma.dataKaryawan.count();

    // Ambil semua targetPab dan namaPab
    const produksiPabrik = await prisma.produksiPabrik.findMany({
      select: {
        namaPab: true,
        targetPab: true,
      },
    });

    // Inisialisasi total produksi untuk setiap pabrik
    const totalProduksi = {
      pabrikA: 0,
      pabrikB: 0,
      pabrikC: 0,
    };

    // Jumlahkan targetPab berdasarkan namaPab
    produksiPabrik.forEach((pabrik) => {
      const target = parseFloat(pabrik.targetPab) || 0;
      switch (pabrik.namaPab.toUpperCase()) {
        case 'PABRIK A':
          totalProduksi.pabrikA += target;
          break;
        case 'PABRIK B':
          totalProduksi.pabrikB += target;
          break;
        case 'PABRIK C':
          totalProduksi.pabrikC += target;
          break;
        default:
          break;
      }
    });

    console.log("Total karyawan fetched:", totalKaryawan);
    console.log("Total produksi pabrik fetched:", totalProduksi);

    return NextResponse.json({ 
      totalKaryawan, 
      totalProduksi 
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}