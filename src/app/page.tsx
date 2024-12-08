import Footer from "@/components/navigation/footer";
import MobileNavbar from "@/components/navigation/mobileNavbar";
import Navbar from "@/components/navigation/navbar";
import Landing from "@/components/pages/Landing";

export default function Home() {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <Landing />
      <Footer />
    </>
  );
}
