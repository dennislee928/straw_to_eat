"use client"; // 將此組件標記為 Client Component

import { useState, useEffect } from "react";
import Image from "next/image";

// 導入 API 路由
const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10"; // Cat API 路由的 URL
const API_KEY =
  "live_kKhDHypr9Dg1i36BGQR8BEJ7xCnM2J0nqKDLxaFqyebOIN7HttP1dxujwzLq9xr4"; // API 金鑰

// 定義 Cat 類型
interface Cat {
  id: string;
  url: string;
}

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("");

  // 獲取貓咪圖片
  const fetchCats = async () => {
    const response = await fetch(API_URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const data = await response.json();
    console.log(data); // 檢查獲取的數據
    setCats(data);
  };

  useEffect(() => {
    fetchCats(); // 在組件加載時獲取貓咪圖片
  }, []);

  const handleDraw = () => {
    fetchCats();
    if (cats.length > 0) {
      const randomIndex = Math.floor(Math.random() * cats.length);
      setSelectedCat(cats[randomIndex].url);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl">貓咪圖片搜尋</h1>
        <button
          onClick={handleDraw}
          className="bg-blue-500 text-white p-2 rounded"
        >
          抽貓咪
        </button>
        {selectedCat && (
          <Image
            src={selectedCat}
            alt="隨機貓咪"
            width={300}
            height={300}
            priority
          />
        )}
        <ul className="list-disc">
          {cats.map((cat) => (
            <li key={cat.id}>
              <Image src={cat.url} alt="貓咪" width={100} height={100} />
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
