import Link from "next/link";

export const metadata = {
  title: "서비스 소개 | Todo App",
  description: "Todo App 서비스 소개 페이지 입니다.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-blue-50">
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mb-3 text-sm font-semibold text-blue-600">
          Marketing Route Group
        </p>

        <h1 className="mb-5 text-4xl fony-bold text-slate-900">
          Todo App 소개
        </h1>

        <p className="mb-8 text-slate-600">
          할 일을 카테고리와 완료 상태로 관리하는 Next.js Todo 서비스입니다.
        </p>

        <Link
          href="/"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white"
        >
          홈으로 이동
        </Link>
      </section>
    </main>
  );
}
