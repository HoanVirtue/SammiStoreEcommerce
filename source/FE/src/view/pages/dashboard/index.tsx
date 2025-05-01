"use client";
import { useEffect, useState, useMemo, useCallback } from 'react';
import ClientBody from "./ClientBody";
import { Card } from "src/view/pages/dashboard/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { User, Box, FileText, Star, DollarSign, MessageCircle } from "lucide-react";
import axios from 'axios';

// Define interfaces for API responses
interface GeneralStatistics {
  totalRevenue: number;
  totalCustomer: number;
  numberOrder: number | null;
}

interface BestSellingProduct {
  code: string;
  name: string;
  price: number;
  images: { imageUrl: string }[];
}

interface InventoryItem {
  name: string;
  stockQuantity: number;
}

interface ChartDataEntry {
  name: string;
  value: number;
  fill: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_HOST;

// Thêm hàm để lấy token
const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export default function DashboardClient() {
  // State management
  const [generalStats, setGeneralStats] = useState<GeneralStatistics | null>(null);
  const [bestSellingProducts, setBestSellingProducts] = useState<BestSellingProduct[]>([]);
  const [inventoryStats, setInventoryStats] = useState<any>(null);
  const [salesRevenue, setSalesRevenue] = useState<any>(null);
  const [importStats, setImportStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Memoize API calls
  const fetchDashboardData = useCallback(async () => {
    try {
      const token = getAccessToken();
      const headers = {
        Authorization: `Bearer ${token}`
      };

      const [generalStats, bestSelling, inventory, sales, imports] = await Promise.all([
        axios.get(`${API_URL}/api/reports/general-statistics`, { headers }),
        axios.get(`${API_URL}/api/reports/best-selling-product?numberTop=5`, { headers }),
        axios.get(`${API_URL}/api/reports/inventory-statistics`, { headers }),
        axios.get(`${API_URL}/api/reports/sales-revenue`, { headers }),
        axios.get(`${API_URL}/api/reports/get-import-statistics`, { headers })
      ]);

      setGeneralStats(generalStats.data.result);
      setBestSellingProducts(bestSelling.data.result);
      setInventoryStats(inventory.data.result);
      setSalesRevenue(sales.data.result);
      setImportStats(imports.data.result);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Memoize chart data
  const productChartData = useMemo(() => 
    inventoryStats?.inventoryDetails?.subset.map((item: InventoryItem) => ({
      name: item.name,
      value: item.stockQuantity,
      fill: `#${Math.floor(Math.random()*16777215).toString(16)}`
    })) || [], 
    [inventoryStats]
  );

  const revenueChartData = useMemo(() => 
    salesRevenue?.revenueDetails?.subset.map((item: any) => ({
      name: item.date || item.month,
      value: item.amount || item.total,
      fill: "#f87171"
    })) || [], 
    [salesRevenue]
  );

  const userPieChartData = useMemo(() => [
    { 
      name: "Người dùng", 
      value: generalStats?.totalCustomer || 0, 
      fill: "#4ade80" 
    }
  ], [generalStats]);

  const orderPieChartData = useMemo(() => [
    { name: "Đơn hàng", value: generalStats?.numberOrder || 0, fill: "#818cf8" }
  ], [generalStats]);

  const importChartData = useMemo(() => 
    importStats?.imports?.subset.map((item: any) => ({
      name: item.date || item.month,
      value: item.amount || item.total,
      fill: "#818cf8"
    })) || [], 
    [importStats]
  );

  // Memoize main stats
  const mainStats = useMemo(() => [
    { label: "Người dùng", value: generalStats?.totalCustomer || 0, icon: <User size={36} className="text-gray-400" />, color: "bg-violet-50" },
    { label: "Sản phẩm", value: inventoryStats?.totalProducts || 0, icon: <Box size={36} className="text-red-300" />, color: "bg-red-50" },
    { label: "Đơn hàng", value: generalStats?.numberOrder || 0, icon: <FileText size={36} className="text-green-400" />, color: "bg-green-50" },
    { label: "Đánh giá", value: 6, icon: <Star size={36} className="text-cyan-300" />, color: "bg-cyan-50" },
    { 
      label: "Doanh thu", 
      value: new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(generalStats?.totalRevenue || 0), 
      icon: <DollarSign size={36} className="text-orange-300" />, 
      color: "bg-orange-50" 
    },
    { label: "Bình luận", value: 0, icon: <MessageCircle size={36} className="text-gray-400" />, color: "bg-gray-100" },
  ], [generalStats, inventoryStats]);

  // Memoize popular products
  const popularProducts = useMemo(() => 
    bestSellingProducts.map(product => ({
      img: product.images[0]?.imageUrl || "default-image-url",
      name: product.name,
      type: product.code,
      price: new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND',
        minimumFractionDigits: 0,
      }).format(product.price)
    })),
    [bestSellingProducts]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ClientBody>
      <main className="bg-gray-100 p-4 min-h-screen">
        <div className="max-w-[95%] mx-auto">
          {/* Card statistics */}
          <Card className="mb-4 p-6 rounded-2xl shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Tổng quan thống kê</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {mainStats.map((item) => (
                <div key={item.label} className="transform transition-all duration-200 hover:scale-105">
                  <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg">
                    <div className={`flex items-center justify-center rounded-full w-12 h-12 ${item.color} mb-3 mx-auto`}>
                      {item.icon}
                    </div>
                    <div className="text-center">
                      <div className={`text-xl font-bold mb-1 text-gray-800 ${item.label === "Doanh thu" ? "text-lg" : "text-2xl"}`}>
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 shadow-md rounded-2xl">
              <h3 className="font-semibold text-center mb-2 text-gray-700 text-base">
                Số lượng sản phẩm theo từng loại
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={productChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value">
                    <LabelList dataKey="value" position="top" />
                    {productChartData.map((entry: ChartDataEntry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-4 shadow-md rounded-2xl">
              <h3 className="font-semibold text-center mb-2 text-gray-700 text-base">
                Doanh số năm nay
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `${(value/1000000).toFixed(0)}M`} 
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value: number) => new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(value)}
                  />
                  <Bar dataKey="value">
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      formatter={(value: number) => `${(value/1000000).toFixed(0)}M`}
                    />
                    {revenueChartData.map((entry: ChartDataEntry) => (
                      <Cell key={`cell-r-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Section hàng dưới - 3 cột */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Sản phẩm phổ biến */}
            <Card className="p-5 rounded-2xl shadow-md min-h-[370px]">
              <h3 className="font-semibold text-lg mb-4">Sản phẩm phổ biến</h3>
              <div className="space-y-4">
                {popularProducts.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={p.img} alt={p.name} className="rounded-md object-cover w-12 h-12 bg-gray-200" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{p.name}</div>
                      <div className="text-gray-400 text-sm truncate">{p.type}</div>
                    </div>
                    <div className="font-semibold whitespace-nowrap text-right text-sm">{p.price}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* PieChart user */}
            <Card className="p-5 rounded-2xl shadow-md flex flex-col items-center justify-center min-h-[370px]">
              <h3 className="font-semibold text-base text-center mb-2">
                Thống kê số lượng người dùng
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={userPieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  />
                  <Tooltip formatter={(v: number) => `${v} người dùng`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* PieChart order */}
            <Card className="p-5 rounded-2xl shadow-md flex flex-col items-center justify-center min-h-[370px]">
              <h3 className="font-semibold text-base text-center mb-2">
                Thống kê số lượng đơn hàng
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={orderPieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  />
                  <Tooltip formatter={(v: number) => `${v} đơn hàng`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </main>
    </ClientBody>
  );
}
