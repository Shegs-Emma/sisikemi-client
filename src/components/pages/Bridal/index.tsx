import React, { FC } from "react";
import Image from "next/image";

const Bridal: FC = () => {
  return (
    <div className="w-full flex flex-col p-0 md:pt-[6rem] bg-[#f2f2f2]">
      <h2 className="font-montserrat text-lg md:text-4xl font-semibold text-[#363435] mt-[8rem] mb-[4rem] flex justify-center">
        Let us bring your dream dress to reality
      </h2>

      <div className="flex flex-col md:flex-row w-full px-[2rem] md:px-0 md:w-[95%] md:m-[auto]">
        <div className="w-full md:w-[57%]">
          <Image
            src="/images/wedding_img_1.svg"
            alt="wedding_img_1"
            width={702}
            height={900}
          />
        </div>

        <div className="flex flex-col w-full md:w-[43%]">
          <div className="w-full md:w-[86%] mt-8 md:m-[auto]">
            <p className="font-montserrat font-light text-xl text-[#000000]">
              With our Bridal Collection, A meeting session with our creative
              director in person or digitally to design your dream wedding dress
              is a must! Depending on the complexity of the dress design, it can
              take between 4 to 6 months to make one of our custom bridal gowns.
              We offer both in person and virtual options for consultations.
            </p>
            <p className="font-montserrat font-light text-xl text-[#000000]">
              Register for a consultation with the button below.
            </p>
            <button className="w-full md:w-[316px] h-[64px] bg-[#363435] text-xl font-medium text-[#f2f2f2] cursor-pointer rounded mt-12 md:mt-8">
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <h2 className="font-montserrat text-lg md:text-4xl font-semibold text-[#363435] mt-[8rem] mb-[4rem] flex justify-center">
        Sisikemi Brides
      </h2>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row w-[90%] md:w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem] p-[2rem] md:p-0">
          <div className="w-full md:w-[50%] rounded">
            <Image
              src="/images/wedding_img_2.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col">
            <div className="w-full md:w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4 mt-4 md:mt-0">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-[90%] md:w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem] p-[2rem] md:p-0">
          <div className="w-full md:w-[50%] rounded">
            <Image
              src="/images/wedding_img_3.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col">
            <div className="w-full md:w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4 mt-4 md:mt-0">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-[90%] md:w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem] p-[2rem] md:p-0">
          <div className="w-full md:w-[50%] rounded">
            <Image
              src="/images/wedding_img_4.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col">
            <div className="w-full md:w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4 mt-4 md:mt-0">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-[90%] md:w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem] p-[2rem] md:p-0">
          <div className="w-full md:w-[50%] rounded">
            <Image
              src="/images/wedding_img_5.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col">
            <div className="w-full md:w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4 mt-4 md:mt-0">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-[90%] md:w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem] p-[2rem] md:p-0">
          <div className="w-full md:w-[50%] rounded">
            <Image
              src="/images/wedding_img_6.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col">
            <div className="w-full md:w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4 mt-4 md:mt-0">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div>

        {/* <div className="flex w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem]">
          <div className="w-[50%] rounded">
            <Image
              src="/images/wedding_img_3.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-[50%] flex flex-col">
            <div className="w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem]">
          <div className="w-[50%] rounded">
            <Image
              src="/images/wedding_img_4.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-[50%] flex flex-col">
            <div className="w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem]">
          <div className="w-[50%] rounded">
            <Image
              src="/images/wedding_img_5.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-[50%] flex flex-col">
            <div className="w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-[95%] m-[auto] bg-[#ffffff] rounded mb-[8rem]">
          <div className="w-[50%] rounded">
            <Image
              src="/images/wedding_img_6.svg"
              alt="wedding_img_1"
              width={600}
              height={775}
              className="rounded"
            />
          </div>
          <div className="w-[50%] flex flex-col">
            <div className="w-[80%] m-[auto]">
              <h3 className="font-montserrat font-semibold text-2xl text-[#363435] mb-4">
                Caroline Danjuma
              </h3>
              <p className="font-montserrat font-light text-xl text-[#000000]">
                With our Bridal Collection, bespoke bridal, A meeting session
                with our creative director in person or digitally to design your
                dream wedding dress is a must! Depending on the complexity of
                the dress design, it can take between 4 to 6 months to make one
                of our custom bridal gowns. We offer both in person and virtual
                options for consultations.
              </p>
              <p className="font-montserrat font-light text-xl text-[#000000] mb-4">
                Register for a consultation with the button below.
              </p>
              <p className="font-montserrat font-semibold text-lg text-[#fdcb2a] border-b-[#fdcb2a] underline underline-offset-8 cursor-pointer">
                Read Her story
              </p>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex flex-col w-[90%] md:w-[95%] m-[auto]">
        <div className="font-montserrat text-lg md:text-xl font-normal text-[#333333] mb-4">
          For our ready to wear Collection, please visit our{" "}
          <span className="font-semibold text-[#fdcb2a]">
            Ready to wear page.
          </span>
        </div>
        <div className="font-montserrat text-lg md:text-xl font-normal text-[#333333] mb-[20rem]">
          For our Couture Collection, please visit our{" "}
          <span className="font-semibold text-[#fdcb2a]">Couture page.</span>
        </div>
      </div>
    </div>
  );
};

export default Bridal;
