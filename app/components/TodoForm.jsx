"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoForm({ mode = "create", todo, categories }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: todo?.title || "",
    content: todo?.content || "",
    category: todo?.category || categories?.[0]?.id || "study",
    priority: todo?.priority || "medium",
    completed: todo?.completed || false,
  });

  const [error, setError] = useState("");

  const isEdit = mode === "edit";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!form.content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_MOCK_API_URL}/todos/${todo.id}`
      : `${process.env.NEXT_PUBLIC_MOCK_API_URL}/todos`;

    const method = isEdit ? "PATCH" : "POST";

    const body = isEdit
      ? form
      : {
          id: crypto.randomUUID(),
          ...form,
          completed: false,
          createdAt: new Date().toISOString(),
        };

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    router.push(isEdit ? `/todos/${todo.id}` : "/todos");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          제목
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Todo 제목을 입력하세요"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          내용
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Todo 내용을 입력하세요"
          rows={5}
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            카테고리
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            우선순위
          </label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="low">낮음</option>
            <option value="medium">보통</option>
            <option value="high">높음</option>
          </select>
        </div>
      </div>

      {isEdit && (
        <label className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          완료 상태
        </label>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        {isEdit ? "Todo 수정하기" : "Todo 추가하기"}
      </button>
    </form>
  );
}
