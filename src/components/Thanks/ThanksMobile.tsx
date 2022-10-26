import React from "react";
import { Box, Grid, Heading, Text, TextInput, Button } from "grommet";
import Logo from "../Logo";
import { ThanksProps } from ".";

const ThanksMobile = ({
  email,
  setEmail,
  handleSubmit,
  noEmail,
  error,
}: ThanksProps) => {
  const textColor = "dark-0";
  const headingColor = "dark-1";

  return (
    <Box fill>
      <Box pad="medium" basis="xsmall">
        <Logo />
      </Box>
      {noEmail ? (
        <Box
          direction="column"
          flex
          justify="start"
          overflow={{ horizontal: "hidden" }}
          pad="large"
          gap="xlarge"
        >
          <Box>
            <Heading color={headingColor}>
              Thank you for joining the early access list!
            </Heading>
            <Text color={textColor}>
              We will be in touch with updates soon! In the mean time you can
              enter your email below to see your position in the queue.
            </Text>
          </Box>
          <Box fill="horizontal" direction="column" gap="large">
            <Box gap="medium">
              <Box flex={{ grow: 4 }} background="light-2" round="xsmall">
                <TextInput
                  placeholder="Enter your email address to see your place in the queue"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </Box>
              <Box flex={{ grow: 1, shrink: 1 }}>
                <Button
                  color="brand"
                  primary
                  label="Go To Queue"
                  onClick={() => handleSubmit(email)}
                />
              </Box>
            </Box>
            <Box
              fill="horizontal"
              direction="row"
              gap="small"
              align="center"
              justify="center"
            >
              {error ? (
                <Text color="status-error" weight="bold" textAlign="center">
                  {error}
                </Text>
              ) : null}
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ThanksMobile;
