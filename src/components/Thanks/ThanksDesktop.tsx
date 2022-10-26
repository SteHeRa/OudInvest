import React from "react";
import { Box, Grid, Heading, Text, TextInput, Button } from "grommet";
import Logo from "../Logo";
import { ThanksProps } from ".";

const ThanksDesktop = ({
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
      <Box margin="small" basis="xsmall">
        <Logo />
      </Box>
      <Box fill flex align="center" justify="center">
        <Box basis="small" flex align="center" justify="center" pad="xlarge">
          <Grid
            rows={["medium", "small"]}
            columns={["large", "medium"]}
            gap="none"
            areas={[
              { name: "content", start: [0, 0], end: [1, 1] },
              { name: "side", start: [1, 0], end: [2, 1] },
            ]}
          >
            <Box gridArea="side" background="url(/angledWireframe.png)"></Box>
            <Box gridArea="content">
              <Box
                fill
                gap="none"
                pad="large"
                direction="column"
                justify="between"
              >
                {noEmail ? (
                  <Box
                    direction="column"
                    gap="small"
                    align="left"
                    justify="start"
                    flex={true}
                  >
                    <Box>
                      <Heading color={headingColor}>
                        Thank you for joining the early access list!
                      </Heading>
                      <Text color={textColor}>
                        We will be in touch with updates soon! In the mean time
                        you can enter your email below to see your position in
                        the queue.
                      </Text>
                    </Box>
                    <Box background="light-2" round="xsmall">
                      <TextInput
                        placeholder="Enter your email address to see your place in the queue"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />
                    </Box>
                    <Box>
                      <Button
                        primary
                        label="Go To Queue"
                        onClick={() => handleSubmit(email)}
                      />
                    </Box>
                    {error ? (
                      <Box
                        direction="row"
                        gap="small"
                        align="center"
                        justify="center"
                      >
                        <Text
                          color="status-error"
                          weight="bold"
                          textAlign="center"
                        >
                          {error}
                        </Text>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ThanksDesktop;
