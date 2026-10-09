import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Camera,
  Compass,
  Palette,
  ShieldAlert,
  ArrowRight,
  User,
  Check,
  ChevronRight,
  Info,
} from "lucide-react";

import heroImg from "@/assets/images/hero_viet_phuc_group_1791542766245.jpg";
import eventLeHoi from "@/assets/images/event_le_hoi_lanterns_1791542777519.jpg";
import eventCuoiHoi from "@/assets/images/event_cuoi_hoi_wedding_1791542792146.jpg";
import eventDaoPho from "@/assets/images/event_dao_pho_hoian_1791542802746.jpg";
import eventKyYeu from "@/assets/images/event_ky_yeu_yearbook_1791542813293.jpg";
import outfitAoDai from "@/assets/images/outfit_ao_dai_1791541761293.jpg";
import outfitTuThan from "@/assets/images/outfit_tu_than_1791541520253.jpg";
import outfitNguThan from "@/assets/images/outfit_ngu_than_1791541574185.jpg";
import tryonTuThan from "@/assets/images/tryon_tuthan_nu_1791536716131.jpg";

interface HeritageHomeProps {
  onStartExplore: () => void;
  onSelectGarment: (garmentId: string) => void;
  onSelectOccasion?: (occasion: string) => void;
}

export function HeritageHome({
  onStartExplore,
  onSelectGarment,
  onSelectOccasion,
}: HeritageHomeProps) {
  const [activeColor, setActiveColor] = useState(0);
  const [activeStyleTag, setActiveStyleTag] = useState("Truyền thống");
  const [cultureModalOpen, setCultureModalOpen] = useState(false);

  const colors = [
    { name: "Đỏ chu sa", hex: "#a8261b" },
    { name: "Hồng đào", hex: "#d97d91" },
    { name: "Trắng ngà", hex: "#f3ede2" },
    { name: "Xanh ngọc", hex: "#4b8b7f" },
    { name: "Lam khói", hex: "#6389a9" },
    { name: "Xám trầm", hex: "#383b40" },
  ];

  const accessories = [
    { label: "Nón quai thao", icon: "👒" },
    { label: "Túi lụa tơ", icon: "👜" },
    { label: "Quạt xếp xích", icon: "🪭" },
    { label: "Kiềng bạc", icon: "💍" },
  ];

  return (
    <div className="relative text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-8 lg:pb-16 border-b border-amber-900/40">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c140e] via-[#140e0a] to-[#120c08] -z-10" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              {/* Kicker Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="text-amber-400 text-xs tracking-[0.2em] font-medium uppercase">
                  PHỐI TRANG PHỤC TRUYỀN THỐNG THEO PHONG CÁCH GEN Z
                </span>
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffe4a0] via-[#f7cb68] to-[#df9e38] drop-shadow-sm">
                  Việt Phục Remix
                </h1>
                <p className="font-serif italic text-2xl sm:text-3xl text-amber-200/90 font-light tracking-wide flex items-center gap-2">
                  <span>Di sản trong phong cách của bạn</span>
                  <span className="text-xl not-italic">🍃</span>
                </p>
              </div>

              {/* Subtitle / Description */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-lg font-light">
                Khám phá, phối đồ và làm mới trang phục truyền thống Việt Nam theo sự kiện, địa
                phương hoặc phong cách cá nhân. Giữ gìn giá trị văn hóa – Thể hiện chất riêng!
              </p>

              {/* CTA Action Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onStartExplore}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f5cf74] via-[#e6b94d] to-[#d69f32] px-8 py-3.5 text-sm sm:text-base font-semibold text-[#23170c] shadow-[0_4px_20px_rgba(230,185,77,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_25px_rgba(230,185,77,0.5)] active:scale-95"
                >
                  <span>Bắt đầu khám phá</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Hero Image Composition */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)] group">
                <img
                  src={heroImg}
                  alt="Nhóm bạn trẻ mặc Việt phục truyền thống cách tân"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                />

                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c08]/80 via-transparent to-black/20 pointer-events-none" />

                {/* Polaroid Tag Overlay on right side */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 rotate-3 rounded-xl bg-black/60 backdrop-blur-md border border-amber-400/40 p-3 sm:p-4 text-center shadow-xl">
                  <div className="font-serif italic text-amber-300 text-sm sm:text-base font-medium">
                    Truyền thống
                  </div>
                  <div className="text-xs text-amber-200/80 font-mono my-0.5">+</div>
                  <div className="font-serif italic text-amber-300 text-sm sm:text-base font-medium">
                    Hiện đại
                  </div>
                  <div className="text-xs text-amber-200/80 font-mono my-0.5">=</div>
                  <div className="font-serif font-bold text-amber-400 text-base sm:text-lg">
                    Bạn 🪷
                  </div>
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between text-xs text-amber-200/80 backdrop-blur-md bg-black/50 px-4 py-2 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Áo Tấc • Áo Ngũ Thân • Áo Tứ Thân • Khăn đóng truyền thống</span>
                  </span>
                  <span className="hidden sm:inline-block font-mono text-[11px] text-amber-400/70">
                    HERITAGE REMIX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5 FEATURE MODULES (As in User Mockup) ================= */}
      <section className="py-10 lg:py-14 bg-[#140e0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {/* CARD 1: CHỌN TRANG PHỤC */}
            <div className="rounded-2xl border border-amber-900/40 bg-[#1d150f]/80 p-4.5 flex flex-col justify-between transition-all hover:border-amber-600/50 hover:shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    CHỌN TRANG PHỤC
                  </h3>
                </div>
                <p className="text-[11px] text-stone-400 mb-3.5 line-clamp-1">
                  Áo dài • Áo tứ thân • Áo ngũ thân • ...
                </p>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  <button
                    type="button"
                    onClick={() => onSelectGarment("ao-dai")}
                    className="group relative rounded-lg overflow-hidden border border-white/10 aspect-[3/4] hover:border-amber-400 transition-colors"
                  >
                    <img
                      src={outfitAoDai}
                      alt="Áo dài"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-center text-[9px] text-white">
                      Áo dài
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectGarment("tu-than")}
                    className="group relative rounded-lg overflow-hidden border border-white/10 aspect-[3/4] hover:border-amber-400 transition-colors"
                  >
                    <img
                      src={outfitTuThan}
                      alt="Áo tứ thân"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-center text-[9px] text-white">
                      Tứ thân
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectGarment("ngu-than")}
                    className="group relative rounded-lg overflow-hidden border border-white/10 aspect-[3/4] hover:border-amber-400 transition-colors"
                  >
                    <img
                      src={outfitNguThan}
                      alt="Áo ngũ thân"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-center text-[9px] text-white">
                      Ngũ thân
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={onStartExplore}
                    className="flex flex-col items-center justify-center rounded-lg border border-dashed border-amber-600/40 bg-amber-950/20 text-amber-400 aspect-[3/4] hover:bg-amber-900/30 transition-colors text-[10px]"
                  >
                    <span className="text-base font-bold">+</span>
                    <span className="text-[9px]">Khác</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 text-[11px] text-amber-400/80 flex items-center justify-between">
                <span>7+ loại cổ phục</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* CARD 2: CHỌN BỐI CẢNH / SỰ KIỆN */}
            <div className="rounded-2xl border border-amber-900/40 bg-[#1d150f]/80 p-4.5 flex flex-col justify-between transition-all hover:border-amber-600/50 hover:shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    BỐI CẢNH / SỰ KIỆN
                  </h3>
                </div>
                <p className="text-[11px] text-stone-400 mb-3.5 line-clamp-1">
                  Lễ hội • Cưới hỏi • Dạo phố • Kỷ yếu
                </p>

                {/* 4 Event thumbnails */}
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  <button
                    type="button"
                    onClick={() => onSelectOccasion?.("Lễ hội")}
                    className="group relative rounded-lg overflow-hidden border border-white/10 aspect-[3/4] hover:border-amber-400 transition-colors"
                  >
                    <img
                      src={eventLeHoi}
                      alt="Lễ hội"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-center text-[9px] text-white">
                      Lễ hội
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectOccasion?.("Cưới hỏi")}
                    className="group relative rounded-lg overflow-hidden border border-white/10 aspect-[3/4] hover:border-amber-400 transition-colors"
                  >
                    <img
                      src={eventCuoiHoi}
                      alt="Cưới hỏi"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-center text-[9px] text-white">
                      Cưới hỏi
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectOccasion?.("Dạo phố")}
                    className="group relative rounded-lg overflow-hidden border border-white/10 aspect-[3/4] hover:border-amber-400 transition-colors"
                  >
                    <img
                      src={eventDaoPho}
                      alt="Dạo phố"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-center text-[9px] text-white">
                      Dạo phố
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectOccasion?.("Kỷ yếu")}
                    className="group relative rounded-lg overflow-hidden border border-white/10 aspect-[3/4] hover:border-amber-400 transition-colors"
                  >
                    <img
                      src={eventKyYeu}
                      alt="Kỷ yếu"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-center text-[9px] text-white">
                      Kỷ yếu
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 text-[11px] text-amber-400/80 flex items-center justify-between">
                <span>Không gian lịch sử</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* CARD 3: TÙY CHỈNH PHONG CÁCH */}
            <div className="rounded-2xl border border-amber-900/40 bg-[#1d150f]/80 p-4.5 flex flex-col justify-between transition-all hover:border-amber-600/50 hover:shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                    <Palette className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    TÙY CHỈNH PHONG CÁCH
                  </h3>
                </div>
                <p className="text-[11px] text-stone-400 mb-3.5">Màu sắc • Phụ kiện • Phong cách</p>

                {/* Color swatches */}
                <div className="flex items-center justify-between gap-1 mb-3">
                  {colors.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setActiveColor(idx)}
                      title={c.name}
                      style={{ backgroundColor: c.hex }}
                      className={`w-5 h-5 rounded-full transition-transform border ${
                        activeColor === idx
                          ? "ring-2 ring-amber-400 scale-110 border-white"
                          : "border-black/40 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>

                {/* Accessories preview */}
                <div className="grid grid-cols-4 gap-1 p-1.5 rounded-lg bg-black/40 border border-white/5 mb-3 text-center text-sm">
                  {accessories.map((acc) => (
                    <div
                      key={acc.label}
                      title={acc.label}
                      className="py-1 rounded bg-stone-900/50 border border-white/5 flex items-center justify-center"
                    >
                      {acc.icon}
                    </div>
                  ))}
                </div>

                {/* Style pills */}
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  {["Truyền thống", "Hiện đại", "Tối giản", "Vintage"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveStyleTag(tag)}
                      className={`rounded px-1.5 py-1 text-center font-medium transition-colors ${
                        activeStyleTag === tag
                          ? "bg-amber-500/25 text-amber-300 border border-amber-500/50"
                          : "bg-stone-900/40 text-stone-400 border border-white/5 hover:text-stone-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 text-[11px] text-amber-400/80 flex items-center justify-between">
                <span>Phối đồ tự do</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* CARD 4: XEM KẾT QUẢ */}
            <div className="rounded-2xl border border-amber-900/40 bg-[#1d150f]/80 p-4.5 flex flex-col justify-between transition-all hover:border-amber-600/50 hover:shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    XEM KẾT QUẢ
                  </h3>
                </div>
                <p className="text-[11px] text-stone-400 mb-2.5">Hình ảnh • Thẻ gợi ý • Mockup</p>

                {/* Result preview image */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] mb-2 group">
                  <img
                    src={tryonTuThan}
                    alt="Kết quả thử Áo Tứ Thân"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-1.5 left-2 right-2 text-left">
                    <div className="text-[10px] font-semibold text-amber-300">
                      Áo tứ thân — Cưới hỏi
                    </div>
                    <div className="text-[9px] text-stone-300 line-clamp-1">
                      Biểu tượng nét đẹp dịu dàng, duyên dáng
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onStartExplore}
                className="w-full py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-medium hover:bg-amber-500/25 transition-colors flex items-center justify-center gap-1"
              >
                <span>Thử trang phục ngay</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* CARD 5: TÌM HIỂU VĂN HÓA */}
            <div className="rounded-2xl border border-amber-900/40 bg-[#1d150f]/80 p-4.5 flex flex-col justify-between transition-all hover:border-amber-600/50 hover:shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    TÌM HIỂU VĂN HÓA
                  </h3>
                </div>
                <p className="text-[11px] text-stone-400 mb-2.5">Nguồn gốc • Ý nghĩa • Đặc điểm</p>

                {/* Parchment snippet */}
                <div className="rounded-xl bg-[#281f16] border border-amber-800/40 p-3 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-400 text-sm">🪭</span>
                    <span className="font-serif font-bold text-xs text-amber-200">Áo tứ thân</span>
                  </div>
                  <p className="text-[10px] text-stone-300 leading-relaxed line-clamp-4">
                    Là trang phục truyền thống của phụ nữ Miền Bắc, phổ biến ở đồng bằng Bắc Bộ, gắn
                    liền với đời sống văn hóa – tín ngưỡng và lễ hội dân gian.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCultureModalOpen(true)}
                className="mt-3 w-full py-1.5 rounded-lg border border-amber-700/40 bg-stone-900/60 text-amber-300 text-[11px] font-medium hover:bg-amber-950/40 transition-colors flex items-center justify-center gap-1"
              >
                <span>Tìm hiểu thêm →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6 FEATURE HIGHLIGHT BADGES (Bottom Bar in Mockup) ================= */}
      <section className="py-6 bg-[#110c08] border-y border-amber-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-stone-300">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <User className="w-3.5 h-3.5" />
              </span>
              <span>Tải ảnh hoặc chọn nhân vật để thử đồ</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-stone-300">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Compass className="w-3.5 h-3.5" />
              </span>
              <span>Gợi ý trang phục theo thời tiết & sự kiện</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-stone-300">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Palette className="w-3.5 h-3.5" />
              </span>
              <span>Kiểm tra sự hài hòa của màu sắc</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-stone-300">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span>So sánh các phương án phối đồ</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-stone-300">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Camera className="w-3.5 h-3.5" />
              </span>
              <span>Tạo & chia sẻ “Lookbook Việt phục”</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-stone-300">
              <span className="p-1.5 rounded-lg bg-red-500/10 text-amber-400 shrink-0">
                <ShieldAlert className="w-3.5 h-3.5" />
              </span>
              <span>Cảnh báo bảo tồn văn hóa chuẩn mực</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GOLDEN TICKER FOOTER ================= */}
      <footer className="py-6 bg-[#0d0906] text-center border-t border-amber-950/40">
        <div className="flex items-center justify-center gap-4 text-xs font-serif tracking-[0.25em] text-amber-400/80 uppercase">
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-600/60" />
          <span>TÔN VINH DI SẢN • KẾT NỐI THẾ HỆ • LAN TỎA VĂN HÓA VIỆT</span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-600/60" />
        </div>
      </footer>

      {/* ================= CULTURE DETAIL MODAL ================= */}
      {cultureModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setCultureModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-xl w-full overflow-hidden rounded-2xl border border-amber-600/40 bg-[#1f1610] p-6 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/50">
              <h3 className="font-serif text-xl font-bold text-amber-300">
                Ý Nghĩa Văn Hóa Cổ Phục Việt
              </h3>
              <button
                type="button"
                onClick={() => setCultureModalOpen(false)}
                className="rounded-full bg-white/5 p-1.5 text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-stone-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>
                <strong>Áo Tứ Thân:</strong> Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ mình
                và cha mẹ người). Vạt yếm bên trong che chở, thắt lưng bao lụa buộc vạt thể hiện
                tính nết đoan trang, chịu thương chịu khó của phụ nữ Kinh Bắc.
              </p>
              <p>
                <strong>Áo Ngũ Thân:</strong> Gồm năm vạt áo, bốn vạt ngoài tượng trưng cho tứ thân
                phụ mẫu và vạt thứ năm bên trong tượng trưng cho chính mình. Năm cúc áo ứng với ngũ
                thường: Nhân, Lễ, Nghĩa, Trí, Tín.
              </p>
              <p>
                <strong>Áo Tấc & Nhật Bình:</strong> Lễ phục cung đình triều Nguyễn biểu trưng cho
                sự trang nghiêm, quyền quý, hoa văn thêu mây ngũ sắc và cổ áo chữ nhật đặc trưng xứ
                Huế.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setCultureModalOpen(false);
                  onStartExplore();
                }}
                className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-2 text-sm font-semibold text-black shadow hover:brightness-110"
              >
                Thử phối đồ ngay →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
