import React from "react";
import ResponsiveView from "../ResponsiveView";
import QueueDesktop from "./QueueDesktop";
import QueueMobile from "./QueueMobile";

export type QueueProps = {
  queuePosition: string | null;
  success: boolean;
  error: string;
};

const QueuePosition = (props: QueueProps) => {
  return (
    <>
      <ResponsiveView
        desktopView={<QueueDesktop {...props} />}
        mobileView={<QueueMobile {...props} />}
      />
    </>
  );
};

export default QueuePosition;
