import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../src/features/loading/loadingSlice";
import { Box, ResponsiveContext, Text, Stack, Header } from "grommet";

const Queue = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
        const result = await response.json();
        throw new Error(result);
      }

      return response;
    }
  );

  const displayQueuePosiiton = async (data) => {
    const { updated, queuePosition } = await data.json();
    if (updated) {
      //Display message saying user email has been verified
    }
    if (queuePosition) {
      //display users position in the queue
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
      // setError(
      //   "An error occured while adding you to the early access list, please try again."
      // );
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
                direction="row"
                flex
                overflow={{ horizontal: "hidden" }}
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
                    <Text color="status-ok" weight="bold" textAlign="center">
                      Success! Please check your email to confirm your email
                      address.
                    </Text>
                  </Box>
                ) : null}
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
                <Box fill="horizontal" direction="column" gap="large">
                  <Box
                    fill="horizontal"
                    direction="row"
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
                    ) : success ? (
                      <Text color="status-ok" weight="bold" textAlign="center">
                        Success! Please check your email to confirm your email
                        address.
                      </Text>
                    ) : null}
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
