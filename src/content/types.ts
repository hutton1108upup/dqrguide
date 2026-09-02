export const EVIDENCE_LEVELS = [
  "Official",
  "In-game Verified",
  "Community Confirmed",
  "Legacy / Unconfirmed"
] as const;

export type EvidenceLevel = (typeof EVIDENCE_LEVELS)[number];
export type Confidence = "High" | "Medium" | "Low";
export type PageKind = "hub" | "guide" | "status" | "update";

export interface SourceRecord {
  title: string;
  url: string;
  evidenceLevel: EvidenceLevel;
  evidenceNote: string;
  lastChecked: string;
}

export interface PageSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  description: string;
}

export interface SitePage {
  path: string;
  kind: PageKind;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  summary: string;
  quickAnswer: string;
  indexable: boolean;
  published: boolean;
  datePublished: string;
  dateModified: string;
  lastVerified: string | null;
  verifiedForVersion: string | null;
  evidenceLevel: EvidenceLevel;
  confidence: Confidence;
  sections: PageSection[];
  faq: FaqItem[];
  related: RelatedLink[];
  sources: SourceRecord[];
}

