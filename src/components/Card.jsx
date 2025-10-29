export default function Card({ children, className = "" }) {
  return <div className={`card rounded-2xl p-4 ${className}`}>{children}</div>;
}
