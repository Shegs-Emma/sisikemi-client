"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOfflineCartStore } from "@/store/offlineCartStore";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import { shallow } from "zustand/shallow";
import {
  CartItemInterface,
  CartResponseInterface,
  CartResponseRootInterface,
  UpdateCartItemRequestPayloadInterface,
} from "@/utils/interface";
import { useCartStore } from "@/store/cartStore";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const [total, setTotal] = useState<number>(0);
  const [offlineTotal, setOfflineTotal] = useState<number>(0);
  const [isCartFetched, setIsCartFetched] = useState<boolean>(false);
  const hasSyncedRef = useRef(false);
  const [authenticatedCart, setAuthenticatedCart] =
    useState<CartResponseRootInterface>();
  const token = !!getCookie("accessToken");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { offlineCart, updateCart, deleteCart } = useOfflineCartStore(
    (state: any) => ({
      offlineCart: state.offlineCart,
      updateCart: state.updateCart,
      deleteCart: state.deleteCart,
    }),
    shallow
  );

  const { createCartItem, fetchCart, updateCartItemQty, removeCartItem } =
    useCartStore(
      (state: any) => ({
        createCartItem: state.createCartItem,
        fetchCart: state.fetchCart,
        updateCartItemQty: state.updateCartItemQty,
        removeCartItem: state.removeCartItem,
      }),
      shallow
    );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // ============================================== CALCULATE THE SUBTOTAL ON OFFLINE CART ============================== //
  useEffect(() => {
    if (offlineCart?.length && !token) {
      const subtotal = offlineCart?.reduce(
        (acc: number, offlineCartItm: CartItemInterface) => {
          return (acc += Number(
            +offlineCartItm?.product_price * +offlineCartItm?.product_quantity
          ));
        },
        0
      );

      setOfflineTotal(subtotal);
    }
  }, [offlineCart, token]);

  // ============================================== CALCULATE THE SUBTOTAL ON ONLINE CART ============================== //
  useEffect(() => {
    if (authenticatedCart?.cart?.length && token) {
      const subtotal = authenticatedCart?.cart?.reduce(
        (acc: number, cartItm: CartResponseInterface) => {
          return (acc += Number(
            +cartItm?.product_price * +cartItm?.product_quantity
          ));
        },
        0
      );

      setTotal(subtotal);
    }
  }, [authenticatedCart?.cart, token]);

  // ============================================== SYNCHRONIZE THE CARTS (OFFLINE AND ONLINE) ============================== //
  useEffect(() => {
    if (!hasSyncedRef.current && token && offlineCart?.length) {
      hasSyncedRef.current = true;
      if (authenticatedCart?.cart?.length) {
        const itemsToSync =
          offlineCart?.length &&
          offlineCart?.filter(
            (offlineCrt: CartItemInterface) =>
              !authenticatedCart?.cart?.some(
                (authCrt) => +authCrt?.product_id === offlineCrt?.product_id
              )
          );

        handleCartSync(itemsToSync);
      } else {
        handleCartSync(offlineCart);
      }
    }
  }, [token, offlineCart, authenticatedCart]);

  // ============================================== CHECK AVAILABILITY OF CART AND FETCH ============================== //
  useEffect(() => {
    if (token && !isCartFetched) {
      handleCartFetch();
    }
  }, [token, isCartFetched]);

  // ============================================== INCREMENT THE OFFLINE CART ============================== //
  const incrementCart = (id: number) => {
    const updatedCart = offlineCart
      .filter((item: CartItemInterface) => item?.product_id === id)
      .map((item: CartItemInterface) => {
        if (+item?.product_id === id) {
          return { ...item, product_quantity: item.product_quantity + 1 };
        }
      })
      .pop();

    return updateCart(updatedCart);
  };

  // ============================================== DECREMENT THE OFFLINE CART ============================== //
  const decrementCart = (id: number, qty: number) => {
    if (qty < 2) return;
    const updatedCart = offlineCart
      .filter((item: CartItemInterface) => item?.product_id === +id)
      .map((item: CartItemInterface) => {
        if (item?.product_id === id && item.product_quantity > 1) {
          return { ...item, product_quantity: item.product_quantity - 1 };
        }
      })
      .pop();

    return updateCart(updatedCart);
  };

  // ============================================== FETCH THE CART ITEMS ============================== //
  const handleCartFetch = async () => {
    try {
      const payload = {
        page_id: "1",
        page_size: "10",
      };

      const response = await fetchCart(payload);

      if (!response?.cart?.length) {
        return toast.error("Cart could not be fetched");
      }

      setAuthenticatedCart(response);
      setIsCartFetched(true);
      return response.product;
    } catch (err) {
      return err;
    }
  };

  // ============================================== HANDLE CART SYNCHRONIZATION ============================== //
  const handleCartSync = async (cartItems: CartItemInterface[]) => {
    deleteCart();
    try {
      const promises = cartItems.map(async (cartItem) => {
        await createCartItem(cartItem);
      });
      await Promise.all(promises);
      handleCartFetch();
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  // ============================================== UPDATE THE ONLINE CART ============================== //
  const handleUpdateCart = async (
    cartItem: CartResponseInterface,
    action: string
  ) => {
    switch (action) {
      case "decrease":
        if (Number(cartItem?.product_quantity) < 2) {
          return;
        }
        const payloadDec = {
          product_quantity: Number(cartItem?.product_quantity) - 1,
          item_id: +cartItem.id,
        };

        handleUpdateRequest(payloadDec);
        break;

      case "increase":
        const payloadInc = {
          product_quantity: Number(cartItem?.product_quantity) + 1,
          item_id: +cartItem.id,
        };

        handleUpdateRequest(payloadInc);
        break;

      default:
        return;
    }
  };

  // ============================================== HANDLE THE UPDATING REQUEST ============================== //
  const handleUpdateRequest = async (
    data: UpdateCartItemRequestPayloadInterface
  ) => {
    try {
      const response = await updateCartItemQty(data);

      if (response?.cart) {
        handleCartFetch();
      }
    } catch (err) {
      return err;
    }
  };

  // ============================================== MAKE REQUEST TO REMOVE FROM CART ============================== //
  const handleRemoveItem = async (product_id: string) => {
    try {
      const response = await removeCartItem(product_id);

      if (response?.message) {
        toast.success(response?.message);
        handleCartFetch();
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="w-full flex flex-col p-0 md:pt-[7rem]">
      <div className="flex my-[4rem] mx-[2rem]">
        <BiChevronLeft color="#F2994A" className="mt-[3px]" size={24} />
        <h3 className="font-montserrat font-normal text-xs sm:text-lg text-[#F2994A] m-0 p-0 ">
          Continue Shopping
        </h3>
      </div>

      <div className="w-[80%] flex flex-col mx-auto my-0">
        <div className="w-full flex flex-col text-center">
          <h3 className="font-montserrat font-semibold text-xs sm:text-lg text-[#4f4f4f] m-0 p-0 ">
            CART
          </h3>
          <p className="font-montserrat font-semibold text-xs text-[#4f4f4f]">
            You are eligible for free shipping!
          </p>
        </div>

        <table className="my-[3rem]">
          <thead className="w-full">
            <tr className="w-full">
              <th className="w-[65%] text-left pb-[1rem] font-montserrat font-semibold text-xs text-[#333333] border-b-[1px] border-b-[#bdbdbd]">
                PRODUCT
              </th>

              <th className="text-left pb-[1rem] font-montserrat font-semibold text-xs text-[#333333] border-b-[1px] border-b-[#bdbdbd]">
                QUANTITY
              </th>

              <th className="text-right pb-[1rem] font-montserrat font-semibold text-xs text-[#333333] border-b-[1px] border-b-[#bdbdbd]">
                TOTAL
              </th>
            </tr>
          </thead>

          <tbody className="w-full">
            {offlineCart && !token && offlineCart?.length
              ? offlineCart?.map((crt: CartItemInterface, idx: number) => (
                  <tr key={idx} className="w-full">
                    <td>
                      <div className="flex my-[2rem]">
                        <Image
                          src={
                            crt && crt?.product_image ? crt?.product_image : ""
                          }
                          alt="cart_img"
                          width={105}
                          height={144}
                        />
                        <div className="flex flex-col mt-[1rem] ml-[3rem] h-[4rem]">
                          <p className="font-montserrat font-semibold text-[11px] text-[#4f4f4f] mb-[0.4rem]">
                            {crt?.product_name ? crt?.product_name : ""}
                          </p>
                          <p className="font-montserrat font-semibold text-[9px] text-[#4f4f4f] mb-[0.4rem]">
                            {crt?.product_size ? crt?.product_size : ""}
                          </p>
                          <p className="font-montserrat font-semibold text-[10px] text-[#4f4f4f] mb-[0.4rem]">
                            {crt?.product_price
                              ? `₦ ${Number(
                                  crt?.product_price
                                ).toLocaleString()}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col">
                        <div className="py-[12px] px-[15px] gap-[10px] w-[111px] border-[0.4px] border-[#828282] rounded box-border font-montserrat font-medium text-sm text-[#4f4f4f] flex justify-between">
                          <AiOutlineMinus
                            onClick={() =>
                              decrementCart(
                                crt?.product_id,
                                crt?.product_quantity
                              )
                            }
                            color="#4F4F4F"
                            className="cursor-pointer"
                          />
                          {crt?.product_quantity ? crt?.product_quantity : 1}
                          <AiOutlinePlus
                            onClick={() => incrementCart(crt?.product_id)}
                            color="#4F4F4F"
                            className="cursor-pointer"
                          />
                        </div>

                        <p className="font-montserrat font-semibold text-[9px] text-[#4f4f4f] mt-[1rem] ml-[15%] underline underline-offset-4 decoration-1">
                          REMOVE
                        </p>
                      </div>
                    </td>

                    <td className="text-right">
                      <p className="font-montserrat font-semibold text-[10px] text-[#4f4f4f] mb-[0.4rem]">
                        {crt?.product_price
                          ? `₦ ${Number(
                              +crt?.product_price * +crt?.product_quantity
                            ).toLocaleString()}`
                          : ""}
                      </p>
                    </td>
                  </tr>
                ))
              : null}

            {authenticatedCart &&
            authenticatedCart?.cart &&
            token &&
            authenticatedCart?.cart?.length
              ? authenticatedCart?.cart?.map(
                  (crt: CartResponseInterface, idx: number) => (
                    <tr key={idx} className="w-full">
                      <td>
                        <div className="flex my-[2rem]">
                          <Image
                            src={
                              crt && crt?.product_image
                                ? crt?.product_image
                                : ""
                            }
                            alt="cart_img"
                            width={105}
                            height={144}
                          />
                          <div className="flex flex-col mt-[1rem] ml-[3rem] h-[4rem]">
                            <p className="font-montserrat font-semibold text-[11px] text-[#4f4f4f] mb-[0.4rem]">
                              {crt?.product_name ? crt?.product_name : ""}
                            </p>
                            <p className="font-montserrat font-semibold text-[9px] text-[#4f4f4f] mb-[0.4rem]">
                              {crt?.product_size ? crt?.product_size : ""}
                            </p>
                            <p className="font-montserrat font-semibold text-[10px] text-[#4f4f4f] mb-[0.4rem]">
                              {crt?.product_price
                                ? `₦ ${Number(
                                    crt?.product_price
                                  ).toLocaleString()}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="flex flex-col">
                          <div className="py-[12px] px-[15px] gap-[10px] w-[111px] border-[0.4px] border-[#828282] rounded box-border font-montserrat font-medium text-sm text-[#4f4f4f] flex justify-between">
                            <AiOutlineMinus
                              onClick={() => handleUpdateCart(crt, "decrease")}
                              color="#4F4F4F"
                              className="cursor-pointer"
                            />
                            {crt?.product_quantity ? crt?.product_quantity : 1}
                            <AiOutlinePlus
                              onClick={() => handleUpdateCart(crt, "increase")}
                              color="#4F4F4F"
                              className="cursor-pointer"
                            />
                          </div>

                          <p
                            onClick={() => handleRemoveItem(crt?.product_id)}
                            className="font-montserrat font-semibold text-[9px] text-[#4f4f4f] mt-[1rem] ml-[15%] underline underline-offset-4 decoration-1 cursor-pointer"
                          >
                            REMOVE
                          </p>
                        </div>
                      </td>

                      <td className="text-right">
                        <p className="font-montserrat font-semibold text-[10px] text-[#4f4f4f] mb-[0.4rem]">
                          {crt?.product_price
                            ? `₦ ${Number(
                                +crt?.product_price * +crt?.product_quantity
                              ).toLocaleString()}`
                            : ""}
                        </p>
                      </td>
                    </tr>
                  )
                )
              : null}
          </tbody>
        </table>

        <div className="w-full flex flex-col text-center">
          <div className="flex flex-col w-[24.4375rem] ml-[auto] text-right">
            <h3 className="font-montserrat font-semibold text-xs sm:text-lg text-[#4f4f4f] m-0 p-0">
              {!token
                ? offlineTotal && offlineCart?.length
                  ? `TOTAL: ${Number(offlineTotal).toLocaleString()}`
                  : `TOTAL: ${Number(0).toLocaleString()}`
                : null}

              {token
                ? total && authenticatedCart?.cart?.length
                  ? `TOTAL: ${Number(total).toLocaleString()}`
                  : `TOTAL: ${Number(0).toLocaleString()}`
                : null}
            </h3>
            <h4 className="font-montserrat font-medium text-xs sm:text-sm text-[#333333]">
              *Shipping and tax to be calculated at checkout
            </h4>
            <Button
              onClick={() =>
                token ? router.push("/cart/checkout") : router.push("/login")
              }
              className="w-[8px] sm:w-full h-[43px] px-[24px] rounded py-[8px] cursor-pointer font-semibold text-xs text-[#F2F2F2] font-montserrat bg-[#363435] outline-0 cursor-pointer my-[1rem] mx-auto"
              type="submit"
            >
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
