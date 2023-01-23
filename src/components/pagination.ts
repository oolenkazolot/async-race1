import { ITemplate } from "src/types";
import Template from "../templates/template";

class Pagination {
  template: ITemplate;

  constructor() {
    this.template = new Template();
  }
  public createPagination(
    getPage: () => number,
    getLimitCars: () => number,
    countCars: number,
    drawGarage: () => void
  ): HTMLElement {
    const paginationBlock: HTMLElement = document.createElement("div");
    paginationBlock.classList.add("pagination");
    const page: HTMLElement = document.createElement("h3");
    page.classList.add("pagination__page");
    const pageNumber: number = getPage();
    page.textContent = `Page #${pageNumber}`;
    const buttons: HTMLButtonElement[] = this.createButtons(
      getPage,
      getLimitCars,
      countCars,
      drawGarage
    );
    paginationBlock.append(page, ...buttons);
    return paginationBlock;
  }

  private createButtons(
    getPage: () => number,
    getLimitCars: () => number,
    countCars: number,
    drawGarage: () => void
  ): HTMLButtonElement[] {
    const page: number = getPage();
    const limitCars: number = getLimitCars();
    const btnPrev: HTMLButtonElement = this.template.createBtn(
      "pagination__prev",
      "btn",
      "Prev"
    );
    const btnNext: HTMLButtonElement = this.template.createBtn(
      "pagination__next",
      "btn",
      "Next"
    );

    if (page * limitCars >= countCars) {
      btnNext.disabled = true;
    }

    if (page <= 1) {
      btnPrev.disabled = true;
    }
    this.onClickHandlerPrev(btnPrev, getPage, drawGarage);
    this.onClickHandlerNext(
      btnNext,
      getPage,
      getLimitCars,
      countCars,
      drawGarage
    );
    return [btnPrev, btnNext];
  }

  private onClickHandlerPrev(
    btnPrev: HTMLButtonElement,
    getPage: () => number,
    drawGarage: (page?: number) => void
  ): void {
    btnPrev.addEventListener("click", () => {
      let page: number = getPage();

      if (page > 1) {
        page -= 1;
        drawGarage(page);
      }
    });
  }

  private onClickHandlerNext(
    btnNext: HTMLButtonElement,
    getPage: () => number,
    getLimitCars: () => number,
    countCars: number,
    drawGarage: (page?: number) => void
  ): void {
    btnNext.addEventListener("click", () => {
      let page: number = getPage();
      const limitCars: number = getLimitCars();
      if (page * limitCars < countCars) {
        page += 1;
        drawGarage(page);
      }
    });
  }
}

export default Pagination;
