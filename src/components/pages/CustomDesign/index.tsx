"use client";

import React, { FC } from "react";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiPenTool,
} from "react-icons/fi";

const projects = [
  {
    id: "CD-1024",
    name: "Velvet Corset Evening Dress",
    stage: "Sketch Review",
    eta: "2 days",
    color: "bg-[#fff5eb] text-[#9f5f20]",
  },
  {
    id: "CD-1023",
    name: "Beaded Bridal Reception Gown",
    stage: "Fabric Sourcing",
    eta: "5 days",
    color: "bg-[#eef6ff] text-[#2f628c]",
  },
  {
    id: "CD-1022",
    name: "Structured Organza Statement Piece",
    stage: "First Fitting Scheduled",
    eta: "9 days",
    color: "bg-[#f4f2ff] text-[#4f4d9b]",
  },
];

const designSteps = [
  {
    title: "Submit Brief",
    description:
      "Tell us your event, style direction, timeline, and budget range.",
    icon: FiPenTool,
  },
  {
    title: "Concept Approval",
    description:
      "Review sketches and approve silhouettes, fabrics, and finishings.",
    icon: FiCheckCircle,
  },
  {
    title: "Production & Fittings",
    description:
      "Track updates through cutting, stitching, fittings, and delivery.",
    icon: FiClock,
  },
];

const CustomDesign: FC = () => {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_15%_12%,rgba(241,190,131,0.22),transparent_32%),radial-gradient(circle_at_86%_9%,rgba(109,176,211,0.2),transparent_30%),linear-gradient(160deg,#fffaf4_0%,#ffffff_54%,#f5f8ff_100%)] px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-[32px] border border-[#e4d7c9] bg-white/90 shadow-[0_30px_85px_rgba(52,36,20,0.12)] backdrop-blur-sm">
        <section className="grid gap-8 border-b border-[#efe2d5] px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dcc5ab] bg-[#fffaf2] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a86728]">
              <BsStars className="text-xs" />
              Custom Atelier
            </div>

            <h1 className="font-montserrat text-[2rem] font-semibold uppercase leading-[1.08] tracking-[0.07em] text-[#2f2924] md:text-[2.65rem]">
              Design pieces that are made only for you.
            </h1>
            <p className="mt-4 max-w-2xl font-montserrat text-sm leading-7 text-[#65594b] md:text-base">
              This custom studio is your control center for bespoke looks. Start
              a new request, track each stage, and keep all conversations around
              measurements, fabrics, and fittings in one place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/custom-design/request"
                className="inline-flex items-center gap-2 rounded-full bg-[#2f2924] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1f1a16]"
              >
                Start New Design
                <FiArrowUpRight size={14} />
              </Link>
              <Link
                href="/custom-design/projects"
                className="inline-flex items-center gap-2 rounded-full border border-[#d8c7b3] bg-white px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3c332b] transition hover:border-[#bfa486] hover:bg-[#fff8ef]"
              >
                View My Projects
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <article className="rounded-[22px] border border-[#eddcca] bg-[#fff8ef] p-4">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a86728]">
                Active Designs
              </p>
              <p className="mt-3 font-montserrat text-3xl font-semibold text-[#2f2924]">
                3
              </p>
            </article>
            <article className="rounded-[22px] border border-[#dbe6f2] bg-[#f4f9ff] p-4">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3f7195]">
                Pending Reviews
              </p>
              <p className="mt-3 font-montserrat text-3xl font-semibold text-[#223344]">
                2
              </p>
            </article>
            <article className="rounded-[22px] border border-[#e6deef] bg-[#f7f4ff] p-4">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6660a3]">
                Next Fitting
              </p>
              <p className="mt-3 font-montserrat text-lg font-semibold text-[#302e5f]">
                Saturday 3:00 PM
              </p>
            </article>
          </div>
        </section>

        <section className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[0.96fr_1.04fr]">
          <div>
            <h2 className="font-montserrat text-xl font-semibold uppercase tracking-[0.06em] text-[#2f2924] md:text-2xl">
              Design Journey
            </h2>
            <div className="mt-5 space-y-4">
              {designSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="rounded-[20px] border border-[#ecdfd1] bg-[#fffdf9] p-4 shadow-[0_12px_30px_rgba(84,56,28,0.06)]"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#fff3e5] text-[#a86728]">
                      <Icon size={16} />
                    </div>
                    <h3 className="mt-3 font-montserrat text-sm font-semibold uppercase tracking-[0.16em] text-[#3c332b]">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-montserrat text-sm leading-6 text-[#6a5f53]">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-montserrat text-xl font-semibold uppercase tracking-[0.06em] text-[#2f2924] md:text-2xl">
                Recent Projects
              </h2>
              <Link
                href="/custom-design/projects"
                className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6b4d] transition hover:text-[#a86728]"
              >
                See all
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-[22px] border border-[#ecdfd1] bg-white p-4 shadow-[0_16px_38px_rgba(84,56,28,0.07)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f7a64]">
                        {project.id}
                      </p>
                      <h3 className="mt-1 font-montserrat text-sm font-semibold uppercase leading-6 text-[#312a24] md:text-base">
                        {project.name}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${project.color}`}
                    >
                      {project.stage}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#f1e6dc] bg-[#fffaf5] px-3 py-2.5">
                    <p className="font-montserrat text-xs text-[#6b5d4e]">
                      Estimated update in {project.eta}
                    </p>
                    <Link
                      href="/custom-design/projects"
                      className="inline-flex items-center gap-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6b4d]"
                    >
                      Open
                      <FiArrowUpRight size={13} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#efe2d5] bg-[#fffaf3] px-6 py-7 md:px-10 md:py-8">
          <div className="flex flex-col gap-4 rounded-[22px] border border-[#e8d8c5] bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a86728]">
                Need help starting?
              </p>
              <p className="mt-2 font-montserrat text-sm leading-6 text-[#5e5346] md:text-base">
                Upload inspiration and key event details to get your first
                concept board from the atelier team.
              </p>
            </div>
            <Link
              href="/custom-design/request"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d7bfa4] bg-[#fff6ea] px-5 py-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7d5530] transition hover:bg-[#ffeedd]"
            >
              Build Design Brief
              <FiArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomDesign;
