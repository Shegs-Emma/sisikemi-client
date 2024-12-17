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
  const [step, setStep] = useState<number>(1);
  const [authenticatedCart, setAuthenticatedCart] =
    useState<CartResponseRootInterface>();
  const [orderDetails, setOrderDetails] = useState({
    email_phone: "",
    country: "",
    address: "",
    first_name: "",
    last_name: "",
    town_city: "",
    postal_code: "",
    landmark: "",
    shipping_method: {
      name: "",
      cost: "",
    },
    payment_method: "",
  });
  const [errorFields, setErrorFields] = useState({
    email_phone: "",
    country: "",
    address: "",
    first_name: "",
    last_name: "",
    town_city: "",
    postal_code: "",
    landmark: "",
    shipping_method: "",
    payment_method: "",
  });

  const token = !!getCookie("accessToken");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { fetchCart } = useCartStore(
    (state: any) => ({
      fetchCart: state.fetchCart,
    }),
    shallow
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

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

  return (
    <div className="w-full flex pt-[5rem]">
      {step === 1 && (
        <ContactInfo
          setStep={setStep}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
          setErrorFields={setErrorFields}
          errorFields={errorFields}
        />
      )}
      {step === 2 && (
        <Shipping
          setStep={setStep}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
        />
      )}
      {step === 3 && (
        <Payment
          setStep={setStep}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
        />
      )}
      <Estimate
        items={authenticatedCart?.cart}
        step={step}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default Checkout;
