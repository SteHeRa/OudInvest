import React from "react";
import { Box, Text } from "grommet";
import Logo from "../Logo";
import { QueueProps } from ".";
import { isOrAre, personOrPeople } from "./pluralFunctions";

const QueueDesktop = ({ queuePosition, success, error }: QueueProps) => {
  return (
    <Box fill>
      <Box margin="small" basis="xsmall">
        <Logo />
      </Box>
      <Box
        fill
        direction="column"
        flex
        overflow={{ horizontal: "hidden" }}
        justify="center"
      >
        {error ? (
          <Box
            fill="horizontal"
            pad={{ left: "150px", right: "150px" }}
            direction="row"
            gap="small"
            align="center"
            justify="center"
            margin={{ bottom: "50px" }}
          >
            <Text color="status-error" weight="bold" textAlign="center">
              {error}
            </Text>
          </Box>
        ) : null}
        {success ? (
          <Box
            fill="horizontal"
            pad={{ left: "150px", right: "150px" }}
            direction="row"
            gap="small"
            align="center"
            justify="center"
            margin={{ bottom: "50px" }}
          >
            <Text color="dark-0" weight="bold" size="xlarge" textAlign="center">
              Success! You have been added to the early access list.
            </Text>
          </Box>
        ) : null}
        {queuePosition ? (
          <Box
            fill="horizontal"
            pad={{ left: "150px", right: "150px" }}
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
              <Text color="brand" weight="bold" size="6xl" textAlign="center">
                {queuePosition}
              </Text>
            </Box>
            <Box fill="horizontal">
              <Text color="brand" size="3xl" textAlign="center">
                {`${personOrPeople(queuePosition)} ahead of you in the queue.`}
              </Text>
            </Box>
          </Box>
        ) : null}
        {success ? (
          <Text color="dark-0" weight="bold" size="xlarge" textAlign="center">
            We will be in touch with updates soon!
          </Text>
        ) : null}
      </Box>
    </Box>
  );
};

export default QueueDesktop;
