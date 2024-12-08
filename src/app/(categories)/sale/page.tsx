import Footer from "@/components/navigation/footer";
import MobileNavbar from "@/components/navigation/mobileNavbar";
import Navbar from "@/components/navigation/navbar";
import Sale from "@/components/pages/Sale";

export default function SalePage() {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <Sale />
      <Footer />
    </>
  );
}
