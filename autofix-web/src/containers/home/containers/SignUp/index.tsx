import { validateEmail } from "@/utils/index";
import {
  Article,
  Button,
  Typography,
  TypographyType,
  utils,
} from "@albathanext/design-system";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/app/config";
import { InputStyled } from "./styledComponent";

interface inputEventType {
  target: {
    value: string;
  };
}

export const SignUp: NextPage = () => {
  const intl = useIntl();
  const [email, setEmail] = useState("");

  const handleInput = (event: inputEventType) => {
    const { value } = event.target;
    setEmail(value);
  };

  const error = email !== "" && !validateEmail(email);
  const inputError = (() => {
    if (error) {
      return intl.formatMessage({ id: "home.signup.input.errorText" });
    }
    return "";
  })();

  return (
    <div
      data-testid="SignUp"
      style={{ backgroundColor: utils.colorSelector("p600") }}
      className=" text-white py-24 py-100 px-6"
    >
      <Article
        divider
        dividerProps={{
          className: "my-4",
          style: {
            borderColor: utils.colorSelector("p300"),
          },
        }}
        titleProps={{
          color: "white",
          className: " !font-normal !tracking-normal",
          typographyType: TypographyType.LARGE_TITLE,
        }}
        title={<FormattedMessage id="home.signup.title" />}
        description={
          <span className="text-base ">
            <FormattedMessage id="home.signup.description" />
          </span>
        }
        descriptionProps={{
          className: "opacity-80",
        }}
      />
      <InputStyled
        data-testid="email-signup-input"
        className="mt-4 "
        // eslint-disable-next-line new-cap
        placeholder={intl.formatMessage({
          id: "home.signup.input.placeholder",
        })}
        error={error}
        errorText={inputError}
        label={
          <span className="text-white">
            <FormattedMessage id="home.signup.input.label" />
          </span>
        }
        onChange={handleInput}
      />

      <Button
        className="my-7 !normal-case "
        variant="contained"
        fullWidth
        size="medium"
      >
        <FormattedMessage id="home.signup.button" />
      </Button>

      <Typography
        color={"white"}
        className="!font-light opacity-80 text-sm"
        typographyType={TypographyType.caption}
      >
        We wont pass your details on anyone else. By clicking sign me up button
        you agree to our{" "}
        <StyledLink href={TERMS_OF_USE}>terms of use</StyledLink> and
        <StyledLink href={PRIVACY_POLICY}>privacy policy</StyledLink>.
      </Typography>
    </div>
  );
};

interface styledLinkType {
  href: string;
  children: JSX.Element | string;
}
const StyledLink = ({ href, children }: styledLinkType) => (
  <Link href={href}>
    <span style={{ color: utils.colorSelector("p300") }}> {children} </span>
  </Link>
);
