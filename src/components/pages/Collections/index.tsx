"use client";

import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useCollectionStore } from "@/store/collectionStore";
import {
  Collection,
  FetchCollectionResponseInterface,
} from "@/utils/interface";
import Image from "next/image";
import { toast } from "sonner";
import { shallow } from "zustand/shallow";
import { BsStars } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";

const Collections: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [fetchedCollections, setFetchedCollections] =
    useState<FetchCollectionResponseInterface>();

  const ITEMS_PER_PAGE = 10;
  const currentPage = 1;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { fetchCollections } = useCollectionStore(
    (state: any) => ({
      fetchCollections: state.fetchCollections,
    }),
    shallow,
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const handleCollectionsFetch = useCallback(async () => {
    startTransition(async () => {
      try {
        const payload = {
          page_id: currentPage.toString(),
          page_size: ITEMS_PER_PAGE.toString(),
        };

        const response = await fetchCollections(payload);

        if (!response?.collection?.length) {
          return toast.error("Collection could not be fetched");
        }

        setFetchedCollections(response);

        return response.collection;
      } catch (err) {
        return err;
      }
    });
  }, [ITEMS_PER_PAGE, currentPage, fetchCollections, startTransition]);

  useEffect(() => {
    handleCollectionsFetch();
  }, [handleCollectionsFetch]);

  const collections = useMemo(
    () => fetchedCollections?.collection ?? [],
    [fetchedCollections?.collection],
  );
  const totalProducts = useMemo(
    () =>
      collections.reduce(
        (sum: number, item: Collection) =>
          sum + Number(item.product_count || 0),
        0,
      ),
    [collections],
  );

  return (
    <div className="flex w-full flex-col bg-[linear-gradient(180deg,#f7fbff_0%,#f3f6ff_36%,#ffffff_100%)] pt-[6.5rem] md:pt-[10.75rem] xl:pt-[11.5rem]">
      <section className="px-4 pb-10 pt-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-[1380px] gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[34px] border border-[#dbe3f1] bg-[radial-gradient(circle_at_20%_20%,rgba(106,181,210,0.24),transparent_42%),linear-gradient(145deg,#f7fbff_0%,#ffffff_65%,#f2eaf9_100%)] p-7 shadow-[0_28px_80px_rgba(43,54,78,0.14)] md:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#bad8e4] bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2f6f89]">
              <BsStars className="text-xs" />
              Collection Atlas
            </div>
            <h1 className="font-montserrat text-[2rem] font-semibold uppercase leading-[1.04] tracking-[0.08em] text-[#212737] md:text-[2.8rem] xl:text-[3.5rem]">
              Curated worlds for every Sisikemi mood.
            </h1>
            <p className="mt-4 max-w-xl font-montserrat text-sm leading-7 text-[#5b657d] md:text-base">
              Explore each collection as a distinct point of view, from clean
              ready-to-wear lines to statement occasion storytelling.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-[26px] border border-[#dbe3f1] bg-white/90 p-6 shadow-[0_18px_48px_rgba(43,54,78,0.08)]">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f6f89]">
                Collections
              </p>
              <p className="mt-3 font-montserrat text-4xl font-semibold text-[#212737]">
                {collections.length}
              </p>
              <p className="mt-2 font-montserrat text-sm text-[#5b657d]">
                Distinct edits ready to browse.
              </p>
            </div>
            <div className="rounded-[26px] border border-[#dbe3f1] bg-[#1f2b3f] p-6 shadow-[0_18px_48px_rgba(20,27,42,0.24)] xl:col-span-2">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b3cbe8]">
                Product Universe
              </p>
              <p className="mt-3 font-montserrat text-4xl font-semibold text-white">
                {totalProducts}
              </p>
              <p className="mt-2 font-montserrat text-sm text-[#dce6f2]">
                Total pieces distributed across collection themes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {isPending ? (
        <section className="px-4 pb-16 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto grid max-w-[1380px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-[26px] border border-[#dde5f3] bg-white p-4 shadow-[0_18px_40px_rgba(43,54,78,0.06)]"
              >
                <div className="h-[260px] animate-pulse rounded-[18px] bg-[#edf2fa]" />
                <div className="mt-4 h-3 w-1/2 animate-pulse rounded-full bg-[#dce6f2]" />
                <div className="mt-3 h-3 w-1/3 animate-pulse rounded-full bg-[#dce6f2]" />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="px-4 pb-16 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto grid max-w-[1380px] grid-cols-1 gap-5 border-b border-[#cfdced] pb-16 sm:grid-cols-2 lg:grid-cols-3">
            {collections.length
              ? collections.map((collection, idx) => (
                  <article
                    key={idx}
                    className={`group flex flex-col overflow-hidden rounded-[26px] border border-[#dde5f3] bg-white p-4 shadow-[0_18px_40px_rgba(43,54,78,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(43,54,78,0.18)] ${
                      idx % 3 === 0 ? "lg:translate-y-4" : ""
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-[18px] bg-[#edf2fa]">
                      <Image
                        src={
                          collection?.thumbnail_image || "/images/recent1.svg"
                        }
                        alt={collection?.collection_name}
                        width={500}
                        height={500}
                        className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2f6f89]">
                        Collection
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between px-1 pb-1 pt-5">
                      <div>
                        <h3 className="font-montserrat text-xl font-semibold uppercase tracking-[0.05em] text-[#222b3f] md:text-2xl">
                          {collection?.collection_name}
                        </h3>
                        <p className="mt-2 font-montserrat text-sm leading-7 text-[#5b657d]">
                          {collection?.collection_description ||
                            "A distinct Sisikemi story curated around signature silhouettes and modern femininity."}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <p className="font-montserrat text-sm font-semibold uppercase tracking-[0.14em] text-[#40557b]">
                          {Number(collection?.product_count || 0) > 1
                            ? `${collection?.product_count} Products`
                            : `${collection?.product_count || 0} Product`}
                        </p>
                        <span className="inline-flex items-center gap-1 font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2f6f89] transition-transform duration-300 group-hover:translate-x-1">
                          Explore
                          <FiArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              : null}
          </div>
        </section>
      )}
    </div>
  );
};

export default Collections;
