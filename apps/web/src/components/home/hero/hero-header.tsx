import Typography from "antd/es/typography";
import styles from "./hero.module.css";

const { Title, Paragraph } = Typography;

export const HeroHeader = () => (
  <header id={styles.header}>
    <Title>Daylytic</Title>
    <Paragraph>Modern solution to reach the impossible.</Paragraph>
  </header>
);
