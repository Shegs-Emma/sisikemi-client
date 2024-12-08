// utils/withAuth.tsx
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const isAuth = useUserStore((state: any) => state.isToken);

    console.log("isAuth", isAuth);

    useEffect(() => {
      if (!isAuth) {
        router.replace("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
