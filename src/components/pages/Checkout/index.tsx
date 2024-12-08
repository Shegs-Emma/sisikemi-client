"use client";

import React, { useEffect, useState } from "react";
import Estimate from "./Estimate";
import ContactInfo from "./ContactInfo";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { getCookie } from "cookies-next";
import { useCartStore } from "@/store/cartStore";
import { shallow } from "zustand/shallow";
import { CartResponseRootInterface } from "@/utils/interface";
import { toast } from "sonner";

const Checkout = () => {
  const [isCartFetched, setIsCartFetched] = useState<boolean>(false);
  const [authenticatedCart, setAuthenticatedCart] =
    useState<CartResponseRootInterface>();
  const token = !!getCookie("accessToken");

  const { fetchCart } = useCartStore(
    (state: any) => ({
      fetchCart: state.fetchCart,
    }),
    shallow
  );

  // ============================================== CHECK AVAILABILITY OF CART AND FETCH ============================== //
  useEffect(() => {
    if (token && !isCartFetched) {
      handleCartFetch();
    }
  }, [token, isCartFetched]);

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

  console.log("authenticatedCart", authenticatedCart);

  return (
    <div className="w-full flex pt-[5rem]">
      <ContactInfo />
      {/* <Shipping /> */}
      {/* <Payment /> */}
      <Estimate items={authenticatedCart?.cart} />
    </div>
  );
};

export default Checkout;
