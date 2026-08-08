import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ApplicationLogo from "@/Components/ApplicationLogo"
import {
  Menu,
  X,
  Star,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowUp,
  CheckCircle2,
  PlayCircle,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  GraduationCap,
  Globe2,
  Stethoscope,
  Salad,
  Scale,
  Dumbbell,
  Baby,
  HeartPulse,
  Building2,
  Video,
  ClipboardList,
  FlaskConical,
  Sparkles,
  BadgeCheck,
  MonitorPlay,
  FileText,
  HelpCircle,
  ListChecks,
  Trophy,
  Download,
  FolderDown,
  MessagesSquare,
  BarChart3,
  ShoppingBag,
  Apple,
  BookOpen,
  Dumbbell as Equipment,
  Sparkle,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Quote,
  Search,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  RUNUTRIDIET — Home.jsx                                             */
/*                                                                     */
/*  Design language: "clinical readout" — a healthcare + CPD academy   */
/*  platform styled like a trustworthy lab report crossed with a       */
/*  modern learning product. Display face (Space Grotesk) carries      */
/*  the personality; IBM Plex Mono renders every metric, credit count, */
/*  and rating like a data readout — the platform's signature device,  */
/*  reused consistently from the hero stat cards through to CPD        */
/*  credits and certificate numbers.                                   */
/*                                                                     */
/*  Palette: white / mist green / emerald / clinical blue / slate.     */
/*  No dark theme, per brief.                                          */
/* ------------------------------------------------------------------ */

/* ----------------------------- Data -------------------------------- */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Clinic", href: "#clinic" },
  { label: "Services", href: "#services" },
  { label: "CPD Academy", href: "#academy" },
  { label: "Courses", href: "#courses" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Research", href: "#research" },
  { label: "Blog", href: "#research" },
  { label: "Contact", href: "#contact" },
];

const HERO_STATS = [
  { value: "4.9", suffix: "/5", label: "Patient rating", icon: Star },
  { value: "20,000", suffix: "+", label: "Patients served", icon: Users },
  { value: "8,000", suffix: "+", label: "Professionals trained", icon: GraduationCap },
  { value: "150", suffix: "+", label: "CPD courses", icon: BookOpen },
];

const PARTNER_GROUPS = [
  {
    label: "Hospitals",
    names: ["Northfield General", "St. Amara Medical", "Lakeside Regional", "Union Health"],
  },
  {
    label: "Universities",
    names: ["Belmore University", "Kavanti Institute", "Redcliff College", "Aster State University"],
  },
  {
    label: "NGOs",
    names: ["Global Nutrition Alliance", "FeedForward", "Wellness Without Borders"],
  },
  {
    label: "Government",
    names: ["Ministry of Health Programs", "National Nutrition Council"],
  },
  {
    label: "Corporate",
    names: ["Harrow & Finch", "Beacon Logistics", "Ferro Industries", "Clarity Bank"],
  },
];

const CORE_VALUES = [
  {
    title: "Evidence over trend",
    copy: "Every protocol and every course module is built on peer-reviewed research, not the nutrition trend of the month.",
    icon: FlaskConical,
  },
  {
    title: "Access without compromise",
    copy: "Clinical-grade care and accredited training, priced and scheduled so distance and cost stop being the barrier.",
    icon: Globe2,
  },
  {
    title: "Practitioners, not influencers",
    copy: "Every clinician on our platform is licensed and verified; every instructor teaches from real caseload experience.",
    icon: ShieldCheck,
  },
];

const SERVICES = [
  {
    title: "Nutrition Assessment",
    desc: "A full intake: labs, history, and lifestyle, reviewed by a registered dietitian before any plan is written.",
    icon: ClipboardList,
  },
  {
    title: "Weight Management",
    desc: "Structured, medically supervised programs built around sustainable change rather than short-term loss.",
    icon: Scale,
  },
  {
    title: "Clinical Nutrition",
    desc: "Nutrition therapy for diabetes, renal disease, cardiovascular conditions, and other diagnosed conditions.",
    icon: Stethoscope,
  },
  {
    title: "Sports Nutrition",
    desc: "Performance-focused fueling plans for competitive athletes, built around training load and recovery.",
    icon: Dumbbell,
  },
  {
    title: "Child Nutrition",
    desc: "Growth-stage feeding guidance for infants through teens, developed with pediatric dietitians.",
    icon: Baby,
  },
  {
    title: "Pregnancy Nutrition",
    desc: "Trimester-specific plans supporting maternal health and fetal development, coordinated with your OB.",
    icon: HeartPulse,
  },
  {
    title: "Corporate Wellness",
    desc: "On-site and virtual nutrition programs that lower absenteeism and support employee health metrics.",
    icon: Building2,
  },
  {
    title: "Telehealth",
    desc: "Full consultations over secure video, with the same clinical rigor as an in-person visit.",
    icon: Video,
  },
  {
    title: "Meal Planning",
    desc: "Weekly, budget-aware meal plans generated from your labs, preferences, and household size.",
    icon: Salad,
  },
  {
    title: "Laboratory Interpretation",
    desc: "A dietitian walks you through your bloodwork in plain language and turns it into next steps.",
    icon: FlaskConical,
  },
  {
    title: "Lifestyle Coaching",
    desc: "Ongoing, one-on-one coaching on sleep, stress, and daily habits, built to support your nutrition plan long term.",
    icon: Sparkles,
  },
];

const WHY_CHOOSE_US = [
  { title: "Evidence-based care", icon: FlaskConical },
  { title: "Certified professionals", icon: BadgeCheck },
  { title: "Personalized plans", icon: ClipboardList },
  { title: "Digital health records", icon: FileText },
  { title: "Teleconsultations", icon: Video },
  { title: "Affordable care", icon: HeartPulse },
  { title: "Accredited CPD", icon: GraduationCap },
  { title: "Online learning", icon: MonitorPlay },
  { title: "Certificate verification", icon: ShieldCheck },
];

const STATISTICS = [
  { value: 20000, suffix: "+", label: "Patients served" },
  { value: 150, suffix: "+", label: "Courses" },
  { value: 8000, suffix: "+", label: "Certificates issued" },
  { value: 35, suffix: "+", label: "Nutrition experts" },
  { value: 50, suffix: "+", label: "Countries reached" },
];

const CPD_COURSES = [
  {
    title: "Clinical Nutrition Foundations",
    instructor: "Dr. Amara Nkusi, RD, PhD",
    credits: 12,
    duration: "6 weeks",
    students: "2,140",
    price: "$149",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Sports Nutrition for Performance",
    instructor: "Coach Lena Bauer, MSc",
    credits: 10,
    duration: "5 weeks",
    students: "1,860",
    price: "$129",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Renal Nutrition Management",
    instructor: "Dr. Priya Raman, RD",
    credits: 14,
    duration: "7 weeks",
    students: "980",
    price: "$169",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Diabetes Nutrition Management",
    instructor: "ALPHONSINE KANZAYIRE, RD, CDE",
    credits: 12,
    duration: "6 weeks",
    students: "2,410",
    price: "$149",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Pediatric Nutrition Essentials",
    instructor: "Dr. Hana Kobayashi, RD",
    credits: 10,
    duration: "5 weeks",
    students: "1,320",
    price: "$129",
    rating: "4.7",
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Maternal & Perinatal Nutrition",
    instructor: "Dr. Elena Cross, RD, IBCLC",
    credits: 12,
    duration: "6 weeks",
    students: "1,540",
    price: "$149",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1595924692361-53cc4173977f?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Food Safety & Hygiene",
    instructor: "Marcus Feldt, MPH",
    credits: 8,
    duration: "3 weeks",
    students: "3,210",
    price: "$89",
    rating: "4.6",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Public Health Nutrition",
    instructor: "Dr. Grace Mwangi, MPH, RD",
    credits: 14,
    duration: "8 weeks",
    students: "1,110",
    price: "$169",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=700&q=80&auto=format&fit=crop",
  },
];

const LEARNING_FEATURES = [
  { title: "Video lessons", desc: "Bite-sized, expert-recorded lectures you can rewatch anytime.", icon: MonitorPlay },
  { title: "Live classes", desc: "Scheduled sessions with real-time Q&A alongside your cohort.", icon: Video },
  { title: "Assignments", desc: "Applied case studies reviewed with instructor feedback.", icon: ClipboardList },
  { title: "Quizzes", desc: "Short knowledge checks after every module to lock in learning.", icon: HelpCircle },
  { title: "Exams", desc: "Proctored final assessments required for CPD accreditation.", icon: ListChecks },
  { title: "Certificates", desc: "A verifiable, shareable credential issued on completion.", icon: Trophy },
  { title: "Progress tracking", desc: "A dashboard view of every module, score, and hour logged.", icon: BarChart3 },
  { title: "Downloads", desc: "Slide decks, reference sheets, and templates for offline use.", icon: FolderDown },
  { title: "Discussion forum", desc: "A moderated space to ask questions and compare notes.", icon: MessagesSquare },
];

const WEBINARS = [
  {
    title: "Reading Inflammatory Markers in Practice",
    date: "Aug 21, 2026",
    time: "5:00 PM CAT",
    speaker: "Dr. Amara Nkusi, RD, PhD",
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Nutrition Strategy for Type 2 Remission",
    date: "Sep 4, 2026",
    time: "6:00 PM CAT",
    speaker: "ALPHONSINE KANZAYIRE, RD, CDE",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Building a Corporate Wellness Program That Sticks",
    date: "Sep 18, 2026",
    time: "4:00 PM CAT",
    speaker: "ALPHONSINE KANZAYIRE, MPH, RD",
    img: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=700&q=80&auto=format&fit=crop",
  },
];

const MARKETPLACE_CATEGORIES = [
  { title: "Healthy Foods", desc: "Pantry staples and prepared meals vetted by our dietitians.", icon: Salad },
  { title: "Supplements", desc: "Practitioner-formulated supplements for common deficiencies.", icon: FlaskConical },
  { title: "Meal Plans", desc: "Downloadable, condition-specific plans ready to follow this week.", icon: ClipboardList },
  { title: "Books", desc: "Clinical and consumer nutrition titles from our own faculty.", icon: BookOpen },
  { title: "Equipment", desc: "Kitchen scales, portion tools, and home-testing kits.", icon: Equipment },
  { title: "Digital Products", desc: "Trackers, templates, and planners you can use immediately.", icon: Download },
];

const EXPERTS = [
  {
    name: "ALPHONSINE KANZAYIRE",
    qualification: "RD, PhD",
    focus: "Clinical Nutrition",
    experience: "14 yrs",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80&auto=format&fit=crop",
  },
  {
    name: "ALPHONSINE KANZAYIRE",
    qualification: "RD, CDE",
    focus: "Diabetes & Metabolic Health",
    experience: "11 yrs",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80&auto=format&fit=crop",
  },
  {
    name: "ALPHONSINE KANZAYIRE",
    qualification: "RD",
    focus: "Renal Nutrition",
    experience: "9 yrs",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80&auto=format&fit=crop",
  },
  {
    name: "ALPHONSINE KANZAYIRE",
    qualification: "MSc Sports Nutrition",
    focus: "Athletic Performance",
    experience: "8 yrs",
    img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&q=80&auto=format&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "My A1C dropped for the first time in six years, and it's the first plan I've actually been able to keep up with.",
    name: "Marie T.",
    role: "Patient, Diabetes Nutrition Program",
  },
  {
    quote:
      "The CPD Academy courses are the most clinically rigorous continuing education I've taken online, and the credits transferred without a single issue.",
    name: "James O.",
    role: "Registered Dietitian, Course Graduate",
  },
  {
    quote:
      "We rolled RUNUTRIDIET out to 400 employees. Sick-day requests tied to metabolic issues dropped within the first quarter.",
    name: "Aline K.",
    role: "HR Director, Corporate Wellness Client",
  },
];

const ARTICLES = [
  {
    title: "What Your Fasting Glucose Actually Tells You",
    category: "Nutrition Tips",
    date: "Jul 28, 2026",
    img: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "A Dietitian's Guide to Reading a Lipid Panel",
    category: "Medical Research",
    date: "Jul 19, 2026",
    img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Iron Deficiency Is Common and Commonly Missed",
    category: "Clinical Insight",
    date: "Jul 6, 2026",
    img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=700&q=80&auto=format&fit=crop",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Clinic",
    links: ["Book a Consultation", "Our Dietitians", "Conditions We Treat", "Telehealth"],
  },
  {
    title: "Courses",
    links: ["Browse Courses", "Become an Instructor", "CPD Accreditation", "Verify a Certificate"],
  },
  {
    title: "Marketplace",
    links: ["Supplements", "Meal Plans", "Digital Products", "Track an Order"],
  },
  {
    title: "Resources",
    links: ["Research & Blog", "Webinars", "Help Center", "Partner With Us"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Clinical Disclaimer", "Accessibility"],
  },
];

/* --------------------------- Animations ----------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ----------------------------- Helpers -------------------------------- */

function Reveal({ children, className = "", once = true, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

function Stagger({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

/** Signature "readout" chip: monospace metric used across hero, stats,
 *  and CPD credit/rating badges — the platform's recurring data device. */
function Readout({ value, label, className = "" }) {
  return (
    <div className={`font-mono ${className}`}>
      <div className="text-sm font-semibold text-emerald-800">{value}</div>
      {label && <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>}
    </div>
  );
}

function useCountUp(target, isInView, duration = 1.4) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);
  return value;
}

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const count = useCountUp(value, isInView);
  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-4 h-40 rounded-xl bg-slate-100" />
      <div className="mb-2 h-4 w-3/4 rounded bg-slate-100" />
      <div className="h-3 w-1/2 rounded bg-slate-100" />
    </div>
  );
}

/* ------------------------------ Navbar -------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-slate-200 bg-white/90 backdrop-blur-md shadow-sm" : "border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white-700 text-white">
            <ApplicationLogo className="block h-9 w-9 max-h-6 max-w-6 object-contain" />
          </span>
         
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 focus-visible:text-emerald-700"
            >
              {link.label}
            </a>
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
          <a
            href="#book"
            className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-800/20 transition-transform hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            Book Consultation
          </a>
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
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {link.label}
                </a>
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
                <a
                  href="#book"
                  className="rounded-full bg-emerald-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Book Consultation
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      {/* Parallax-style ambient background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-emerald-100/70 blur-3xl"
        animate={{ y: [0, 24, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-14 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Clinically led · Academically accredited
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
            Transforming Health Through{" "}
            <span className="text-emerald-700">Clinical Nutrition</span> &{" "}
            <span className="text-sky-700">Professional Education</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Evidence-based nutrition care, accredited CPD training, and
            verifiable professional certifications — from one trusted
            platform built by registered dietitians and public health
            educators.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-800/20 transition-transform hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              Book Consultation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
            >
              Explore Courses
            </a>
            <a
              href="#verify"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-slate-600 hover:text-emerald-700"
            >
              Verify Certificate
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-100">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1000&q=80&auto=format&fit=crop"
              alt="Registered dietitian reviewing a nutrition plan with a patient in a bright clinic room"
              className="h-[420px] w-full object-cover sm:h-[480px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -left-6 top-8 hidden rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-slate-100 backdrop-blur sm:block"
          >
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              ))}
            </div>
            <Readout value="4.9 / 5" label="Patient rating" className="mt-1" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating stat cards */}
      <div className="relative mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {HERO_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 transition-shadow hover:shadow-md sm:p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <stat.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <div className="font-mono text-lg font-semibold text-slate-900">
                  {stat.value}
                  <span className="text-emerald-700">{stat.suffix}</span>
                </div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* --------------------------- Trusted Partners --------------------------- */

function TrustedPartners() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted by hospitals, universities, NGOs, government and corporate partners
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNER_GROUPS.map((group, gi) => (
            <Reveal key={group.label} className="text-center sm:text-left" amount={0.1}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                {group.label}
              </p>
              <ul className="space-y-1.5">
                {group.names.map((name) => (
                  <li key={name} className="font-display text-sm font-medium text-slate-500">
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- About --------------------------------- */

function About() {
  return (
    <section id="clinic" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              About RUNUTRIDIET
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A clinic and an academy, built on the same evidence.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              RUNUTRIDIET began as a single nutrition clinic and grew into an
              integrated platform because our patients and our students kept
              asking for the same thing: care and education they could
              actually trust. Today we run clinical consultations,
              corporate wellness programs, and an accredited CPD academy
              from the same evidence base — reviewed by the same panel of
              registered dietitians and public health researchers.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Mission</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Make evidence-based nutrition care and training accessible
                  everywhere it's needed.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Vision</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  A world where nutrition guidance is always clinically
                  grounded, never guesswork.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Values</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Evidence, access, and practitioner accountability, in that
                  order.
                </p>
              </div>
            </div>
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-1">
            {CORE_VALUES.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-700">
                  <value.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-slate-900">
                    {value.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {value.copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Services -------------------------------- */

function Services() {
  return (
    <section id="services" className="bg-slate-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Services
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Clinical support for every stage of life.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {service.desc}
              </p>
              <a
                href="#book"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Learn more
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Why Choose Us ------------------------------ */

function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-700">
            Why Choose Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Every credential, verified. Every plan, personal.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold text-slate-800">{item.title}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------- Statistics ------------------------------- */

function Statistics() {
  return (
    <section className="bg-emerald-800 py-16 text-white lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Stagger className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          {STATISTICS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="font-mono text-3xl font-semibold sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-wide text-emerald-100/80 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------- CPD Academy ------------------------------ */

function CourseCard({ course }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.img}
          alt={`Illustration for the ${course.title} course`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-800 shadow-sm">
          {course.credits} CPD credits
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold leading-snug text-slate-900">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{course.instructor}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden="true" /> {course.students}
          </span>
          <span className="inline-flex items-center gap-1 text-amber-600">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> {course.rating}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="font-mono text-lg font-semibold text-slate-900">{course.price}</span>
          <a
            href="#enroll"
            className="rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            Enroll
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function CPDAcademy() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="academy" className="bg-gradient-to-b from-sky-50/70 to-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-700">
              CPD Academy
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Accredited continuing education, taught by practicing clinicians.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Every course carries verified CPD credit, is reviewed by our
              accreditation board annually, and ends in a certificate you can
              publicly verify.
            </p>
          </Reveal>
          <div id="courses" className="flex gap-3">
            <a
              href="#all-courses"
              className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
            >
              Browse Courses
            </a>
            <a
              href="#instructor"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
            >
              Become Instructor
            </a>
          </div>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loaded
            ? CPD_COURSES.map((course) => <CourseCard key={course.title} course={course} />)
            : Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Learning Features --------------------------- */

function LearningFeatures() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Learning Experience
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Built like a classroom, tracked like a chart.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {LEARNING_FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-700">
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-slate-900">
                  {feature.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------- Webinars --------------------------------- */

function Webinars() {
  return (
    <section className="bg-slate-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Upcoming Webinars
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Free sessions with our clinical faculty.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WEBINARS.map((webinar) => (
            <motion.div
              key={webinar.title}
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-shadow hover:shadow-lg"
            >
              <div className="relative h-40">
                <img
                  src={webinar.img}
                  alt={`Promotional image for the webinar ${webinar.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-800 shadow-sm">
                  <Calendar className="h-3 w-3" aria-hidden="true" /> {webinar.date}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold leading-snug text-slate-900">
                  {webinar.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-500">
                  {webinar.speaker} &middot; {webinar.time}
                </p>
                <a
                  href="#register"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Register
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------ Marketplace --------------------------------- */

function Marketplace() {
  return (
    <section id="marketplace" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-700">
            Nutrition Marketplace
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything your plan calls for, in one place.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETPLACE_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                <cat.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">
                {cat.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{cat.desc}</p>
              <a
                href="#shop"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Browse {cat.title.toLowerCase()}
              </a>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------- Experts ------------------------------------ */

function Experts() {
  return (
    <section className="bg-slate-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Meet Our Experts
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Licensed, verified, and practicing.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTS.map((expert, i) => (
            <motion.div
              key={expert.id ?? `${expert.name}-${i}`}
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-shadow hover:shadow-lg"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={expert.img}
                  alt={`Portrait of ${expert.name}, ${expert.qualification}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-slate-900">
                  {expert.name}
                </h3>
                <p className="text-sm text-emerald-700">{expert.qualification}</p>
                <p className="mt-2 text-sm text-slate-600">{expert.focus}</p>
                <Readout value={expert.experience} label="Experience" className="mt-3" />
                <a
                  href="#book"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Book Appointment
                </a>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ----------------------------- Success Stories -------------------------------- */

function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  );

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="py-20 lg:py-28" aria-roledescription="carousel" aria-label="Patient and professional testimonials">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Quote className="mx-auto h-9 w-9 text-emerald-200" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <blockquote className="mt-6 font-display text-2xl font-medium leading-snug text-slate-800 sm:text-3xl">
              &ldquo;{TESTIMONIALS[index].quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-slate-900">
              {TESTIMONIALS[index].name}
            </p>
            <p className="text-sm text-slate-500">{TESTIMONIALS[index].role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-emerald-600 hover:text-emerald-700"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-emerald-700" : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-emerald-600 hover:text-emerald-700"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Research & Blog -------------------------------- */

function ResearchBlog() {
  return (
    <section id="research" className="bg-slate-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Research &amp; Blog
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Nutrition tips and medical research, in plain language.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <motion.article
              key={article.title}
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-shadow hover:shadow-lg"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={article.img}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {article.category}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug text-slate-900">
                  {article.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">{article.date}</span>
                  <a
                    href="#read"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Read more
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------- App CTA ---------------------------------- */

function AppCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-800 px-8 py-14 text-white sm:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-600/40 blur-3xl"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
                Mobile App
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Your plan, your courses, your certificates — in your pocket.
              </h2>
              <p className="mt-4 max-w-md text-emerald-50/90">
                Track meals, join live classes, and message your dietitian
                from anywhere with the RUNUTRIDIET app.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#playstore"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <PlayCircle className="h-5 w-5" aria-hidden="true" />
                  Google Play
                </a>
                <a
                  href="#appstore"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <Apple className="h-5 w-5" aria-hidden="true" />
                  App Store
                </a>
              </div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-40 rounded-[2rem] border-4 border-white/20 bg-emerald-700/60 p-2 shadow-2xl sm:w-48"
            >
              <div className="overflow-hidden rounded-[1.4rem]">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80&auto=format&fit=crop"
                  alt="RUNUTRIDIET mobile app showing a daily nutrition dashboard"
                  className="h-72 w-full object-cover sm:h-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Newsletter --------------------------------- */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-16">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Mail className="mx-auto h-8 w-8 text-emerald-700" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
          Nutrition insight, straight to your inbox.
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          One email a month: research summaries, new courses, and clinic updates.
        </p>

        {submitted ? (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            You're subscribed — welcome aboard.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-800 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
            <button
              type="submit"
              className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* -------------------------------- Final CTA ----------------------------------- */

function FinalCTA() {
  return (
    <section id="book" className="py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Start Your Journey Toward Better Health
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            Whether you need a clinician or a credential, RUNUTRIDIET starts
            with the same first step: a conversation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#book-now"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-800/20 transition-transform hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              Book Consultation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#academy"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
            >
              Explore CPD Academy
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Footer ------------------------------------- */

function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white pt-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)] lg:gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-white">
                <ApplicationLogo className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-semibold text-slate-900">
                RUNUTRIDIET
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Clinical nutrition care and accredited professional education,
              on one platform. Not a substitute for emergency medical care.
            </p>
            <div className="mt-5 space-y-2 text-sm text-slate-500">
              <p className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-700" aria-hidden="true" /> info@runutridiet.com
              </p>
              <p className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-700" aria-hidden="true" /> +250 785 221 105
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-700" aria-hidden="true" /> Kigali, Rwanda
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#social"
                  aria-label="Social media link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-emerald-600 hover:text-emerald-700"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-sm font-semibold text-slate-900">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-emerald-700">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 py-6 text-xs text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} RUNUTRIDIET. All rights reserved.</p>
          <p>Registered dietitians · Licensed clinicians · Accredited CPD provider</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Scroll to Top ----------------------------------- */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------ Page --------------------------------------- */

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Navbar />
      <main>
        <Hero />
        <TrustedPartners />
        <About />
        <Services />
        <WhyChooseUs />
        <Statistics />
        <CPDAcademy />
        <LearningFeatures />
        <Webinars />
        <Marketplace />
        <Experts />
        <Testimonials />
        <ResearchBlog />
        <AppCTA />
        <Newsletter />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}