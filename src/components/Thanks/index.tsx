import React from "react";
import ResponsiveView from "../ResponsiveView";
import ThanksDesktop from "./ThanksDesktop";
import ThanksMobile from "./ThanksMobile";

export type ThanksProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (email: string) => Promise<void>;
  noEmail: boolean;
  error: string;
};

const SignUp = (props: ThanksProps) => {
  return (
    <>
      <ResponsiveView
        desktopView={<ThanksDesktop {...props} />}
        mobileView={<ThanksMobile {...props} />}
      />
    </>
  );
};

export default SignUp;
