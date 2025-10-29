import Card from "./Card";

export default function ServiceCard({ title, desc, icon: Icon }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="grid min-h-[110px] place-items-center rounded-xl border border-dashed border-[#c5d4e7] bg-[#f0f5fb] text-[#3f6b9b]">
        {Icon ? <Icon size={48} strokeWidth={1.75} /> : "[ Icon ]"}
      </div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm opacity-90">{desc}</p>
    </Card>
  );
}
