import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  ResponsiveContext,
  TextInput,
  Button,
  Text,
  Anchor,
  Stack,
  Image,
} from "grommet";
import { useDispatch } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../src/features/loading/loadingSlice";

const textColor = "light-1";
const textColorMobile = "dark-0";

const App = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const postEmail = useMutation((email) => {
    return fetch("http://localhost:3000/api/email", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "content-type": "application/json",
      },
    });
  });

  const dispatch = useDispatch();

  const handleSubmit = async (email) => {
    setSuccess(false);
    setError("");

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    postEmail.mutate(email);
  };

  useEffect(() => {
    const { isLoading, isError, isSuccess } = postEmail;

    if (isLoading) {
      dispatch(startLoading());
    }

    if (isError) {
      dispatch(stopLoading());
      setError(
        "An error occured while adding you to the early access list, please try again."
      );
    }

    if (isSuccess) {
      dispatch(stopLoading());
      setSuccess(true);
      setEmail("");
    }
  }, [postEmail]);

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
                  background="linear-gradient(0deg, rgba(0, 0, 0, 0.6) 55%, rgba(0, 0, 0, 0))"
                >
                  <Box fill="horizontal">
                    <Box basis="medium">
                      <Image
                        margin="xlarge"
                        fit="contain"
                        src="/oudinvest_logo_tagline.png"
                      />
                    </Box>
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
                          onClick={() => handleSubmit(email)}
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
                        <Text
                          color="status-ok"
                          weight="bold"
                          textAlign="center"
                        >
                          Success! Please check your email to confirm your email
                          address.
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
                <Image fit="contain" src="/oudinvest_logo_tagline.png" />
              </Box>
              <Box fill="horizontal" direction="column" gap="large">
                <Box gap="medium">
                  <Box flex={{ grow: 4 }} background="light-2" round="xsmall">
                    <TextInput
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </Box>
                  <Box flex={{ grow: 1, shrink: 1 }}>
                    <Button
                      color="brand"
                      primary
                      label="Get Early Access"
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
                  ) : success ? (
                    <Text color="status-ok" weight="bold" textAlign="center">
                      Success! Please check your email to confirm your email
                      address.
                    </Text>
                  ) : null}
                </Box>
                <Box gap="small">
                  <Text
                    color={textColorMobile}
                    weight="bold"
                    textAlign="center"
                  >
                    OudInvest is bringing Halal Investing, to everyone
                  </Text>
                  <Text
                    color={textColorMobile}
                    weight="bold"
                    textAlign="center"
                  >
                    We provide a sharia compliant commission-free digital
                    platform to enable anybody to invest in Halal stocks, funds
                    and commodities. Zero Fee.
                  </Text>
                  <Text
                    color={textColorMobile}
                    weight="bold"
                    textAlign="center"
                  >
                    All of our verified Investment options have been screened by
                    our Sharia advisors.{" "}
                  </Text>
                  <Text
                    color={textColorMobile}
                    weight="bold"
                    textAlign="center"
                  >
                    Starting with just $1, Deposit, search, compare and invest -
                    always Halal.
                  </Text>
                </Box>
              </Box>

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
