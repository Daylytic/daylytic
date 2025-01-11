import { About } from "components/home/about";
import { Contact } from "components/home/contact";
import { FAQ } from "components/home/faq";
import { Hero } from "components/home/hero";
import { LayoutHome } from "components/layout";

export const Home = () => (
  <LayoutHome>
    <Hero />
    <About />
    <FAQ />
    <Contact />
  </LayoutHome>
);
