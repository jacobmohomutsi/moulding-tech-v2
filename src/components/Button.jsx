import clsx from "clsx";

export default function Button({ as = "a", href = "#", children, variant = "primary", className = "", ...props }) {
  const Tag = as;
  return (
    <Tag
      href={Tag === "a" ? href : undefined}
      className={clsx("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
