import React from "react";

interface SpotifyEmbedProps {
  src: string;
  width?: string;
  height?: string;
}

export const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  src,
  width = "100%",
  height = "380",
}) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      frameBorder="0"
      allowTransparency={true}
      allow="encrypted-media"
    ></iframe>
  );
};
