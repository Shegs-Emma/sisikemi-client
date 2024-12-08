import Footer from "@/components/navigation/footer";
import MobileNavbar from "@/components/navigation/mobileNavbar";
import Navbar from "@/components/navigation/navbar";
import Collections from "@/components/pages/Collections";

export default function NewInPage() {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <Collections />
      <Footer />
    </>
  );
}
