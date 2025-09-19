import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-transparent h-20 flex items-center justify-center fixed top-0 left-0 right-0 z-50">
      <Link href="/" className="text-3xl font-bold text-align-center">Cottage</Link>
    </header>
  );
}
