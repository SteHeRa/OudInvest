import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../src/features/loading/loadingSlice";
import { useRouter } from "next/router";
import Thanks from "../src/components/Thanks";

const ThanksView = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [noEmail, setNoEmail] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (email: string) => {
    dispatch(startLoading());
    setError("");

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    dispatch(stopLoading());
    router.push(`${process.env.NEXT_PUBLIC_ROOT_URL}/queue/${email}`);
  };

  useEffect(() => {
    dispatch(startLoading());
    const email = localStorage.getItem("email");
    if (email) {
      router.push(`${process.env.NEXT_PUBLIC_ROOT_URL}/queue/${email}`);
    } else {
      setNoEmail(true);
    }
    dispatch(stopLoading());
  }, []);

  return (
    <Thanks
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      noEmail={noEmail}
      error={error}
    />
  );
};

export default ThanksView;
