"use client"; // 將此組件標記為 Client Component

import { useState, useEffect } from "react";
import Image from "next/image";

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10"; // Cat API 路由的 URL
const API_KEY =
  "live_kKhDHypr9Dg1i36BGQR8BEJ7xCnM2J0nqKDLxaFqyebOIN7HttP1dxujwzLq9xr4"; // 請替換為你的 API 金鑰

interface Cat {
  id: string;
  url: string;
  breeds: {
    name: string;
    temperament: string;
    life_span: string;
    origin: string;
    wikipedia_url: string;
  }[];
}

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("");

  const fetchCats = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // 檢查獲取的數據
      setCats(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCats(); // 在組件加載時獲取貓咪圖片
  }, []);

  const handleDraw = () => {
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
              {cat.breeds.length > 0 && (
                <div>
                  <h2>{cat.breeds[0].name}</h2>
                  <p>性格: {cat.breeds[0].temperament}</p>
                  <p>壽命: {cat.breeds[0].life_span}</p>
                  <p>來源: {cat.breeds[0].origin}</p>
                  <a
                    href={cat.breeds[0].wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    了解更多
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
