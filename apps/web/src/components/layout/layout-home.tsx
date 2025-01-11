import { Layout as AntLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Footer } from "./footer";
import { Header } from "./header";
import { LayoutProps } from "./layout";

export const LayoutHome = ({ children }: LayoutProps) => (
  <AntLayout>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </AntLayout>
);
