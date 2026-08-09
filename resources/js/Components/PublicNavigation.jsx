import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

/* ------------------------------------------------------------------ */
/*  PublicNav — shared header for public-facing pages                  */
/*                                                                     */
/*  Extracted from Home.jsx's Navbar so every public page (Home,       */
/*  Courses/Index, Courses/Show, Blog, etc.) shares one nav instead    */
/*  of each page re-declaring its own copy. Same "clinical readout"    */
/*  language: Space Grotesk display, emerald accent, sticky/blurred    */
/*  on scroll.                                                         */
/*                                                                     */
/*  Section anchors (#services, #academy, etc.) only resolve on the    */
/*  homepage. On other pages they link back to "/" + the hash so       */
/*  clicking "Services" from /courses still lands on the right         */
/*  section instead of doing nothing.                                  */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Clinic", href: "/#clinic" },
  { label: "Services", href: "/#services" },
  { label: "CPD Academy", href: "/#academy" },
  { label: "Courses", href: "/courses" },
  { label: "Marketplace", href: "/#marketplace" },
  { label: "Research", href: "/#research" },
  { label: "Contact", href: "/#contact" },
];

export default function PublicNav() {
  const { url } = usePage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") return url === "/";
    if (href.startsWith("/#")) return false; // section anchors never "active" off-page
    return url.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/90 backdrop-blur-md shadow-sm"
          : "border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl text-white">
            <ApplicationLogo className="block h-12 w-12 max-h-12 max-w-12 object-contain" />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-700 focus-visible:text-emerald-700 ${
                isActive(link.href) ? "text-emerald-700" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-emerald-700"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
          >
            Register
          </Link>
          <Link
            href="/book"
            className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-800/20 transition-transform hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            Book Consultation
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 ${
                    isActive(link.href) ? "text-emerald-700" : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-slate-300 px-4 py-2.5 text-center text-sm font-medium text-slate-700"
                >
                  Register
                </Link>
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-emerald-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Book Consultation
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}