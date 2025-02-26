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
import MyPagination from "../ui/pagination";
import { useRouter } from "next/navigation";
import { OrdersInterface } from "@/utils/interface";
import { useOrderStore } from "@/store/orderStore";
import { shallow } from "zustand/shallow";
import Container from "../reusebles/container";
import EmptyImage from "../../../public/assets/emptyImage.svg";
import { capitalizeFirstLetter } from "@/lib/utils";

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
  ref_no: string,
  amount: string,
  pay_method: string,
  shipping: number,
  tracking_status: string
) {
  return { name, ref_no, amount, pay_method, shipping, tracking_status };
}

const AdminOrders = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedOrders, setFetchedOrders] = useState<OrdersInterface[]>([]);
  const [isViewing, setIsViewing] = useState<string>("all");

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

  const ITEMS_PER_PAGE = 10;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { fetchOrders, orders } = useOrderStore(
    (state: any) => ({
      fetchOrders: state.fetchOrders,
      orders: state.orders,
    }),
    shallow
  );

  useEffect(() => {
    if (orders?.length) {
      switch (isViewing) {
        case "all":
          setFetchedOrders(orders);
          break;
        case "delivered":
          const deliveredOrders = orders?.filter(
            (order: OrdersInterface) => order?.order_status === "delivered"
          );
          setFetchedOrders(deliveredOrders);
          break;
        case "pending":
          const pendingOrders = orders?.filter(
            (order: OrdersInterface) => order?.order_status === "pending"
          );
          setFetchedOrders(pendingOrders);
          break;
        case "shipped":
          const shippedOrders = orders?.filter(
            (order: OrdersInterface) => order?.order_status === "shipped"
          );
          setFetchedOrders(shippedOrders);
          break;
        case "cancelled":
          const cancelledOrders = orders?.filter(
            (order: OrdersInterface) => order?.order_status === "cancelled"
          );
          setFetchedOrders(cancelledOrders);
          break;
        default:
          setFetchedOrders(orders);
      }
    }
  }, [isViewing, orders]);

  useEffect(() => {
    handleOrdersFetch();
  }, []);

  const handleOrdersFetch = async () => {
    startTransition(async () => {
      try {
        const payload = {
          page_id: currentPage.toString(),
          page_size: ITEMS_PER_PAGE.toString(),
        };

        const response = await fetchOrders(payload);

        if (!response?.orders?.length) {
          return;
        }

        // setFetchedProducts(response);

        return response.orders;
      } catch (err) {
        return err;
      }
    });
  };

  const totalPages = 10;
  // const currentData = 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const rows = fetchedOrders?.length
    ? fetchedOrders?.map((ord) =>
        createData(
          `${capitalizeFirstLetter(
            ord?.username?.username
          )}/${capitalizeFirstLetter(ord?.username?.email)}`,
          `${ord?.ref_no}`,
          `${ord?.amount}`,
          `${ord?.payment_method}`,
          22,
          `${ord?.order_status}`
        )
      )
    : null;

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
              Orders
            </h1>
            <p className="font-lato font-normal text-sm text-[#828282] ml-3 mt-3">
              {orders && orders?.length
                ? orders?.length > 1
                  ? `${orders?.length} Orders`
                  : `${orders?.length} Order`
                : null}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col px-10 pt-4">
        {orders && orders?.length && !isPending ? (
          <>
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
                onClick={() => setIsViewing("pending")}
                className={` cursor-pointer font-normal text-sm font-lato text-[#363435] ml-4 ${
                  isViewing === "active"
                    ? "border-b-[#f2c94c] border-b-[2px]"
                    : ""
                }`}
              >
                Pending
              </p>

              <p
                onClick={() => setIsViewing("shipped")}
                className={` cursor-pointer font-normal text-sm font-lato text-[#363435] ml-4 ${
                  isViewing === "archived"
                    ? "border-b-[#f2c94c] border-b-[2px]"
                    : ""
                }`}
              >
                Shipped
              </p>

              <p
                onClick={() => setIsViewing("delivered")}
                className={` cursor-pointer font-normal text-sm font-lato text-[#363435] ml-4 ${
                  isViewing === "archived"
                    ? "border-b-[#f2c94c] border-b-[2px]"
                    : ""
                }`}
              >
                Delivered
              </p>

              <p
                onClick={() => setIsViewing("cancelled")}
                className={` cursor-pointer font-normal text-sm font-lato text-[#363435] ml-4 ${
                  isViewing === "archived"
                    ? "border-b-[#f2c94c] border-b-[2px]"
                    : ""
                }`}
              >
                Cancelled
              </p>
            </div>
            <div className="w-full flex flex-col my-10">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>User name</StyledTableCell>
                      <StyledTableCell align="right">
                        Reference Number
                      </StyledTableCell>
                      <StyledTableCell align="right">Amount</StyledTableCell>
                      <StyledTableCell align="right">
                        Payment Method
                      </StyledTableCell>
                      <StyledTableCell align="right">Shipping</StyledTableCell>
                      <StyledTableCell align="right">
                        Tracking status
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.length &&
                      rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            onClick={() => router.push("/admin/view-product")}
                            className="cursor-pointer"
                          >
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.ref_no.toUpperCase()}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {`₦${Number(row.amount).toLocaleString()}`}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.pay_method}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.shipping}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.tracking_status === "delivered" && (
                              <div className="w-[92px] h-[30px] rounded bg-[#6fcf97] bg-opacity-[30%] text-[#27ae60] flex justify-center items-center ml-auto">
                                {capitalizeFirstLetter(row.tracking_status)}
                              </div>
                            )}

                            {row.tracking_status === "shipped" && (
                              <div className="w-[92px] h-[30px] rounded bg-[#56ccf2] bg-opacity-[30%] text-[#2f80ed] flex justify-center items-center ml-auto">
                                {capitalizeFirstLetter(row.tracking_status)}
                              </div>
                            )}

                            {row.tracking_status === "pending" && (
                              <div className="w-[92px] h-[30px] rounded bg-[#fcddec] bg-opacity-[30%] text-[#f178b6] flex justify-center items-center ml-auto">
                                {capitalizeFirstLetter(row.tracking_status)}
                              </div>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
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
                No Orders yet
              </h2>
              <p className="mt-2 text-sm font-medium text-[#333333]">
                Oops, it seems there are no orders.
              </p>
            </div>
          </Container>
        )}
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

export default AdminOrders;
