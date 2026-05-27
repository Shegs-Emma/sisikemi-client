"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BsStars } from "react-icons/bs";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const RequestCustomDesign: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Starter brief saved", {
        description:
          "You can now connect this form to your custom-design endpoint.",
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_15%_14%,rgba(240,191,132,0.2),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(116,173,203,0.18),transparent_28%),linear-gradient(158deg,#fffaf4_0%,#ffffff_54%,#f5f8ff_100%)] px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-[1080px] rounded-[30px] border border-[#e5d9cc] bg-white/90 p-6 shadow-[0_28px_80px_rgba(49,35,22,0.12)] backdrop-blur-sm md:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/custom-design"
            className="inline-flex items-center gap-2 rounded-full border border-[#dac8b4] bg-[#fff8ee] px-4 py-2 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7e5b3a]"
          >
            <FiArrowLeft size={14} />
            Back to Atelier
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7c4ad] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a86728]">
            <BsStars className="text-xs" />
            New Brief
          </div>
        </div>

        <div className="mt-7 max-w-3xl">
          <h1 className="font-montserrat text-[2rem] font-semibold uppercase leading-[1.08] tracking-[0.07em] text-[#2f2924] md:text-[2.5rem]">
            Start your custom design request.
          </h1>
          <p className="mt-4 font-montserrat text-sm leading-7 text-[#665a4c] md:text-base">
            This starter form captures everything needed for your API
            integration: event details, style direction, budget range, and
            timeline.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-4 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]">
              Event Type
            </label>
            <input
              placeholder="Wedding reception"
              className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
            />
          </div>

          <div>
            <label className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]">
              Target Delivery Date
            </label>
            <input
              type="date"
              className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]">
              Preferred Silhouette
            </label>
            <input
              placeholder="A-line with corset bodice and detachable train"
              className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
            />
          </div>

          <div>
            <label className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]">
              Budget Range
            </label>
            <select className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]">
              <option>Choose range</option>
              <option>₦300,000 - ₦500,000</option>
              <option>₦500,000 - ₦900,000</option>
              <option>₦900,000 - ₦1,500,000</option>
              <option>₦1,500,000+</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]">
              Fitting Preference
            </label>
            <select className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]">
              <option>Choose preference</option>
              <option>In-studio fittings</option>
              <option>Virtual fittings</option>
              <option>Hybrid fittings</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]">
              Inspiration Notes
            </label>
            <textarea
              rows={4}
              placeholder="Describe colors, mood, fabrics, references, and details you love."
              className="w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 py-3 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f6a53]">
              Measurements Snapshot
            </label>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Bust (inches)"
                className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
              />
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Waist (inches)"
                className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
              />
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Hips (inches)"
                className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
              />
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Shoulder (inches)"
                className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
              />
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Sleeve Length (inches)"
                className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
              />
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Full Length (inches)"
                className="h-12 w-full rounded-2xl border border-[#dbcab7] bg-[#fffaf4] px-4 font-montserrat text-sm text-[#2f2924] outline-none transition focus:border-[#a86728] focus:ring-2 focus:ring-[#e7d3bc]"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 border-t border-[#efe2d5] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-montserrat text-xs uppercase tracking-[0.16em] text-[#8a7560]">
              Starter screen ready for endpoint wiring
            </p>

            <Button
              type="submit"
              loading={isSubmitting}
              className="h-12 rounded-full bg-[#2f2924] px-5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
            >
              Save Design Brief
              <FiArrowUpRight size={14} className="ml-1" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestCustomDesign;
