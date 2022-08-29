import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../src/features/loading/loadingSlice";
import { Box, ResponsiveContext, Text, Stack, Image } from "grommet";

const isOrAre = (number: string) => {
  const isOrAre = parseInt(number) === 1 ? "is" : "are";

  return isOrAre;
};

const personOrPeople = (number: string) => {
  const personOrPeople = parseInt(number) === 1 ? "person" : "people";

  return personOrPeople;
};

const Queue = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [queuePosition, setQueuePosition] = useState<string | null>(null);

  const { param } = router.query;

  useEffect(() => {
    if (param) {
      const [email, userId] = param as string[];
      setEmail(email);
      setUserId(userId);
    }
  }, [param]);

  const verifyEmail = useMutation(
    async ({ email, userId }: { email: string; userId: string }) => {
      const response = await fetch("http://localhost:3000/api/email", {
        method: "PUT",
        body: JSON.stringify({ email, userId }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response.ok) {
        const result = await response.clone().json();
        throw new Error(result);
      }

      return response;
    }
  );

  const displayQueuePosiiton = async (data: Response) => {
    const {
      updated,
      queuePosition,
    }: { updated: boolean; queuePosition: string } = await data.clone().json();

    setIsUpdated(updated);

    if (queuePosition) {
      setQueuePosition(queuePosition);
    }
  };

  const { data } = verifyEmail;

  useEffect(() => {
    if (email && userId) {
      verifyEmail.mutate({ email, userId });
    }
  }, [email, userId]);

  useEffect(() => {
    const { isLoading, isError, isSuccess } = verifyEmail;

    if (isLoading) {
      dispatch(startLoading());
    }

    if (isError) {
      dispatch(stopLoading());
      setError(
        "An error occured while while verifying your email, please try again."
      );
    }

    if (isSuccess) {
      dispatch(stopLoading());
      setSuccess(true);
    }
  }, [verifyEmail]);

  useEffect(() => {
    if (data && data.ok) {
      displayQueuePosiiton(data);
    }
  }, [data]);

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
                direction="column"
                flex
                overflow={{ horizontal: "hidden" }}
                justify="center"
                background="linear-gradient(0deg, rgba(0, 0, 0, 0.6) 55%, rgba(0, 0, 0, 0))"
              >
                <Box basis="small">
                  <Image
                    margin="large"
                    fit="contain"
                    src="/oudinvest_logo_tagline.png"
                  />
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
                    <Text
                      color="dark-0"
                      weight="bold"
                      size="xlarge"
                      textAlign="center"
                    >
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
                <Text
                  color="dark-0"
                  weight="bold"
                  size="xlarge"
                  textAlign="center"
                >
                  We will be in touch with updates soon!
                </Text>
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
              <Box gap="medium">
                <Image
                  fit="contain"
                  src="/oudinvest_logo_tagline.png"
                  margin={{ bottom: "50px" }}
                />

                <Box fill="horizontal" direction="column" gap="large">
                  <Box
                    fill="horizontal"
                    direction="column"
                    gap="small"
                    align="center"
                    justify="center"
                  >
                    {error ? (
                      <Text
                        color="status-error"
                        weight="bold"
                        textAlign="center"
                      >
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
                    <Text
                      color="dark-0"
                      weight="bold"
                      size="xlarge"
                      textAlign="center"
                    >
                      We will be in touch with updates soon!
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  );
};

export default Queue;
