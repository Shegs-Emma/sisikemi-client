"use client";

import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import RecentlyViewed from "@/components/reusebles/recentlyViewed";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import { TbHanger } from "react-icons/tb";
import { useProductStore } from "@/store/productStore";
import { shallow } from "zustand/shallow";
import { CartItemInterface, ProductInterface } from "@/utils/interface";
import { toast } from "sonner";
import { useOfflineCartStore } from "@/store/offlineCartStore";
import { decrement, increment } from "@/utils/functions";
import { useCartStore } from "@/store/cartStore";
import { getCookie } from "cookies-next";
import { BsStars } from "react-icons/bs";

interface ProductProps {
  id: string | string[] | undefined;
}

const Product: FC<ProductProps> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const [currentImg, setCurrentImg] = useState<string>("");
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [fetchedProduct, setFetchedProduct] = useState<ProductInterface>();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [fetchedCartItems, setFetchedCartItems] = useState([]);

  const token = !!getCookie("accessToken");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { getProduct } = useProductStore(
    (state: any) => ({
      getProduct: state.getProduct,
    }),
    shallow,
  );

  const { addToCart, offlineCart, removeFromCart } = useOfflineCartStore(
    (state: any) => ({
      addToCart: state.addToCart,
      offlineCart: state.offlineCart,
      removeFromCart: state.removeFromCart,
    }),
    shallow,
  );

  const { createCartItem, fetchCart } = useCartStore(
    (state: any) => ({
      createCartItem: state.createCartItem,
      fetchCart: state.fetchCart,
    }),
    shallow,
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const handleFetch = useCallback(async () => {
    startTransition(async () => {
      try {
        if (id) {
          const response = await getProduct(id);

          if (!response?.product) {
            return toast.error("Product could not be fetched");
          }

          setFetchedProduct(response.product);
          return response.product;
        }
      } catch (err) {
        return err;
      }
    });
  }, [getProduct, id, startTransition]);

  useEffect(() => {
    if (id) {
      handleFetch();
    }
  }, [handleFetch, id]);

  useEffect(() => {
    if (offlineCart?.length && fetchedProduct?.product_ref_no) {
      const isExists = offlineCart.some(
        (prod: CartItemInterface) => +prod?.product_id === +fetchedProduct?.id,
      );

      setIsAddedToCart(isExists);
    }
  }, [offlineCart, fetchedProduct?.id, fetchedProduct?.product_ref_no]);

  useEffect(() => {
    if (fetchedCartItems?.length && fetchedProduct?.product_ref_no) {
      const isExists = fetchedCartItems.some(
        (prod: CartItemInterface) => +prod?.product_id === +fetchedProduct?.id,
      );

      setIsAddedToCart(isExists);
    }
  }, [fetchedCartItems, fetchedProduct?.id, fetchedProduct?.product_ref_no]);

  useEffect(() => {
    const mainImage = fetchedProduct?.product_image_main?.media_id?.url;

    if (mainImage) {
      setCurrentImg(mainImage);
    }
  }, [fetchedProduct?.product_image_main?.media_id?.url]);

  const handleCurrentView = (url: string) => {
    setCurrentImg(url);
  };

  const handleAddToCart = () => {
    const sizeSelect = fetchedProduct?.size?.[selectedSizeIndex];
    const colorSelect = fetchedProduct?.color?.[selectedColorIndex];

    const payload = {
      product_id: Number(fetchedProduct?.id),
      product_name: fetchedProduct?.product_name,
      product_image: fetchedProduct?.product_image_main?.media_id?.url,
      product_price: fetchedProduct?.price,
      product_quantity: quantity,
      product_size: sizeSelect,
      product_color: colorSelect,
    };

    const response = addToCart(payload);

    toast.success("Item added to cart!");
    return response;
  };

  const handleCart = async () => {
    const toastId = toast.loading("Adding cart item");
    try {
      const sizeSelect = fetchedProduct?.size?.[selectedSizeIndex];
      const colorSelect = fetchedProduct?.color?.[selectedColorIndex];

      const payload = {
        product_id: Number(fetchedProduct?.id),
        product_name: fetchedProduct?.product_name,
        product_image: fetchedProduct?.product_image_main?.media_id?.url,
        product_price: fetchedProduct?.price,
        product_quantity: quantity,
        product_size: sizeSelect,
        product_color: colorSelect,
      };

      const response = await createCartItem(payload);

      if (!response?.cart) {
        toast.error("Cart item could not be created", {
          id: toastId,
        });
      }

      toast.success("Cart item added", {
        id: toastId,
      });

      handleCartFetch();
    } catch (err) {
      toast.error("An error occurred while syncing the cart", {
        id: toastId,
      });
      console.error(err);
      return err;
    }
  };

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

      setFetchedCartItems(response?.cart);
      return response.cart;
    } catch (err) {
      return err;
    }
  };

  const handleRemoveFromCart = () => {
    const removed = removeFromCart(fetchedProduct?.product_ref_no);

    toast.success("Item removed from cart!");
    setIsAddedToCart(false);
    return removed;
  };

  const productImages = useMemo(
    () =>
      [
        fetchedProduct?.product_image_main?.media_id?.url,
        fetchedProduct?.product_image_other_1?.media_id?.url,
        fetchedProduct?.product_image_other_2?.media_id?.url,
        fetchedProduct?.product_image_other_3?.media_id?.url,
      ].filter((img): img is string => Boolean(img)),
    [
      fetchedProduct?.product_image_main?.media_id?.url,
      fetchedProduct?.product_image_other_1?.media_id?.url,
      fetchedProduct?.product_image_other_2?.media_id?.url,
      fetchedProduct?.product_image_other_3?.media_id?.url,
    ],
  );

  const activeImage = currentImg || productImages[0] || "/images/recent1.svg";

  return (
    <div className="flex w-full flex-col bg-[linear-gradient(180deg,#fffdf9_0%,#fff7f0_42%,#ffffff_100%)] pt-[6.5rem] md:pt-[10.75rem] xl:pt-[11.5rem]">
      <section className="px-4 pb-6 pt-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto flex max-w-[1380px] flex-wrap items-center gap-2 rounded-full border border-[#eadfce] bg-white/80 px-4 py-2.5 text-xs font-medium text-[#6f675f] shadow-[0_12px_30px_rgba(84,56,28,0.06)] md:gap-3 md:text-sm">
          <span>Home Page</span>
          <BiChevronRight size={18} />
          <span className="text-[#2f2924]">Product Page</span>
        </div>
      </section>

      {isPending ? (
        <section className="px-4 pb-16 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto grid max-w-[1380px] gap-6 lg:grid-cols-2">
            <div className="h-[520px] animate-pulse rounded-[28px] bg-[#f4ece1]" />
            <div className="h-[520px] animate-pulse rounded-[28px] bg-[#f4ece1]" />
          </div>
        </section>
      ) : (
        <section className="px-4 pb-16 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto grid max-w-[1380px] gap-6 border-b border-[#d8c7b3] pb-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-[28px] border border-[#eadfce] bg-white/80 p-4 shadow-[0_24px_70px_rgba(84,56,28,0.1)] md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:w-[88px] lg:flex-col lg:overflow-visible">
                  {productImages.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => handleCurrentView(img)}
                      className={`shrink-0 overflow-hidden rounded-xl border bg-[#f8efe4] p-1.5 transition-colors duration-200 ${
                        img === activeImage
                          ? "border-[#a86728]"
                          : "border-[#e9dbc8]"
                      }`}
                    >
                      <Image
                        src={img}
                        alt="Product thumbnail"
                        width={74}
                        height={96}
                        className="h-[96px] w-[74px] object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div className="order-1 flex-1 lg:order-2">
                  <div className="overflow-hidden rounded-[22px] bg-[#f8efe4]">
                    <Image
                      src={activeImage}
                      alt={fetchedProduct?.product_name ?? "Product image"}
                      width={740}
                      height={980}
                      className="h-[440px] w-full object-cover md:h-[620px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#eadfce] bg-white/85 p-5 shadow-[0_24px_70px_rgba(84,56,28,0.1)] md:p-7 lg:p-8">
              <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#eadfce] pb-5">
                <div>
                  <p className="inline-flex items-center gap-2 font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a86728]">
                    <BsStars className="text-xs" />
                    Sisi Kemi
                  </p>
                  <h1 className="mt-2 font-montserrat text-2xl font-semibold uppercase leading-tight text-[#2f2924] md:text-[2rem]">
                    {fetchedProduct?.product_name ?? ""}
                  </h1>
                  <p className="mt-2 font-montserrat text-xl font-medium text-[#4f4f4f]">
                    {fetchedProduct?.price
                      ? `₦ ${Number(fetchedProduct?.price).toLocaleString()}`
                      : ""}
                  </p>
                </div>

                <div className="rounded-full border border-[#d8c7b3] bg-[#fffaf4] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f675f]">
                  {fetchedProduct?.quantity
                    ? `${fetchedProduct.quantity} in stock`
                    : "Sold out"}
                </div>
              </div>

              <div className="mb-6 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d8c7b3] bg-[#fffaf4] px-4 py-2.5 text-sm font-medium text-[#3f3933] transition-colors duration-200 hover:bg-white"
                >
                  <TbHanger size={18} />
                  Size Guide
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 font-montserrat text-sm font-semibold uppercase tracking-[0.14em] text-[#3f3933]">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {fetchedProduct?.size?.length
                      ? fetchedProduct.size.map((size, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedSizeIndex(idx)}
                            className={`min-w-[56px] rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                              selectedSizeIndex === idx
                                ? "border-[#a86728] bg-[#a86728] text-white"
                                : "border-[#c9b7a3] bg-[#fffaf4] text-[#4f4f4f]"
                            }`}
                          >
                            {size}
                          </button>
                        ))
                      : null}
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-montserrat text-sm font-semibold uppercase tracking-[0.14em] text-[#3f3933]">
                    Color
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {fetchedProduct?.color?.length
                      ? fetchedProduct.color.map((colr, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedColorIndex(idx)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                              selectedColorIndex === idx
                                ? "border-[#a86728] bg-[#a86728] text-white"
                                : "border-[#c9b7a3] bg-[#fffaf4] text-[#4f4f4f]"
                            }`}
                          >
                            {colr}
                          </button>
                        ))
                      : null}
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-montserrat text-sm font-semibold uppercase tracking-[0.14em] text-[#3f3933]">
                    Quantity
                  </p>
                  <div className="inline-flex items-center gap-4 rounded-full border border-[#c9b7a3] bg-[#fffaf4] px-4 py-2 text-[#4f4f4f]">
                    <AiOutlineMinus
                      onClick={() => decrement(setQuantity)}
                      className="cursor-pointer"
                    />
                    <span className="min-w-5 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <AiOutlinePlus
                      onClick={() =>
                        fetchedProduct?.quantity &&
                        increment(setQuantity, fetchedProduct.quantity)
                      }
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                {!isAddedToCart ? (
                  <Button
                    className="h-12 w-full rounded-full bg-[#2f2924] font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-[#463d35]"
                    type="button"
                    onClick={() => (!token ? handleAddToCart() : handleCart())}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <Button
                    className="h-12 w-full rounded-full bg-[#2f2924] font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-[#463d35]"
                    type="button"
                    onClick={() => handleRemoveFromCart()}
                  >
                    Remove From Cart
                  </Button>
                )}
              </div>

              <div className="mt-8 rounded-[20px] border border-[#eadfce] bg-[#fffaf4] p-5">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-[0.16em] text-[#333333]">
                  Description
                </h3>
                <p className="mt-3 font-montserrat text-sm leading-7 text-[#4f4f4f] md:text-base">
                  {fetchedProduct?.product_description ?? ""}
                </p>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-between rounded-full border border-[#d8c7b3] bg-white px-5 py-3 text-left font-montserrat text-sm font-medium uppercase tracking-[0.14em] text-[#4f4f4f] transition-colors duration-200 hover:bg-[#fffaf4]"
              >
                <span>More Information</span>
                <BsChevronRight />
              </button>
            </div>
          </div>
        </section>
      )}

      <RecentlyViewed title="YOU MAY ALSO LIKE" />

      <RecentlyViewed title="RECENTLY VIEWED" />
    </div>
  );
};

export default Product;
