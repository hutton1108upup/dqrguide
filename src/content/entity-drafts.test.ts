import { describe, expect, it } from "vitest";

import { canPublishEntity, entityDrafts, type DraftEntity } from "./entity-drafts";

describe("entity draft gate", () => {
  it("keeps the first batch at four spell and four weapon drafts", () => {
    expect(entityDrafts).toHaveLength(8);
    expect(entityDrafts.filter((entity) => entity.entityType === "spell")).toHaveLength(4);
    expect(entityDrafts.filter((entity) => entity.entityType === "weapon")).toHaveLength(4);
    expect(entityDrafts.every((entity) => entity.publicationStatus === "draft")).toBe(true);
  });

  it("does not create public URLs for empty evidence drafts", () => {
    expect(entityDrafts.every((entity) => !entity.slug && !entity.name && !entity.sourceURL)).toBe(true);
  });

  it("requires all evidence fields and two internal links before publication", () => {
    const complete: DraftEntity = {
      ...entityDrafts[0],
      name: "Verified example",
      slug: "verified-example",
      sourceURL: "https://example.com/source",
      use: "Room clear",
      verifiedForVersion: "[Northern Lands] title snapshot",
      evidenceNote: "A current source supports this record."
    };

    expect(canPublishEntity(complete)).toBe(true);
    expect(canPublishEntity({ ...complete, relatedPaths: ["/spells/"] })).toBe(false);
    expect(canPublishEntity({ ...complete, sourceURL: null })).toBe(false);
  });
});
