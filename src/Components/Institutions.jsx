export default function Institutions() {
  const logos = [
    { src: "/logos/inst-frameboxx.png", alt: "Frameboxx Institute of Emerging Media" },
    { src: "/logos/inst-rifti.png",     alt: "RIFTI – Rotomaker International Film & Television Institute" },
    { src: "/logos/inst-childrens.png", alt: "The Childrens Fine Art Gallery" },
  ];

  return (
    <section className="w-full bg-[#0B0F10] py-16 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-12">
        <h2 className="text-white font-bold text-2xl md:text-3xl text-center">
          Institutions we serve
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-16 md:h-20 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
