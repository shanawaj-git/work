import React, { useCallback, useEffect, useState } from "react";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader/PageHeader";
import {
  Article,
  Button,
  utils,
  Typography,
  TypographyType,
} from "@albathanext/design-system";
import BackArrow from "@/assets/arrow-back-icon.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import {
  StyledButton,
  StyledCarousel,
  StyledTextField,
} from "@/containers/VinSearch/StyledComponents";

export const pageName = "vinSearch";
export interface VinSearchTypes {
  carousel: carouselItem[];
  config?: unknown;
}

export interface carouselItem {
  description: string;
  image: string;
}

interface errorType {
  error: boolean;
  errorMessage: string;
}

const defaultError = {
  error: false,
  errorMessage: "",
};

const VinSearch = ({ carousel }: VinSearchTypes) => {
  const [vinCode, setVinCode] = useState("");

  const [error, setError] = useState<errorType>(defaultError);
  const { formatMessage } = useIntl();

  const handleVinCode = useCallback(
    (text: string) => {
      const vinRegex = /\b[(A-H|J-N|P|R-Z|0-9)]{17}\b/gm;
      const a = text.match(vinRegex);
      if (a === null) {
        setError({
          error: true,
          errorMessage: formatMessage({
            id: "vinSearch.header.input.errorMessage",
          }),
        });
      } else {
        setError(defaultError);
      }
    },
    [formatMessage]
  );

  useEffect(() => {
    if (vinCode !== "") handleVinCode(vinCode);
    else
      setError({
        error: true,
        errorMessage: "",
      });
  }, [vinCode, handleVinCode]);

  return (
    <Section className="flex flex-col h-screen" data-testid="VinSearch">
      <PageHeader>
        <HeaderChildren
          inputProps={{
            value: vinCode,
            onChange: (e) => {
              setVinCode(e.target.value);
            },
            error: error.error,
            helperText: error.errorMessage,
          }}
        />
      </PageHeader>
      <div
        className="flex-1 h-full p-6 pt-0 overflow-scroll overflow-y-scroll flex flex-col"
        data-testid="CarMakers"
      >
        <div className="flex-1 overflow-auto">
          <StyledCarousel
            className={""}
            direction="ltr"
            nextButton={true}
            backButton={false}
            content={carousel.map((e, i) => (
              <VinCarouselCard key={i} item={e} />
            ))}
            maxSteps={carousel?.length || 0}
          />
        </div>
        <div>
          <StyledButton
            variant="contained"
            fullWidth
            size="medium"
            disabled={error.error}
            data-testid="vinSearch-footer-button"
          >
            Continue
          </StyledButton>
        </div>
      </div>
    </Section>
  );
};

interface HeaderChildrenProps {
  inputProps: {
    value: string;
    error: boolean;
    helperText: string | boolean;
    onChange: (e: {
      target: {
        value: string;
      };
    }) => void;
  };
}

const HeaderChildren = ({ ...props }: HeaderChildrenProps) => {
  const router = useRouter();
  const intl = useIntl();

  const handleOnClick = () => {
    router.back();
  };

  return (
    <div>
      <Button
        data-testid={"vinSearch-header-back-button"}
        className="mb-5 min-w-[40px] min-h-[40px] w-[40px] h-[40px]"
        style={{
          borderColor: "rgba(220, 220, 220, 0.2)",
          backgroundColor: utils.colorSelector("P700"),
        }}
        onClick={handleOnClick}
      >
        <img src={BackArrow} alt="BackArrow" />
      </Button>
      <Article
        title={<FormattedMessage id="vinSearch.header.title" />}
        titleProps={{
          color: utils.colorSelector("P200"),
          className: "text-xl whitespace-pre-wrap !mt-4",
        }}
      />
      <StyledTextField
        {...props.inputProps}
        placeholder={intl.formatMessage({
          id: "vinSearch.header.input.placeholder",
        })}
        inputProps={{ "data-testid": "vinSearch-search" }}
      />
    </div>
  );
};

interface VinCarouselCardType {
  item: carouselItem;
}

const VinCarouselCard = ({ item }: VinCarouselCardType) => {
  return (
    <div>
      <Typography
        {...{
          typographyType: TypographyType.footNote,
          style: {
            color: utils.colorSelector("P700"),
          },
          className: " text-[15px]",
        }}
      >
        {item.description}
      </Typography>
      <img alt={item.description} src={item.image} className="w-full my-2" />
    </div>
  );
};

export default VinSearch;
