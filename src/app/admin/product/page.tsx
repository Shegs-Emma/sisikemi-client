"use client";

import AdminProducts from "@/components/admin/products";
import AdminNavbar from "@/components/navigation/adminNavbar";

const AdminProductPage = () => {
  console.log("this is the right page");
  return (
    <>
      <AdminNavbar />
      <AdminProducts />
    </>
  );
};

export default AdminProductPage;
