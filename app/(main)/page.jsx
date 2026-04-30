import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
        <Image
          src=""
          alt="Todo 웹 소개 이미지"
          width={220}
          height={220}
          priority
          className="mb-8"
        />

        <p className="mb-3 text-sm font-semibold text-blue-600">
          Next.js Todo Time Attack
        </p>

        <h1 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          오늘 할 일을 카테고리별로 관리하세요
        </h1>

        <p className="mb-8 max-w-2xl text-base leading-7 text-slate-600 mb:text-lg">
          Todo 추가, 수정, 삭제, 완료 토글, 카데고리별 조회와 복합 필터를
          지원하는 Todo 앱입니다.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/todos"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Todo 목록 보기
          </Link>

          <Link
            href="/categories"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm text-slate-700 hover:bg-slate-100"
          >
            카테고리 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
