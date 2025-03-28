/* 

TOURS will be implemented in the future. For now I will have to leave it because of glitching on smaller devices.

*/

import { Typography } from "antd";
import { ReactNode } from "react";
import { Routes } from "~/utils/routes";

const getTourStepElement = (id: string) => document.querySelector(`[data-tour-id="${id}"]`);

export interface TourStep {
    title: ReactNode;
    description: ReactNode;
    target?: () => Element | null;
    placement?: "center" | "left" | "leftTop" | "leftBottom" | "right" | "rightTop" | "rightBottom" | "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight";
    type?: 'navigate';
    to?: string;
    arrow?: boolean;
}

const welcomeMessage = (
    <div>
    <p>We’re excited to have you on board!</p>
        <p>
        Daylytic is your new digital companion for staying focused, reaching your goals, and unlocking
        your full potential.Whether you're crushing deadlines, building new habits, or simply trying
        to make the most of your day — we've got your back.
    </p>
    <p>✨ Here’s what you can look forward to: </p>
        < ul >
        <li>Smart tools to help you stay organized and on track </li>
            < li > Daily insights to boost your productivity </li>
                < li > Goal - setting features designed to turn dreams into done </li>
                    </ul>
                    < p > Your journey to a more productive, purpose - driven day starts now.</p>
                        < p > <strong>Let’s make every day count 💪</strong></p >
                            <p>— The Daylytic Team </p>
                                </div>
  );

const welcomeTitle = (
    <Typography.Title level= { 2} style = {{ margin: 0}}> Welcome To Daylytic! </Typography.Title>
  );

export const APP_TOURS: TourStep[] = [
    {
        title: welcomeTitle,
        description: welcomeMessage,
        placement: "center",
    },
    {
        type: "navigate",
        to: Routes.PANEL_DASHBOARD,
        title: "Menu",
        description:
            "This is the navigation menu which you can use to move in between different sections of the site.",
        target: () => getTourStepElement("menu"),
        placement: "right",
    },
    {

        type: "navigate",
        to: Routes.PANEL_DASHBOARD,
        title: "Settings",
        description:
            "In the settings you can find options to change theme, timezone, repeat this tour and more!",
        target: () => getTourStepElement("menu-header-settings"),
        placement: "right",
    },
    {

        type: "navigate",
        to: Routes.PANEL_DASHBOARD,
        title: "General",
        description:
            "Use this panel to navigate quickly: view daily analytics on your dashboard, manage your routine and calendar, and launch Timelytic (a Pomodoro-style timer to help you focus and optimize your work sessions.)",
        target: () => getTourStepElement("menu-header"),
        placement: "right",
    },
    {
        type: "navigate",
        to: Routes.PANEL_DASHBOARD,
        title: "Tags",
        description:
            "Here you can create, and view your tags. These should be used to categorize your tasks.",

        target: () => getTourStepElement("menu-tags"),
        placement: "right",
    },
    {
        type: "navigate",
        to: Routes.PANEL_DASHBOARD,
        title: "Goals",
        description:
            "Create, reach and view your goals. Use them to organize yourself in a new way.",
        target: () => getTourStepElement("menu-goals"),
        placement: "right",
    },
    {
        type: "navigate",
        to: Routes.PANEL_DASHBOARD,
        title: "Dashboard",
        description:
            "View your daily analytics such as time spent on tasks, reached goals, projects and tasks.",
        target: () => getTourStepElement("content"),
        placement: "left",
    },
    {
        type: "navigate",
        to: Routes.PANEL_ROUTINE,
        title: "Routine",
        description: "Here you can manage your daily routine which will automatically reset your tasks every midnight.",
        target: () => getTourStepElement("content"),
        placement: "left",
    },
    {
        type: "navigate",
        to: Routes.PANEL_ROUTINE,
        title: "Routine",
        description: "Use this to create your routine",
        target: () => getTourStepElement("routine-task-input"),
        placement: "left",
    },
    {
        type: "navigate",
        to: Routes.PANEL_ROUTINE,
        title: "Routine List",
        description: "Here you can view your routine tasks",
        target: () => getTourStepElement("task-list"),
        placement: "left",
    },
    {
        type: "navigate",
        to: Routes.PANEL_CALENDAR,
        title: "Calendar",
        description: "Watch, and monitor your important tasks",
        target: () => getTourStepElement("content"),
        placement: "left",
    },
    {
        type: "navigate",
        to: Routes.PANEL_TIMELYTIC,
        title: "Timelytic",
        description: "Set yourself 30, 45, and 60 minutes timers to focus on your tasks.",
        target: () => getTourStepElement("content"),
        placement: "left",
    },
    {
        type: "navigate",
        to: Routes.PANEL_TIMELYTIC,
        title: "Goals Creator",
        description: "Begin creating your goals by clicking here. Good Luck!",
        target: () => getTourStepElement("menu-goals-creator"),
        placement: "right",
    },
];