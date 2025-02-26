import { Layout as AntLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Footer } from "./footer";
import { Header } from "./header";
import { About } from "components/home/about";
import { Contact } from "components/home/contact";
import { FAQ } from "components/home/faq";
import { Hero } from "components/home/hero";

export const LayoutHome = () => (
  <AntLayout>
    <Header />
    <Content>
      <Hero />
      <About />
      <FAQ />
      <Contact />
    </Content>
    <Footer />
  </AntLayout>
);
