import Section from "@/components/Section/";
import type { NextPage } from "next";
import Menu from "@/assets/menu-icon.svg";
import Star from "@/assets/star.svg";
import {
  Button,
  Article,
  TypographyType,
  Typography,
  utils,
} from "@albathanext/design-system";
import { FormattedMessage, useIntl } from "react-intl";
import Image from "next/image";
import { app } from "../../../../config";
import { useRouter } from "next/router";
import { CAR_SELECTION } from "@/app/config";

export const Welcome: NextPage = () => {
  const { formatMessage } = useIntl();

  const router = useRouter();
  const handleOnClick = (e: MouseEvent) => {
    router.push(CAR_SELECTION);
  };

  return (
    <Section
      testid="Welcome"
      style={{
        backgroundImage: `url('${formatMessage({
          id: "home.welcome.background",
          defaultMessage: "/",
        })}')`,
      }}
      className="flex flex-col justify-between px-4 pt-8 pb-8 text-white bg-black bg-no-repeat bg-cover"
    >
      <div className="flex justify-between">
        <Image
          alt="logo"
          width={app.LOGO_WIDTH}
          height={app.LOGO_HEIGHT}
          src={formatMessage({
            id: "app.logo",
          })}
        />
        <Button startIcon={<img src={Menu} alt="Menu" />} variant={"contained"}>
          <Typography typographyType={TypographyType.CAPTION}>Menu</Typography>
        </Button>
      </div>
      <div>
        <Article
          divider
          dividerProps={{
            className: "mt-2",
            style: {
              borderColor: utils.colorSelector("P300"),
            },
          }}
          title={<FormattedMessage id="home.welcome.title" />}
          description={<FormattedMessage id="home.welcome.description" />}
          titleProps={{
            className: "text-5xl",
            color: "white",
          }}
          descriptionProps={{
            color: "white",
            className: "text-base",
          }}
        />
        <div className="flex mt-7">
          <Button
            fullWidth
            data-testid="home-welcome-button-start"
            size="medium"
            variant="contained"
            onClick={(e: MouseEvent) => handleOnClick(e)}
          >
            <Typography typographyType={TypographyType.FOOT_NOTE}>
              <FormattedMessage id="home.welcome.button.start" />
            </Typography>
          </Button>
          <div className="w-3" />
          <Button
            className={"!border-[0.2px] "}
            style={{
              borderColor: `${utils.colorSelector("e101")}`,
            }}
            endIcon={
              <div className="flex justify-center">
                <img src={Star} alt="" />
                <Typography
                  typographyType={TypographyType.FOOT_NOTE}
                  className="pt-1 pl-1 text-white"
                >
                  4.8
                </Typography>
              </div>
            }
            fullWidth
            size="medium"
            variant="outlined"
          >
            <Typography
              typographyType={TypographyType.FOOT_NOTE}
              className="text-white"
            >
              <FormattedMessage id="home.welcome.button.rating" />
            </Typography>
          </Button>
        </div>
      </div>
    </Section>
  );
};
