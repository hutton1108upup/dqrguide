import type { EvidenceLevel } from "@/content/types";

const tone: Record<EvidenceLevel, string> = { Official: "official", "In-game Verified": "verified", "Community Confirmed": "community", "Legacy / Unconfirmed": "unconfirmed" };

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return <span className={`evidence-badge ${tone[level]}`}>{level}</span>;
}

