import Image from "next/image";

export default function FluidBackground({
  src,
  className = "",
  priority = false,
  objectPosition = "center",
}: {
  src: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="scale-105 object-cover"
        style={{ objectPosition }}
      />
      {/* vignette suave: deja ver el color, oscurece bordes para legibilidad */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 90% at 50% 45%, transparent 35%, color-mix(in srgb, var(--deep-code) 78%, transparent) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 55%, var(--deep-code) 100%)",
        }}
      />
    </div>
  );
}
