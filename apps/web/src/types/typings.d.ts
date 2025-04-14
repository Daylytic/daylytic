declare module "*.module.css";
declare module "*.css";
declare module "*.svg";
declare module "*.png";

declare module "*.svg?react" {
    import React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_VAPID_PUBLIC_KEY: string;
    readonly VITE_DEV: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}