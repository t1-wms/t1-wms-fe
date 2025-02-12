import { MainButtonColor } from "@shared/main-button";
import { ModalInfoBase } from "@shared/model";

export interface BasicModalButton {
  label: string;
  onClick: () => void;
  color?: MainButtonColor;
}

export interface BasicModalInfo extends ModalInfoBase {
  key: "basic";
  title: string;
  buttons?: BasicModalButton[];
}
