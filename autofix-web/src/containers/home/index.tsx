import Section from "@/components/Section";
import {
  AssetType,
  FooterType,
  HomeActionType,
  LabelType,
  ServiceType,
} from "@/services/common";
import { HowTo } from "./containers/HowTo";
import { Intro } from "./containers/Intro";
import { Welcome } from "./containers/Welcome";
import Testimonial from "@/containers/home/containers/Testimonial";
import { TestimonialType } from "@/services/home/testimonial";
import { ToFix } from "./containers/ToFix";
import { SignUp } from "./containers/SignUp";
import { Footer } from "../Footer";

export interface HomePageProps {
  en?: { labels: LabelType[]; assets: AssetType[] };
  ar?: { labels: LabelType[]; assets: AssetType[] };
  services: ServiceType[];
  actions: HomeActionType[];
  testimonials: TestimonialType[];
  footer?: FooterType;
}

const Home = (props: HomePageProps) => {
  const { services, actions, testimonials, footer } = props;
  return (
    <Section testid="main">
      <Welcome />
      <Intro services={services} />
      <HowTo actions={actions} />
      <Testimonial testimonials={testimonials} />
      <ToFix />
      <SignUp />
      <Footer footer={footer} />
    </Section>
  );
};

export default Home;
