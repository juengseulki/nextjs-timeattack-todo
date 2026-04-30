import Link from "next/link";

export default function Header() {
  return (
    <header className="bordde-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-10 px-8">
        <Link href="/" className="text-lg font-bold text-blue-600">
          Todo App
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600">
            홈
          </Link>
          <Link href="/todos" className="hover:text-blue-600">
            Todo
          </Link>
          <Link href="/categories" className="hover:text-blue-600">
            카테고리
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}
