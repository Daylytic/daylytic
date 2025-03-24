import Typography from "antd/es/typography";
import { styles } from ".";
import { useTypewriter } from "~/components/common/typewriter";
const { Title, Paragraph } = Typography;

export const HeroHeader = () => {
  const typeWriter = useTypewriter(["Goal", "Dream"], 400, 100, 1000);

  return (
    <header id={styles.header}>
      <Title level={1} className={styles.title}>
        What Is Your <br />
        Next{" "}
        <div className={styles.important}>
          {typeWriter} <span className={styles.cursor}></span>
        </div>
        ?
      </Title>
      <Paragraph>
        <strong>Daylytic</strong> is the secret to shattering limitations and building the life you
        deserve!
      </Paragraph>
    </header>
  );
};
