// components/ServiceBlock.jsx
import Card from "./Card";
import Image from "next/image";

export default function ServiceBlock({ idx, title, left, right, deliverables, icon: Icon, imgSrc }) {
  return (
    <Card className="rounded-2xl p-6">
      <h3 className="h3 mb-4">{idx}. {title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left visual */}
        <div className="grid min-h-[160px] place-items-center rounded-2xl bg-[#f0f5fb] ring-1 ring-[#c5d4e7]">
          {Icon && (
            <div className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5 text-[var(--accent)]">
              <Icon size={56} strokeWidth={1.75} />
            </div>
          )}
          {imgSrc && (
            <Image
              src={imgSrc}
              alt={title}
              width={360}
              height={220}
              className="h-auto w-auto max-w-[90%]"
              priority={false}
              style={{ filter: "grayscale(40%)" }}
            />
          )}
          {!Icon && !imgSrc && (left || "[ visual ]")}
        </div>

        {/* Right copy */}
        <div>
          <p className="mb-3">{right}</p>
          {deliverables && (
            <span className="inline-block rounded-full bg-[#e8eef6] px-3 py-1 text-xs font-medium">
              Deliverables: {deliverables}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
