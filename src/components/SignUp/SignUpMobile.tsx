import { Box, TextInput, Button, Text, Heading, Image } from "grommet";
import { SignUpProps } from ".";
import Logo from "../Logo";

const SignUpMobile = ({
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
      <Box pad="medium" basis="xsmall">
        <Logo />
      </Box>
      <Box
        direction="column"
        flex
        justify="between"
        overflow={{ horizontal: "hidden" }}
        pad={{
          horizontal: "large",
          bottom: "medium",
        }}
        gap="medium"
      >
        <Box>
          <Heading color={headingColor} textAlign="center">
            Sharia Compliant investing, made simple.
          </Heading>
          <Box height="medium">
            <Image src="/wireframe.png" fit="contain" />
          </Box>
          <Box margin={{ bottom: "large" }}>
            <Text color={textColor} textAlign="center">
              We are changing the way muslims think about investing. Be the
              first to explore & Invest in our verified{" "}
              <span>
                <i
                  style={{ color: "#89C33B" }}
                  className="fa-solid fa-circle-check"
                ></i>
              </span>{" "}
              sharia compliant assets, join the waitlist today for free premium
              membership.
            </Text>
          </Box>
        </Box>
        <Box fill="horizontal" direction="column" gap="large">
          <Box gap="medium">
            <Box flex={{ grow: 4 }} background="light-2" round="xsmall">
              <TextInput
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Box>
            <Box flex={{ grow: 1, shrink: 1 }}>
              <Button
                color="brand"
                primary
                label="Get Early Access"
                onClick={() => handleSubmit(email)}
              />
            </Box>
          </Box>
          <Box
            fill="horizontal"
            direction="row"
            gap="small"
            align="center"
            justify="center"
          >
            {error ? (
              <Text color="status-error" weight="bold" textAlign="center">
                {error}
              </Text>
            ) : success ? (
              <Text color="status-ok" weight="bold" textAlign="center">
                Success! Please check your email to confirm your email address.
              </Text>
            ) : null}
          </Box>
        </Box>

        <Box>
          <Button
            secondary
            label="How it Works."
            onClick={() => setIsModalOpen(true)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpMobile;
