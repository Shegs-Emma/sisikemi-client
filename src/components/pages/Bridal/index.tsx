import React, { FC } from "react";
import Image from "next/image";

const brides = [
  "/images/wedding_img_2.svg",
  "/images/wedding_img_3.svg",
  "/images/wedding_img_4.svg",
  "/images/wedding_img_5.svg",
  "/images/wedding_img_6.svg",
];

const Bridal: FC = () => {
  return (
    <div className="flex w-full flex-col bg-[linear-gradient(180deg,#fbfafa_0%,#f6f3f2_45%,#f2f2f2_100%)] pt-[6.5rem] md:pt-[10.75rem] xl:pt-[11.5rem]">
      <section className="px-4 pb-12 pt-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1380px] rounded-[32px] border border-[#e7e2dd] bg-white/70 p-6 shadow-[0_24px_65px_rgba(38,28,21,0.1)] md:p-8 lg:p-10">
          <h2 className="text-center font-montserrat text-2xl font-semibold text-[#363435] md:text-4xl">
            Let us bring your dream dress to reality
          </h2>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center">
            <div className="w-full md:w-[57%]">
              <div className="overflow-hidden rounded-[24px] bg-[#ece7e3] shadow-[0_14px_36px_rgba(38,28,21,0.08)]">
                <Image
                  src="/images/wedding_img_1.svg"
                  alt="wedding_img_1"
                  width={702}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex w-full flex-col md:w-[43%]">
              <div className="w-full md:w-[90%] md:m-[auto]">
                <p className="font-montserrat text-base leading-8 text-[#2d2b29] md:text-lg">
                  With our Bridal Collection, a meeting session with our
                  creative director in person or digitally to design your dream
                  wedding dress is a must. Depending on the complexity of the
                  dress design, it can take between 4 to 6 months to make one of
                  our custom bridal gowns.
                </p>
                <p className="mt-4 font-montserrat text-base leading-8 text-[#2d2b29] md:text-lg">
                  We offer both in-person and virtual options for consultations.
                  Register for a consultation with the button below.
                </p>
                <button className="mt-8 h-[58px] w-full rounded-full bg-[#363435] px-8 text-lg font-medium text-[#f2f2f2] shadow-[0_12px_28px_rgba(0,0,0,0.22)] transition-colors duration-200 hover:bg-[#4a4847] md:h-[64px] md:w-[316px]">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8 lg:px-12 xl:px-16">
        <h2 className="mb-8 text-center font-montserrat text-2xl font-semibold text-[#363435] md:mb-10 md:text-4xl">
          Sisikemi Brides
        </h2>

        <div className="mx-auto flex max-w-[1380px] flex-col gap-8 md:gap-10">
          {brides.map((image) => (
            <article
              key={image}
              className="flex flex-col rounded-[28px] border border-[#e7e2dd] bg-[#ffffff] p-4 shadow-[0_18px_48px_rgba(38,28,21,0.08)] md:flex-row md:items-stretch md:p-0"
            >
              <div className="w-full rounded-[20px] md:w-[50%] md:rounded-none md:rounded-l-[28px]">
                <Image
                  src={image}
                  alt="wedding_img"
                  width={600}
                  height={775}
                  className="h-full w-full rounded-[20px] object-cover md:rounded-none md:rounded-l-[28px]"
                />
              </div>

              <div className="flex w-full flex-col md:w-[50%]">
                <div className="w-full py-6 md:w-[80%] md:m-[auto]">
                  <h3 className="mb-4 font-montserrat text-2xl font-semibold text-[#363435]">
                    Caroline Danjuma
                  </h3>
                  <p className="font-montserrat text-base leading-8 text-[#2d2b29] md:text-lg">
                    With our Bridal Collection, bespoke bridal, a meeting
                    session with our creative director in person or digitally to
                    design your dream wedding dress is a must. Depending on the
                    complexity of the dress design, it can take between 4 to 6
                    months to make one of our custom bridal gowns.
                  </p>
                  <p className="mt-3 font-montserrat text-base leading-8 text-[#2d2b29] md:text-lg">
                    We offer both in-person and virtual options for
                    consultations. Register for a consultation with the button
                    below.
                  </p>
                  <p className="mt-5 w-fit cursor-pointer font-montserrat text-lg font-semibold text-[#fdcb2a] underline underline-offset-8 transition-opacity duration-200 hover:opacity-80">
                    Read Her story
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1380px] rounded-[28px] border border-[#e7e2dd] bg-white p-6 shadow-[0_16px_40px_rgba(38,28,21,0.06)] md:p-8">
          <p className="font-montserrat text-lg font-normal text-[#333333] md:text-xl">
            For our ready-to-wear collection, please visit our
            <span className="font-semibold text-[#fdcb2a]">
              {" "}
              Ready to wear page.
            </span>
          </p>
          <p className="mt-4 font-montserrat text-lg font-normal text-[#333333] md:text-xl">
            For our couture collection, please visit our
            <span className="font-semibold text-[#fdcb2a]"> Couture page.</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Bridal;
