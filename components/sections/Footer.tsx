import GradientBar from "@/components/ui/GradientBar";

export default function Footer() {
  return (
    <footer className="px-6 py-16">
      <GradientBar className="mb-8" />
      <div className="relative flex flex-col items-center gap-4 text-sm text-white/60 md:flex-row md:justify-between">
        <p>© 2026 1bite Studio · Maracaibo, Venezuela</p>
        {/* servicios centrados en la página (alineados con el botón glass) */}
        <p className="text-xs uppercase tracking-[0.2em] md:absolute md:left-1/2 md:-translate-x-1/2">
          Branding · Social · Web · Apps · Audiovisual
        </p>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com/1bite.studio" data-cursor>
            @1bite.studio
          </a>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            build v8
          </span>
        </div>
      </div>
    </footer>
  );
}
