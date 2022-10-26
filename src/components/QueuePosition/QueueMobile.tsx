import React from "react";
import { Box, Text } from "grommet";
import Logo from "../Logo";
import { QueueProps } from ".";
import { isOrAre, personOrPeople } from "./pluralFunctions";

const QueueMobile = ({ queuePosition, success, error }: QueueProps) => {
  return (
    <Box fill>
      <Box pad="medium" basis="xsmall">
        <Logo />
      </Box>
      <Box
        direction="column"
        flex
        justify="center"
        overflow={{ horizontal: "hidden" }}
        pad="large"
        gap="medium"
      >
        <Box fill="horizontal" direction="column" gap="large">
          <Box
            fill="horizontal"
            direction="column"
            gap="small"
            align="center"
            justify="center"
          >
            {error ? (
              <Text color="status-error" weight="bold" textAlign="center">
                {error}
              </Text>
            ) : null}
            {success ? (
              <Text
                color="dark-0"
                weight="bold"
                size="xlarge"
                textAlign="center"
              >
                Success! You have been added to the early access list.
              </Text>
            ) : null}
            {queuePosition ? (
              <Box
                fill="horizontal"
                direction="column"
                gap="small"
                align="center"
                justify="center"
                margin={{ bottom: "50px" }}
              >
                <Box fill="horizontal">
                  <Text color="brand" size="3xl" textAlign="center">
                    {`There ${isOrAre(queuePosition)}`}
                  </Text>
                </Box>
                <Box fill="horizontal">
                  <Text
                    color="brand"
                    weight="bold"
                    size="6xl"
                    textAlign="center"
                  >
                    {queuePosition}
                  </Text>
                </Box>
                <Box fill="horizontal">
                  <Text color="brand" size="3xl" textAlign="center">
                    {`${personOrPeople(
                      queuePosition
                    )} ahead of you in the queue.`}
                  </Text>
                </Box>
              </Box>
            ) : null}
            {success ? (
              <Text
                color="dark-0"
                weight="bold"
                size="xlarge"
                textAlign="center"
              >
                We will be in touch with updates soon!
              </Text>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QueueMobile;
