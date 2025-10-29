"use client";
import { useState } from "react";
import Link from "next/link";
import Container from "./Container";

export default function Header() {
  const [open, setOpen] = useState(false);

  const NavLinks = ({ onClick }) => (
    <>
      <Link href="/" className="rounded-lg px-3 py-2 hover:bg-[#002a55] hover:text-white" onClick={onClick}>Home</Link>
      <Link href="/services" className="rounded-lg px-3 py-2 hover:bg-[#002a55] hover:text-white" onClick={onClick}>Services</Link>
      <Link href="/about" className="rounded-lg px-3 py-2 hover:bg-[#002a55] hover:text-white" onClick={onClick}>About</Link>
      <Link href="/contact" className="rounded-lg px-3 py-2 hover:bg-[#002a55] hover:text-white" onClick={onClick}>Contact</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b-4 border-[#002448] bg-[var(--blue)] text-white">
      <Container>
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-1 font-extrabold tracking-wide">
            <img src="/images/logo.svg" alt="Moulding Technicians Logo" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <nav className="hidden gap-2 md:flex" aria-label="Main">
            <NavLinks />
          </nav>
          <button
            className="rounded-lg px-3 py-2 hover:bg-[#002a55] md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden">
          <div className="bg-[var(--blue)]/95 px-4 pb-4">
            <div className="flex justify-end py-2">
              <button className="rounded-lg px-3 py-2 hover:bg-[#002a55]" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="flex flex-col gap-1">
              <NavLinks onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
