import Template from "../templates/template";
import { ITemplate } from "src/types";

class Modal {
  template: ITemplate;
  constructor() {
    this.template = new Template();
  }

  public createModal(): HTMLElement {
    const modal: HTMLElement = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "modal-winner";
    const winnerBlock: HTMLElement = this.createWinnerBlock("", "");
    modal.append(winnerBlock);
    this.onClickHandlerModal(modal);
    return modal;
  }

  private onClickHandlerModal(modal: HTMLElement) {
    modal.addEventListener("click", () => {
      const modalEl: HTMLElement | null = document.querySelector(
        ".modal--open"
      );
      if (modalEl) {
        modalEl.classList.remove("modal--open");
      }
    });
  }

  private createWinnerBlock(nameWinner: string, timeWinner: string) {
    const winner: HTMLElement = document.createElement("div");
    winner.classList.add("winner-modal");
    const spanOne: HTMLElement = this.template.createSpan(
      "winner-modal__name",
      nameWinner
    );
    const spanTwo: HTMLElement = this.template.createSpan(
      "winner-modal__time",
      timeWinner
    );
    winner.append(spanOne, spanTwo);
    return winner;
  }
}

export default Modal;
