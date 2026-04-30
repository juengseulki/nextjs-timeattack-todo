import Link from "next/link";
import { notFound } from "next/navigation";
import TodoDeleteButton from "@/components/TodoDeleteButton";
import { getTodoById } from "@/lib/todoApi";
import { getCategoryById } from "@/lib/categoryApi";

const priorityLabel = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const todo = await getTodoById(resolvedParams.id);

  if (!todo) {
    return {
      title: "Todo를 찾을 수 없습니다 | Todo App",
      description: "존재하지 않는 Todo입니다.",
    };
  }

  return {
    title: `${todo.title} | Todo App`,
    description: todo.content,
  };
}

export default async function TodoDetailPage({ params }) {
  const resolvedParams = await params;
  const todo = await getTodoById(resolvedParams.id);

  if (!todo) {
    notFound();
  }

  const category = await getCategoryById(todo.category);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href="/todos"
          className="mb-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← 목록으로 돌아가기
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {todo.title}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                생성일: {new Date(todo.createdAt).toLocaleDateString("ko-KR")}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                todo.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {todo.completed ? "완료" : "진행중"}
            </span>
          </div>

          <p className="mb-8 whitespace-pre-wrap leading-7 text-slate-700">
            {todo.content}
          </p>

          <div className="mb-8 grid gap-4 rounded-xl bg-slate-50 p-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-slate-400">카테고리</p>
              <Link
                href={`/categories/${todo.category}`}
                className="mt-1 inline-block font-semibold text-blue-600 hover:text-blue-700"
              >
                {category?.name || todo.category}
              </Link>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400">우선순위</p>
              <p className="mt-1 font-semibold text-slate-700">
                {priorityLabel[todo.priority]}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/todos/${todo.id}/edit`}
              className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
            >
              수정하기
            </Link>

            <TodoDeleteButton todoId={todo.id} />
          </div>
        </article>
      </section>
    </main>
  );
}
