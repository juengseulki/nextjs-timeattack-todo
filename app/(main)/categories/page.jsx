import CategoryCard from "@/app/components/CategoryCard";
import { getCategories } from "@/app/lib/categoryApi";

export const metadata = {
  title: "카테고리 목록 | Todo App",
  description: "Todo 카테고리 목록을 확인합니다.",
};

export default async function CategoryListPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">카테고리</h1>
          <p className="mt-2 text-sm text-slate-500">
            카테고리별 Todo를 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
