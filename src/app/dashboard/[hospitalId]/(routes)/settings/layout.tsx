import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "设置",
};

interface SettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout: React.FC<SettingLayoutProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export default SettingLayout;
