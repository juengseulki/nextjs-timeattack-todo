"use client";

import { useRouter } from "next/navigation";

export default function TodoToggleButton({ todo }) {
  const router = useRouter();

  const handleToggle = async () => {
    (await fetch("${process.env.NEXT_PUBLIC_MOCK_API_URL}/todos/${todo.id}"),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
    >
      {todo.completed ? "미완료" : "완료"}
    </button>
  );
}
