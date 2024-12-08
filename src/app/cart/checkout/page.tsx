import Footer from "@/components/navigation/footer";
import MobileNavbar from "@/components/navigation/mobileNavbar";
import Navbar from "@/components/navigation/navbar";
import Checkout from "@/components/pages/Checkout";

export default function CartPage() {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <Checkout />
      <Footer />
    </>
  );
}
