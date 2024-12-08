import Footer from "@/components/navigation/footer";
import MobileNavbar from "@/components/navigation/mobileNavbar";
import Navbar from "@/components/navigation/navbar";
import Cart from "@/components/pages/Cart";

export default function CartPage() {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <Cart />
      <Footer />
    </>
  );
}
