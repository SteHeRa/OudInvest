import React from "react";
import LoadingSpinner from "../features/loading/LoadingSpinner";

const ReduxStateComponentsWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <LoadingSpinner />
      {children}
    </>
  );
};

export default ReduxStateComponentsWrapper;
