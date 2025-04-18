import { useNavigate } from "react-router";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";
import { Flex, Spin, App, Layout } from "antd";
import { useEffect, useState } from "react";
import { styles } from ".";
import { usePanelFetcher } from "~/providers/panel-fetcher";
import { useTypewriter } from "~/components/common/typewriter";
import Typography from "antd/es/typography";
import { useTimelytic } from "~/providers/timelytic";
import { useAnalytics } from "~/providers/analytics";
const { Title } = Typography;

interface PrivateRouteProps {
  children: React.ReactNode;
}

const quotes = [
  {
    prefix: "Real Change Begins With",
    words: ["You", "A Plan", "An Idea"],
    timing: { typeSpeed: 300, backSpeed: 100, pause: 1000 },
  },
  {
    prefix: "Success Is Built On",
    words: ["Persistence", "Vision", "Courage"],
    timing: { typeSpeed: 250, backSpeed: 120, pause: 1200 },
  },
  {
    prefix: "The Future Depends On",
    words: ["Today", "Action", "Choices"],
    timing: { typeSpeed: 280, backSpeed: 110, pause: 1100 },
  },
  {
    prefix: "Innovation Starts With",
    words: ["Questions", "Problems", "Curiosity"],
    timing: { typeSpeed: 320, backSpeed: 90, pause: 900 },
  },
  {
    prefix: "Great Achievements Require",
    words: ["Patience", "Focus", "Dedication"],
    timing: { typeSpeed: 270, backSpeed: 100, pause: 1000 },
  },
];

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [selectedQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);

  const typeWriter = useTypewriter(
    selectedQuote.words,
    selectedQuote.timing.typeSpeed,
    selectedQuote.timing.backSpeed,
    selectedQuote.timing.pause,
  );

  const { profile, fetched: userFetched } = useUser();
  const { fetched: panelFetched } = usePanelFetcher();
  const { fetched: timelyticFetched } = useTimelytic();
  const { fetched: analyticsFetched } = useAnalytics();
  const { message } = App.useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTimePassed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userFetched && !profile && minLoadingTimePassed) {
      message.error("You need to login to access this page.");
      navigate(Routes.HOME, { replace: true });
    }
  }, [userFetched, profile, message, navigate, minLoadingTimePassed]);

  const isLoading =
    !userFetched ||
    !panelFetched ||
    !timelyticFetched ||
    !analyticsFetched ||
    !minLoadingTimePassed;

  if (isLoading) {
    return (
      <Layout>
        <Flex vertical gap="large" align="center" justify="center" className={styles.wrapper}>
          <Spin size="large" />
          <Title level={5} className={styles.title}>
            "{selectedQuote.prefix}{" "}
            <div className={styles.important}>
              {typeWriter} <span className={styles.cursor}></span>
            </div>
            „
          </Title>
        </Flex>
      </Layout>
    );
  }

  if (!profile) {
    return null;
  }

  return <>{children}</>;
};
