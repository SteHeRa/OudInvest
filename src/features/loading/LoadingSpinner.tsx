import React from "react";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Layer, Spinner } from "grommet";

const LoadingSpinner = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return isLoading ? (
    <Layer
      responsive={false}
      background={{
        dark: true,
      }}
    >
      <Spinner size="large" color={{ light: "brand" }} />
    </Layer>
  ) : null;
};

export default LoadingSpinner;
