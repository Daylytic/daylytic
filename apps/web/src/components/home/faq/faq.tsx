import { Collapse, CollapseProps, Typography } from "antd";
import { styles } from ".";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "What is Daylytic?",
    children: <p>Daylytic is a free platform for reaching all of your goals. This platform has its target to make sure everyone has a free, and unlimited access to a goal reaching tool. This tool has been created based on research, thus certain fuctionality may be very specific towards certain group of people.</p>,
  },
  {
    key: "2",
    label: "Why would you need it?",
    children: <p>If you want to become more organized, take care of your routine, reach your goals, and become as producitve as it gets, you found the perfect place. This platform let's you do all that right here.</p>,
  },
  {
    key: "3",
    label: "What is the cost?",
    children: <p>Daylytic costs nothing, we have no advertisements, no data selling, and no paid subscriptions. You are not the product, Daylytic is just a free tool. However if you would like to donate you can do it to this Paypal email: asponpl@gmail.com</p>,
  },
  {
    key: "4",
    label: "What is the future of Daylytic?",
    children: <p>This platform will grow a lot overtime. Even though it was a school project, the work on it does not stop here.</p>,
  },
  {
    key: "5",
    label: "How do I begin to reach my goals?",
    children: <p>Regardless of how big your goal is, as long as you follow the guide inside the dashboard, you will reach it. The guide you can find right next to settings icon in the dashboard.</p>,
  },
];

export const FAQ = () => (
  <section id="faq">
    <Typography.Title level={2} className={styles.title}>FAQ</Typography.Title>
    <Typography.Paragraph className={styles.paragraph}>Here are answers to some of the common questions you may have about Daylytic.</Typography.Paragraph>
    <Collapse className={styles.collapse} defaultActiveKey={['1']} items={items} />
  </section>
);
