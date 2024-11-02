// pages/index.js
import { useState, useEffect } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  // 初始 fetch
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async (param = "") => {
    const response = await fetch(
      `https://tw.openrice.com/api/v2/search?uiLang=zh&uiCity=taipei&sortBy=ORScoreDesc&districtId=1007&regionId=704&startAt=0&rows=15&pageToken=${param}`
    );
    const data = await response.json();
    setRestaurants(data.poi || []);
  };

  const handleSearch = () => {
    fetchRestaurants(searchParam);
  };

  const handleDraw = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setSelectedRestaurant(restaurants[randomIndex].name);
    }
  };

  return (
    <div>
      <h1>餐廳搜尋</h1>
      <input
        type="text"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        placeholder="輸入搜尋參數"
      />
      <button onClick={handleSearch}>搜尋</button>
      <button onClick={handleDraw}>抽籤</button>
      {selectedRestaurant && <h2>抽中的餐廳: {selectedRestaurant}</h2>}
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.poiId}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
}
