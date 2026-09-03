export const EVIDENCE_LEVELS = [
  "Official",
  "In-game Verified",
  "Community Confirmed",
  "Legacy / Unconfirmed"
] as const;

export type EvidenceLevel = (typeof EVIDENCE_LEVELS)[number];
export type Confidence = "High" | "Medium" | "Low";
export type PageKind = "hub" | "guide" | "status" | "update" | "trust";
export type PublicationStatus = "draft" | "review" | "published";
export type ClaimStatus = "confirmed" | "reported" | "not_collected" | "fetch_failed";
export type ContentType = "codes" | "tier" | "update" | "dungeon" | "guide" | "trust";
export type DataState = "observed_zero" | "not_collected" | "fetch_failed";

export interface FactClaim {
  id: string;
  topic: string;
  claim: string;
  value: string;
  claimStatus: ClaimStatus;
  confidence: Confidence;
  verifiedForVersion: string | null;
  sourceURL: string | null;
  evidenceNote: string;
  lastChecked: string;
}

export interface DifferenceRow extends FactClaim {
  originalValue: string;
  rebornValue: string;
}

export interface UpdateRecord extends FactClaim {
  versionTitle: string;
  publishedDate: string;
  actualChanges: string;
  affectedPaths: string[];
  recordType: "patch_note" | "metadata_signal" | "editorial";
}

export interface SourceRecord {
  title: string;
  url: string;
  evidenceLevel: EvidenceLevel;
  evidenceNote: string;
  lastChecked: string;
}

export interface ApiSnapshot {
  endpoint: string;
  fetchedAt: string;
  responseSummary: string;
}

export interface PageMedia {
  id: string;
  type: "image" | "youtube";
  src?: string;
  videoId?: string;
  title: string;
  alt: string;
  caption: string;
  sourceURL: string;
  evidenceLevel: EvidenceLevel;
  claimIds: string[];
  capturedAt: string;
  verifiedForVersion: string | null;
  startSeconds?: number;
}

export interface PageSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  media?: PageMedia[];
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
  publicationStatus: PublicationStatus;
  published: boolean;
  contentType: ContentType;
  nextScheduledCheck: string | null;
  dataState?: DataState;
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
  claims: FactClaim[];
  differenceRows: DifferenceRow[];
  updates: UpdateRecord[];
}
