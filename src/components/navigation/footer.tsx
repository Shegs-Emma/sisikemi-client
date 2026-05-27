"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsStars } from "react-icons/bs";

const infoLinks = [
  { label: "RTW Collection", href: "/rtw" },
  { label: "Couture Collection", href: "/shop" },
  { label: "Bridal Collection", href: "/bridal" },
  { label: "Sales", href: "/sale" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/about-us" },
  { label: "FAQ", href: "/about-us" },
  { label: "Order Tracking", href: "/about-us" },
];

const socialLinks = [
  { icon: "/images/fbuk.svg", label: "Facebook" },
  { icon: "/images/insta.svg", label: "Instagram" },
  { icon: "/images/whatsapp.svg", label: "WhatsApp" },
  { icon: "/images/twitter.svg", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="w-full px-4 pb-10 pt-14 md:px-8 md:pb-12 md:pt-16 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[32px] border border-[#e7d5bf] bg-[radial-gradient(circle_at_top_right,rgba(239,211,120,0.18),transparent_32%),linear-gradient(160deg,#2e2823_0%,#1f1a17_58%,#302821_100%)] shadow-[0_26px_80px_rgba(22,15,9,0.35)]">
        <div className="grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.1fr_1fr_1.1fr] lg:gap-8 lg:px-10 xl:px-12">
          <div className="flex flex-col">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#705335] bg-[#fff3e31a] px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f4d7ad] md:text-[11px]">
              <BsStars className="text-xs" />
              Sisikemi Society
            </div>
            <Link href="/" className="mb-5 w-fit">
              <div className="rounded-full border border-[#6f5235] bg-white/95 px-4 py-3 shadow-[0_12px_26px_rgba(0,0,0,0.18)]">
                <Image
                  src="/assets/main_logo.svg"
                  alt="logo"
                  width={70}
                  height={40}
                />
              </div>
            </Link>

            <h3 className="font-montserrat text-sm font-semibold uppercase tracking-[0.22em] text-[#f8e5c7] md:text-base">
              Follow Sisi Kemi
            </h3>
            <p className="mt-3 max-w-sm font-montserrat text-sm leading-7 text-[#d8c3aa]">
              Keep up with atelier updates, style stories, and collection drops
              across our social channels.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  className="rounded-full border border-[#6f5235] bg-white/10 p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d5b182] hover:bg-white/20"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={22}
                    height={22}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-montserrat text-sm font-semibold uppercase tracking-[0.22em] text-[#f8e5c7] md:text-base">
              Info
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {infoLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit font-montserrat text-sm text-[#d8c3aa] transition-colors duration-200 hover:text-[#f1c98e]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-[#6f5235] bg-[#fff3e312] p-5 backdrop-blur-sm md:p-6">
            <h3 className="font-montserrat text-sm font-semibold uppercase tracking-[0.22em] text-[#f8e5c7] md:text-base">
              Stay Up To Date
            </h3>
            <p className="mt-3 font-montserrat text-sm leading-7 text-[#d8c3aa]">
              Subscribe to receive private previews, early access to launches,
              and seasonal style notes.
            </p>

            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                autoComplete="off"
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-full border border-[#8f6e4a] bg-white/10 px-5 font-montserrat text-sm text-[#fff2df] placeholder-[#d8c3aa] placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-[#d5b182]/60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-custom-radial px-5 text-white shadow-[0_12px_30px_rgba(168,103,40,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <RiSendPlaneFill size={18} />
              </button>
            </form>

            <p className="mt-4 font-montserrat text-xs text-[#d8c3aa]">
              By subscribing you agree to receive updates from Sisikemi.
            </p>
          </div>
        </div>
        <div className="border-t border-[#6f5235] px-6 py-4 md:px-8 lg:px-10 xl:px-12">
          <p className="font-montserrat text-xs text-[#cdb295] md:text-sm">
            2026 Sisikemi. Crafted for statement dressing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
