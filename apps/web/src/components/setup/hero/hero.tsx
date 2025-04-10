import { OrderedListOutlined, AimOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Steps, Typography } from "antd";
import { useRef, useState } from "react";

import type { StepsProps } from "antd";
import { useNavigate } from "react-router";
import { Routes } from "~/utils/routes";
import { styles } from ".";
import { RoutineTaskInput } from "~/components/panel/content/routine";
import { HeroRoutineList } from "~/components/setup/hero/hero-routine-list";
import { GoalCreatorCard } from "~/components/panel/menu/goals/goals-creator-card";
import { HeaderSettingsForm } from "~/components/panel/menu/header/header-settings-form";
import { useGoal } from "~/providers/goal";

export const Hero = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const goalTitle = useRef("");
  const goalDescription = useRef("");
  const [loading, setLoading] = useState<boolean>(false);


  const navigate = useNavigate();
  const {createGoal} = useGoal();

  const steps: StepsProps["items"] = [
    {
      title: "Account",
      icon: <UserOutlined />,
    },
    {
      title: "Routine",
      icon: <OrderedListOutlined />,
    },
    {
      title: "First Goal",
      icon: <AimOutlined />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    await createGoal(goalTitle.current, goalDescription.current);
    setLoading(false);
    navigate(Routes.PANEL_DASHBOARD);
  };

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 0:
        return <HeaderSettingsForm/>;
      case 1:
        return (
          <>
            <RoutineTaskInput />
            <HeroRoutineList />
          </>
        );
      case 2:
        return (
          <GoalCreatorCard
            alwaysShowInput={true}
            setup={{
              onChange: (title, description) => {
                goalTitle.current =  title;
                goalDescription.current = description;
              },
            }}
          />
        );
      default:
        <></>;
    }

    return <></>;
  };

  return (
    <section className={styles.hero}>
      <Flex vertical gap="large" className={styles.inner}>
        <Steps current={currentStep} items={steps} />
        <Typography.Title level={1}>
          Set up your {steps[currentStep].title ?? "Routine"}
        </Typography.Title>
        <Flex vertical className={styles.content}>
          {getCurrentStepContent()}
        </Flex>
        <Flex gap="small">
          {currentStep !== 0 && (
            <Button type="default" onClick={handleGoBack}>
              Go Back
            </Button>
          )}
          {currentStep === steps.length - 1 ? (
            <Button type="primary" onClick={handleFinish} loading={loading}>
              Finish
            </Button>
          ) : (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Flex>
      </Flex>
    </section>
  );
};
