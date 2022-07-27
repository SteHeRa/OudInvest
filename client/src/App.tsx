import React from "react";
import { Grommet, Page, PageHeader } from "grommet";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const App = () => {
  return (
    <Grommet theme={theme}>
      <Page>
        <PageHeader title="Hello World!" />
      </Page>
    </Grommet>
  );
};

export default App;
