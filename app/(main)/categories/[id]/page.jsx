import Link from "next/link";
import { notFound } from "next/navigation";
import TodoCard from "@/components/TodoCard";
import { getCategoryById } from "@/lib/categoryApi";
import { getTodos } from "@/lib/todoApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = await getCategoryById(resolvedParams.id);

  if (!category) {
    return {
      title: "카테고리를 찾을 수 없습니다 | Todo App",
      description: "존재하지 않는 카테고리입니다.",
    };
  }

  return {
    title: `${category.name} Todo | Todo App`,
    description: `${category.name} 카테고리에 속한 Todo 목록입니다.`,
  };
}

export default async function CategoryDetailPage({ params }) {
  const resolvedParams = await params;

  const [category, todos] = await Promise.all([
    getCategoryById(resolvedParams.id),
    getTodos({ category: resolvedParams.id }),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/categories"
          className="mb-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← 카테고리 목록으로 돌아가기
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {category.name} Todo
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            이 카테고리에 속한 Todo 목록입니다.
          </p>
        </div>

        {todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            이 카테고리에 등록된 Todo가 없습니다.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
