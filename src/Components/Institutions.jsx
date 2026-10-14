export default function Institutions() {
  return (
    <section className="w-full bg-[#0B0F10] py-16 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-12">
        {/* Title */}
        <h2 className="text-white font-bold text-2xl md:text-3xl text-center">
          Institutions we serve
        </h2>

        {/* Logos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 w-full">

          {/* FRAMEBOXX */}
          <div className="flex items-center justify-center bg-[#F5C400] px-8 py-4 rounded-md">
            <div className="text-center">
              <p className="text-black font-black text-3xl tracking-tight leading-none">FRAMEBOXX</p>
              <p className="text-black text-[9px] font-semibold tracking-[0.15em] uppercase mt-1">
                Institute of Emerging Media
              </p>
            </div>
          </div>

          {/* RIFTI */}
          <div className="flex items-center gap-3">
            <svg width="60" height="60" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="70" height="70" rx="4" fill="#1a1a1a"/>
              <rect x="8" y="22" width="54" height="38" rx="3" fill="white"/>
              <rect x="8" y="12" width="54" height="12" rx="2" fill="white"/>
              <rect x="15" y="12" width="6" height="12" fill="black"/>
              <rect x="27" y="12" width="6" height="12" fill="black"/>
              <rect x="39" y="12" width="6" height="12" fill="black"/>
              <rect x="51" y="12" width="6" height="12" fill="black"/>
              <text x="35" y="43" textAnchor="middle" fill="black" fontSize="14" fontWeight="bold" fontFamily="sans-serif">RIFTI</text>
            </svg>
            <div>
              <p className="text-white font-black text-xl tracking-wide leading-tight">RIFTI</p>
              <p className="text-white/70 text-[9px] font-medium uppercase tracking-wide leading-tight max-w-[140px]">
                Rotomaker International<br />Film & Television Institute
              </p>
            </div>
          </div>

          {/* The Childrens Fine Art Gallery */}
          <div className="leading-tight text-left">
            <p className="text-white font-bold text-2xl leading-snug">The</p>
            <p className="font-bold text-2xl leading-snug" style={{ color: "#00CFCF" }}>Childrens</p>
            <p className="font-bold text-2xl leading-snug" style={{ color: "#FF8C00" }}>Fine Art</p>
            <p className="font-bold text-2xl leading-snug" style={{ color: "#FFD700" }}>Gallery</p>
          </div>

        </div>
      </div>
    </section>
  );
}
