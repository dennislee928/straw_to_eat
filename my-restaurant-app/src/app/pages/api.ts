import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { districtId, page } = req.query;

  const response = await fetch(
    `https://tw.openrice.com/api/v2/search?uiLang=zh&uiCity=taipei&sortBy=ORScoreDesc&districtId=${districtId}&regionId=704&startAt=0&rows=15&pageToken=${page}`
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch data" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
