import { theme } from "antd";

const { useToken } = theme;

export const useHeaderHeight = () => {
  const { token } = useToken();
  return Number(token.Layout?.headerHeight) || 64;
};

export const scrollToElement = (elementId: string, headerHeight: number) => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - headerHeight,
      behavior: 'smooth'
    });
  }
};
