"use client";

import React, { useEffect, useState, useTransition } from "react";
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
import { GoDotFill } from "react-icons/go";
import MyPagination from "../ui/pagination";
import { useRouter } from "next/navigation";
import { ProductInterface, ProductResponseInterface } from "@/utils/interface";
import { useProductStore } from "@/store/productStore";
import { shallow } from "zustand/shallow";
import { toast } from "sonner";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  id: string,
  name: string,
  price: string,
  quantity: string,
  collection: string,
  lastUpdated: string,
  status: string
) {
  return { id, name, price, quantity, collection, lastUpdated, status };
}

const AdminProducts = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedProducts, setFetchedProducts] = useState<ProductInterface[]>(
    []
  );
  const [isViewing, setIsViewing] = useState<string>("all");

  const ITEMS_PER_PAGE = 10;
  const { fetchProducts, products } = useProductStore(
    (state: any) => ({
      fetchProducts: state.fetchProducts,
      products: state.products,
    }),
    shallow
  );
  //   const totalPages = transactions?.length
  //     ? Math.ceil(transactions.length / ITEMS_PER_PAGE)
  //     : 0;
  //   const currentData =
  //     transactions?.length &&
  //     transactions.slice(
  //       (currentPage - 1) * ITEMS_PER_PAGE,
  //       currentPage * ITEMS_PER_PAGE
  //     );

  useEffect(() => {
    if (products?.length) {
      switch (isViewing) {
        case "all":
          setFetchedProducts(products);
          break;
        case "active":
          const activeProducts = products?.filter(
            (product: ProductInterface) => product?.status === "active"
          );
          setFetchedProducts(activeProducts);
          break;
        case "archived":
          const archivedProducts = products?.filter(
            (product: ProductInterface) => product?.status === "archived"
          );
          setFetchedProducts(archivedProducts);
          break;
        default:
          setFetchedProducts(products);
      }
    }
  }, [isViewing, products]);

  useEffect(() => {
    handleProductsFetch();
  }, []);

  const handleProductsFetch = async () => {
    startTransition(async () => {
      try {
        const payload = {
          page_id: currentPage.toString(),
          page_size: ITEMS_PER_PAGE.toString(),
        };

        const response = await fetchProducts(payload);

        if (!response?.product?.length) {
          return toast.error("Products could not be fetched");
        }

        // setFetchedProducts(response);

        return response.product;
      } catch (err) {
        return err;
      }
    });
  };

  const rows = fetchedProducts?.length
    ? fetchedProducts?.map((prod) =>
        createData(
          `${prod.id}`,
          `${prod.product_name}`,
          `${prod.price}`,
          `${prod.quantity}`,
          `${prod.collection.collection_name}`,
          `${prod.created_at}`,
          `${prod.status}`
        )
      )
    : null;

  const totalPages = 10;
  const currentData = 1;

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
          <div className="flex">
            <h1 className="text-3xl font-medium font-lato text-[#363435]">
              Products
            </h1>
            <p className="font-lato font-normal text-sm text-[#828282] ml-3 mt-3">
              120 Products
            </p>
          </div>

          <div
            onClick={() => router.push("/admin/product/new-product")}
            className="w-[164px] py-[14.5px] px-[12px] rounded bg-[#363435] text-sm font-normal text-center cursor-pointer"
          >
            + Add new product
          </div>
        </div>

        <div className="flex mt-4">
          <p
            onClick={() => setIsViewing("all")}
            className={` cursor-pointer font-normal text-sm font-lato text-[#363435] ${
              isViewing === "all" ? "border-b-[#f2c94c] border-b-[2px]" : ""
            }`}
          >
            All
          </p>

          <p
            onClick={() => setIsViewing("active")}
            className={` cursor-pointer font-normal text-sm font-lato text-[#363435] ml-4 ${
              isViewing === "active" ? "border-b-[#f2c94c] border-b-[2px]" : ""
            }`}
          >
            Active
          </p>

          <p
            onClick={() => setIsViewing("archived")}
            className={` cursor-pointer font-normal text-sm font-lato text-[#363435] ml-4 ${
              isViewing === "archived"
                ? "border-b-[#f2c94c] border-b-[2px]"
                : ""
            }`}
          >
            Archived
          </p>
        </div>
      </div>

      {products && products?.length ? (
        <div className="w-full flex flex-col px-10 pt-4 my-10">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product name</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Collection</StyledTableCell>
                  <StyledTableCell align="right">Last updated</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length &&
                  rows.map((row, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        onClick={() => router.push(`/admin/product/${row.id}`)}
                        className="cursor-pointer"
                      >
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {`₦${Number(row.price).toLocaleString()}`}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.collection}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(row.lastUpdated).format("LL")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <div
                          className={`flex justify-end ${
                            row.status === "active"
                              ? "text-[#05830A]"
                              : row.status === "archived"
                              ? "text-[#074cb2]"
                              : "text-[#f2994a]"
                          }`}
                        >
                          <GoDotFill className="mr-1 mt-1" />
                          {row.status}
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}

      {products && products?.length ? (
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

export default AdminProducts;
