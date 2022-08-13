import React from "react";
import LoadingSpinner from "../features/loading/LoadingSpinner";

const ReduxStateComponentsWrapper = ({ children }) => {
  return (
    <>
      <LoadingSpinner />
      {children}
    </>
  );
};

export default ReduxStateComponentsWrapper;
