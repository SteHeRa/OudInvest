import React from "react";
import { Image } from "grommet";
import { useRouter } from "next/router";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alignSelf="start"
      fit="contain"
      src="/logo.png"
      style={{ cursor: "pointer" }}
      onClick={() => router.push(`${process.env.NEXT_PUBLIC_ROOT_URL}`)}
    />
  );
};

export default Logo;
