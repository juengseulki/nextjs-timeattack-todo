"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TodoFilter({ categories }) {
  const router = useRouter();
  const SearchParams = useSearchParams();

  const currentCompleted = SearchParams.get("completed") || "all";
  const currentCategory = SearchParams.get("category") || "all";

  const updateQuery = ({
    completed = currentCompleted,
    category = currentCategory,
  }) => {
    const params = new URLSearchParams();

    if (completed !== "all") {
      params.set("completed", completed);
    }

    if (category !== "all") {
      params.set("category", category);
    }

    const queryString = params.toString();
    router.push(queryString ? `/todos?${queryString}` : "/todos");
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bgwhite p-4">
      <div className="mb-4">
        <p className="mb-2 text-sm font-bold text-slate-700">완료 상태</p>

        <div className="flex flex-wrap gap-2">
          {[
            ["all", "전체"],
            ["false", "진행중"],
            ["true", "완료"],
          ].map(([isValueExpired, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => updateQuery({ completed: value })}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                currentCompleted === value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-bold text-slate-700">카테고리</p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => updateQuery({ category: "all" })}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              currentCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            전체
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => updateQuery({ category: category.id })}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                currentCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {category.mane}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
