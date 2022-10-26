import React, { useState } from "react";
import { Layer, Box, Text, Button } from "grommet";
import ResponsiveView from "../ResponsiveView";
import SignUpDesktop from "./SignUpDesktop";
import SignUpMobile from "./SignUpMobile";

export type SignUpProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  success: boolean;
  error: string;
  handleSubmit: (email: string) => Promise<void>;
};

const SignUp = (props: SignUpProps) => {
  const textColor = "dark-0";

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ResponsiveView
        desktopView={
          <SignUpDesktop {...props} setIsModalOpen={setIsModalOpen} />
        }
        mobileView={<SignUpMobile {...props} setIsModalOpen={setIsModalOpen} />}
      />
      {isModalOpen ? (
        <Layer
          onEsc={() => setIsModalOpen(false)}
          onClickOutside={() => setIsModalOpen(false)}
        >
          <Box pad="large" gap="large">
            <Box align="center" justify="center">
              <iframe
                allowFullScreen={true}
                frameBorder="no"
                width="560"
                height="315"
                src="https://wideo.co/embed/37302901659007631560?width=560&height=315&repeat=false&autoplay=false&hideControls=false&html5=true"
              ></iframe>
            </Box>
            <Box gap="medium">
              <Text color={textColor}>
                OudInvest is bringing Halal Investing, to everyone. We provide a
                sharia compliant commission-free digital platform to enable
                anybody to invest in Halal stocks, funds and commodities. Zero
                Fee. All of our verified Investment options have been screened
                by our Sharia advisors. Starting with just $1, Deposit, search,
                compare and invest - always Halal.
              </Text>
            </Box>
            <Box>
              <Button
                primary
                label="Close"
                onClick={() => setIsModalOpen(false)}
              />
            </Box>
          </Box>
        </Layer>
      ) : null}
    </>
  );
};

export default SignUp;
