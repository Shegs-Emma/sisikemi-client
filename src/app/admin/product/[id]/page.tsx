import ViewProduct from "@/components/admin/viewProduct";
import AdminNavbar from "@/components/navigation/adminNavbar";

interface UserProfileProps {
  params: { id: string }; // params will contain the dynamic route parameter
}

export default function AdminViewProductPage({ params }: UserProfileProps) {
  const { id } = params;
  return (
    <>
      <AdminNavbar />
      <ViewProduct id={id} />
    </>
  );
}
