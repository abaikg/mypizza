import React from "react";

interface ProductBadgesProps {
  isPopular?: boolean;
  isNew?: boolean;
  badges?: string | string[]; // может быть строкой или массивом
}

const BADGE_COLORS: Record<string, string> = {
  "Новинка": "bg-green-100 text-green-700",
  "Хит": "bg-pink-100 text-pink-600",
  "Акция": "bg-yellow-100 text-yellow-700",
  // Добавляй свои типы здесь!
};

function getBadgeColor(label: string) {
  return BADGE_COLORS[label] || "bg-gray-100 text-gray-600";
}

export default function ProductBadges({ isPopular, isNew, badges }: ProductBadgesProps) {
  // Собирать все бейджи в массив строк
  let badgeList: string[] = [];
  if (isNew) badgeList.push("Новинка");
  if (isPopular) badgeList.push("Хит");
  if (badges) {
    if (Array.isArray(badges)) badgeList.push(...badges);
    else badgeList.push(badges);
  }

  if (!badgeList.length) return null;

  return (
    <div className="flex gap-1 flex-wrap">
      {badgeList.map((label, idx) => (
        <span
          key={idx}
          className={`
            px-2 py-0.5 text-xs font-semibold rounded-xl shadow-sm
            border border-white/60
            ${getBadgeColor(label)}
          `}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
