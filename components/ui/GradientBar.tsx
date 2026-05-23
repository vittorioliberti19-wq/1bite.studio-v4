export default function GradientBar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`h-[2px] w-full rounded-full ${className}`}
      style={{ background: "var(--grad-firma)" }}
    />
  );
}
