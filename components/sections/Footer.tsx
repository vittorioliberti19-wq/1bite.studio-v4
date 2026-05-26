import GradientBar from "@/components/ui/GradientBar";

export default function Footer() {
  return (
    <footer className="px-6 py-16">
      <GradientBar className="mb-8" />
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 md:flex-row">
        <p>© 2026 1bite Studio · Maracaibo, Venezuela</p>
        <p className="text-xs uppercase tracking-[0.2em]">
          Branding · Social · Web · Apps · Audiovisual
        </p>
        <a href="https://instagram.com/1bite.studio" data-cursor>
          @1bite.studio
        </a>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          build v6 · flying logo
        </span>
      </div>
    </footer>
  );
}
