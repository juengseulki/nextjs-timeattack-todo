import Link from "next/link";
import TodoCard from "@/app/components/TodoCard";
import TodoFilter from "@/app/components/TodoFilter";
import { getTodos } from "@/app/lib/todoApi";
import { getCategories } from "@/app/lib/categoryApi";

export const metadata = {
  title: "Todo 목록 | Todo App",
  description: "Todo 목록을 완료 상태와 카테고리로 필터링할 수 있습니다.",
};

export default async function TodoListPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const completed = resolvedSearchParams?.completed;
  const category = resolvedSearchParams?.category;

  const [todos, categories] = await Promise.all([
    getTodos({ completed, category }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Todo 목록</h1>
            <p className="text-sm text-slate-500">
              완료 상태와 카테고리를 동시에 필터링할 수 있습니다.
            </p>
          </div>

          <Link
            href="/todos/new"
            className="inline-block rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Todo 추가
          </Link>
        </div>

        <TodoFilter categories={categories} />

        {todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            표시할 Todo가 없습니다.
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
