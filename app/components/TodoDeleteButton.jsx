"use client";

import { useRouter } from "next/navigation";

export default function TodoDeletButton({ todoId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");

    if (!confirmed) return;

    await fetch(`${process.env.NEXT_PUBLIC__MOCK_API_URL}/todos/${todoId}`, {
      method: "DELETE",
    });

    router.push("/todos");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-whit hover:bg-red-700"
    >
      삭제하기
    </button>
  );
}
