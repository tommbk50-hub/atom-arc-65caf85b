import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * Re-imports the mock data module with a clean module registry so the
 * top-level store is re-initialized from whatever currently lives in
 * `localStorage`. This simulates a page reload.
 */
async function reloadModule() {
  vi.resetModules();
  return import("@/utils/mockData");
}

describe("mockData localStorage persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it("seeds localStorage from the default data on first load", async () => {
    const mod = await reloadModule();
    const projects = await mod.getResearchProjects();
    expect(projects.length).toBeGreaterThan(0);

    const raw = localStorage.getItem("atom-arc:researchProjects");
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)).toHaveLength(projects.length);
  });

  it("persists created records across reloads", async () => {
    let mod = await reloadModule();
    const before = await mod.getResearchProjects();

    await mod.createResearchProject({
      title: "Persisted Project",
      slug: "persisted-project",
      status: "Active",
      duration: "2025-2026",
      team: ["Tester"],
      funding: "Internal",
      description: "desc",
      longDescription: "long desc",
      pubs: "0",
      image: "img.png",
    });

    // Reload: the new module instance must read the persisted data.
    mod = await reloadModule();
    const after = await mod.getResearchProjects();
    expect(after).toHaveLength(before.length + 1);
    expect(after.some((p) => p.slug === "persisted-project")).toBe(true);
  });

  it("persists updates across reloads", async () => {
    let mod = await reloadModule();
    const [first] = await mod.getPublications();

    await mod.updatePublication(first.slug, { citations: 9999 });

    mod = await reloadModule();
    const updated = await mod.getPublicationBySlug(first.slug);
    expect(updated?.citations).toBe(9999);
  });

  it("persists deletions across reloads", async () => {
    let mod = await reloadModule();
    const [first] = await mod.getNewsItems();

    const removed = await mod.deleteNewsItem(first.slug);
    expect(removed).toBe(true);

    mod = await reloadModule();
    const afterDelete = await mod.getNewsItemBySlug(first.slug);
    expect(afterDelete).toBeUndefined();
  });
});
