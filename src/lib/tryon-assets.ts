import tryonAoTacNu from "@/assets/images/tryon_aotac_nu_1791536667065.jpg";
import tryonAoTacNam from "@/assets/images/tryon_aotac_nam_1791536918899.jpg";
import tryonNhatBinhNu from "@/assets/images/tryon_nhatbinh_nu_1791536691273.jpg";
import tryonTuThanNu from "@/assets/images/tryon_tuthan_nu_1791536716131.jpg";
import tryonNguThanNu from "@/assets/images/tryon_nguthan_nu_1791536743410.jpg";
import tryonNguThanNam from "@/assets/images/tryon_nguthan_nam_1791536809367.jpg";
import tryonGiaoLinhNu from "@/assets/images/tryon_giaolinh_nu_1791536876831.jpg";
import tryonAoDaiNu from "@/assets/images/tryon_aodai_nu_1791536773406.jpg";

import outfitAoTac from "@/assets/images/outfit_ao_tac_1791541421564.jpg";
import outfitNhatBinh from "@/assets/images/outfit_nhat_binh_1791541469838.jpg";
import outfitTuThan from "@/assets/images/outfit_tu_than_1791541520253.jpg";
import outfitNguThan from "@/assets/images/outfit_ngu_than_1791541574185.jpg";
import outfitNguThanChung from "@/assets/images/outfit_ngu_than_chung_1791541633381.jpg";
import outfitGiaoLinh from "@/assets/images/outfit_giao_linh_1791541695824.jpg";
import outfitAoDai from "@/assets/images/outfit_ao_dai_1791541761293.jpg";

export const OUTFIT_GALLERY_IMAGES: Record<string, string> = {
  "ao-tac": outfitAoTac,
  "nhat-binh": outfitNhatBinh,
  "tu-than": outfitTuThan,
  "ngu-than": outfitNguThan,
  "ngu-than-chung": outfitNguThanChung,
  "giao-linh": outfitGiaoLinh,
  "ao-dai": outfitAoDai,
};

export function getOutfitImage(outfitId: string): string {
  return OUTFIT_GALLERY_IMAGES[outfitId] ?? outfitAoTac;
}

export const PRESET_TRYON_IMAGES: Record<string, { nu: string; nam: string }> = {
  "ao-tac": {
    nu: tryonAoTacNu,
    nam: tryonAoTacNam,
  },
  "nhat-binh": {
    nu: tryonNhatBinhNu,
    nam: tryonAoTacNam,
  },
  "tu-than": {
    nu: tryonTuThanNu,
    nam: tryonNguThanNam,
  },
  "ngu-than": {
    nu: tryonNguThanNu,
    nam: tryonNguThanNam,
  },
  "ngu-than-chung": {
    nu: tryonGiaoLinhNu,
    nam: tryonAoTacNam,
  },
  "giao-linh": {
    nu: tryonGiaoLinhNu,
    nam: tryonAoTacNam,
  },
  "ao-dai": {
    nu: tryonAoDaiNu,
    nam: tryonNguThanNam,
  },
};

export function getPresetTryOnImage(
  outfitId: string,
  gender: string,
  isCustomUpload: boolean,
): string | null {
  if (isCustomUpload) return null;
  const match = PRESET_TRYON_IMAGES[outfitId];
  if (!match) return null;
  const isMale = gender === "Nam";
  return isMale ? match.nam : match.nu;
}
