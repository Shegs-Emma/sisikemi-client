import Footer from "@/components/navigation/footer";
import MobileNavbar from "@/components/navigation/mobileNavbar";
import Navbar from "@/components/navigation/navbar";
import Product from "@/components/pages/Product";

interface UserProductProps {
  params: { id: string }; // params will contain the dynamic route parameter
}

export default function ProductDetailsPage({ params }: UserProductProps) {
  const { id } = params;
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <Product id={id} />
      <Footer />
    </>
  );
}
