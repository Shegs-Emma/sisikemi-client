"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "sonner";
import MyPagination from "../ui/pagination";
import { useRouter } from "next/navigation";
import { FetchCollectionResponseInterface } from "@/utils/interface";
import { useCollectionStore } from "@/store/collectionStore";
import { shallow } from "zustand/shallow";
import moment from "moment";
import Container from "../reusebles/container";
import EmptyImage from "../../../public/assets/emptyImage.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  collectionName: string,
  collectionImage: string,
  productCount: string,
  collectionDescription: string,
  dateCreated: string
) {
  return {
    collectionName,
    collectionImage,
    productCount,
    collectionDescription,
    dateCreated,
  };
}

const AdminCollection = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedCollections, setFetchedCollections] =
    useState<FetchCollectionResponseInterface | null>();

  const ITEMS_PER_PAGE = 10;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { fetchCollections, collections } = useCollectionStore(
    (state: any) => ({
      fetchCollections: state.fetchCollections,
      collections: state.collections,
    }),
    shallow
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

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
        return setFetchedCollections(null);
      }

      setFetchedCollections(response);

      return response.collection;
    } catch (err) {
      return err;
    }
  };

  const rows = fetchedCollections?.collection?.length
    ? fetchedCollections?.collection.map((collec) =>
        createData(
          `${collec.collection_name}`,
          `${collec.thumbnail_image}`,
          `${collec.product_count}`,
          `${collec.collection_description}`,
          `${collec.created_at}`
        )
      )
    : null;

  //   const totalPages = transactions?.length
  //     ? Math.ceil(transactions.length / ITEMS_PER_PAGE)
  //     : 0;
  //   const currentData =
  //     transactions?.length &&
  //     transactions.slice(
  //       (currentPage - 1) * ITEMS_PER_PAGE,
  //       currentPage * ITEMS_PER_PAGE
  //     );

  const totalPages = 10;
  // const currentData = 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full z-10 mt-10 flex flex flex-col">
      <div className="w-full flex justify-between px-10 pt-4 pb-10 border-b-[1px] border-b-[#e0e0e0]">
        <div className="flex justify-between w-[480px] rounded-lg py-[14px] px-[20px] border-[1px] border-[#e0e0e0]">
          <input
            placeholder="Search"
            type="text"
            className="outline-none font-normal text-xs font-lato text-[#363435] w-[80%]"
          />
          <CiSearch className="text-[#363435] w-[20px] h-[20px]" />
        </div>

        <div className="flex justify-between">
          <div className="w-[148px] rounded-lg py-[14px] px-[24px] border-[1px] border-[#e0e0e0] flex justify-between">
            <Image
              src="/assets/category.svg"
              alt="avatar_img"
              width={24}
              height={24}
            />
            <p className="font-lato text-xs font-semibold text-[#333333] mt-1">
              Category
            </p>
          </div>

          <div className="w-[196px] rounded-lg py-[14px] px-[24px] border-[1px] border-[#e0e0e0] flex justify-center ml-6">
            <Image
              src="/assets/sort.svg"
              alt="avatar_img"
              width={24}
              height={24}
            />
            <p className="font-lato text-xs font-semibold text-[#333333] mt-1 ml-3">
              Sort By: None
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-10 pt-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium font-lato text-[#363435]">
              Collections
            </h1>
            <p className="font-lato font-normal text-sm text-[#828282] mt-1">
              {collections && collections?.length
                ? collections?.length > 1
                  ? `${collections?.length} Collections`
                  : `${collections?.length} Collection`
                : null}
            </p>
          </div>

          <div
            onClick={() => router.push("/admin/collection/add-collection")}
            className="w-[168px] h-[44px] rounded bg-[#363435] text-sm font-normal pt-2 text-center cursor-pointer"
          >
            + Add new collection
          </div>
        </div>
      </div>

      {collections && collections?.length ? (
        <div className="w-full flex flex-col px-10 pt-4 my-10">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Collection name</StyledTableCell>
                  <StyledTableCell align="left">
                    Collection Details
                  </StyledTableCell>
                  <StyledTableCell align="right">Product Count</StyledTableCell>
                  <StyledTableCell align="right">Date Created</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length &&
                  rows.map((row, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className="cursor-pointer"
                      >
                        <div className="flex">
                          <Image
                            src={row.collectionImage}
                            alt="avatar_img"
                            width={48}
                            height={48}
                          />
                          <p className="font-lato font-normal text-base text-[#4f4f4f] ml-4 mt-3">
                            {row.collectionName}
                          </p>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        width={650}
                        style={{ textAlign: "justify" }}
                      >
                        {row.collectionDescription}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.productCount != "undefined"
                          ? row.productCount
                          : "0"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(row.dateCreated).format("LL")}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Container className="mb-14 pt-6 @container">
          <div className="mt-8 flex flex-col items-center justify-center">
            <Image
              src={EmptyImage}
              alt="empty_img"
              width={24}
              height={24}
              className="h-44 w-auto"
            />
            <h2 className="mt-4 text-xl font-bold text-[#333333]">
              No Collections created yet
            </h2>
            <p className="mt-2 text-sm font-medium text-[#333333]">
              Oops, it seems like your collections are empty.
            </p>
          </div>
        </Container>
      )}

      {collections && collections?.length ? (
        <div className="mx-auto text-xs text-gray-600 mb-10">
          <MyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AdminCollection;
