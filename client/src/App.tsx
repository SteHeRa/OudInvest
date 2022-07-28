import React from "react";
import {
  Grommet,
  PageHeader,
  Box,
  ResponsiveContext,
  TextInput,
  Button,
  Heading,
  Text,
  Anchor,
} from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#FFCA58",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const App = () => {
  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) =>
          size !== "small" ? (
            <Box fill>
              <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
                <Box
                  flex
                  align="center"
                  justify="center"
                  background="url(public/background.jpg)"
                >
                  {/* <Box>
                  Photo by{" "}
                  <a href="https://unsplash.com/@jeffreyblum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                    Jeffrey Blum
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/s/photos/finance?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                    Unsplash
                  </a>
                </Box> */}
                  {/* <Box>
                  Photo by{" "}
                  <a href="https://unsplash.com/@micheile?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                    micheile dot com
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/s/photos/money?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                    Unsplash
                  </a>
                </Box> */}
                  <Box fill="horizontal">
                    <PageHeader
                      title={
                        <Heading
                          color="brand"
                          size="large"
                          margin="none"
                          textAlign="center"
                        >
                          OudInvest
                        </Heading>
                      }
                      subtitle={
                        <Text
                          color="light-3"
                          size="large"
                          weight="bold"
                          margin="none"
                          textAlign="center"
                        >
                          Halal investing for everyone, is coming.
                        </Text>
                      }
                      // actions={<Button label="Edit" primary />}
                    />
                    <Box
                      fill="horizontal"
                      pad={{ left: "150px", right: "150px" }}
                      direction="row"
                      gap="small"
                      align="center"
                      justify="center"
                    >
                      <Box
                        flex={{ grow: 4 }}
                        background="light-2"
                        round="xsmall"
                      >
                        <TextInput placeholder="Enter email address" />
                      </Box>
                      <Box flex={{ grow: 1, shrink: 1 }}>
                        <Button primary size="large" label="Get Early Access" />
                      </Box>
                    </Box>
                    <Box>
                      <Text color="light-3" weight="bold" textAlign="center">
                        Our mission,{" "}
                        <Anchor
                          target="_blank"
                          href="https://wideo.co/view/37302901659007631560?utm_source=CopyPaste&utm_medium=share&utm_campaign=sharebox&html5=true"
                          label="how it works."
                        />
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              fill
              background="linear-gradient(-225deg, rgba(0, 0, 0, 0) 55%, #FFCA58 )"
            >
              <Box
                direction="column"
                flex
                justify="between"
                overflow={{ horizontal: "hidden" }}
                pad="large"
                gap="medium"
              >
                <Box>
                  <PageHeader
                    title={
                      <Heading color="dark-0" size="large" margin="none">
                        OudInvest
                      </Heading>
                    }
                    subtitle={
                      <Text
                        color="dark-2"
                        size="large"
                        // weight="bold"
                        margin="none"
                      >
                        Halal investing for everyone, is coming.
                      </Text>
                    }
                    // actions={<Button label="Edit" primary />}
                  />
                </Box>
                <Box fill="horizontal" direction="column" gap="medium">
                  <Box flex={{ grow: 4 }} background="light-2" round="xsmall">
                    <TextInput placeholder="Enter email address" />
                  </Box>
                  <Box flex={{ grow: 1, shrink: 1 }}>
                    <Button color="#228BE6" primary label="Get Early Access" />
                  </Box>
                </Box>
                <Box>
                  <Text color="dark-0" weight="bold" textAlign="center">
                    Our mission,{" "}
                    <Anchor
                      color="#228BE6"
                      target="_blank"
                      href="https://wideo.co/view/37302901659007631560?utm_source=CopyPaste&utm_medium=share&utm_campaign=sharebox&html5=true"
                      label="how it works."
                    />
                  </Text>
                </Box>
              </Box>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
