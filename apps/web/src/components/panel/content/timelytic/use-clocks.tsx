import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { useTimelytic } from "~/providers/timelytic";
import { useState, useRef, useEffect } from "react";
import { useLayout } from "~/providers/layout";

dayjs.extend(utc);

export const useClock = () => {
  const { timelytic, resetTimelytic, pauseTimelytic, endTimelytic, continueTimelytic } =
    useTimelytic();
  const DEFAULT_DURATION = 1000 * 60 * 30; // Default: 30 minutes in ms

  const deadline = timelytic?.deadline === null ? null : dayjs(timelytic?.deadline);
  const duration = timelytic?.duration ?? DEFAULT_DURATION;
  const isRunning = timelytic?.isRunning ?? true;
  const pausedTime = timelytic?.pausedTime === null ? null : dayjs(timelytic?.pausedTime);
  const [percent, setPercent] = useState(0);
  const { setShowAction } = useLayout();
  
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!timelytic || !deadline) return;

    const startTime = deadline!.subtract(duration, "milliseconds");

    const computePercent = () => {
      const currentTime = isRunning ? dayjs().utc() : (pausedTime ?? dayjs().utc());
      const elapsed = currentTime.diff(startTime, "milliseconds");

      return Math.min((elapsed / duration) * 100, 100);
    };

    // Set percent immediately
    setPercent(computePercent());

    if (isRunning) {
      const update = () => {
        setPercent(computePercent());
        animationRef.current = requestAnimationFrame(update);
      };
      animationRef.current = requestAnimationFrame(update);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [timelytic]);

  const resetTimer = async (e) => {
    if (!timelytic) {
      return;
    }
    let minutes = 30;
    if (e && e.key) {
      if (e.key === "1") minutes = 30;
      else if (e.key === "2") minutes = 45;
      else if (e.key === "3") minutes = 60;
    }
    const newDuration = (1000 * 60 * minutes) as 1800000 | 2700000 | 3600000;
    const newDeadline = dayjs().utc().add(newDuration, "milliseconds");

    await resetTimelytic({
      ...timelytic,
      deadline: newDeadline.toISOString(),
      isRunning: true,
      pausedTime: null,
      duration: newDuration,
    });
  };

  const stopTimer = async () => {
    if (!timelytic) return;

    if (isRunning) {
      await pauseTimelytic({
        ...timelytic,
        isRunning: false,
        pausedTime: dayjs().utc().toISOString(),
      });
    }
  };

  const endTimer = async () => {
    if (!timelytic) return;

    await endTimelytic({
      ...timelytic,
      deadline: null,
      isRunning: false,
      pausedTime: null,
    });
  };

  const continueTimer = async () => {
    if (!timelytic) return;

    if (!isRunning && pausedTime) {
      const pauseDuration = Math.abs(dayjs(pausedTime).diff(dayjs.utc(), "seconds"));

      await continueTimelytic({
        ...timelytic,
        deadline: dayjs(deadline).add(pauseDuration, "seconds").toISOString(),
        isRunning: true,
        pausedTime: null,
      });
    }
  };

  const remainingTime = deadline
    ? dayjs(deadline).diff(isRunning ? dayjs().utc() : (dayjs(pausedTime) ?? 0))
    : 0;

  const formatDisplayTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (num: number, size: number) => String(num).padStart(size, "0");

    if (hours > 0) {
      return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
    } else if (minutes > 0) {
      return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
    } else {
      return `00:${pad(seconds, 2)}`;
    }
  };

  const dropDownItems = [
    { label: "30 minutes", key: "1" },
    { label: "45 minutes", key: "2" },
    { label: "60 minutes", key: "3" },
  ];

  const handleOpenOverview = () => {
    setShowAction(true);
  };

  return {
    dropDownItems,
    resetTimer,
    percent,
    deadline,
    isRunning,
    remainingTime,
    formatDisplayTime,
    continueTimer,
    stopTimer,
    endTimer,
    handleOpenOverview,
    timelytic,
  };
};
