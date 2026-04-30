import Link from "next/link";

const colorClass = {
  blue: "bg-blue-100 text-blue-700",
  pink: "bg-pink-100 text-pink-700",
  green: "bg-green-100 text-green-700",
};

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <span
        className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold ${
          colorClass[category.color] || "bg-slate-100 text-slate-700"
        }`}
      >
        {category.id}
      </span>

      <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>

      <p className="mt-2 text-sm text-slate-500">
        이 카테고리에 속한 Todo를 확인합니다.
      </p>
    </Link>
  );
}
