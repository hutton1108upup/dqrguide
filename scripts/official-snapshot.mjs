import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const GAME_ENDPOINT = "https://games.roblox.com/v1/games?universeIds=9931749389";
export const PASSES_ENDPOINT = "https://apis.roblox.com/game-passes/v1/universes/9931749389/game-passes?pageSize=100";

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value;
}

function requireNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return value;
}

export function buildOfficialSnapshot({ gameResponse, passesResponse, fetchedAt }) {
  if (!Array.isArray(gameResponse?.data) || gameResponse.data.length !== 1) {
    throw new Error("Official Games API must return one game record.");
  }
  if (!Array.isArray(passesResponse?.gamePasses)) {
    throw new Error("Official Game Pass API must return a gamePasses array.");
  }

  const game = gameResponse.data[0];
  const gamePasses = passesResponse.gamePasses
    .map((pass) => ({
      name: requireString(pass.name, "Game Pass name"),
      isForSale: Boolean(pass.isForSale),
      price: typeof pass.price === "number" && Number.isFinite(pass.price) ? pass.price : null
    }))
    .sort((left, right) => left.name.localeCompare(right.name, "en"));

  return {
    fetchedAt: requireString(fetchedAt, "Snapshot fetchedAt"),
    game: {
      universeId: requireNumber(game.id, "Universe ID"),
      rootPlaceId: requireNumber(game.rootPlaceId, "Root place ID"),
      name: requireString(game.name, "Experience name"),
      creatorId: requireNumber(game.creator?.id, "Creator ID"),
      creatorName: requireString(game.creator?.name, "Creator name"),
      updatedAt: requireString(game.updated, "Experience updated timestamp")
    },
    gamePasses
  };
}

export function serializeOfficialSnapshot(snapshot) {
  return `${JSON.stringify(snapshot, null, 2)}\n`;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { accept: "application/json", "user-agent": "DQR-Guide-Snapshot/1.0" },
    signal: AbortSignal.timeout(20_000)
  });
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}.`);
  }
  return response.json();
}

export async function refreshOfficialSnapshot({ outputPath } = {}) {
  const [gameResponse, passesResponse] = await Promise.all([
    fetchJson(GAME_ENDPOINT),
    fetchJson(PASSES_ENDPOINT)
  ]);
  const snapshot = buildOfficialSnapshot({
    gameResponse,
    passesResponse,
    fetchedAt: new Date().toISOString()
  });
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const target = outputPath ?? path.join(root, "src", "content", "official-snapshot.json");
  fs.writeFileSync(target, serializeOfficialSnapshot(snapshot), "utf8");
  return { snapshot, target };
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  refreshOfficialSnapshot()
    .then(({ snapshot, target }) => {
      process.stdout.write(`Official snapshot updated: ${snapshot.game.updatedAt} -> ${target}\n`);
    })
    .catch((error) => {
      process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
      process.exitCode = 1;
    });
}
