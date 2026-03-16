import type { MenuItem } from "@/lib/menu-data";

export interface SizeVariant {
  label: string;
  item: MenuItem;
}

export interface GroupedMenuItem {
  baseId: string;
  baseName: string;
  emoji: string;
  category: string;
  variants: SizeVariant[];
  startingPrice: number;
}

const SIZE_PATTERNS: [RegExp, string][] = [
  [/\s*\(S\)$/, "Small"],
  [/\s*\(L\)$/, "Large"],
  [/\s*\(H\)$/, "Half"],
  [/\s*\(F\)$/, "Full"],
  [/\s*\(M\)$/, "Medium"],
  [/\s*\(Grilled\)$/, "Grilled"],
];

function parseVariant(name: string): { baseName: string; label: string } | null {
  for (const [pattern, label] of SIZE_PATTERNS) {
    if (pattern.test(name)) {
      return { baseName: name.replace(pattern, "").trim(), label };
    }
  }
  return null;
}

export function groupMenuItems(items: MenuItem[]): GroupedMenuItem[] {
  const groups = new Map<string, GroupedMenuItem>();
  const standalone: GroupedMenuItem[] = [];

  for (const item of items) {
    const parsed = parseVariant(item.name);

    if (parsed) {
      const key = `${parsed.baseName}__${item.category}`;
      if (!groups.has(key)) {
        groups.set(key, {
          baseId: key,
          baseName: parsed.baseName,
          emoji: item.emoji,
          category: item.category,
          variants: [],
          startingPrice: item.price,
        });
      }
      const group = groups.get(key)!;
      group.variants.push({ label: parsed.label, item });
      group.startingPrice = Math.min(group.startingPrice, item.price);
    } else {
      standalone.push({
        baseId: item.id,
        baseName: item.name,
        emoji: item.emoji,
        category: item.category,
        variants: [{ label: "", item }],
        startingPrice: item.price,
      });
    }
  }

  // Maintain original order by category
  const result: GroupedMenuItem[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const parsed = parseVariant(item.name);
    if (parsed) {
      const key = `${parsed.baseName}__${item.category}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(groups.get(key)!);
      }
    } else {
      result.push(standalone.find((s) => s.baseId === item.id)!);
    }
  }

  return result;
}
