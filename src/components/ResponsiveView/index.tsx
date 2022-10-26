import { ResponsiveContext } from "grommet";

export type ResponsiveViewProps = {
  desktopView: JSX.Element;
  mobileView: JSX.Element;
};

const ResponsiveView = ({ desktopView, mobileView }: ResponsiveViewProps) => {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (size !== "small" ? desktopView : mobileView)}
    </ResponsiveContext.Consumer>
  );
};

export default ResponsiveView;
