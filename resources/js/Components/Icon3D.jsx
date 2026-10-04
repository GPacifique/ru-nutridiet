// resources/js/Components/Icon3D.jsx
// Glossy 3D-style icon tile. Pass src="/images/3d/name.png" to use real 3D artwork instead.
import React from "react";

export const TONES = {
    emerald: ["#86EFAC", "#16A34A", "#14532D"],
    teal: ["#5EEAD4", "#0D9488", "#134E4A"],
    sky: ["#7DD3FC", "#0284C7", "#0C4A6E"],
    violet: ["#C4B5FD", "#7C3AED", "#3B0764"],
    amber: ["#FDE68A", "#F59E0B", "#78350F"],
    rose: ["#FDA4AF", "#E11D48", "#881337"],
    orange: ["#FDBA74", "#EA580C", "#7C2D12"],
};

export const TINTS = {
    emerald: "from-emerald-100 via-emerald-50 to-white",
    teal: "from-teal-100 via-teal-50 to-white",
    sky: "from-sky-100 via-sky-50 to-white",
    violet: "from-violet-100 via-violet-50 to-white",
    amber: "from-amber-100 via-amber-50 to-white",
    rose: "from-rose-100 via-rose-50 to-white",
    orange: "from-orange-100 via-orange-50 to-white",
};

export default function Icon3D({ icon: Icon, tone = "emerald", size = 48, src, alt = "", className = "" }) {
    if (src) {
        return <img src={src} alt={alt} width={size} height={size} loading="lazy" className={className} style={{ width: size, height: size }} />;
    }
    const [c1, c2, c3] = TONES[tone] || TONES.emerald;
    return (
        <span
            aria-hidden="true"
            className={`icon3d relative inline-grid shrink-0 place-items-center ${className}`}
            style={{
                width: size,
                height: size,
                borderRadius: size * 0.3,
                background: `linear-gradient(145deg, ${c1} 0%, ${c2} 58%, ${c3} 120%)`,
                boxShadow: `0 ${size * 0.22}px ${size * 0.4}px -${size * 0.12}px ${c2}aa, inset 0 2px 2px rgba(255,255,255,.75), inset 0 -${size * 0.1}px ${size * 0.14}px rgba(0,0,0,.28)`,
            }}
        >
            <span
                className="pointer-events-none absolute"
                style={{ left: "10%", top: "6%", width: "80%", height: "42%", borderRadius: "999px", background: "linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,0))" }}
            />
            <Icon className="relative text-white" style={{ width: size * 0.5, height: size * 0.5, filter: "drop-shadow(0 2px 2px rgba(0,0,0,.35))" }} strokeWidth={2.2} />
        </span>
    );
}