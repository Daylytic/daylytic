import { About } from "components/home/about";
import { Contact } from "components/home/contact";
import { FAQ } from "components/home/faq";
import { Hero } from "components/home/hero";
import { Layout } from "components/layout";

export const Home = () => (
  <Layout>
    <Hero />
    <About />
    <FAQ />
    <Contact />
  </Layout>
);
