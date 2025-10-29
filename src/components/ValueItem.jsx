export default function ValueItem({ code, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-lg border border-dashed border-[#9edbff] bg-[#e6f6ff] font-bold text-[#033]">
        {code}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm opacity-90">{desc}</div>
      </div>
    </div>
  );
}
