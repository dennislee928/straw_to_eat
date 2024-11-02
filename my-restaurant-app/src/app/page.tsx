"use client"; // 將此組件標記為 Client Component

import Image from "next/image";

import { useState, useEffect } from "react";

// 定義 Restaurant 類型
interface Restaurant {
  poiId: string;
  name: string;
}

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchParam, setSearchParam] = useState<string>("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");
  const [districtId, setDistrictId] = useState<string>("1007"); // 預設為大安區

  // 區域選項
  const districts = [
    { name: "大安", id: "1007" },
    { name: "信義", id: "1010" },
    { name: "中山", id: "1006" },
    { name: "士林", id: "1001" },
    { name: "內湖", id: "1003" },
  ];

  // 初始 fetch
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async (district: string = districtId) => {
    const response = await fetch(
      `https://tw.openrice.com/api/v2/search?uiLang=zh&uiCity=taipei&sortBy=ORScoreDesc&districtId=${district}&regionId=704&startAt=0&rows=15&pageToken=`
    );
    const data = await response.json();
    setRestaurants(data.poi || []);
  };
  const handleSearch = async () => {
    await fetchRestaurants(districtId); // 等待 fetchRestaurants 完成
    handleDraw(); // 直接調用 handleDraw
  };

  const handleDraw = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setSelectedRestaurant(restaurants[randomIndex].name);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://megapx-assets.dcard.tw/images/0150ce6c-22fb-462e-a3f2-d45e2a8d603f/1280.jpeg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          unoptimized
        />
        <h1 className="text-2xl">餐廳搜尋</h1>
        {/* 下拉式選單 */}
        <select
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
          className="border p-2 rounded"
          aria-label="選擇行政區"
        >
          <option value="" disabled>
            選擇行政區
          </option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="輸入搜尋參數"
          className="border p-2 rounded"
        />
        <div className="flex gap-4">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded"
          >
            搜尋
          </button>
          <button
            onClick={handleDraw}
            className="bg-green-500 text-white p-2 rounded"
          >
            抽籤
          </button>
        </div>
        {selectedRestaurant && <h2>抽中的餐廳: {selectedRestaurant}</h2>}
        <ul className="list-disc">
          {restaurants.map((restaurant) => (
            <li key={restaurant.poiId}>{restaurant.name}</li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://megapx-assets.dcard.tw/images/0150ce6c-22fb-462e-a3f2-d45e2a8d603f/1280.jpeg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
