"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, X } from "lucide-react";
import { useState, type ReactElement, type ReactNode } from "react";

export function getVideoEmbed(source: string): string | null {
  try {
    const url = new URL(source);
    if (!["www.youtube.com", "youtube.com"].includes(url.hostname) || url.pathname !== "/watch") return null;
    const id = url.searchParams.get("v");
    if (!id || !/^[\w-]{11}$/.test(id)) return null;
    const start = url.searchParams.get("t") ?? "0";
    if (!/^\d+s?$/.test(start)) return null;
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0&start=${parseInt(start, 10)}`;
  } catch { return null; }
}

export function VideoDialog({ url, title, children }: { url: string; title: string; children: ReactElement }) {
  const [open, setOpen] = useState(false);
  const embed = getVideoEmbed(url);
  if (!embed) return children;
  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild onClick={event => { event.preventDefault(); setOpen(true); }}>{children}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="dialog-overlay video-overlay" />
      <Dialog.Content className="video-dialog">
        <div className="video-dialog-head">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Close className="icon-button" aria-label="Close video"><X size={22} aria-hidden="true" /></Dialog.Close>
        </div>
        <Dialog.Description>Community video. Close to return to your place in the guide.</Dialog.Description>
        <iframe src={embed} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        <p>If the player cannot load, <a href={url} target="_blank" rel="noreferrer">Open on YouTube <ExternalLink size={14} aria-hidden="true" /></a>.</p>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

export function VideoLink({ url, title, children }: { url: string; title: string; children: ReactNode }) {
  return <VideoDialog url={url} title={title}>
    <a className="video-source-link" href={url} target="_blank" rel="noreferrer">{children}</a>
  </VideoDialog>;
}
