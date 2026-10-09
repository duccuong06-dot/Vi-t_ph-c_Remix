import { describe, expect, it } from "vitest";
import {
  ACCESSORIES,
  GARMENT_OPTIONS,
  getCombinations,
  getGenderRecommendation,
  getOutfit,
  isOutfitRecommendedForGender,
  withCombination,
} from "@/lib/styling";

describe("Requested outfit choices", () => {
  it.each([
    "Áo Nhật Bình",
    "Áo Ngũ Thân tay chẽn",
    "Áo Ngũ Thân tay chùng",
    "Áo Tứ Thân",
    "Áo Giao Lĩnh",
    "Áo Dài tân thời",
  ])("offers %s as a selectable garment", (label) => {
    const option = GARMENT_OPTIONS.find((item) => item.label === label);
    expect(option).toBeDefined();
    expect(getOutfit(option?.id ?? "").type).toBe(label);
  });
  it.each(["Mấn", "Guốc mộc", "Quạt giấy", "Sneaker"])("offers %s as an accessory", (accessory) => {
    expect(ACCESSORIES).toContain(accessory);
  });
  it.each(GARMENT_OPTIONS)("provides three different combinations for $label", ({ id }) => {
    const combinations = getCombinations(id);
    expect(combinations).toHaveLength(3);
    expect(new Set(combinations.map((c) => c.bottom)).size).toBe(3);
  });
  it("prioritizes sneaker combinations when selected", () => {
    expect(getCombinations("ao-dai", ["Sneaker"])[0]?.id).toBe("ao-dai-dao-pho");
  });
  it("carries selected clothing and accessories into try-on", () => {
    const combination = getCombinations("ao-dai").find((c) => c.id === "ao-dai-dao-pho");
    if (!combination) throw new Error("Missing combination");
    const styled = withCombination(getOutfit("ao-dai"), combination);
    expect(styled.remix).toContain("Sneaker");
    expect(styled.prompt).toContain("black straight-leg denim trousers");
    expect(styled.prompt).toContain("white minimalist sneakers");
  });
  it("suggests appropriate outfits for male and female users", () => {
    expect(isOutfitRecommendedForGender("ngu-than", "Nam")).toBe(true);
    expect(isOutfitRecommendedForGender("ao-tac", "Nam")).toBe(true);
    expect(isOutfitRecommendedForGender("nhat-binh", "Nam")).toBe(false);
    expect(isOutfitRecommendedForGender("tu-than", "Nam")).toBe(false);

    expect(isOutfitRecommendedForGender("nhat-binh", "Nữ")).toBe(true);
    expect(isOutfitRecommendedForGender("tu-than", "Nữ")).toBe(true);
    expect(isOutfitRecommendedForGender("ao-tac", "Nữ")).toBe(true);

    const rec = getGenderRecommendation("nhat-binh");
    expect(rec.fit).toBe("nu");
    expect(rec.reason).toContain("triều Nguyễn");
  });
});
