import Image from "next/image";

export default function WorkCard({
  marca,
  tipo,
  img,
}: {
  marca: string;
  tipo: string;
  img: string;
}) {
  return (
    <div
      data-cursor
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
    >
      <Image
        src={img}
        alt={marca}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-5 left-5">
        <p className="text-xl font-bold">{marca}</p>
        <p className="text-sm text-white/70">{tipo}</p>
      </div>
    </div>
  );
}
