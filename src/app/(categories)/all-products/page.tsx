import Footer from "@/components/navigation/footer";
import MobileNavbar from "@/components/navigation/mobileNavbar";
import Navbar from "@/components/navigation/navbar";
import AllProducts from "@/components/pages/AllProducts";

export default function AllProductsPage() {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <AllProducts />
      <Footer />
    </>
  );
}
