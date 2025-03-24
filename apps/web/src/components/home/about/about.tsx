import { Card, Flex } from "antd";
import darkGoal from "~/assets/images/goals-dark.png";
import lightGoal from "~/assets/images/goals-light.png";
import darkRoutine from "~/assets/images/routine-dark.png";
import lightRoutine from "~/assets/images/routine-light.png";
import darkAssistant from "~/assets/images/daily-assistance-dark.png";
import lightAssistant from "~/assets/images/daily-assistance-light.png";
import guideDark from "~/assets/images/guide-dark.png";
import guideLight from "~/assets/images/guide-light.png";
import darkTimelytic from "~/assets/images/timelytic-dark.png";
import lightTimelytic from "~/assets/images/timelytic-light.png";
import darkEditor from "~/assets/images/editor-dark.png";
import lightEditor from "~/assets/images/editor-light.png";
import darkAnalytics from "~/assets/images/analytics-dark.png";
import lightAnalytics from "~/assets/images/analytics-light.png";
import { styles } from ".";
import { useUser } from "~/providers/user";
import { AboutCard } from "~/components/home/about/about-card";
import { AboutStatistics } from "~/components/home/about/about-statistics";
import clsx from "clsx";

export const About = () => {
  const { isDarkMode } = useUser();
  // Choose the right image based on dark mode status
  const darkMode = isDarkMode();

  return (
    <section id="about" className={styles.about}>
      <Card
        className={styles.card}
        cover={<img src={darkMode ? darkGoal : lightGoal} alt="Logo" className={clsx(styles.img, styles.bordered)} />}
        bordered={true}
      >
        <Flex gap="large" align="center" justify="center">
          <div className={styles.text}>
            <h3 className={styles.title}>Create Goals With Projects</h3>
            <p>
              Use the one working structure for keeping your goals, projects and tasks. Divide
              dreams into goals, problems into projects and steps into tasks.
            </p>
          </div>
        </Flex>
      </Card>
      <AboutCard
        image={
          <img src={darkMode ? darkRoutine : lightRoutine} alt="Logo" className={styles.img} />
        }
        title="Keep Track Of Your Routine"
        description={`Your routine is the foundation of your success. Every small habit you build and every
            task you complete brings you one step closer to your goals.`}
      />
      <AboutCard
        image={
          <img src={darkMode ? darkAssistant : lightAssistant} alt="Logo" className={styles.img} style={{maxHeight: "600px"}} />
        }
        imagePosition="right"
        title="Daily Assistant"
        description={`The Daily Assistant is an AI-powered feature that gives you a personalized daily report by combining your daily check-in data with information from your goals, projects, tasks, and routines`}
      />
      <AboutCard
        image={<img src={darkMode ? guideDark : guideLight} alt="Logo" className={styles.img} />}
        title="Always Reach Your Goals"
        description={`Inside dashboard you can find a guide that will help you reach your goals. This guide is based on the research making sure that if you follow it from the top to the bottom, you will reach your goals.`}
      />
      <AboutCard
        image={
          <img src={darkMode ? darkTimelytic : lightTimelytic} alt="Logo" className={styles.img} />
        }
        imagePosition="right"
        title="Timelytic"
        description={`A pomodoro timer that helps you to focus on your tasks. It is a time management technique that uses a timer of 30, 45, 60 minutes, to make sure you pressure yourself with time to do your work.`}
      />
      <AboutCard
        image={<img src={darkMode ? darkEditor : lightEditor} alt="Logo" className={styles.img} />}
        title="Markdown Editing"
        description={`A simple, fast to use markdown editing in every task. This allows you to write your tasks in seconds. A guide on how to use markdown and all of the available shortcuts can be found in dashboard next to settings.`}
      />
      <AboutCard
        image={
          <img src={darkMode ? darkAnalytics : lightAnalytics} alt="Logo" className={styles.img} />
        }
        imagePosition="right"
        title="Analytics"
        description={`Analytics is a powerful tool that helps you to understand your progress. Showing you a lot of statistics, tasks you did, time you spent, projects, goals you reached, and much more.`}
      />
      <AboutStatistics />
    </section>
  );
};
