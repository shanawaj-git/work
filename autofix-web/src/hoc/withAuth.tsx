import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const AUTH = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const authenticated = useSelector((state: any) => state?.user?.authenticated);
  if (authenticated) return <>{children}</>;
  router.replace("/404");
  return <></>;
};

export default AUTH;
