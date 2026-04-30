import Link from "next/link";
import TodoForm from "@/components/TodoForm";
import { getCategories } from "@/lib/categoryApi";

export const metadata = {
  title: "Todo 추가 | Todo App",
  description: "새로운 Todo를 추가합니다.",
};

export default async function NewTodoPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href="/todos"
          className="mb-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← 목록으로 돌아가기
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Todo 추가</h1>
          <p className="mt-2 text-sm text-slate-500">
            새롭게 해야 할 일을 등록해보세요.
          </p>
        </div>

        <TodoForm categories={categories} />
      </section>
    </main>
  );
}
