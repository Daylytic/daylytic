import { App, Flex, Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAssistance } from "~/providers/assistance";
import { useUser } from "~/providers/user";
import { getAssistanceRoute } from "~/utils/routes";

export const useDashboard = () => {
  const { assistanceId } = useParams();
  const { profile } = useUser();
  const navigate = useNavigate();
  const { createAssistance, assistances } = useAssistance();
  const { notification, message } = App.useApp();

  const sortedAssistances = assistances.sort((a, b) =>
    dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1,
  );

  const assistance = assistances.find((assistance) => assistance.id === assistanceId);

  // Local state to control how many items are visible
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const notificationKey = "dailyAssistantNotification";

  const handleSubmit = async (data) => {
    const hide = message.loading("Your daily assistance is being generated...", 0);
  
    try {
      const newAssistance = await createAssistance(data);
      hide();
  
      if (!newAssistance) return;
  
      notification.open({
        key: notificationKey,
        message: "Daily Assistant",
        description: (
          <Flex gap="small">
            <span>
              Your Daily Assistance Is Here {profile?.name ?? ""}. Click on the button to improve your
              productivity
            </span>
            <Button
              type="primary"
              onClick={() => {
                notification.destroy(notificationKey);
                navigate(getAssistanceRoute(newAssistance.id));
              }}
            >
              View
            </Button>
          </Flex>
        ),
        duration: 0,
      });
    } catch (_) {
      hide();
    }
  };

  return {navigate, assistance, sortedAssistances, visibleCount, handleSubmit, loadMore}
};
