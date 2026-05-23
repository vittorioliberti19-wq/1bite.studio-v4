export default function DeptCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div
      data-cursor
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition duration-500 hover:border-white/30"
    >
      <div
        className="absolute -inset-px -z-10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-30"
        style={{ background: "var(--grad-firma)" }}
      />
      <h3 className="text-3xl font-bold">{title}</h3>
      <p className="mt-3 text-sm text-white/70">{desc}</p>
    </div>
  );
}
