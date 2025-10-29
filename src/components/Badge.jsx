export default function Badge({ children }) {
  return (
    <span className="inline-block rounded-full bg-[#e8eef6] px-2.5 py-1 text-xs font-medium">
      {children}
    </span>
  );
}
