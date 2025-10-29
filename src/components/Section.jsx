export default function Section({ className = "", children, id }) {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  );
}
