"use client";

import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [data, setData] = useState({
    totalKaryawan: 0,
    totalProduksi: {
      pabrikA: 0,
      pabrikB: 0,
      pabrikC: 0,
    },
    produksiPerBulan: {
      pabrikA: [150, 200, 250, 300, 350, 400, 450, 500, 400, 300, 200, 100],
      pabrikB: [100, 150, 200, 250, 300, 350, 400, 450, 500, 450, 400, 350],
      pabrikC: [200, 250, 300, 350, 400, 450, 500, 450, 400, 350, 300, 250],
    },
  });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data fetched:", data);
        setData((prevData) => ({
          ...prevData,
          totalKaryawan: data.totalKaryawan,
          totalProduksi: data.totalProduksi,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert(`Error fetching data: ${error.message}`);
      });
  }, []);
  
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Pabrik A',
        data: data.produksiPerBulan.pabrikA,
        backgroundColor: '#b1967c',
        borderColor: '#b1967c',
        borderWidth: 1,
      },
      {
        label: 'Pabrik B',
        data: data.produksiPerBulan.pabrikB,
        backgroundColor: '#ae7e4d',
        borderColor: '#ae7e4d',
        borderWidth: 1,
      },
      {
        label: 'Pabrik C',
        data: data.produksiPerBulan.pabrikC,
        backgroundColor: '#794b1a',
        borderColor: '#794b1a',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text : 'Total Produksi Pabrik per Bulan',
      },
    },
    scales: {
      y: {
        min: 100,
        max: 500,
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 bg-[#f8f4e1]">Selamat Datang admin, semoga harimu menyenangkan</h1>
      <div className="flex space-x-4">
        <div className="flex-1 p-4 bg-[#f8f4e1] shadow rounded-lg">
          <h2 className="text-lg font-bold text-[#74512d]">Total Karyawan</h2>
          <p className="text-3xl font-semibold mt-2 text-[#74512d]">{data.totalKaryawan}</p>
        </div>
        <div className="flex-1 p-4 bg-[#f8f4e1] shadow rounded-lg">
          <h2 className="text-lg font-bold text-[#74512d]">Produksi Pabrik A</h2>
          <p className="text-3xl font-semibold mt-2 text-[#74512d]">{data.totalProduksi.pabrikA}</p>
        </div>
        <div className="flex-1 p-4 bg-[#f8f4e1] shadow rounded-lg">
          <h2 className="text-lg font-bold text-[#74512d]">Produksi Pabrik B</h2>
          <p className="text-3xl font-semibold mt-2 text-[#74512d]">{data.totalProduksi.pabrikB}</p>
        </div>
        <div className="flex-1 p-4 bg-[#f8f4e1] shadow rounded-lg">
          <h2 className="text-lg font-bold text-[#74512d]">Produksi Pabrik C</h2>
          <p className="text-3xl font-semibold mt-2 text-[#74512d]">{data.totalProduksi.pabrikC}</p>
        </div>
      </div>
      <div className="mt-6 bg-gray-100">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}