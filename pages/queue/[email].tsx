import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../src/features/loading/loadingSlice";
import QueuePosition from "../../src/components/QueuePosition";

const Queue = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [queuePosition, setQueuePosition] = useState<string | null>(null);

  const email = router.query.email as string | undefined;

  const verifyEmail = useMutation(async ({ email }: { email: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/email`,
      {
        method: "PUT",
        body: JSON.stringify({ email }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const result = await response.clone().json();
      throw new Error(result);
    }

    return response;
  });

  const handleError = async (error: Response) => {
    const body = await error.clone().json();
    if (body === "Error: User is not subscribed to mailing list") {
      setError(
        `You are not subscribed to our mailing list please go to ${process.env.NEXT_PUBLIC_ROOT_URL} to subscribe!`
      );
    } else {
      setError(
        "An error occured while while verifying your email, please try again."
      );
    }
  };

  const displayQueuePosiiton = async (data: Response) => {
    const { queuePosition }: { queuePosition: string } = await data
      .clone()
      .json();

    setQueuePosition(queuePosition);
  };

  const { data } = verifyEmail;

  useEffect(() => {
    if (email) {
      verifyEmail.mutate({ email });
    }
  }, [email]);

  useEffect(() => {
    const { isLoading, isError, isSuccess, error } = verifyEmail;

    if (isLoading) {
      dispatch(startLoading());
    }

    if (isError) {
      dispatch(stopLoading());
      handleError(error as Response);
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
    <QueuePosition
      queuePosition={queuePosition}
      success={success}
      error={error}
    />
  );
};

export default Queue;
