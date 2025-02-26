import React, { FC, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import {
  CartResponseInterface,
  OrderDetailsInterface,
} from "@/utils/interface";
import { CurrencyComponent } from "@/utils/functions";

interface CartProps {
  items: CartResponseInterface[] | undefined;
  orderDetails: OrderDetailsInterface;
  step: number;
  fetchTotalCost: (cost: number) => void;
}

const Estimate: FC<CartProps> = ({
  items,
  orderDetails,
  step,
  fetchTotalCost,
}) => {
  const [total, setTotal] = useState<number>(0);

  // ============================================== CALCULATE THE SUBTOTAL ON ONLINE CART ============================== //
  useEffect(() => {
    if (items && items.length) {
      const subtotal = items?.reduce(
        (acc: number, cartItm: CartResponseInterface) => {
          return (acc += Number(
            +cartItm?.product_price * +cartItm?.product_quantity
          ));
        },
        0
      );

      setTotal(subtotal);
    }
  }, [items]);

  useEffect(() => {
    if (orderDetails?.shipping_method?.cost && total) {
      const cost = Number(orderDetails?.shipping_method?.cost) + Number(total);
      fetchTotalCost(cost);
    }
  }, [total, orderDetails?.shipping_method?.cost]);

  return (
    <div className="w-[40%] bg-[#f2f2f2] px-10 pt-[10rem]">
      <div className="flex flex-col">
        {items && items?.length
          ? items?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between  border-b-[1px] border-b-[#bdbdbd] pb-4 mb-4"
              >
                <div className="flex">
                  <div>
                    <p className="absolute w-[22px] h-[22px] bg-[#363435] text-[#f2f2f2] rounded-[50%] text-center text-sm ml-[3rem] -mt-[.5rem]">
                      {item?.product_quantity}
                    </p>
                    <Image
                      src={item?.product_image}
                      className="rounded"
                      alt="avatar_img"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <p className="font-montserrat text-sm font-semibold text-[#4f4f4f] mb-2">
                      {item?.product_name}
                    </p>
                    <p className="font-montserrat text-sm font-semibold text-[#4f4f4f]">
                      {item?.product_size}
                    </p>
                  </div>
                </div>

                <p className="font-montserrat font-semibold text-xs text-[#4f4f4f] mt-10">
                  {/* N24,000 */}
                  {CurrencyComponent(Number(item?.product_price))}
                </p>
              </div>
            ))
          : null}

        <div className="flex w-full mt-4">
          <Input
            type="text"
            name="CODE"
            placeholder="ENTER GIFT CARD OR DISCOUNT CODE"
            //   onChange={handleChange}
            //   value={formValues?.firstName}
            className={twMerge(
              "placeholder:text-[#828282] text-[#828282] font-montserrat placeholder:text-xs text-xs rounded-lg border-[0.6px] border-[#bdbdbd] w-[320px] h-[51px] py-2 px-3 text-[#363435]"
            )}
            //   isError={errorFields.firstName}
          />
          <div className="w-[119px] h-[51px] bg-[#828282] flex justify-center items-center rounded-lg">
            <p className="text-[#f2f2f2] text-sm font-semibold font-montserrat">
              APPLY
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-8 border-t-[1px] border-t-[#bdbdbd] border-b-[1px] border-b-[#bdbdbd] py-6">
          <div className="flex justify-between">
            <p className="font-montserrat text-base font-medium text-[#4f4f4f]">
              Subtotal
            </p>
            <p className="font-montserrat font-semibold text-base text-[#4f4f4f]">
              {items && items?.length && total
                ? CurrencyComponent(Number(total))
                : null}
            </p>
          </div>

          <div className="flex justify-between mt-2">
            <div className="flex">
              <p className="font-montserrat text-base font-medium text-[#4f4f4f]">
                Shipping
              </p>
              <BsFillQuestionCircleFill
                className=" ml-2 mt-1"
                color="#838383"
              />
            </div>
            <p className="font-montserrat font-medium text-sm text-[#4f4f4f]">
              {step > 1 && orderDetails?.shipping_method?.cost
                ? CurrencyComponent(Number(orderDetails?.shipping_method?.cost))
                : "Calculated at next step"}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <p className="font-montserrat text-base font-medium text-[#4f4f4f]">
            TOTAL
          </p>
          <div className="flex">
            <div className="font-montserrat text-lg text-[#4f4f4f] mt-1">
              NGN
            </div>
            <p className="font-montserrat font-semibold text-2xl ml-3 text-[#4f4f4f]">
              {orderDetails && orderDetails?.shipping_method?.cost
                ? CurrencyComponent(
                    Number(orderDetails?.shipping_method?.cost) + Number(total)
                  )
                : CurrencyComponent(Number(total))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimate;
