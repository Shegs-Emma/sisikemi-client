"use client";

import VerifyEmail from "@/components/pages/VerifyEmail";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const emailID = searchParams.get("email_id");
  const secretCode = searchParams.get("secret_code");

  return <VerifyEmail emailID={emailID} secretCode={secretCode} />;
}
