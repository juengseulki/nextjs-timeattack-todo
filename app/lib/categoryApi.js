import { BASE_URL, assertBaseUrl } from "./api";

export async function getCategories() {
  assertBaseUrl();

  const res = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("카테고리 목록을 불러오지 못했습니다.");
  }
  return res.json();
}

export async function getCategoryById(id) {
  assertBaseUrl();

  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }

  return res.json();
}
