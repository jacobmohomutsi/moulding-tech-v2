"use client";
import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import Container from "./Container";
import { Gauge, Timer, Ruler, Trophy, Factory } from "lucide-react";

function CountUp({ to = 100, suffix = "", duration = 1200 }) {
  const [val, setVal] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    if (to < 1) return; // don't animate fractional like 0.005
    let raf;
    const step = (t) => {
      if (!startRef.current) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      setVal(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{to < 1 ? to : val}{suffix}</span>;
}

const STATS = [
  { icon: Timer,   label: "On-time delivery",     value: 99,    suffix: "%",   note: "12-mo avg" },
  { icon: Ruler,   label: "Tolerance held",       value: 0.005, suffix: " mm", note: "CMM verified" },
  { icon: Gauge,   label: "Cycle-time reduction", value: 22,    suffix: "%",   note: "via SolidCAM" },
  { icon: Trophy,  label: "First-article pass",   value: 96,    suffix: "%",   note: "PPAP L3+" },
  { icon: Factory, label: "CNC uptime",           value: 97,    suffix: "%",   note: "rolling 90-day" },
];

export default function KpiSection() {
  return (
        <div className="">
          {/* Auto-fit grid: each tile min 180px, grow to 1fr; wraps neatly across sizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {STATS.map(({ icon: Icon, label, value, suffix, note }) => (
              <div
                key={label}
                className="group rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-black/5 transition-[box-shadow,transform] hover:shadow-md hover:-translate-y-[1px]"
              >
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <Icon size={18} strokeWidth={1.75} />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#3a6ea6]">
                    {label}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-1">
                  <div className="num text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-none text-[var(--blue)]">
                    <CountUp to={value} suffix={value < 1 ? "" : suffix} />
                  </div>
                  {value < 1 && (
                    <span className="translate-y-[2px] text-xs sm:text-sm text-gray-500">{suffix}</span>
                  )}
                </div>

                {note && <div className="mt-1 text-[11px] sm:text-xs text-gray-500">{note}</div>}
              </div>
            ))}
          </div>
        </div>
  );
}
