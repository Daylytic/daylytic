import { Layout as AntLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Footer } from "./footer";
import { Header } from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <AntLayout>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </AntLayout>
);
