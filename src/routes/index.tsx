import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { User, Sparkles } from "lucide-react";
import { Garment3D } from "@/components/Garment3D";
import { Button } from "@/components/ui/button";
import { OutfitCombinations } from "@/components/OutfitCombinations";
import { HeritageHome } from "@/components/HeritageHome";
import {
  ACCESSORIES,
  GARMENT_OPTIONS,
  getCombinations,
  getGenderRecommendation,
  getOutfit,
  isOutfitRecommendedForGender,
  withCombination,
  type Combination,
} from "@/lib/styling";
import { LANDMARKS, OUTFITS, PROVERBS, type Outfit } from "@/lib/outfits";
import { streamImage } from "@/lib/stream-image";
import { renderVirtualTryOn } from "@/lib/try-on-renderer";
import { getPresetTryOnImage, getOutfitImage } from "@/lib/tryon-assets";
import modelNu from "@/assets/model-nu.jpg";
import modelNam from "@/assets/model-nam.jpg";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Việt Phục Remix Heritage — Thử cổ phục 3D bằng AI" },
      {
        name: "description",
        content: "Chọn gu, xem cổ phục 3D, thử đồ bằng AI và tạo lookbook danh thắng Việt Nam.",
      },
      { property: "og:title", content: "Việt Phục Remix Heritage" },
      {
        property: "og:description",
        content: "Thử Áo Tấc, Tứ Thân, Ngũ Thân lên chính ảnh của bạn bằng AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

const STEPS = ["Chọn gu", "Chọn bộ", "Thử đồ", "Kết quả", "Lookbook"];
const NAV = ["Trang chủ", "Chọn gu", "Thư viện", "Thử đồ", "Lookbook"];

type Prefs = {
  gender: string;
  occasion: string;
  weather: string;
  style: string;
  color: string;
  garment: string;
  accessories: string[];
};

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      aria-pressed={active}
      onClick={onClick}
      className={`h-auto whitespace-normal rounded-full border px-4 py-2 text-sm transition-all ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-secondary/40 text-foreground hover:border-accent/70"
      }`}
    >
      {children}
    </Button>
  );
}

function GoldButton({
  children,
  onClick,
  disabled,
  ghost,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ghost?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={`h-auto whitespace-normal rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all disabled:opacity-40 ${
        ghost
          ? "border border-accent/60 text-accent hover:bg-accent/10"
          : "bg-vermilion text-primary-foreground hover:brightness-110"
      }`}
    >
      {children}
    </Button>
  );
}

function App() {
  const [currentNav, setCurrentNav] = useState<string>("Trang chủ");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState<Prefs>({
    gender: "Nữ",
    occasion: "Tết",
    weather: "Se lạnh",
    style: "Gen Z",
    color: "Đỏ chu sa",
    garment: "ao-dai",
    accessories: ["Mấn", "Guốc mộc", "Quạt giấy"],
  });
  const [outfit, setOutfit] = useState<Outfit>(getOutfit("ao-dai"));
  const [combination, setCombination] = useState<Combination | null>(null);
  const styledOutfit = combination ? withCombination(outfit, combination) : outfit;
  const selectOutfit = (o: Outfit) => {
    setOutfit(o);
    setCombination(getCombinations(o.id, prefs.accessories)[0] ?? null);
  };
  const [photo, setPhoto] = useState<{ url: string; file?: File } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runTryOn = async () => {
    if (!photo) return;
    setStep(3);
    setLoading(true);
    setError(null);
    setResult(null);
    setIsFinal(false);
    try {
      const isCustomUpload = Boolean(photo.file);
      const presetDressed = getPresetTryOnImage(styledOutfit.id, prefs.gender, isCustomUpload);

      if (presetDressed) {
        // High-fidelity studio photorealistic image of the model wearing this exact outfit
        setResult(presetDressed);
        setIsFinal(true);
      } else {
        // Custom photo uploaded by user: digital fashion fitting canvas
        const dressed = await renderVirtualTryOn(photo.url, styledOutfit, prefs.accessories);
        setResult(dressed);
        setIsFinal(true);
      }

      // Try upstream AI try-on if a generation model is available
      try {
        const file =
          photo.file ??
          new File([await (await fetch(photo.url)).blob()], "model.jpg", { type: "image/jpeg" });
        const form = new FormData();
        form.append(
          "prompt",
          `Virtual try-on. Dress the person in this photo in ${styledOutfit.prompt}. Keep the exact same face, identity, hairstyle, skin tone, body proportions and pose. The garment must fit their body naturally with realistic fabric folds and lighting. Replace the background with a fitting real Vietnamese setting for a ${prefs.occasion} occasion, ${prefs.weather} weather. Photorealistic full-body fashion photograph.`,
        );
        form.append("image", file);
        await streamImage("/api/try-on", form, (src, final) => {
          if (src && src.startsWith("data:image")) {
            setResult(src);
            setIsFinal(final);
          }
        });
      } catch {
        // Fallback already rendered and active
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể may đồ lúc này, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#120c08] text-stone-100">
      <header className="sticky top-0 z-40 border-b border-amber-900/40 bg-[#160f0a]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setCurrentNav("Trang chủ")}
            className="flex items-center gap-3 text-left group"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full border border-amber-500/70 font-serif font-bold text-amber-400 bg-amber-500/10 shadow-sm group-hover:border-amber-400 transition-colors">
              VP
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg font-bold text-[#f7cb68] tracking-wide">
                Việt Phục Remix
              </div>
              <div className="text-[10px] tracking-[0.35em] text-amber-400/90 font-mono">
                HERITAGE
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {NAV.map((n) => {
              const isActive = currentNav === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setCurrentNav(n);
                    if (n === "Chọn gu") setStep(0);
                    else if (n === "Thư viện") setStep(1);
                    else if (n === "Thử đồ") setStep(2);
                    else if (n === "Lookbook") setStep(4);
                  }}
                  className={`pb-1 transition-all ${
                    isActive
                      ? "border-b-2 border-amber-400 text-amber-300 font-semibold"
                      : "text-stone-300 hover:text-amber-200"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-amber-600/40 bg-stone-900/60 px-4 py-1.5 text-xs font-medium text-stone-200 shadow-sm hover:border-amber-400 hover:text-white transition-colors"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Đăng nhập</span>
            </button>
          </div>
        </div>
      </header>

      {currentNav === "Trang chủ" ? (
        <HeritageHome
          onStartExplore={() => {
            setCurrentNav("Chọn gu");
            setStep(0);
          }}
          onSelectGarment={(garmentId) => {
            setPrefs((p) => ({ ...p, garment: garmentId }));
            selectOutfit(getOutfit(garmentId));
            setCurrentNav("Chọn bộ");
            setStep(1);
          }}
          onSelectOccasion={(occ) => {
            setPrefs((p) => ({ ...p, occasion: occ }));
            setCurrentNav("Chọn gu");
            setStep(0);
          }}
        />
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentNav("Trang chủ")}
              className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>← Trở về Trang chủ</span>
            </button>

            <div className="rounded-full border border-amber-800/40 bg-amber-950/20 px-3.5 py-1 text-xs text-stone-300">
              Đang thử cho:{" "}
              <span className="font-semibold text-amber-400">
                {prefs.gender === "Nữ" ? "Tiểu thư" : "Công tử"} ({prefs.gender})
              </span>
            </div>
          </div>

          <ol className="mb-10 flex flex-wrap justify-center gap-2">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs ${
                  i === step
                    ? "bg-vermilion text-primary-foreground shadow"
                    : i < step
                      ? "text-accent border border-accent/30"
                      : "text-muted-foreground border border-border"
                }`}
              >
                <span className="font-display">{i + 1}</span> {s}
              </li>
            ))}
          </ol>

          <AnimatePresence mode="wait">
            <motion.section
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {step === 0 && (
                <StepGu
                  prefs={prefs}
                  setPrefs={setPrefs}
                  next={() => {
                    selectOutfit(getOutfit(prefs.garment));
                    setStep(1);
                  }}
                />
              )}
              {step === 1 && (
                <StepBo
                  outfit={outfit}
                  prefs={prefs}
                  combination={combination}
                  setCombination={setCombination}
                  setOutfit={selectOutfit}
                  back={() => setStep(0)}
                  next={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <StepThu
                  outfit={styledOutfit}
                  gender={prefs.gender}
                  photo={photo}
                  setPhoto={setPhoto}
                  back={() => setStep(1)}
                  run={runTryOn}
                />
              )}
              {step === 3 && (
                <StepKetQua
                  outfit={styledOutfit}
                  result={result}
                  isFinal={isFinal}
                  loading={loading}
                  error={error}
                  retry={runTryOn}
                  back={() => setStep(2)}
                  next={() => setStep(4)}
                />
              )}
              {step === 4 && result && (
                <StepLookbook
                  result={result}
                  outfit={outfit}
                  back={() => setStep(3)}
                  restart={() => setStep(0)}
                />
              )}
            </motion.section>
          </AnimatePresence>
        </main>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setIsLoginOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-md w-full overflow-hidden rounded-2xl border border-amber-600/40 bg-[#1c140e] p-6 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-amber-900/40">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full border border-amber-500/70 font-serif font-bold text-amber-400 bg-amber-500/10 text-xs">
                  VP
                </div>
                <h3 className="font-serif text-lg font-bold text-amber-300">
                  Đăng Nhập Việt Phục Remix
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLoginOpen(false)}
                className="rounded-full bg-white/5 p-1.5 text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-xs text-stone-300 leading-relaxed">
              Lưu giữ những bộ ảnh cổ phục yêu thích, đồng bộ lookbook và cá nhân hóa trải nghiệm
              phối đồ truyền thống.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => setIsLoginOpen(false)}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-stone-700 bg-white/5 px-4 py-2.5 text-sm font-medium text-stone-200 hover:bg-white/10 transition-colors"
              >
                <span>🌐 Tiếp tục với Google</span>
              </button>
              <button
                type="button"
                onClick={() => setIsLoginOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2.5 text-sm font-semibold text-black hover:brightness-110 shadow transition-all"
              >
                <span>Trải nghiệm ngay (Khách)</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Title({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 text-center">
      <div className="text-xs tracking-[0.4em] text-accent">{kicker}</div>
      <h1 className="mt-2 text-3xl font-semibold md:text-5xl">
        <span className="text-gold-gradient">{title}</span>
      </h1>
      {sub && <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{sub}</p>}
    </div>
  );
}

function StepGu({
  prefs,
  setPrefs,
  next,
}: {
  prefs: Prefs;
  setPrefs: (p: Prefs) => void;
  next: () => void;
}) {
  const groups: {
    key: "gender" | "occasion" | "weather" | "style" | "color";
    label: string;
    opts: string[];
  }[] = [
    { key: "gender", label: "Giới tính", opts: ["Nữ", "Nam"] },
    {
      key: "occasion",
      label: "Bối cảnh",
      opts: ["Tết", "Lễ hội", "Cưới hỏi", "Dạo phố", "Chụp kỷ yếu"],
    },
    { key: "weather", label: "Thời tiết", opts: ["Nắng ấm", "Se lạnh", "Mưa phùn"] },
    { key: "style", label: "Phong cách", opts: ["Tối giản", "Gen Z", "Cổ điển", "Cung đình"] },
    {
      key: "color",
      label: "Màu yêu thích",
      opts: ["Đỏ chu sa", "Cam san hô", "Vàng hoàng yến", "Nâu đất"],
    },
  ];
  return (
    <div>
      <Title
        kicker="BƯỚC 1"
        title="Gu của bạn là gì?"
        sub="Chọn vài điều nhỏ để chúng tôi gợi ý bộ cổ phục hợp nhất."
      />
      <div className="glass pattern-bg mx-auto max-w-3xl space-y-6 rounded-2xl p-6 md:p-10">
        {groups.map((g) => (
          <div key={g.key}>
            <div className="mb-3 font-display text-lg">{g.label}</div>
            <div className="flex flex-wrap gap-2">
              {g.opts.map((o) => (
                <Chip
                  key={o}
                  active={prefs[g.key] === o}
                  onClick={() => setPrefs({ ...prefs, [g.key]: o })}
                >
                  {o}
                </Chip>
              ))}
            </div>
            {g.key === "gender" && (
              <div className="mt-3 rounded-xl border border-accent/40 bg-accent/10 p-3.5 text-xs leading-relaxed text-foreground">
                {prefs.gender === "Nam" ? (
                  <>
                    <div className="flex items-center gap-1.5 font-semibold text-accent">
                      <span>👑 Gợi ý phù hợp cho Nam giới:</span>
                    </div>
                    <p className="mt-1 text-muted-foreground">
                      Nên ưu tiên: <strong className="text-foreground">Áo Ngũ Thân tay chẽn</strong>{" "}
                      (gọn gàng, đĩnh đạc), <strong className="text-foreground">Áo Tấc</strong> (đại
                      lễ uy nghi),{" "}
                      <strong className="text-foreground">Áo Ngũ Thân tay chùng</strong> hoặc{" "}
                      <strong className="text-foreground">Áo Giao Lĩnh</strong> (nho nhã, thư sinh).
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 font-semibold text-accent">
                      <span>🌸 Gợi ý phù hợp cho Nữ giới:</span>
                    </div>
                    <p className="mt-1 text-muted-foreground">
                      Nên ưu tiên: <strong className="text-foreground">Áo Nhật Bình</strong> (quý
                      tộc cung đình Huế), <strong className="text-foreground">Áo Tứ Thân</strong>{" "}
                      (duyên dáng quan họ Kinh Bắc),{" "}
                      <strong className="text-foreground">Áo Tấc Gấm Hoa</strong> (quyền quý) hoặc{" "}
                      <strong className="text-foreground">Áo Dài tân thời</strong> (thướt tha).
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        <div>
          <div className="mb-3 flex items-center justify-between font-display text-lg">
            <span>Kiểu áo yêu thích</span>
            <span className="text-xs font-sans text-muted-foreground">
              {prefs.gender === "Nam"
                ? "⭐ Đã đánh dấu bộ hợp với Nam"
                : "⭐ Đã đánh dấu bộ hợp với Nữ"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {GARMENT_OPTIONS.map((option) => {
              const isRec = isOutfitRecommendedForGender(option.id, prefs.gender);
              return (
                <Chip
                  key={option.id}
                  active={prefs.garment === option.id}
                  onClick={() => setPrefs({ ...prefs, garment: option.id })}
                >
                  {option.label}
                  {isRec && <span className="ml-1 text-[11px] text-coral font-medium">★</span>}
                </Chip>
              );
            })}
          </div>
        </div>
        <div>
          <div className="mb-3 font-display text-lg">Phụ kiện yêu thích</div>
          <div className="flex flex-wrap gap-2">
            {ACCESSORIES.map((accessory) => (
              <Chip
                key={accessory}
                active={prefs.accessories.includes(accessory)}
                onClick={() =>
                  setPrefs({
                    ...prefs,
                    accessories: prefs.accessories.includes(accessory)
                      ? prefs.accessories.filter((item) => item !== accessory)
                      : [...prefs.accessories, accessory],
                  })
                }
              >
                {accessory}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <GoldButton onClick={next}>Xem gợi ý →</GoldButton>
        </div>
      </div>
    </div>
  );
}

function StepBo({
  outfit,
  prefs,
  combination,
  setCombination,
  setOutfit,
  back,
  next,
}: {
  outfit: Outfit;
  prefs: Prefs;
  combination: Combination | null;
  setCombination: (c: Combination) => void;
  setOutfit: (o: Outfit) => void;
  back: () => void;
  next: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "recommended" | "nam" | "nu">("all");
  const [displayMode, setDisplayMode] = useState<"ai" | "3d">("ai");
  const [previewOutfit, setPreviewOutfit] = useState<Outfit | null>(null);

  const filteredOutfits = useMemo(() => {
    return [...OUTFITS]
      .filter((o) => {
        if (filter === "recommended") {
          return isOutfitRecommendedForGender(o.id, prefs.gender);
        }
        if (filter === "nam") {
          const rec = getGenderRecommendation(o.id);
          return rec.fit === "both" || rec.fit === "nam";
        }
        if (filter === "nu") {
          const rec = getGenderRecommendation(o.id);
          return rec.fit === "both" || rec.fit === "nu";
        }
        return true;
      })
      .sort((a, b) => {
        // Preference garment match first
        const aGarmentMatch = a.id === prefs.garment ? 1 : 0;
        const bGarmentMatch = b.id === prefs.garment ? 1 : 0;
        if (aGarmentMatch !== bGarmentMatch) return bGarmentMatch - aGarmentMatch;

        // Fits user's gender
        const aFit = isOutfitRecommendedForGender(a.id, prefs.gender) ? 1 : 0;
        const bFit = isOutfitRecommendedForGender(b.id, prefs.gender) ? 1 : 0;
        return bFit - aFit;
      });
  }, [filter, prefs.garment, prefs.gender]);

  return (
    <div>
      <Title
        kicker="BƯỚC 2"
        title="Chọn bộ cổ phục"
        sub="Hình ảnh trang phục do AI vẽ chuẩn theo tên gọi cổ phục Việt, chi tiết từng vạt áo và hoa văn gấm lụa."
      />

      {/* Gender Recommendation and View Mode Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Lọc theo giới tính:
          </span>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              filter === "all"
                ? "bg-accent text-accent-foreground shadow"
                : "border border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            Tất cả ({OUTFITS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("recommended")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              filter === "recommended"
                ? "bg-accent text-accent-foreground shadow"
                : "border border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            ✦ Hợp với bạn ({prefs.gender})
          </button>
          <button
            type="button"
            onClick={() => setFilter("nam")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              filter === "nam"
                ? "bg-accent text-accent-foreground shadow"
                : "border border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            👑 Chuộng cho Nam (4)
          </button>
          <button
            type="button"
            onClick={() => setFilter("nu")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              filter === "nu"
                ? "bg-accent text-accent-foreground shadow"
                : "border border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            🌸 Tôn vinh Nữ (7)
          </button>
        </div>

        {/* Display mode switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Hiển thị:
          </span>
          <div className="inline-flex rounded-full border border-border bg-secondary/40 p-0.5">
            <button
              type="button"
              onClick={() => setDisplayMode("ai")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                displayMode === "ai"
                  ? "bg-accent text-accent-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🎨 Ảnh AI vẽ
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode("3d")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                displayMode === "3d"
                  ? "bg-accent text-accent-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ❖ Mô hình 3D
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filteredOutfits.map((o, i) => {
          const active = o.id === outfit.id;
          const rec = getGenderRecommendation(o.id);
          const isRecForUser = isOutfitRecommendedForGender(o.id, prefs.gender);

          return (
            <motion.article
              key={o.id}
              whileHover={{ y: -6 }}
              onClick={() => setOutfit(o)}
              className={`glass group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
                active ? "ring-2 ring-accent shadow-[var(--shadow-glow)]" : "hover:border-accent/40"
              }`}
            >
              <div className="relative h-72 w-full overflow-hidden bg-secondary/30">
                {displayMode === "ai" ? (
                  <>
                    <img
                      src={getOutfitImage(o.id)}
                      alt={o.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/15 to-black/30" />
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-amber-300 backdrop-blur-md border border-amber-400/30 shadow-sm">
                        ✨ AI vẽ: {o.type}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewOutfit(o);
                        }}
                        className="rounded-full bg-black/70 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-md border border-white/20 hover:bg-black/90 hover:text-white transition-colors"
                      >
                        🔍 Xem to
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="relative h-full w-full pattern-bg">
                    <Garment3D outfit={o} />
                  </div>
                )}

                <span className="absolute left-3 top-3 z-10 font-display text-2xl font-bold text-accent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  #{i + 1}
                </span>
                <span
                  className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md transition-colors ${
                    active
                      ? "bg-vermilion text-primary-foreground shadow-md"
                      : "border border-white/20 bg-black/60 text-white"
                  }`}
                >
                  {active ? "✓ Đang chọn" : `Bộ #${i + 1}`}
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-block rounded-md border border-accent px-2 py-0.5 text-xs text-accent">
                    {o.type}
                  </span>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                      isRecForUser
                        ? "bg-accent/20 border-accent/40 text-accent"
                        : "bg-secondary/60 border-border text-muted-foreground"
                    }`}
                  >
                    {rec.badge}
                  </span>
                </div>
                <h3 className="text-xl font-semibold leading-snug">{o.title}</h3>
                <div className="text-xs italic text-coral">{o.era}</div>
                <p className="text-sm text-muted-foreground">{o.desc}</p>

                {/* Gender suitability insight */}
                <div className="rounded-lg border border-border/70 bg-secondary/40 p-2.5 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-accent">Phù hợp giới tính: </span>
                  {rec.reason}
                </div>

                <div className="rounded-xl border border-border bg-background/40 p-3">
                  <div className="mb-2 text-[11px] font-semibold tracking-[0.25em] text-canary">
                    PHỐI PHỤ KIỆN REMIX
                  </div>
                  <ul className="space-y-1 text-sm">
                    {o.remix.map((r) => (
                      <li key={r}>✦ {r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Outfit Preview Lightbox */}
      {previewOutfit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewOutfit(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[90vh] max-w-2xl w-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <span className="rounded-md border border-accent px-2 py-0.5 text-xs text-accent">
                  {previewOutfit.type}
                </span>
                <h3 className="mt-1 text-xl font-semibold">{previewOutfit.title}</h3>
                <p className="text-xs text-coral italic">{previewOutfit.era}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOutfit(null)}
                className="rounded-full bg-secondary/80 p-2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 max-h-[58vh] overflow-hidden rounded-xl bg-black/60 flex items-center justify-center">
              <img
                src={getOutfitImage(previewOutfit.id)}
                alt={previewOutfit.title}
                referrerPolicy="no-referrer"
                className="max-h-[56vh] w-auto object-contain rounded-lg"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{previewOutfit.desc}</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreviewOutfit(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  setOutfit(previewOutfit);
                  setPreviewOutfit(null);
                }}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow"
              >
                ✓ Chọn bộ trang phục này
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <OutfitCombinations
        combinations={getCombinations(outfit.id, prefs.accessories)}
        selectedId={combination?.id ?? ""}
        onSelect={setCombination}
      />
      <div className="mt-8 flex justify-between">
        <GoldButton ghost onClick={back}>
          ← Quay lại
        </GoldButton>
        <GoldButton onClick={next}>Thử bộ này →</GoldButton>
      </div>
    </div>
  );
}

function StepThu({
  outfit,
  gender,
  photo,
  setPhoto,
  back,
  run,
}: {
  outfit: Outfit;
  gender: string;
  photo: { url: string; file?: File } | null;
  setPhoto: (p: { url: string; file?: File }) => void;
  back: () => void;
  run: () => void;
}) {
  const [drag, setDrag] = useState(false);
  const [viewMode, setViewMode] = useState<"ai" | "3d">("ai");
  const inputRef = useRef<HTMLInputElement>(null);
  const take = (f?: File) =>
    f &&
    /image\/(jpeg|png|webp)/.test(f.type) &&
    setPhoto({ url: URL.createObjectURL(f), file: f });
  const presets = gender === "Nữ" ? [modelNu, modelNam] : [modelNam, modelNu];
  return (
    <div>
      <Title
        kicker="BƯỚC 3"
        title="Phòng thử đồ ảo"
        sub="Tải ảnh toàn thân của bạn hoặc chọn nhanh người mẫu có sẵn."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass relative h-[460px] overflow-hidden rounded-2xl border border-border group">
          {viewMode === "ai" ? (
            <>
              <img
                src={getOutfitImage(outfit.id)}
                alt={outfit.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-black/40" />
            </>
          ) : (
            <div className="h-full w-full pattern-bg">
              <Garment3D outfit={outfit} />
            </div>
          )}

          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-md border border-accent bg-black/50 px-2 py-0.5 text-xs text-accent backdrop-blur-md">
              {outfit.type}
            </span>
            <div className="font-display text-lg text-white drop-shadow mt-1">{outfit.title}</div>
            <div className="text-xs text-amber-300 drop-shadow">✨ Bản vẽ AI chuẩn cổ phục</div>
          </div>

          <div className="absolute right-4 top-4 z-10 flex gap-1 rounded-full bg-black/60 p-1 backdrop-blur-md border border-white/20">
            <button
              type="button"
              onClick={() => setViewMode("ai")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === "ai"
                  ? "bg-accent text-accent-foreground"
                  : "text-white/80 hover:text-white"
              }`}
            >
              🎨 Ảnh AI
            </button>
            <button
              type="button"
              onClick={() => setViewMode("3d")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === "3d"
                  ? "bg-accent text-accent-foreground"
                  : "text-white/80 hover:text-white"
              }`}
            >
              ❖ 3D
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              take(e.dataTransfer.files[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={`glass flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${drag ? "border-accent" : "border-border"}`}
          >
            {photo ? (
              <img
                src={photo.url}
                alt="Ảnh của bạn"
                className="max-h-72 rounded-xl object-contain"
              />
            ) : (
              <>
                <div className="font-display text-2xl text-accent">Kéo thả ảnh vào đây</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ảnh toàn thân · .jpg .png .webp
                </p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={(e) => take(e.target.files?.[0])}
            />
          </div>
          <div>
            <div className="mb-2 text-sm text-muted-foreground">Hoặc chọn người mẫu:</div>
            <div className="flex gap-3">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setPhoto({ url: p })}
                  className={`overflow-hidden rounded-xl border-2 ${photo?.url === p ? "border-accent" : "border-border"}`}
                >
                  <img
                    src={p}
                    alt="Người mẫu"
                    width={768}
                    height={1152}
                    loading="lazy"
                    className="h-28 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <h2 className="font-display text-lg">Cách phối đã chọn</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {outfit.remix.map((item) => (
            <span key={item} className="rounded-full bg-accent/15 px-3 py-1 text-sm text-accent">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <GoldButton ghost onClick={back}>
          ← Đổi bộ
        </GoldButton>
        <GoldButton disabled={!photo} onClick={run}>
          Xem kết quả ✦
        </GoldButton>
      </div>
    </div>
  );
}

function StepKetQua({
  outfit,
  result,
  isFinal,
  loading,
  error,
  retry,
  back,
  next,
}: {
  outfit: Outfit;
  result: string | null;
  isFinal: boolean;
  loading: boolean;
  error: string | null;
  retry: () => void;
  back: () => void;
  next: () => void;
}) {
  const [p, setP] = useState(0);
  const [viewMode, setViewMode] = useState<"photo" | "3d">("photo");
  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setP((x) => (x + 1) % PROVERBS.length), 3200);
    return () => clearInterval(t);
  }, [loading]);
  return (
    <div>
      <Title kicker="BƯỚC 4" title="Kết quả thử đồ" />
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode("photo")}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                viewMode === "photo"
                  ? "bg-accent text-accent-foreground shadow"
                  : "border border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              ✦ Ảnh mặc thử đồ
            </button>
            <button
              type="button"
              onClick={() => setViewMode("3d")}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                viewMode === "3d"
                  ? "bg-accent text-accent-foreground shadow"
                  : "border border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              ❖ Mô hình 3D xoay 360°
            </button>
          </div>

          <div className="glass relative grid min-h-[520px] place-items-center overflow-hidden rounded-2xl">
            {viewMode === "3d" ? (
              <div className="h-[520px] w-full">
                <Garment3D outfit={outfit} />
              </div>
            ) : (
              result && (
                <img
                  src={result}
                  alt="Ảnh thử đồ"
                  className={`h-full max-h-[640px] w-full object-contain transition-[filter] duration-700 ${isFinal ? "blur-0" : "blur-2xl"}`}
                />
              )
            )}
            {loading && (
              <div className="absolute inset-0 grid place-items-center bg-background/50 p-6 text-center">
                <div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="mx-auto mb-5 h-14 w-14 rounded-full border-2 border-accent border-t-transparent"
                  />
                  <div className="font-display text-2xl text-accent">Đang may đồ cho bạn...</div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={p}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 italic text-muted-foreground"
                    >
                      “{PROVERBS[p]}”
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            )}
            {error && !loading && (
              <div className="p-6 text-center">
                <p className="text-destructive">{error}</p>
                <div className="mt-4">
                  <GoldButton onClick={retry}>Thử lại</GoldButton>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass rounded-2xl p-6">
            <div className="text-xs tracking-[0.3em] text-canary">PHONG THÁI KHI DIỆN BỘ NÀY</div>
            <h3 className="mt-2 text-2xl">{outfit.title}</h3>
            <p className="mt-3 text-muted-foreground">{outfit.vibe}</p>
          </div>
          <div className="glass rounded-2xl border-l-4 border-l-primary p-6">
            <div className="text-xs tracking-[0.3em] text-coral">CÓ THỂ BẠN CHƯA BIẾT</div>
            <p className="mt-3 leading-relaxed">{outfit.history}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-xs tracking-[0.3em] text-accent">CHI TIẾT TRANG PHỤC ĐÃ MẶC</div>
            <p className="mt-2 text-sm text-foreground">{outfit.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {outfit.remix.map((r) => (
                <span key={r} className="rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent">
                  ✓ {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <GoldButton ghost onClick={back}>
          ← Đổi ảnh
        </GoldButton>
        <GoldButton disabled={!isFinal} onClick={next}>
          Tạo Lookbook →
        </GoldButton>
      </div>
    </div>
  );
}

function StepLookbook({
  result,
  outfit,
  back,
  restart,
}: {
  result: string;
  outfit: Outfit;
  back: () => void;
  restart: () => void;
}) {
  const [lm, setLm] = useState(LANDMARKS[0]!);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      const W = 900,
        H = 1300;
      c.width = W;
      c.height = H;
      const css = getComputedStyle(document.documentElement);
      const bg = css.getPropertyValue("--background").trim();
      ctx.fillStyle = bg || "black";
      ctx.fillRect(0, 0, W, H);
      const pad = 50,
        ih = H - 260;
      const r = Math.max((W - pad * 2) / img.width, ih / img.height);
      const dw = img.width * r,
        dh = img.height * r;
      ctx.save();
      ctx.beginPath();
      ctx.rect(pad, pad, W - pad * 2, ih);
      ctx.clip();
      ctx.drawImage(img, pad + (W - pad * 2 - dw) / 2, pad + (ih - dh) / 2, dw, dh);
      ctx.restore();
      const gold = css.getPropertyValue("--gold").trim();
      ctx.strokeStyle = gold;
      ctx.lineWidth = 3;
      ctx.strokeRect(pad - 14, pad - 14, W - (pad - 14) * 2, ih + 28);
      ctx.lineWidth = 1;
      ctx.strokeRect(pad - 24, pad - 24, W - (pad - 24) * 2, ih + 48);
      ctx.fillStyle = gold;
      ctx.textAlign = "center";
      ctx.font = "600 54px 'Playfair Display', serif";
      ctx.fillText(lm.name, W / 2, H - 140);
      ctx.font = "24px 'Be Vietnam Pro', sans-serif";
      ctx.fillText(`${lm.place} · ${outfit.type}`, W / 2, H - 95);
      ctx.font = "16px 'Be Vietnam Pro', sans-serif";
      ctx.fillText("VIỆT PHỤC REMIX · HERITAGE", W / 2, H - 50);
    };
    img.src = result;
  }, [lm, result, outfit]);

  const download = () => {
    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL("image/jpeg", 0.92);
    a.download = `viet-phuc-${lm.id}.jpg`;
    a.click();
  };
  const share = async () => {
    const blob = await new Promise<Blob | null>((r) =>
      canvasRef.current!.toBlob(r, "image/jpeg", 0.92),
    );
    if (!blob) return;
    const file = new File([blob], "viet-phuc.jpg", { type: "image/jpeg" });
    if (navigator.canShare?.({ files: [file] }))
      await navigator.share({ files: [file], title: "Việt Phục Remix" });
    else download();
  };

  return (
    <div>
      <Title
        kicker="BƯỚC 5"
        title="Lookbook của bạn"
        sub="Chọn khung danh thắng, rồi tải về hoặc chia sẻ."
      />
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="glass grid place-items-center rounded-2xl p-4">
          <canvas ref={canvasRef} className="h-auto max-h-[720px] w-auto max-w-full rounded-lg" />
        </div>
        <div className="space-y-3">
          {LANDMARKS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLm(l)}
              className={`glass w-full rounded-xl p-4 text-left transition-all ${lm.id === l.id ? "ring-2 ring-accent" : ""}`}
            >
              <div className="font-display text-lg">{l.name}</div>
              <div className="text-xs text-muted-foreground">{l.place}</div>
            </button>
          ))}
          <div className="flex flex-col gap-2 pt-3">
            <GoldButton onClick={download}>Tải xuống</GoldButton>
            <GoldButton ghost onClick={share}>
              Chia sẻ
            </GoldButton>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <GoldButton ghost onClick={back}>
          ← Kết quả
        </GoldButton>
        <GoldButton ghost onClick={restart}>
          Chọn gu mới
        </GoldButton>
      </div>
    </div>
  );
}
