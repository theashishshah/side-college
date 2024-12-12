import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verify Your Account</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your verification code is here, {username}!</Preview>
      <Section
        style={{
          backgroundColor: "#f9fafc",
          padding: "8px",
          borderRadius: "10px",
        }}
      >
        <Row style={{ textAlign: "center", marginBottom: "12px" }}>
          <Heading as="h1" style={{ color: "#2b2d42", fontSize: "24px" }}>
            Welcome to Our Platform, {username}!
          </Heading>
        </Row>
        <Row style={{ marginBottom: "12px" }}>
          <Text
            style={{
              color: "#5a5a5a",
              fontSize: "16px",
              lineHeight: "1.5",
              textAlign: "center",
            }}
          >
            Thank you for joining us! Use the verification code below to confirm
            your email address and complete your account setup.
          </Text>
        </Row>
        <Row style={{ textAlign: "center", margin: "8px 0" }}>
          <Text
            style={{
              backgroundColor: "#e7f5ff",
              color: "#0077b6",
              fontSize: "20px",
              fontWeight: "bold",
              padding: "8px 8px",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            {otp}
          </Text>
        </Row>
        <Row style={{ textAlign: "center", marginBottom: "8px" }}>
          <Text
            style={{ color: "#5a5a5a", fontSize: "16px", lineHeight: "1.5" }}
          >
            Simply enter this code in the app to verify your account. If you
            didn’t request this code, please ignore this email.
          </Text>
        </Row>
        <Row style={{ textAlign: "center" }}>
          <Button
            href={`http://localhost:3000/verify/${username}`}
            style={{
              backgroundColor: "#0077b6",
              color: "#ffffff",
              padding: "8px 8px",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Verify My Account
          </Button>
        </Row>
        <Row style={{ textAlign: "center", marginTop: "16px 2px" }}>
          <Text style={{ color: "#5a5a5a", fontSize: "14px" }}>
            Need help? Contact our support team anytime at 
            <a
              href="mailto:thisisashishshah@gmail.com"
              style={{
                color: "#0077b6",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              thisisashishshah@gmail.com
            </a>
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
