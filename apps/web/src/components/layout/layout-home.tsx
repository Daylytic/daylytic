import { Layout as AntLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Footer } from "./footer";
import { Header } from "./header";
import { About } from "~/components/home/about";
import { Contact } from "~/components/home/contact";
import { FAQ } from "~/components/home/faq";
import { Hero } from "~/components/home/hero";
import styles from "./layout.module.css";
import { StatisticsProvider } from "~/providers/statistics";

export const LayoutHome = () => (
  <StatisticsProvider>
    <AntLayout>
      <Header />
      <Content className={styles.home}>
        <Hero />
        <About />
        <FAQ />
        <Contact />
      </Content>
      <Footer />
    </AntLayout>
  </StatisticsProvider>
);
