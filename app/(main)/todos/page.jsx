import Link from "next/link";
import TodoCard from "@/app/components/TodoCard";
import TodoFilter from "@/app/components/TodoFilter";
import { getTodos } from "@/app/lib/todoApi";
import { getCategoties } from "@/app/lib/categoryApi";

export const metadata = {
  title: "Todo 목록 | Todo App",
  description: "Todo 목록을 완료 상태와 카테고리로 필터링 할 수 있습니다.",
};

export default async function TodoListPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const completed = resolvedSearchParams?.completed;
  const category = resolvedSearchParams?.category;

  const [todos, categories] = await Promise.all([
    getTodos({ completed, category }),
    getCategoties(),
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto mx-w-6xl px-6 py-10">
        <div className="mb-8 flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Todo 목록</h1>
            <p className="mt-2 text-sm text-slatw-500">
              완료 상태와 카테고리를 동시에 필터링 할 수 있습니다.
            </p>
          </div>

          <Link
            href="/todos/new"
            className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Todo 추가
          </Link>
        </div>

        <TodoFilter categories={categories} />

        {todos.length === 0 ? (
          <div className="rounded-2xl border-dashes border-slate-300 bg-white p-10 text-center text-slate-500">
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
