import { Card, Flex } from "antd";

export const GoalsList = () => {
  const data = [
    {
      title: "Improve Portuguese",
      description: "Get to C1 Level by the end of the year",
      deadline: "1 year",
    },

    {
      title: "Learn New Programming Language",
      description: "Dedicate myself towards getting learning bases in c++",
      deadline: "2 months",
    },
  ];

  return (
    <Flex>
      {data.map((element) => (
        <Card
          hoverable
          title={element.title}
          onClick={() => {
            console.log("hello");
          }}
        >
          <p>{element.description}</p>
        </Card>
      ))}
    </Flex>
  );
};
