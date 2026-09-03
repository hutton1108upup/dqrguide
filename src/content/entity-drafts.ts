import { getPageByPath } from "./routes";

export interface DraftEntity {
  id: string;
  entityType: "spell" | "weapon";
  slug: string | null;
  name: string;
  sourceURL: string | null;
  use: string;
  verifiedForVersion: string | null;
  evidenceNote: string;
  relatedPaths: string[];
  publicationStatus: "draft";
}

const draft = (id: string, entityType: DraftEntity["entityType"], relatedPaths: string[]): DraftEntity => ({
  id,
  entityType,
  slug: null,
  name: "",
  sourceURL: null,
  use: "",
  verifiedForVersion: null,
  evidenceNote: "Evidence capture required before naming or publishing this entity.",
  relatedPaths,
  publicationStatus: "draft"
});

export const entityDrafts: DraftEntity[] = [
  draft("spell-draft-01", "spell", ["/spells/", "/dungeons/"]),
  draft("spell-draft-02", "spell", ["/spells/", "/spell-tier-list/"]),
  draft("spell-draft-03", "spell", ["/spells/", "/drops/"]),
  draft("spell-draft-04", "spell", ["/spells/", "/dungeons/northern-lands/"]),
  draft("weapon-draft-01", "weapon", ["/tier-list/", "/dungeons/"]),
  draft("weapon-draft-02", "weapon", ["/tier-list/", "/drops/"]),
  draft("weapon-draft-03", "weapon", ["/tier-list/", "/dungeons/northern-lands/"]),
  draft("weapon-draft-04", "weapon", ["/tier-list/", "/trading/"])
];

function hasValidSourceURL(sourceURL: string | null): boolean {
  if (!sourceURL) return false;
  try {
    const url = new URL(sourceURL);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function canPublishEntity(entity: DraftEntity): boolean {
  const hasRequiredFields = Boolean(
    entity.name.trim() &&
    entity.slug?.trim() &&
    entity.use.trim() &&
    entity.verifiedForVersion?.trim() &&
    entity.evidenceNote.trim() &&
    hasValidSourceURL(entity.sourceURL)
  );
  const validRelatedPaths = new Set(entity.relatedPaths.filter((path) => getPageByPath(path)));
  return entity.publicationStatus === "draft" && hasRequiredFields && validRelatedPaths.size >= 2;
}
