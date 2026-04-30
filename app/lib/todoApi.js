import { BASE_URL, assertBaseUrl } from "./api";

export async function getTodos({ completed, category } = {}) {
  assertBaseUrl();

  const url = new URL(`${BASE_URL}/todos`);

  if (completed === "true" || completed === "false") {
    url.searchParams.set("completed", completed);
  }
  if (category) {
    url.searchParams.set("category", category);
  }

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Todo 목록을 불러오지 못했습니다.");
  }
  return res.json();
}

export async function getTodoById(id) {
  assertBaseUrl();

  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }

  return res.json();
}
