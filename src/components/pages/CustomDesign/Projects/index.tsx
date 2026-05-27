"use client";

import React, { FC } from "react";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";

const timeline = [
  {
    id: "CD-1024",
    title: "Velvet Corset Evening Dress",
    status: "Sketch Review",
    stage: 2,
    notes: "Sketches shared for neckline and sleeve preference approval.",
  },
  {
    id: "CD-1023",
    title: "Beaded Bridal Reception Gown",
    status: "Fabric Sourcing",
    stage: 3,
    notes: "Primary fabric secured; bead samples expected in 48 hours.",
  },
  {
    id: "CD-1022",
    title: "Structured Organza Statement Piece",
    status: "Fitting Setup",
    stage: 4,
    notes: "First fitting confirmed, final embellishment plan pending.",
  },
];

const stages = [
  "Brief",
  "Sketch",
  "Sourcing",
  "Production",
  "Fitting",
  "Delivery",
];

const ProjectsCustomDesign: FC = () => {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_14%_12%,rgba(242,194,134,0.2),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(114,177,209,0.2),transparent_30%),linear-gradient(160deg,#fffaf4_0%,#ffffff_52%,#f3f8ff_100%)] px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-[1120px] rounded-[30px] border border-[#e5d9cb] bg-white/90 p-6 shadow-[0_30px_80px_rgba(49,35,22,0.12)] backdrop-blur-sm md:p-8 lg:p-10">
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
            Project Timeline
          </div>
        </div>

        <div className="mt-7 max-w-3xl">
          <h1 className="font-montserrat text-[2rem] font-semibold uppercase leading-[1.08] tracking-[0.07em] text-[#2f2924] md:text-[2.5rem]">
            Track every stage of your custom pieces.
          </h1>
          <p className="mt-4 font-montserrat text-sm leading-7 text-[#665a4c] md:text-base">
            This screen is ready for live status data. Replace the mock timeline
            with response payloads from your custom-design endpoints.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {timeline.map((project) => (
            <article
              key={project.id}
              className="rounded-[24px] border border-[#ebdfd2] bg-white p-5 shadow-[0_16px_42px_rgba(84,56,28,0.08)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f7a64]">
                    {project.id}
                  </p>
                  <h2 className="mt-1 font-montserrat text-base font-semibold uppercase tracking-[0.04em] text-[#2f2924] md:text-lg">
                    {project.title}
                  </h2>
                </div>

                <span className="rounded-full bg-[#f2f8ff] px-3 py-1 font-montserrat text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3f7195]">
                  {project.status}
                </span>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-6">
                {stages.map((label, index) => {
                  const isDone = index < project.stage;

                  return (
                    <div key={label} className="space-y-2">
                      <div
                        className={`h-2 rounded-full ${
                          isDone ? "bg-[#2f2924]" : "bg-[#e7ddd2]"
                        }`}
                      />
                      <p
                        className={`font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          isDone ? "text-[#5d4d3c]" : "text-[#9d8e80]"
                        }`}
                      >
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 rounded-2xl border border-[#f1e6db] bg-[#fffaf5] px-4 py-3 font-montserrat text-sm leading-6 text-[#675a4d]">
                {project.notes}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCustomDesign;
