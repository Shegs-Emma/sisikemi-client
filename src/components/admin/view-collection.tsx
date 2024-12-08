import React from "react";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";
import { PiArrowsOutSimpleFill } from "react-icons/pi";
import { TbRefresh } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { HiDocumentDuplicate } from "react-icons/hi";

const AdminViewCollection = () => {
  return (
    <div className="flex">
      <div className="w-[220px] bg-[#f2f2f2] p-10 flex flex-col h-screen">
        <div className="flex">
          <Image
            src="/assets/col-logo.svg"
            alt="avatar_img"
            width={40}
            height={42}
          />

          <div className="flex flex-col ml-2">
            <p className="font-lato font-semibold text-base text-[#363435]">
              SisiKemi
            </p>
            <p className="font-lato text-sm font-light text-[#333333]">
              (Admin)
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-20">
          <div className="flex mb-10 bg-transparent rounded w-[140px] py-[10px] ml-4">
            <Image
              src="/assets/cart.svg"
              alt="avatar_img"
              width={20}
              height={20}
            />
            <p className="font-lato font-normal text-sm text-[#4f4f4f] ml-2">
              Products
            </p>
          </div>

          <div className="flex mb-10 bg-[#363435] rounded w-[140px] py-[10px] items-center justify-center">
            <Image
              src="/assets/collection.svg"
              alt="avatar_img"
              width={20}
              height={20}
            />
            <p className="font-lato font-normal text-sm text-[#f2f2f2] ml-2">
              Collections
            </p>
          </div>

          <div className="flex mb-10 bg-transparent rounded w-[140px] py-[10px] ml-4">
            <Image
              src="/assets/promocodes.svg"
              alt="avatar_img"
              width={20}
              height={20}
            />
            <p className="font-lato font-normal text-sm text-[#4f4f4f] ml-2">
              Promocodes
            </p>
          </div>

          <div className="flex mb-10 bg-transparent rounded w-[140px] py-[10px] ml-4">
            <Image
              src="/assets/inventory.svg"
              alt="avatar_img"
              width={20}
              height={20}
            />
            <p className="font-lato font-normal text-sm text-[#4f4f4f] ml-2">
              Inventory
            </p>
          </div>

          <div className="flex mb-10 bg-transparent rounded w-[140px] py-[10px] ml-4">
            <Image
              src="/assets/sales.svg"
              alt="avatar_img"
              width={20}
              height={20}
            />
            <p className="font-lato font-normal text-sm text-[#4f4f4f] ml-2">
              Sales
            </p>
          </div>

          <div className="flex mb-10 bg-transparent rounded w-[140px] py-[10px] ml-4">
            <Image
              src="/assets/reports.svg"
              alt="avatar_img"
              width={20}
              height={20}
            />
            <p className="font-lato font-normal text-sm text-[#4f4f4f] ml-2">
              Reports
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="w-[90%] h-[69px] mt-14 ml-[auto] py-[16px] px-[60px] bg-[#f2f2f2] flex justify-between">
          <div className="flex">
            <div className="w-[42px] bg-[#4f4f4f] flex justify-center items-center">
              <FaArrowLeftLong color="#e0e0e0" />
            </div>

            <p className="font-lato text-2xl font-medium text-[#363435] ml-4">
              view collection name
            </p>
          </div>

          <div className="flex">
            <div className="flex justify-center items-center bg-[#e0e0e0] text-[#333333] font-lato font-normal w-[82px] h-[37px] rounded">
              Cancel
            </div>

            <div className="flex justify-center items-center bg-[#363435] text-[#f2f2f2] font-lato font-normal w-[101px] h-[37px] ml-8 rounded">
              Save
            </div>
          </div>
        </div>

        <div className="w-[73%] mt-8 ml-[12rem] flex flex-col">
          <div className="mb-8">
            <Label
              htmlFor="collectionName"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Collection name
            </Label>
            <Input
              type="text"
              name="collectionName"
              placeholder="Content name"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="mb-8">
            <Label
              htmlFor="collectionDescription"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Description Text/Paragraph
            </Label>
            <textarea
              name="collectionDescription"
              //   onChange={handleChange}
              //   value={formValues?.firstName}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            ></textarea>
          </div>

          <div className="mb-8 flex flex-col">
            <p className="font-lato font-normal text-base text-[#333333] mb-4">
              Image
            </p>
            <div className="flex justify-between w-[480px] bg-[#e0e0e0]  p-4">
              <div className="flex">
                <Image
                  src="/images/col-prd.svg"
                  alt="section_img"
                  width={100}
                  height={100}
                />

                <div className="flex flex-col ml-4 mt-4">
                  <p className="font-lato font-normal text-sm text-[#333333] mb-2">
                    Image Name
                  </p>
                  <p className="font-lato font-light text-xs text-[#4f4f4f]">
                    Image deatails Exercitation veniam consequat Exercitation
                    veniam consequat
                  </p>
                </div>
              </div>

              <PiArrowsOutSimpleFill color="#363435" />
            </div>

            <div className="flex mt-6">
              <div className="w-[116px] h-[38px] rounded-sm bg-[#4f4f4f] flex justify-center items-center">
                <TbRefresh color="#f2f2f2" />
                <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
                  Replace
                </p>
              </div>

              <div className="w-[116px] h-[38px] rounded-sm bg-[#4f4f4f] flex justify-center items-center ml-6">
                <MdDelete color="#f2f2f2" />
                <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
                  Delete
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-12 w-full py-[16px] border-[1.6px] border-[#bdbdbd] mb-8">
              <div className="flex justify-between mx-4">
                <h2 className="font-lato text-2xl font-semibold text-[#333333] mt-2">
                  Product List
                </h2>
                <div className="w-[166px] h-[49px] rounded bg-[#363435] flex justify-center items-center ml-6 cursor-pointer">
                  <GoPlus color="#f2f2f2" />
                  <p className="font-lato font-normal text-sm text-[#ffffff] ml-1">
                    Add New Product
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full mt-4">
                <div className="bg-[#eaecf0] px-4 py-2">
                  <div className="flex">
                    <Image
                      src="/images/prodList.svg"
                      alt="avatar_img"
                      width={48}
                      height={48}
                    />
                    <p className="font-lato font-normal text-base text-[#4f4f4f] ml-4 mt-3">
                      Product name
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 mt-4">
                  <div className="flex">
                    <Image
                      src="/images/prodList.svg"
                      alt="avatar_img"
                      width={48}
                      height={48}
                    />
                    <p className="font-lato font-normal text-base text-[#4f4f4f] ml-4 mt-3">
                      Product name
                    </p>
                  </div>
                </div>

                <div className="bg-[#eaecf0] px-4 py-2 mt-4">
                  <div className="flex">
                    <Image
                      src="/images/prodList.svg"
                      alt="avatar_img"
                      width={48}
                      height={48}
                    />
                    <p className="font-lato font-normal text-base text-[#4f4f4f] ml-4 mt-3">
                      Product name
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 mt-4">
                  <div className="flex">
                    <Image
                      src="/images/prodList.svg"
                      alt="avatar_img"
                      width={48}
                      height={48}
                    />
                    <p className="font-lato font-normal text-base text-[#4f4f4f] ml-4 mt-3">
                      Product name
                    </p>
                  </div>
                </div>

                <div className="bg-[#eaecf0] px-4 py-2 mt-4">
                  <div className="flex">
                    <Image
                      src="/images/prodList.svg"
                      alt="avatar_img"
                      width={48}
                      height={48}
                    />
                    <p className="font-lato font-normal text-base text-[#4f4f4f] ml-4 mt-3">
                      Product name
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 mt-4">
                  <div className="flex">
                    <Image
                      src="/images/prodList.svg"
                      alt="avatar_img"
                      width={48}
                      height={48}
                    />
                    <p className="font-lato font-normal text-base text-[#4f4f4f] ml-4 mt-3">
                      Product name
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-col">
              <p className="font-lato font-normal text-base text-[#333333] mb-4">
                Image
              </p>
              <div className="flex justify-between w-[480px] bg-[#e0e0e0]  p-4">
                <div className="flex">
                  <Image
                    src="/images/col-prd.svg"
                    alt="section_img"
                    width={100}
                    height={100}
                  />

                  <div className="flex flex-col ml-4 mt-4">
                    <p className="font-lato font-normal text-sm text-[#333333] mb-2">
                      Image Name
                    </p>
                    <p className="font-lato font-light text-xs text-[#4f4f4f]">
                      Image deatails Exercitation veniam consequat Exercitation
                      veniam consequat
                    </p>
                  </div>
                </div>

                <PiArrowsOutSimpleFill color="#363435" />
              </div>

              <div className="flex mt-6">
                <div className="w-[116px] h-[38px] rounded-sm bg-[#4f4f4f] flex justify-center items-center">
                  <TbRefresh color="#f2f2f2" />
                  <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
                    Replace
                  </p>
                </div>

                <div className="w-[116px] h-[38px] rounded-sm bg-[#4f4f4f] flex justify-center items-center ml-6">
                  <MdDelete color="#f2f2f2" />
                  <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
                    Delete
                  </p>
                </div>

                <div className="w-[116px] h-[38px] rounded-sm bg-[#4f4f4f] flex justify-center items-center ml-6">
                  <HiDocumentDuplicate color="#f2f2f2" />
                  <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
                    Duplicate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewCollection;
