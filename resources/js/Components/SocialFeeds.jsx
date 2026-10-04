// resources/js/Components/SocialFeeds.jsx
// Homepage social feed for RUNUTRIDIET. Matches Home.jsx (emerald/sky, Space Grotesk, Plex Mono readouts).
// No third-party embeds or scripts: posts come from your own server via Inertia props.
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, MessageCircle, Play, ExternalLink } from "lucide-react";

const PLATFORMS = {
  instagram: { label: "Instagram", icon: Instagram, color: "text-pink-600", bg: "bg-pink-50" },
  facebook: { label: "Facebook", icon: Facebook, color: "text-blue-600", bg: "bg-blue-50" },
  x: { label: "X", icon: Twitter, color: "text-slate-900", bg: "bg-slate-100" },
  youtube: { label: "YouTube", icon: Youtube, color: "text-red-600", bg: "bg-red-50" },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, color: "text-green-600", bg: "bg-green-50" },
};

const TONES = ["from-emerald-700 to-teal-600", "from-sky-700 to-emerald-600", "from-teal-700 to-emerald-800"];
const PAGE_SIZE = 6;

const safeUrl = (u) => {
  try {
    const url = new URL(u);
    return url.protocol === "https:" ? url.href : "#";
  } catch {
    return "#";
  }
};
const imageUrl = (p) => {
  if (!p) return null;
  if (/^(https?:)?\/\//.test(p) || p.startsWith("/")) return p;
  return `/storage/${p}`;
};
const compact = (n = 0) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

function PostCard({ post, index, lead }) {
  const meta = PLATFORMS[post.platform];
  if (!meta) return null;
  const Icon = meta.icon;
  const src = imageUrl(post.image);
  const hasMedia = post.type !== "text";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex min-w-0 ${lead ? "sm:col-span-2" : ""}`}
    >
      <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-shadow hover:shadow-lg">
        {hasMedia && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
            {src ? (
              <img
                src={src}
                alt={post.imageAlt || ""}
                width="640"
                height="400"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = "none"; }}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${TONES[index % TONES.length]} px-6 text-center font-display text-xl font-semibold leading-tight text-white`}>
                {post.headline}
              </div>
            )}
            {post.type === "video" && (
              <span aria-hidden="true" className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-emerald-800 shadow">
                <Play className="h-4 w-4 fill-current" />
              </span>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-3">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${meta.bg} ${meta.color}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{post.author}</p>
              <p className="font-mono text-[11px] text-slate-500">{meta.label} · {post.time}</p>
            </div>
          </div>

          <p className={`break-words text-slate-700 ${lead ? "line-clamp-6 text-base leading-relaxed" : "line-clamp-4 text-sm leading-relaxed"}`}>
            {post.text}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="font-mono text-xs text-slate-500">
              {compact(post.likes)} likes · {compact(post.comments)} comments
            </span>
            <a
              href={safeUrl(post.url)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={`View post by ${post.author} on ${meta.label} (opens in new tab)`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              View post <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export default function SocialFeeds({
  posts = [],
  title = "Fresh from our social channels",
  subtitle = "Nutrition tips, clinic news and course updates, posted this week.",
}) {
  const [filter, setFilter] = useState("all");
  const [shown, setShown] = useState(PAGE_SIZE);

  const channels = useMemo(
    () => ["all", ...Object.keys(PLATFORMS).filter((k) => posts.some((p) => p.platform === k))],
    [posts]
  );
  const list = useMemo(() => posts.filter((p) => filter === "all" || p.platform === filter), [posts, filter]);
  const visible = list.slice(0, shown);

  // No posts: render nothing, so the homepage never shows an empty block.
  if (!posts.length) return null;

  return (
    <section id="social" aria-labelledby="social-feeds-title" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Community</span>
            <h2 id="social-feeds-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base text-slate-600">{subtitle}</p>
          </div>

          <div role="group" aria-label="Filter posts by channel" className="flex flex-wrap gap-2">
            {channels.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={filter === k}
                onClick={() => { setFilter(k); setShown(PAGE_SIZE); }}
                className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                  filter === k
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-emerald-600 hover:text-emerald-700"
                }`}
              >
                {k === "all" ? "All" : PLATFORMS[k].label}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} of {list.length} posts
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} lead={i === 0 && filter === "all"} />
            ))}
          </AnimatePresence>
        </ul>

        {list.length > shown && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="min-h-[44px] rounded-full bg-emerald-700 px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              Show more posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
}