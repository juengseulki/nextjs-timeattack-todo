import Link from "next/link";
import TodoToggleButton from "./TodoToggleButton";

const priorityLabel = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

export default function TodoCard({ todo }) {
  return (
    <article className="rounded-2xl border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/todos/${todo.id}`}
            className="text-lg font-bold text-slate-900 hover:text-blue-600"
          >
            {todo.title}
          </Link>

          <Link
            href={`/categories/${todo.category}`}
            className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            #{todo.category}
          </Link>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            todo.comleted
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {todo.completed ? "완료" : "진행중"}
        </span>
      </div>

      <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-600">
        {todo.content}
      </p>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-slate-500">
          우선순위: {priorityLabel[todo.priority]}
        </span>

        <TodoToggleButton todo={todo} />
      </div>
    </article>
  );
}
