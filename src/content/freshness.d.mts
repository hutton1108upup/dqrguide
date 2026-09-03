import type { ContentType, DataState } from "./types";

export type FreshnessState = "current" | "due_soon" | "overdue" | "version_gap" | "not_collected" | "fetch_failed";

export interface FreshnessPage {
  path: string;
  contentType: ContentType;
  lastVerified: string | null;
  nextScheduledCheck: string | null;
  verifiedForVersion: string | null;
  dataState?: DataState;
}

export interface FreshnessResult {
  state: FreshnessState;
  daysUntilCheck: number | null;
  reason: string;
}

export declare function getFreshnessStatus(page: FreshnessPage, asOf: string): FreshnessResult;
export declare function getSingaporeDate(date?: Date): string;
