import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Combination } from "@/lib/styling";

export function OutfitCombinations({
  combinations,
  selectedId,
  onSelect,
}: {
  combinations: Combination[];
  selectedId: string;
  onSelect: (combination: Combination) => void;
}) {
  return (
    <section className="mt-10 border-t border-border pt-8">
      <h2 className="text-2xl font-semibold">Phối cùng bộ áo này</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {combinations.map((combination) => {
          const active = selectedId === combination.id;
          return (
            <article
              key={combination.id}
              className={`flex flex-col rounded-lg border bg-secondary/40 p-5 ${active ? "border-accent" : "border-border"}`}
            >
              <h3 className="text-xl">{combination.name}</h3>
              <p className="mt-3 text-sm font-medium">{combination.bottom}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {combination.accessories.map((accessory) => (
                  <span
                    key={accessory}
                    className="rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent"
                  >
                    {accessory}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-coral">
                Hài hòa màu: <span className="font-semibold">{combination.harmony}</span>
              </p>
              <p className="mb-5 mt-2 text-sm leading-relaxed text-muted-foreground">
                {combination.note}
              </p>
              <Button
                variant={active ? "default" : "outline"}
                className="mt-auto w-full"
                aria-pressed={active}
                onClick={() => onSelect(combination)}
              >
                {active && <Check aria-hidden="true" />}{" "}
                {active ? "Đang chọn cách phối" : "Chọn cách phối này"}
              </Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
