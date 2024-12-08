"use client";

// zustand
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import { CartItemInterface } from "@/utils/interface";

export const useOfflineCartStore = createWithEqualityFn(
  devtools(
    (set, get) => ({
      offlineCart:
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("cart") || "[]")
          : [],
      addToCart: (item: CartItemInterface) => {
        const currentCart =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("cart") || "[]")
            : [];
        const newCart = [...currentCart, item];
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(newCart));
        }
        set({ offlineCart: newCart });
        return newCart;
      },
      removeFromCart: (id: string) => {
        const currentCart =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("cart") || "[]")
            : [];
        const updatedCart = currentCart.filter(
          (item: CartItemInterface) => +item.product_id !== +id
        );
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        set({ offlineCart: updatedCart });
        return updatedCart;
      },
      updateCart: (item: CartItemInterface) => {
        const currentCart =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("cart") || "[]")
            : [];
        const updatedCart = currentCart.map((i: CartItemInterface) =>
          i.product_id === item.product_id ? item : i
        );

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        set({ offlineCart: updatedCart });
        return updatedCart;
      },
      deleteCart: () => {
        localStorage.removeItem("cart");
        set({ offlineCart: "[]" });
      },
    }),
    {
      name: "offlineCart-storage", // Unique name for the storage
      getStorage: () => localStorage, // Define storage, default is localStorage
    }
  )
);
