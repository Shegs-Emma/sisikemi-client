"use client";

import * as React from "react";
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
  name: string,
  price: string,
  quantity: string,
  collection: string,
  lastUpdated: string,
  status: string
) {
  return { name, price, quantity, collection, lastUpdated, status };
}

const rows = [
  createData(
    "Product name",
    "Code 1",
    "Percentage",
    "Jan 4, 2022",
    "22",
    "Active"
  ),
  createData(
    "Product name",
    "Code 1",
    "Free shipping",
    "Jan 4, 2022",
    "22",
    "Sold out"
  ),
  createData(
    "Product name",
    "Code 1",
    "Percentage",
    "Jan 4, 2022",
    "22",
    "Achived"
  ),
  createData(
    "Product name",
    "Code 1",
    "Percentage",
    "Jan 4, 2022",
    "22",
    "Active"
  ),
  createData(
    "Product name",
    "Code 1",
    "Percentage",
    "Jan 4, 2022",
    "22",
    "Achived"
  ),
  createData(
    "Product name",
    "Code 1",
    "Free shipping",
    "Jan 4, 2022",
    "22",
    "Active"
  ),
  createData(
    "Product name",
    "Code 1",
    "Percentage",
    "Jan 4, 2022",
    "22",
    "Sold out"
  ),
];

const AdminDiscounts = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // const ITEMS_PER_PAGE = 10;
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
            <h1 className="text-3xl font-medium font-lato text-[#363435] mt-2">
              Discounts
            </h1>
            <p className="font-lato font-normal text-sm text-[#828282] mt-3">
              120 discounts
            </p>
          </div>

          <div
            onClick={() => router.push("/admin/discount/new-discount")}
            className="w-[178px] h-[44px] rounded bg-[#363435] text-sm font-normal pt-2 text-center cursor-pointer"
          >
            + Add new promocode
          </div>
        </div>

        <div className="flex mt-4">
          <p className="font-normal text-sm font-lato text-[#363435] border-b-[2px] border-b-[#f2c94c]">
            All discounts
          </p>

          <p className="font-normal text-sm font-lato text-[#363435] ml-4">
            Active
          </p>

          <p className="font-normal text-sm font-lato text-[#363435] ml-4">
            Inactive
          </p>

          <p className="font-normal text-sm font-lato text-[#363435] ml-4">
            Expired
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col px-10 pt-4 my-10">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Discount name</StyledTableCell>
                <StyledTableCell align="right">Discount code</StyledTableCell>
                <StyledTableCell align="right">Discount type</StyledTableCell>
                <StyledTableCell align="right">Expiry date</StyledTableCell>
                <StyledTableCell align="right">Discount usage</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    onClick={() => router.push("/admin/view-product")}
                    className="cursor-pointer"
                  >
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.collection}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.lastUpdated}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    className={`flex items-center ${
                      row.status === "Active"
                        ? "text-[#05830A]"
                        : row.status === "Archived"
                        ? "text-[#074cb2]"
                        : "text-[#f2994a]"
                    }`}
                  >
                    <GoDotFill className="mr-1" />
                    {row.status}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="mx-auto text-xs text-gray-600 mb-10">
        <MyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminDiscounts;
