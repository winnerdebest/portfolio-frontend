"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Music2, Play, Radio, X } from "lucide-react";
import { get } from "@/lib/api";

const SPOTIFY_POLL_INTERVAL_MS = 5000;

type SpotifyNowPlayingResponse = {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumImageUrl: string | null;
  songUrl: string | null;
  playedAt: string | null;
  error?: string;
};

const SpotifyNowPlaying = () => {
  const [track, setTrack] = useState<SpotifyNowPlayingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTrack = async () => {
      try {
        const data = await get<SpotifyNowPlayingResponse>("/api/spotify/now-playing/");
        if (!isMounted) return;
        setTrack(data);
        setHasError(Boolean(data.error));
      } catch (error) {
        console.error("Failed to fetch Spotify status:", error);
        if (!isMounted) return;
        setHasError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTrack();
    const intervalId = window.setInterval(loadTrack, SPOTIFY_POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const statusLabel = track?.isPlaying
    ? "Now playing on Spotify"
    : track?.title
      ? "Last played on Spotify"
      : "Spotify";

  const spotifyTrackId = getSpotifyTrackId(track?.songUrl);
  const embedUrl = spotifyTrackId
    ? `https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`
    : null;

  return (
    <div className="mt-8 w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111113]/80 p-3 card-shadow backdrop-blur-sm transition-all hover:border-[#1DB954]/40 hover:bg-[#111113]">
      <div className="flex items-center gap-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03]">
        {track?.albumImageUrl ? (
          <img
            src={track.albumImageUrl}
            alt={track.album ? `${track.album} album cover` : "Spotify album cover"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#1DB954]">
            <Music2 className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 text-left">
        <div className="mb-1 flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${track?.isPlaying ? "bg-[#1DB954] pulse-accent" : "bg-[#71717A]"}`} />
          <p className="font-code text-[10px] uppercase tracking-[0.14em] text-[#1DB954]">
            {isLoading ? "Checking Spotify" : statusLabel}
          </p>
        </div>
        <p className="truncate text-sm font-semibold text-white">
          {isLoading ? "Loading track..." : track?.title || "Not playing right now"}
        </p>
        <p className="truncate text-xs text-[#A1A1AA]">
          {isLoading ? "One moment" : track?.artist || (hasError ? "Spotify status unavailable" : "Recent track will appear here")}
        </p>
      </div>

        <div className="flex shrink-0 items-center gap-1">
          {embedUrl && (
            <button
              type="button"
              onClick={() => setIsPlayerOpen((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#1DB954] transition-colors hover:border-[#1DB954]/40 hover:bg-[#1DB954]/10"
              aria-label={isPlayerOpen ? "Hide Spotify player" : "Play on Spotify embed"}
            >
              {isPlayerOpen ? <X className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
            </button>
          )}

          {track?.songUrl && (
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#71717A] transition-colors hover:border-[#1DB954]/40 hover:text-[#1DB954]"
              aria-label="Open track on Spotify"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {embedUrl && isPlayerOpen && (
        <iframe
          src={embedUrl}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="mt-3 block rounded-lg border-0"
          title={track?.title ? `Spotify player for ${track.title}` : "Spotify player"}
        />
      )}
      <Radio className="sr-only" />
    </div>
  );
};

function getSpotifyTrackId(songUrl?: string | null) {
  if (!songUrl) return null;

  try {
    const url = new URL(songUrl);
    const [, type, id] = url.pathname.split("/");
    return type === "track" && id ? id : null;
  } catch {
    return null;
  }
}

export default SpotifyNowPlaying;
