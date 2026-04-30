import Link from "next/link";
import { notFound } from "next/navigation";
import TodoForm from "@/components/TodoForm";
import { getTodoById } from "@/lib/todoApi";
import { getCategories } from "@/lib/categoryApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const todo = await getTodoById(resolvedParams.id);

  return {
    title: todo ? `${todo.title} 수정 | Todo App` : "Todo 수정 | Todo App",
    description: "Todo 정보를 수정합니다.",
  };
}

export default async function EditTodoPage({ params }) {
  const resolvedParams = await params;

  const [todo, categories] = await Promise.all([
    getTodoById(resolvedParams.id),
    getCategories(),
  ]);

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href={`/todos/${todo.id}`}
          className="mb-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← 상세로 돌아가기
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Todo 수정</h1>
          <p className="mt-2 text-sm text-slate-500">
            Todo 내용을 수정하고 저장할 수 있습니다.
          </p>
        </div>

        <TodoForm mode="edit" todo={todo} categories={categories} />
      </section>
    </main>
  );
}
