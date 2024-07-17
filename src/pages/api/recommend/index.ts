import { Recommend } from "@/types/Spotify";
import { getSpotifyToken } from "@/utils/getToken";
import { spotifyJsonSchema } from "@/utils/spotifyJsonSchema";
import { GenerativeModel } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Recommend>
) {
  if (req.method !== "GET") {
    throw Error("Request Methodに誤りあります");
  }

  const token = await getSpotifyToken(req);

  const prompt = req.query.prompt as string;

  const spotifyParams = await generateSpotifyParamFromGemini(prompt);

  const recommendations = await getRecommendations(
    spotifyParams,
    token?.accessToken
  );

  res.status(200).json(recommendations);
}

const generateSpotifyParamFromGemini = async (
  prompt: string
): Promise<Record<string, string>> => {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    throw Error("geminiApiKeyを設定してください");
  }
  const model = new GenerativeModel(geminiApiKey, {
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

  const basePrompt = `
    using this JSON schema:
    ${JSON.stringify(spotifyJsonSchema)}
  `;

  const result = await model.generateContent([basePrompt, prompt]);

  const response = await result.response;

  const generate = JSON.parse(response.text());
  const params = {
    limit: "20",
    market: "JP",
    ...generate,
  };

  return params;
};

const getRecommendations = async (
  param: Record<string, string>,
  accessToken?: string
) => {
  const query = new URLSearchParams(param);
  const spotifyRes = await fetch(
    `https://api.spotify.com/v1/recommendations?${query}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const recommendations = await spotifyRes.json();
  return recommendations;
};
