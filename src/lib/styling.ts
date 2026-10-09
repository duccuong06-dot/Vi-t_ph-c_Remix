import { OUTFITS, type Outfit } from "./outfits";

export const ACCESSORIES = ["Mấn", "Guốc mộc", "Quạt giấy", "Sneaker"];
export const GARMENT_OPTIONS = OUTFITS.map((o) => ({ id: o.id, label: o.type }));

export type Combination = {
  id: string;
  name: string;
  bottom: string;
  accessories: string[];
  harmony: string;
  note: string;
  prompt: string;
};

export function getOutfit(id: string): Outfit {
  const found = OUTFITS.find((o) => o.id === id) ?? OUTFITS[0];
  if (!found) throw new Error("Chưa có trang phục để chọn.");
  return found;
}

export function getCombinations(
  outfitId: string,
  preferredAccessories: string[] = [],
): Combination[] {
  const outfit = getOutfit(outfitId);
  const skirt = outfitId === "tu-than";
  const combinations: Combination[] = [
    {
      id: `${outfitId}-truyen-thong`,
      name: "Duyên truyền thống",
      bottom: skirt ? "Váy đen dài · yếm san hô · thắt lưng lụa" : "Quần lụa trắng ngà ống rộng",
      accessories: ["Mấn", "Guốc mộc", "Quạt giấy"],
      harmony: "Sáng – trầm cân bằng",
      note: skirt
        ? "Yếm san hô làm điểm nhấn; mấn và quạt giữ tổng thể nhẹ nhàng."
        : "Quần sáng làm nổi màu áo; mấn cùng tông và quạt giấy hoàn thiện vẻ trang nhã.",
      prompt: `${skirt ? "black flowing skirt with coral yem bodice and silk sash" : "ivory wide-leg silk trousers"}, matching Vietnamese man headwrap, wooden clogs, holding a paper folding fan`,
    },
    {
      id: `${outfitId}-dao-pho`,
      name: "Remix dạo phố",
      bottom: skirt ? "Váy midi đen · yếm trơn" : "Quần denim đen ống suông",
      accessories: ["Sneaker", "Túi đeo chéo nhỏ", "Khuyên tai bạc"],
      harmony: "Trung tính thanh lịch",
      note: "Giữ áo làm điểm nhấn, giảm họa tiết ở phần dưới; sneaker trắng tạo nét trẻ trung. Đây là bản phối hiện đại.",
      prompt: `${skirt ? "black midi skirt with plain yem bodice" : "black straight-leg denim trousers"}, white minimalist sneakers, small crossbody bag, understated silver earrings, contemporary street-style remix`,
    },
    {
      id: `${outfitId}-le-hoi`,
      name: "Nét duyên lễ hội",
      bottom: skirt ? "Váy lụa đen dài · yếm hồng nhạt" : "Quần lụa đồng tông nhạt hơn áo",
      accessories: ["Mấn", "Quạt giấy", "Giày bệt", "Túi lụa"],
      harmony: "Đồng điệu mềm mại",
      note: "Phối sắc độ gần nhau, thêm túi lụa và giày bệt để thuận tiện đi lại; quạt giấy là điểm nhấn khi chụp ảnh.",
      prompt: `${skirt ? "long black silk skirt and pale pink yem bodice" : "flowing silk trousers in a lighter shade of the robe color"}, coordinated Vietnamese man headwrap, silk clutch, flat shoes, holding a paper folding fan`,
    },
  ];
  return combinations.sort((a, b) => {
    const matches = (c: Combination) =>
      c.accessories.filter((item) => preferredAccessories.includes(item)).length;
    return matches(b) - matches(a);
  });
}

export function withCombination(outfit: Outfit, combination: Combination): Outfit {
  return {
    ...outfit,
    remix: [combination.bottom, ...combination.accessories],
    prompt: `${outfit.prompt}. Style the garment with ${combination.prompt}. The specified styling bottoms replace any earlier trouser or skirt description`,
  };
}

export type GenderFit = "both" | "nu" | "nam";

export type GenderRecommendation = {
  fit: GenderFit;
  label: string;
  badge: string;
  reason: string;
};

export const GENDER_RECOMMENDATIONS: Record<string, GenderRecommendation> = {
  "ao-tac": {
    fit: "both",
    label: "Phù hợp cả Nam & Nữ",
    badge: "Nam & Nữ đều đẹp ✨",
    reason:
      "Lễ phục triều Nguyễn trang trọng, nam mặc đĩnh đạc uy nghi, nữ mặc đoan trang quý phái.",
  },
  "ngu-than": {
    fit: "both",
    label: "Khuyên dùng cho Nam & Nữ",
    badge: "Rất chuộng cho Nam 👑",
    reason:
      "Phom áo năm vạt tay chẽn gọn gàng, nam giới mặc đạo mạo tự tin, nữ giới diện thanh lịch.",
  },
  "ngu-than-chung": {
    fit: "both",
    label: "Phù hợp cả Nam & Nữ",
    badge: "Nam & Nữ thư sinh 🌿",
    reason: "Tay áo buông rộng rủ mềm, tạo phong thái nho nhã khoan thai cho cả nam và nữ.",
  },
  "giao-linh": {
    fit: "both",
    label: "Phù hợp cả Nam & Nữ",
    badge: "Nam & Nữ thanh tao 🍃",
    reason:
      "Cổ giao chéo phóng khoáng, thích hợp phong thái thư sinh nam giới hoặc tao nhã nữ giới.",
  },
  "nhat-binh": {
    fit: "nu",
    label: "Đặc biệt phù hợp Nữ",
    badge: "Dành riêng cho Nữ 👑",
    reason:
      "Cổ phục quý tộc cung đình triều Nguyễn dành riêng cho Hậu phi, Công chúa và quý phu nhân.",
  },
  "tu-than": {
    fit: "nu",
    label: "Đặc biệt phù hợp Nữ",
    badge: "Duyên dáng phái Nữ 🌸",
    reason:
      "Trang phục truyền thống phụ nữ Bắc Bộ, kết hợp duyên dáng cùng yếm thắm và dải lụa thắt eo.",
  },
  "ao-dai": {
    fit: "nu",
    label: "Tôn vinh phái Nữ",
    badge: "Thướt tha phái Nữ ✨",
    reason:
      "Dáng áo dài tân thời ôm phom mềm mại, tôn nét dịu dàng, trang nhã của phái nữ khi dạo phố.",
  },
};

export function getGenderRecommendation(outfitId: string): GenderRecommendation {
  return (
    GENDER_RECOMMENDATIONS[outfitId] ?? {
      fit: "both",
      label: "Phù hợp Nam & Nữ",
      badge: "Nam & Nữ",
      reason: "Trang phục truyền thống Việt Nam.",
    }
  );
}

export function isOutfitRecommendedForGender(outfitId: string, gender: string): boolean {
  const info = getGenderRecommendation(outfitId);
  if (gender === "Nam") {
    return info.fit === "both" || info.fit === "nam";
  }
  return info.fit === "both" || info.fit === "nu";
}
