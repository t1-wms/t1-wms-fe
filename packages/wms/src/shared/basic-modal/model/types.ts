import { MainButtonColor, ModalInfoBase } from "@/shared";

export interface BasicModalButton {
  label: string;
  onClick: () => void;
  color?: MainButtonColor;
  form?: string;
}

export interface BasicModalInfo extends ModalInfoBase {
  key: "basic";
  title: string;
  buttons?: BasicModalButton[];
}
