import {
  Box,
  TextInput,
  Button,
  Text,
  Anchor,
  Image,
  Grid,
  Heading,
} from "grommet";
import { SignUpProps } from ".";
import Logo from "../Logo";

const SignUpDesktop = ({
  email,
  setEmail,
  success,
  error,
  handleSubmit,
  setIsModalOpen,
}: SignUpProps & {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const textColor = "dark-0";
  const headingColor = "dark-1";

  return (
    <Box fill>
      <Box height="small" width="small" margin="small" basis="xsmall">
        <Logo />
      </Box>
      <Box fill flex align="center" justify="center">
        <Box basis="small" flex align="center" justify="center">
          <Grid
            rows={["medium", "small"]}
            columns={["large", "medium"]}
            gap="none"
            areas={[
              { name: "content", start: [0, 0], end: [1, 1] },
              { name: "side", start: [1, 0], end: [2, 1] },
            ]}
          >
            <Box gridArea="side" background="url(/angledWireframe.png)"></Box>
            <Box gridArea="content">
              <Box
                fill
                gap="medium"
                pad="large"
                direction="column"
                justify="start"
              >
                <Box>
                  <Heading color={headingColor}>
                    Sharia Compliant investing, made simple.
                  </Heading>
                  <Text color={textColor}>
                    We are changing the way muslims think about investing. Be
                    the first to explore & invest in our verified{" "}
                    <span>
                      <i
                        style={{ color: "#89C33B" }}
                        className="fa-solid fa-circle-check"
                      ></i>
                    </span>{" "}
                    sharia compliant assets, join the waitlist today for free
                    premium membership.
                  </Text>
                </Box>
                <Box
                  direction="column"
                  gap="small"
                  align="left"
                  justify="center"
                >
                  <Box background="light-2" round="xsmall">
                    <TextInput
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </Box>
                  <Box>
                    <Button
                      primary
                      label="Get Early Access"
                      onClick={() => handleSubmit(email)}
                    />
                  </Box>
                </Box>
                {error ? (
                  <Box
                    direction="row"
                    gap="small"
                    align="center"
                    justify="center"
                  >
                    <Text color="status-error" weight="bold" textAlign="center">
                      {error}
                    </Text>
                  </Box>
                ) : null}
                {success ? (
                  <Box
                    direction="row"
                    gap="small"
                    align="center"
                    justify="center"
                  >
                    <Text color="status-ok" weight="bold">
                      Success! Please check your email to confirm your email
                      address.
                    </Text>
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Grid>
          <Box alignSelf="start" margin={{ horizontal: "large" }}>
            <Button
              secondary
              label="How it Works."
              onClick={() => setIsModalOpen(true)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpDesktop;
