import Template from "../templates/template";
import { IRouter, ITemplate } from "../types/index";

class Header {
  template: ITemplate;
  constructor() {
    this.template = new Template();
  }

  public drawElements(router: IRouter): void {
    const header: HTMLElement | null = document.querySelector("header");
    if (!header) {
      return;
    }
    header.classList.add("header");
    const titleEl: HTMLElement = this.createTitle(router);
    const buttonsEl: HTMLElement = document.createElement("div");
    buttonsEl.classList.add("header__buttons");
    const btnGarage: HTMLButtonElement = this.template.createBtn(
      "header__btn-garage",
      "btn",
      "To Garage",
      "btn--page"
    );
    const btnWinners: HTMLButtonElement = this.template.createBtn(
      "header__btn-winners",
      "btn",
      "To Winners",
      "btn--page"
    );
    this.onClickHandlerBtn(btnGarage, router, "");
    this.onClickHandlerBtn(btnWinners, router, "winners");
    buttonsEl.append(btnGarage, btnWinners);
    header.append(titleEl, buttonsEl);
  }

  private onClickHandlerBtn(
    btnGarage: HTMLButtonElement,
    router: IRouter,
    path: string
  ): void {
    btnGarage.addEventListener("click", () => {
      router.navigate(path);
    });
  }

  private onClickHandlerTitle(
    titleEl: HTMLElement,
    router: IRouter,
    path: string
  ): void {
    titleEl.addEventListener("click", () => {
      router.navigate(path);
    });
  }

  private createTitle(router: IRouter): HTMLElement {
    const titleEl: HTMLElement = document.createElement("h1");
    titleEl.classList.add("header__logo");
    titleEl.textContent = "Async-Race";
    this.onClickHandlerTitle(titleEl, router, "");
    return titleEl;
  }
}

export default Header;
