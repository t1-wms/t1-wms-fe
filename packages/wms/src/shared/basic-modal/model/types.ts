import { MainButtonColor } from "@shared/main-button";

export interface BasicModalButton {
  label: string;
  onClick: () => void;
  color: MainButtonColor;
}

export interface BasicModalInfo {
  title: string;
  buttons?: BasicModalButton[];
}
