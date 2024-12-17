"use client";

import React, { FC, useEffect, useState } from "react";
import { useCollectionStore } from "@/store/collectionStore";
import { FetchCollectionResponseInterface } from "@/utils/interface";
import Image from "next/image";
import { toast } from "sonner";
import { shallow } from "zustand/shallow";

const Collections: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedCollections, setFetchedCollections] =
    useState<FetchCollectionResponseInterface>();

  const ITEMS_PER_PAGE = 10;

  const { fetchCollections, collections } = useCollectionStore(
    (state: any) => ({
      fetchCollections: state.fetchCollections,
      collections: state.collections,
    }),
    shallow
  );

  useEffect(() => {
    handleCollectionsFetch();
  }, []);

  const handleCollectionsFetch = async () => {
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
  };

  return (
    <div className="w-full flex flex-col p-0 md:pt-[6rem]">
      <div className="flex justify-center w-[45%] md:w-[20%] mx-auto mt-[4rem] mb-[5rem]">
        <h1 className="font-montserrat font-bold text-2xl sm:text-lg text-[#4F4F4F]">
          COLLECTIONS
        </h1>
      </div>

      <div className="flex flex-col w-full border-b-[0.5px] border-b-[#4f4f4f] pb-[7rem]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-14 px-[1.5rem] py-0">
          {fetchedCollections && fetchedCollections?.collection?.length
            ? fetchedCollections?.collection?.map((collection, idx) => (
                <div key={idx} className="flex flex-col">
                  <Image
                    src={
                      collection?.thumbnail_image
                        ? collection?.thumbnail_image
                        : ""
                    }
                    alt="section_img"
                    width={400}
                    height={400}
                  />
                  <div className="flex flex-col text-center">
                    <p className="font-montserrat font-semibold text-xl text-[#4f4f4f] my-2">
                      {collection?.collection_name}
                    </p>
                    <p className="font-montserrat font-medium text-base text-[#4f4f4f] m-0">
                      {collection?.product_count
                        ? +collection?.product_count > 1
                          ? `${collection?.product_count} Products`
                          : `${collection?.product_count} Product`
                        : null}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Collections;
