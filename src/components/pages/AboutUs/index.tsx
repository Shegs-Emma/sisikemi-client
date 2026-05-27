import React, { FC } from "react";
import Image from "next/image";
import { BsStars } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";

const storyBlocks = [
  {
    eyebrow: "People",
    title: "Our Founder",
    image: "/assets/owner.svg",
    imageAlt: "Founder portrait",
    description:
      "We are a team of fashion designers, creatives, tailors and artists working together with a singular mission of designing and creating beautiful fashion pieces that make our customers feel valued, special, fashionable and stylish.",
  },
  {
    eyebrow: "Product",
    title: "Our Product",
    image: "/assets/ourproduct.svg",
    imageAlt: "Sisikemi product showcase",
    description:
      "Each garment is shaped through craftsmanship, detail and fit. We blend timeless construction with expressive design so every piece feels both statement-worthy and wearable.",
  },
  {
    eyebrow: "Community",
    title: "Our Tribe",
    image: "/assets/our-tribe.svg",
    imageAlt: "Sisikemi community",
    description:
      "Our community is built on confidence, celebration and style. We design for women who want their presence to be felt, whether the moment is intimate or grand.",
  },
];

const AboutUs: FC = () => {
  return (
    <div className="flex w-full flex-col bg-[linear-gradient(180deg,#fffdf9_0%,#f4f7ff_44%,#ffffff_100%)] pt-[6.5rem] md:pt-[10.75rem] xl:pt-[11.5rem]">
      <section className="px-4 pb-10 pt-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1380px] rounded-[34px] border border-[#dde3ef] bg-[radial-gradient(circle_at_18%_20%,rgba(230,136,163,0.22),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(106,181,210,0.2),transparent_36%),linear-gradient(150deg,#fff9f3_0%,#ffffff_54%,#f3f8ff_100%)] p-7 shadow-[0_28px_80px_rgba(43,54,78,0.13)] md:p-10 lg:p-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dbc4d1] bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a4f6b]">
            <BsStars className="text-xs" />
            About Sisikemi
          </div>
          <h1 className="max-w-4xl font-montserrat text-[2rem] font-semibold uppercase leading-[1.04] tracking-[0.08em] text-[#212737] md:text-[2.9rem] xl:text-[3.6rem]">
            Built on craftsmanship, powered by women who love to stand out.
          </h1>
          <p className="mt-5 max-w-2xl font-montserrat text-sm leading-7 text-[#5c667e] md:text-base">
            Sisikemi is a fashion house driven by artistry, precision, and
            emotional design. We create pieces that let women feel confident,
            expressive, and beautifully seen.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-8 border-b border-[#d2dbe9] pb-16 md:gap-10">
          {storyBlocks.map((block, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={block.title}
                className={`grid items-stretch gap-5 rounded-[30px] border border-[#dde3ef] bg-white/90 p-4 shadow-[0_20px_55px_rgba(43,54,78,0.08)] md:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8 ${
                  !isEven ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-[22px] bg-[#edf3ff]">
                  <Image
                    src={block.image}
                    alt={block.imageAlt}
                    width={720}
                    height={920}
                    className="h-[340px] w-full object-cover md:h-[460px] lg:h-full"
                  />
                </div>

                <div className="flex flex-col justify-between rounded-[22px] bg-[linear-gradient(180deg,#ffffff_0%,#f9fbff_100%)] p-5 md:p-7">
                  <div>
                    <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a4f6b]">
                      {block.eyebrow}
                    </p>
                    <h2 className="mt-2 font-montserrat text-3xl font-semibold uppercase tracking-[0.06em] text-[#212737] md:text-[2.4rem]">
                      {block.title}
                    </h2>
                    <p className="mt-5 font-montserrat text-sm leading-7 text-[#5c667e] md:text-base">
                      {block.description}
                    </p>
                  </div>

                  <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#ccd8ee] bg-white px-4 py-2 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#40537a]">
                    Discover More
                    <FiArrowUpRight size={14} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
