"use client";

import { useI18n } from "./I18nProvider";
import type { MessageKey } from "@/lib/i18n";

export function LocalizedCopy({ k, as: Tag = "span", className }: { k: MessageKey; as?: "span" | "p" | "h1"; className?: string }) {
  const { t } = useI18n();
  return <Tag className={className}>{t(k)}</Tag>;
}
