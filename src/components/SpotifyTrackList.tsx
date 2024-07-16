import { Album, Track } from "@/types/Spotify";
import { SpotifyEmbed } from "./SpotifyEmbed";

type Props = {
  tracks: Track[];
};

function insertEmbedInSpotifyUrl(
  url: string,
  insertPosition: "album" | "artist"
): string {
  const spotifyBaseUrl = "https://open.spotify.com/";

  if (!url.startsWith(spotifyBaseUrl)) {
    throw new Error("Invalid Spotify URL");
  }

  const parts = url.split(insertPosition);
  if (parts.length !== 2) {
    throw new Error("URL does not contain the specified insert position");
  }

  return `${parts[0]}embed/${insertPosition}${parts[1]}?utm_source=generator`;
}

export const SpotifyTrackList = ({ tracks }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tracks.map((item) => {
        const path = insertEmbedInSpotifyUrl(
          item.album.external_urls.spotify,
          "album"
        );
        return <SpotifyEmbed key={item.id} src={path} />;
      })}
    </div>
  );
};
