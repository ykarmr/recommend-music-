import { Spinner } from "@/components/Spinner";
import { SpotifyTrackList } from "@/components/SpotifyTrackList";
import { Recommend } from "@/types/Spotify";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";

const Home = () => {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommend, setRecommend] = useState<Recommend | null>(null);

  const handleGenerate = async () => {
    if (!text || isLoading) return;
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.BASE_PARH}/api/recommend?text=${text}`
      );
      const json = await res.json();
      setRecommend(json);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return <p className="text-center">ログインしてください</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="聴きたい曲のイメージを教えてください"
          rows={5}
        />
        <button
          className="mt-2 w-full bg-blue-500 hover:bg-blue-700  disabled:bg-slate-400 text-white p-2 rounded"
          disabled={!text || isLoading}
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
      {isLoading && (
        <>
          <p className="text-center mb-2">現在、内容を作成中です</p>

          <div className="flex justify-center">
            <Spinner />
          </div>
        </>
      )}
      {!isLoading && recommend && (
        <SpotifyTrackList tracks={recommend.tracks} />
      )}
    </div>
  );
};

export default Home;
