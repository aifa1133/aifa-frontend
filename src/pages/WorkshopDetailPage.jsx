"use client";

import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { workshops } from "../data/workshops";

export default function WorkshopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find selected workshop
  const workshop = workshops.find((item) => item._id === id);

  // Always open page from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ==========================
  // WORKSHOP NOT FOUND
  // ==========================
  if (!workshop) {
    return (
      <main className="min-h-screen bg-[#0B0F10] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-white font-[Montserrat] text-[32px] md:text-[48px] font-black mb-5">
            Workshop Not Found
          </h1>

          <p className="text-[#9B9D9E] font-[Montserrat] mb-6">
            The workshop you're looking for is unavailable.
          </p>

          <button
            type="button"
            onClick={() => navigate("/workshops")}
            className="bg-[#D0E46A] text-[#0F1112] px-6 py-3 rounded-[8px] font-[Montserrat] font-black uppercase"
          >
            Back to Workshops
          </button>
        </div>
      </main>
    );
  }

  // ==========================
  // RESERVE / BOOK
  // ==========================
  const handleBooking = () => {
    const token = localStorage.getItem("aifa_token");

    if (!token) {
      alert("Please login or sign up to reserve your seat.");
      navigate("/login");
      return;
    }

    // Change this route if your checkout route is different
    navigate(`/workshops/${workshop._id}/checkout`);
  };

  return (
    <main className="min-h-screen bg-[#0B0F10] text-white font-[Montserrat]">
      {/* ==================================================
          HERO SECTION
      ================================================== */}
      <section className="pt-[30px] md:pt-[45px] pb-[45px] md:pb-[60px]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          {/* BREADCRUMB */}
          <div className="flex flex-wrap items-center gap-[7px] text-[11px] md:text-[12px] font-medium mb-[30px]">
            <Link
              to="/"
              className="text-[#8C8F90] hover:text-[#D0E46A] transition"
            >
              Home
            </Link>

            <span className="text-[#666A6B]">›</span>

            <Link
              to="/workshops"
              className="text-[#8C8F90] hover:text-[#D0E46A] transition"
            >
              Workshops
            </Link>

            <span className="text-[#666A6B]">›</span>

            <span className="text-[#D0E46A]">{workshop.title}</span>
          </div>

          {/* HERO CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-[40px] lg:gap-[80px] items-center">
            {/* LEFT SIDE */}
            <div>
              {/* LIMITED SEATS */}
              {workshop.limitedSeats && (
                <div className="inline-flex items-center gap-2 px-[10px] py-[5px] mb-[18px] rounded-[5px] bg-[#242918] border border-[#3A4225] text-[#D0E46A] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5px]">
                  <span>●</span>
                  LIMITED SEATS
                </div>
              )}

              {/* TITLE */}
              <h1 className="max-w-[680px] text-[#F1F1F1] text-[38px] leading-[42px] sm:text-[48px] sm:leading-[52px] md:text-[58px] md:leading-[62px] font-black tracking-[-1.5px]">
                {workshop.detailTitle}
              </h1>

              {/* DESCRIPTION */}
              <p className="max-w-[650px] mt-[18px] text-[#A3A6A7] text-[13px] md:text-[14px] leading-[22px] md:leading-[24px] font-medium">
                {workshop.description}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap items-center gap-[10px] mt-[22px]">
                {workshop.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-[5px] bg-[#222719] border border-[#353D22] text-[#D0E46A] px-[10px] py-[6px] rounded-[4px] text-[9px] md:text-[10px] font-bold"
                  >
                    <span>✓</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ==========================================
                RIGHT PRICE SECTION
            ========================================== */}
            <div className="w-full lg:max-w-[330px] lg:justify-self-end">
              {/* PRICE */}
              <div className="flex items-end gap-[10px] mb-[18px]">
                <span className="text-[#F2F2F2] text-[42px] md:text-[48px] leading-none font-black">
                  ₹{workshop.price}
                </span>

                {workshop.oldPrice && (
                  <span className="text-[#66696A] text-[20px] md:text-[22px] leading-none font-bold line-through mb-[4px]">
                    ₹{workshop.oldPrice}
                  </span>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleBooking}
                className="w-full flex justify-center items-center gap-2 bg-[#D0E46A] hover:bg-[#BDD253] text-[#0F1112] py-[13px] px-[24px] rounded-[6px] text-[12px] md:text-[13px] font-black uppercase transition-all duration-300"
              >
                RESERVE MY SEAT
                <span>→</span>
              </button>

              <p className="mt-[9px] text-[#686B6C] text-[8px] md:text-[9px] uppercase tracking-[0.5px]">
                Secure payment & instant access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          WORKSHOP IMAGE / VIDEO
      ================================================== */}
      <section className="pb-[60px] md:pb-[90px]">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          {/* IMAGE */}
          <div className="relative w-full overflow-hidden bg-[#16191A]">
            <img
              src={workshop.videoThumbnail || workshop.image}
              alt={`${workshop.title} preview`}
              className="w-full aspect-video object-cover object-center"
              onError={(e) => {
                if (e.currentTarget.src !== workshop.image) {
                  e.currentTarget.src = workshop.image;
                }
              }}
            />

            {/* PLAY BUTTON */}
            <button
              type="button"
              aria-label="Play workshop preview"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[75px] h-[50px] sm:w-[90px] sm:h-[60px] md:w-[105px] md:h-[68px] rounded-[5px] bg-[#D0E46A] text-[#101213] transition-transform duration-300 hover:scale-105"
            >
              <span className="text-[27px] md:text-[34px] ml-[3px]">▶</span>
            </button>
          </div>

          {/* ==================================================
              BOTTOM BOOKING BAR
          ================================================== */}
          <div className="bg-[#111415] border-t border-[#272B2C] px-[15px] md:px-[20px] py-[14px] flex flex-col sm:flex-row sm:items-center justify-between gap-[15px]">
            {/* LEFT */}
            <div>
              <div className="flex flex-wrap items-center gap-[8px]">
                <h2 className="text-[#F1F1F1] text-[12px] md:text-[14px] font-black uppercase">
                  {workshop.title}
                </h2>

                <span className="text-[#D0E46A] text-[14px] md:text-[16px] font-black">
                  ₹{workshop.price}
                </span>

                {workshop.oldPrice && (
                  <span className="text-[#646768] text-[10px] md:text-[11px] line-through font-bold">
                    ₹{workshop.oldPrice}
                  </span>
                )}
              </div>

              {workshop.limitedSeats && (
                <p className="mt-[3px] text-[#777A7B] text-[8px] md:text-[9px] uppercase font-medium">
                  LIMITED SEATS AVAILABLE
                </p>
              )}
            </div>

            {/* BOOK BUTTON */}
            <button
              type="button"
              onClick={handleBooking}
              className="shrink-0 bg-[#D0E46A] hover:bg-[#BDD253] text-[#0F1112] px-[22px] py-[11px] rounded-[5px] text-[11px] md:text-[12px] font-black transition-all duration-300"
            >
              Book your seat →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
