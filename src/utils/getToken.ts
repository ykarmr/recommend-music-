import { GetServerSidePropsContext, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const getSpotifyToken = async (
  req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest
) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token;
};
