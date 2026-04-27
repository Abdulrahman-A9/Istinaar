"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCheck, CircleCheckBig, ListTodo } from "lucide-react";
import type { OpportunityBookletChecklist } from "@/data/opportunityBooklets";

interface ChecklistGroup {
  label: string;
  key: keyof OpportunityBookletChecklist;
  items: string[];
}

function buildItemId(groupKey: string, index: number) {
  return `${groupKey}-${index}`;
}

export default function BookletChecklistTracker({
  bookletId,
  checklist,
}: {
  bookletId: string;
  checklist: OpportunityBookletChecklist;
}) {
  const storageKey = `hail-booklet-checklist:${bookletId}`;
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const groups = useMemo<ChecklistGroup[]>(
    () => [
      { label: "قبل التقديم", key: "beforeSubmission", items: checklist.beforeSubmission },
      { label: "أثناء التقديم", key: "duringSubmission", items: checklist.duringSubmission },
      { label: "بعد الترسية", key: "afterAward", items: checklist.afterAward },
    ],
    [checklist]
  );

  const allItems = useMemo(
    () => groups.flatMap((group) => group.items.map((item, index) => ({ id: buildItemId(group.key, index), groupLabel: group.label, item }))),
    [groups]
  );

  const remainingItems = allItems.filter((entry) => !completedItems[entry.id]);
  const completedCount = allItems.length - remainingItems.length;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        setCompletedItems(JSON.parse(stored) as Record<string, boolean>);
      }
    } catch {
      setCompletedItems({});
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(completedItems));
    } catch {
      // Ignore storage errors and keep the tracker functional in memory.
    }
  }, [completedItems, storageKey]);

  return (
    <div className="space-y-5">
      <div className="rounded-[1.25rem] border border-gray-100 p-5 bg-white">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ backgroundColor: remainingItems.length === 0 ? "#DCFCE7" : "#FEF3C7", color: remainingItems.length === 0 ? "#166534" : "#92400E" }}>
            {remainingItems.length === 0 ? <CircleCheckBig size={14} /> : <ListTodo size={14} />}
            {remainingItems.length === 0 ? "جميع المتطلبات مكتملة" : `${remainingItems.length} متطلبات متبقية`}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">حالة التقدم الحالية</p>
            <p className="text-2xl font-black text-navy">{completedCount} / {allItems.length}</p>
          </div>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E7EB" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${allItems.length ? (completedCount / allItems.length) * 100 : 0}%`, background: "linear-gradient(90deg, #16A34A 0%, #4ADE80 100%)" }}
          />
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.key} className="rounded-[1.25rem] p-4" style={{ backgroundColor: "#F8FAFD" }}>
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-semibold text-gray-400">
              {group.items.filter((_, index) => completedItems[buildItemId(group.key, index)]).length} / {group.items.length}
            </span>
            <p className="font-black text-navy">{group.label}</p>
          </div>
          <div className="space-y-3">
            {group.items.map((item, index) => {
              const itemId = buildItemId(group.key, index);
              const checked = Boolean(completedItems[itemId]);

              return (
                <label key={itemId} className="flex items-start gap-3 justify-end rounded-2xl border border-gray-100 bg-white px-4 py-4 cursor-pointer transition-colors hover:bg-gray-50">
                  <div className="text-right flex-1">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span
                        className="text-xs font-semibold rounded-full px-2.5 py-1"
                        style={checked ? { backgroundColor: "#DCFCE7", color: "#166534" } : { backgroundColor: "#F3F4F6", color: "#6B7280" }}
                      >
                        {checked ? "مكتمل" : "بانتظار التنفيذ"}
                      </span>
                      <span className="text-sm font-black text-navy">متطلب {index + 1}</span>
                    </div>
                    <p
                      className="text-sm leading-7 transition-colors"
                      style={checked
                        ? { color: "#166534", textDecorationLine: "line-through", textDecorationColor: "#16A34A", textDecorationThickness: "2px" }
                        : { color: "#4B5563" }}
                    >
                      {item}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setCompletedItems((current) => ({ ...current, [itemId]: !checked }))}
                    className="mt-1 h-4 w-4 shrink-0"
                    style={{ accentColor: "#16A34A" }}
                  />
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="rounded-[1.25rem] border border-gray-100 p-5 bg-white">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: remainingItems.length === 0 ? "#166534" : "#0A2342" }}>
            {remainingItems.length === 0 ? <CheckCheck size={16} /> : <ListTodo size={16} />}
            {remainingItems.length === 0 ? "تقرير الإغلاق" : "تقرير الأشياء المتبقية"}
          </div>
          <p className="text-xl font-black text-navy">ملخص المستثمر</p>
        </div>

        {remainingItems.length === 0 ? (
          <div className="rounded-2xl px-4 py-4 text-sm leading-7" style={{ backgroundColor: "#ECFDF5", color: "#166534" }}>
            تم تعليم جميع المتطلبات على أنها مكتملة. أصبح ملفك من منظور هذه القراءة جاهزاً للانتقال إلى مرحلة التقديم أو الاستكمال الرسمي حسب مسار الفرصة.
          </div>
        ) : (
          <div className="space-y-3">
            {remainingItems.map((entry) => (
              <div key={entry.id} className="rounded-2xl px-4 py-4 text-sm text-gray-600 leading-7 border border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-semibold text-gray-400">{entry.groupLabel}</span>
                  <p className="font-black text-navy">ما يزال مطلوباً</p>
                </div>
                <p>{entry.item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}