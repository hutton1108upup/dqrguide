"use client";

import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { VideoDialog } from "./video-dialog";

import type { PageMedia } from "@/content/types";

function EvidenceLine({ item }: { item: PageMedia }) {
  return (
    <figcaption>
      <span className="media-caption">{item.caption}</span>
      <span className="media-meta">
        {item.evidenceLevel} · checked {item.capturedAt}
        {item.verifiedForVersion ? ` · ${item.verifiedForVersion}` : " · version not verified"}
      </span>
      <a href={item.sourceURL} target="_blank" rel="noreferrer">
        {item.type === "youtube" ? "Watch on YouTube" : "Open official source"}
        <ExternalLink size={12} aria-hidden="true" />
      </a>
    </figcaption>
  );
}

function EvidenceImage({ item }: { item: PageMedia }) {
  if (!item.src) return null;

  return (
    <figure className="evidence-media image-evidence">
      <div className="image-frame">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 880px) 100vw, 720px"
          className="evidence-image"
        />
      </div>
      <EvidenceLine item={item} />
    </figure>
  );
}

function YouTubeEvidence({ item }: { item: PageMedia }) {
  if (!item.videoId) return null;
  const sourceURL = new URL(item.sourceURL);
  if (item.startSeconds) sourceURL.searchParams.set("t", `${item.startSeconds}s`);

  return (
    <figure className="evidence-media video-evidence">
      <div className="video-frame">
        <VideoDialog url={sourceURL.toString()} title={item.title}>
          <button type="button" aria-label={`Play ${item.title}`}>
            {/* YouTube keeps ownership and delivery of its preview image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
              alt=""
              width="480"
              height="360"
              loading="lazy"
              decoding="async"
            />
            <span className="video-play"><Play size={19} fill="currentColor" aria-hidden="true" /> Play community video</span>
          </button>
        </VideoDialog>
      </div>
      <EvidenceLine item={item} />
    </figure>
  );
}

export function ContentMedia({ items }: { items: PageMedia[] }) {
  if (!items.length) return null;

  return (
    <div className="evidence-media-stack">
      {items.map((item) => item.type === "youtube"
        ? <YouTubeEvidence item={item} key={item.id} />
        : <EvidenceImage item={item} key={item.id} />)}
    </div>
  );
}
