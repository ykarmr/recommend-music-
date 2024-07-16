import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center">
          Spotify Recommendation
        </h1>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
