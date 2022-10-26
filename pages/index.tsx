import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../src/features/loading/loadingSlice";
import SignUp from "../src/components/SignUp";

const App = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const postEmail = useMutation(async (email: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/email`,
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result);
    }

    return response;
  });

  const storeEmail = async (data: Response) => {
    const { email } = await data.clone().json();
    localStorage.setItem("email", email);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (email: string) => {
    setSuccess(false);
    setError("");

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    postEmail.mutate(email);
  };

  useEffect(() => {
    const { isLoading, isError, isSuccess, data } = postEmail;

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
      storeEmail(data);
      dispatch(stopLoading());
      setSuccess(true);
      setEmail("");
    }
  }, [postEmail]);

  return (
    <SignUp
      email={email}
      setEmail={setEmail}
      success={success}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default App;
