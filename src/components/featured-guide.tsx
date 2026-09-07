"use client";

import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const source = "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=94s";
const chapters = [
  { seconds: 83, time: "1:23", title: "Opening rooms", detail: "Sidestep ranged attacks and circle behind the mages." },
  { seconds: 167, time: "2:47", title: "Midgardian Champion", detail: "Leave room to react and save movement for the slam." },
  { seconds: 409, time: "6:49", title: "Bob the Frost Giant", detail: "Guide the orb toward the matching rock while avoiding the laser." },
  { seconds: 919, time: "15:19", title: "Odin", detail: "Keep your distance and move through gaps in the ring attacks." }
];

export function FeaturedGuide() {
  const [start, setStart] = useState<number | null>(null);
  return <section className="featured-guide" aria-labelledby="featured-guide-title">
    <div className="section-heading"><div><span>WATCH</span><h2 id="featured-guide-title">Featured Guide</h2></div></div>
    <div className="featured-guide-card">
      <div className="featured-inline-player">
        {/* Load the player in this slot only after the reader presses Play or a chapter. */}
        {start === null ? <button className="featured-guide-play" type="button" aria-label="Play featured Northern Lands guide" onClick={() => setStart(94)}>
          <span className="featured-play-icon"><Play size={28} aria-hidden="true" /></span>
          <span className="featured-video-label">Northern Lands<small>Solo route walkthrough</small></span>
        </button> : <iframe
          key={start}
          src={`https://www.youtube-nocookie.com/embed/3pHhZpt-b-U?rel=0&start=${start}&autoplay=1&playsinline=1`}
          title="Northern Lands solo route — SaltyNub"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />}
      </div>
      <div className="featured-guide-details">
        <h3>Northern Lands solo guide</h3>
        <p>Watch <a href="https://www.youtube.com/@ThatSaltyNub" target="_blank" rel="noreferrer">-SaltyNub-</a>’s Dungeon Quest Reborn walkthrough for room pulls, boss positioning and Bob’s orb mechanic. Click a time below to jump to that chapter.</p>
        <ul className="featured-chapters">{chapters.map(chapter => <li key={chapter.seconds}>
          <button type="button" onClick={() => setStart(chapter.seconds)} aria-label={`Play ${chapter.title} at ${chapter.time}`}><span>{chapter.time}</span>{chapter.title}</button>
          <span>{chapter.detail}</span>
        </li>)}</ul>
        <p className="featured-context">This September 2 walkthrough uses Nightmare gear in an Insane run. It covers the regular route; <Link href="/dungeons/northern-lands/odin-reincarnation/">Odin Reincarnation</Link> has a separate guide.</p>
        <div className="featured-related-links">
          <Link className="featured-source" href="/dungeons/northern-lands/">Full written guide <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <a className="featured-source" href={source} target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </section>;
}
