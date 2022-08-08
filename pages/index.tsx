import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  PageHeader,
  Box,
  ResponsiveContext,
  TextInput,
  Button,
  Heading,
  Text,
  Anchor,
  Stack,
} from "grommet";

const textColor = "light-1";

const App = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const postEmail = async (email) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    const res = await fetch("http://localhost:3000/api/email", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      setError(
        "An error occured while adding you to the early access list, please try again."
      );
    } else {
      //redirect to page showing place in queue
    }
    setLoading(false);
  };

  return (
    <ResponsiveContext.Consumer>
      {(size) =>
        size !== "small" ? (
          <Box fill>
            <Stack fill>
              <Box
                fill
                flex
                align="center"
                justify="center"
                background="url(/background.jpg)"
              ></Box>
              <Box
                fill
                direction="row"
                flex
                overflow={{ horizontal: "hidden" }}
              >
                <Box
                  flex
                  align="center"
                  justify="center"
                  background="linear-gradient(0deg, rgba(0, 0, 0, 0.4) 55%, rgba(0, 0, 0, 0))"
                >
                  <Box fill="horizontal">
                    <PageHeader
                      title={
                        <Heading
                          color="brand"
                          size="large"
                          margin="none"
                          textAlign="center"
                        >
                          OudInvest
                        </Heading>
                      }
                      subtitle={
                        <Text
                          color={textColor}
                          size="large"
                          weight="bold"
                          margin="none"
                          textAlign="center"
                        >
                          Halal investing for everyone, is coming.
                        </Text>
                      }
                      margin={{ bottom: "50px" }}
                    />
                    <Box
                      fill="horizontal"
                      pad={{ left: "150px", right: "150px" }}
                      direction="row"
                      gap="small"
                      align="center"
                      justify="center"
                      margin={{ bottom: "50px" }}
                    >
                      <Box
                        flex={{ grow: 4 }}
                        background="light-2"
                        round="xsmall"
                      >
                        <TextInput
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                      </Box>
                      <Box flex={{ grow: 1, shrink: 1 }}>
                        <Button
                          primary
                          size="large"
                          label="Get Early Access"
                          onClick={() => postEmail(email)}
                        />
                      </Box>
                    </Box>
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
                        <Text
                          color="status-error"
                          weight="bold"
                          textAlign="center"
                        >
                          {error}
                        </Text>
                      </Box>
                    ) : null}
                    <Box gap="small">
                      <Text color={textColor} weight="bold" textAlign="center">
                        OudInvest is bringing Halal Investing, to everyone
                      </Text>
                      <Text color={textColor} weight="bold" textAlign="center">
                        We provide a sharia compliant commission-free digital
                        platform to enable anybody to invest in Halal stocks,
                        funds and commodities. Zero Fee.
                      </Text>
                      <Text color={textColor} weight="bold" textAlign="center">
                        All of our verified Investment options have been
                        screened by our Sharia advisors.{" "}
                      </Text>
                      <Text color={textColor} weight="bold" textAlign="center">
                        Starting with just $1, Deposit, search, compare and
                        invest - always Halal.
                      </Text>
                      <Text color={textColor} weight="bold" textAlign="center">
                        <Anchor
                          target="_blank"
                          href="https://wideo.co/view/37302901659007631560?utm_source=CopyPaste&utm_medium=share&utm_campaign=sharebox&html5=true"
                          label="How it works."
                        />
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Box>
        ) : (
          <Box
            fill
            background="linear-gradient(-225deg, rgba(0, 0, 0, 0) 55%, #FF7D00 )"
          >
            <Box
              direction="column"
              flex
              justify="between"
              overflow={{ horizontal: "hidden" }}
              pad="large"
              gap="medium"
            >
              <Box>
                <PageHeader
                  title={
                    <Heading color="dark-0" size="large" margin="none">
                      OudInvest
                    </Heading>
                  }
                  subtitle={
                    <Text
                      color="dark-2"
                      size="large"
                      // weight="bold"
                      margin="none"
                    >
                      Halal investing for everyone, is coming.
                    </Text>
                  }
                  // actions={<Button label="Edit" primary />}
                />
              </Box>
              <Box fill="horizontal" direction="column" gap="medium">
                <Box flex={{ grow: 4 }} background="light-2" round="xsmall">
                  <TextInput
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </Box>
                <Box flex={{ grow: 1, shrink: 1 }}>
                  <Button
                    color="#228BE6"
                    primary
                    label="Get Early Access"
                    onClick={() => postEmail(email)}
                  />
                </Box>
              </Box>
              {error ? (
                <Box
                  fill="horizontal"
                  direction="row"
                  gap="small"
                  align="center"
                  justify="center"
                >
                  <Text color="status-error" weight="bold" textAlign="center">
                    {error}
                  </Text>
                </Box>
              ) : null}
              <Box>
                <Text color="dark-0" weight="bold" textAlign="center">
                  Our mission,{" "}
                  <Anchor
                    color="#228BE6"
                    target="_blank"
                    href="https://wideo.co/view/37302901659007631560?utm_source=CopyPaste&utm_medium=share&utm_campaign=sharebox&html5=true"
                    label="how it works."
                  />
                </Text>
              </Box>
            </Box>
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  );
};

export default App;
