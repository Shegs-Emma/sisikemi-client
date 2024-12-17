import Footer from "@/components/navigation/footer";
import MobileNavbar from "@/components/navigation/mobileNavbar";
import Navbar from "@/components/navigation/navbar";
import Shop from "@/components/pages/Shop";

export default function ShopPage() {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <Shop />
      <Footer />
    </>
  );
}
