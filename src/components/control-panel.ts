import {
  IController,
  IResponseCreateCar,
  IAutos,
  IResponseUpdateCar,
  IAutosData,
} from "src/types";
import { setTimeout } from "timers/promises";
import Controller from "../utils/controller";

class ControlPanel {
  controller: IController;
  isWin: boolean;
  timeoutsID: Record<number, number>;
  constructor() {
    this.controller = new Controller();
    this.isWin = false;
    this.timeoutsID = {};
  }
  public createControlPanel(
    drawGarage: () => void,
    getPage: () => number,
    getLimitCars: () => number
  ): HTMLElement {
    const controlPanel: HTMLElement = document.createElement("section");
    controlPanel.classList.add("control-panel");
    const title: HTMLElement = this.createTitle();
    const createBlock: HTMLElement = this.createBlockCreateCars(drawGarage);
    const updateBlock: HTMLElement = this.createBlockUpdateCars(drawGarage);
    const buttonsBlock: HTMLElement = this.createButtonsBlock(
      getPage,
      getLimitCars,
      drawGarage
    );
    controlPanel.append(title, createBlock, updateBlock, buttonsBlock);
    return controlPanel;
  }

  private createTitle(): HTMLElement {
    const title: HTMLElement = document.createElement("h2");
    title.classList.add("control-panel__title");
    title.textContent = "Control panel cars";
    return title;
  }

  private createBlockCreateCars(drawGarage: () => void): HTMLElement {
    const createBlock: HTMLElement = document.createElement("div");
    createBlock.classList.add("create-cars");
    const inputName: HTMLInputElement = this.createInputName(
      "create-cars__name",
      "text",
      "input"
    );
    const inputColor: HTMLInputElement = this.createInputColor(
      "create-cars__color",
      "color",
      "#f6b73c"
    );
    const btn: HTMLButtonElement = this.createBtn(
      "create-cars__btn",
      "btn",
      "btn--panel",
      "Create"
    );
    this.onClickHandlerCreate(btn, drawGarage);
    createBlock.append(inputName, inputColor, btn);
    return createBlock;
  }

  private onClickHandlerCreate(
    btn: HTMLButtonElement,
    drawGarage: () => void
  ): void {
    btn.addEventListener("click", () => {
      const inputName: HTMLInputElement | null = document.querySelector(
        ".create-cars__name"
      );
      const inputColor: HTMLInputElement | null = document.querySelector(
        ".create-cars__color"
      );
      if (inputName && inputColor) {
        const inputNameValue: string = inputName.value;
        const inputColorValue: string = inputColor.value;
        console.log(inputNameValue, inputColorValue);

        this.createCar(inputNameValue, inputColorValue, drawGarage);
      }
    });
  }

  private async createCar(
    inputNameValue: string,
    inputColorValue: string,
    drawGarage: () => void
  ): Promise<void> {
    const response:
      | IResponseCreateCar
      | undefined = await this.controller.createCar(
      inputNameValue,
      inputColorValue
    );
    if (response) {
      drawGarage();
    }
  }

  private createBlockUpdateCars(drawGarage: () => void): HTMLElement {
    const updateBlock: HTMLElement = document.createElement("div");
    updateBlock.classList.add("update-cars");
    const inputName: HTMLInputElement = this.createInputName(
      "update-cars__name",
      "text",
      "input"
    );
    const inputColor: HTMLInputElement = this.createInputColor(
      "update-cars__color",
      "color",
      "#f6b73c"
    );
    const inputId: HTMLInputElement = this.createInputName(
      "update-cars__id",
      "text",
      "input"
    );
    const btn: HTMLButtonElement = this.createBtn(
      "create-cars__btn",
      "btn",
      "btn--panel",
      "Update"
    );
    this.onClickHandlerUpdate(btn, drawGarage);
    updateBlock.append(inputId, inputName, inputColor, btn);
    return updateBlock;
  }

  private onClickHandlerUpdate(
    btn: HTMLButtonElement,
    drawGarage: () => void
  ): void {
    btn.addEventListener("click", () => {
      const inputUpdateName: HTMLInputElement | null = document.querySelector(
        ".update-cars__name"
      );
      const inputUpdateColor: HTMLInputElement | null = document.querySelector(
        ".update-cars__color"
      );
      const inputUpdateId: HTMLInputElement | null = document.querySelector(
        ".update-cars__id"
      );
      if (inputUpdateName && inputUpdateColor && inputUpdateId) {
        this.updateCar(
          Number(inputUpdateId.value),
          inputUpdateName.value,
          inputUpdateColor.value,
          drawGarage
        );
      }
    });
  }

  private async updateCar(
    id: number,
    name: string,
    color: string,
    drawGarage: () => void
  ): Promise<void> {
    const response:
      | IResponseUpdateCar
      | undefined = await this.controller.updateCar(id, name, color);
    if (response) {
      drawGarage();
    }
  }

  private createButtonsBlock(
    getPage: () => number,
    getLimitCars: () => number,
    drawGarage: () => void
  ): HTMLElement {
    const buttonsBlock: HTMLElement = document.createElement("div");
    buttonsBlock.classList.add("control-panel__buttons");
    const btnRace: HTMLButtonElement = this.createBtn(
      "control-panel__race",
      "btn",
      "btn--panel",
      "Race"
    );
    const btnReset: HTMLButtonElement = this.createBtn(
      "control-panel__reset",
      "btn",
      "btn--panel",
      "Reset"
    );
    if (this.isWin === false) {
      btnReset.disabled = true;
    }
    this.onClickHandlerRace(btnRace, btnReset, getPage, getLimitCars);
    this.onClickHandlerReset(
      btnRace,
      btnReset,
      getPage,
      getLimitCars,
      drawGarage
    );
    const btnGenerate: HTMLButtonElement = this.createBtn(
      "control-panel__generate",
      "btn",
      "btn--panel",
      "Generate cars"
    );
    this.onClickHandlerGenerate(btnGenerate, drawGarage);
    buttonsBlock.append(btnRace, btnReset, btnGenerate);
    return buttonsBlock;
  }

  private onClickHandlerGenerate(
    btnGenerate: HTMLButtonElement,
    drawGarage: () => void
  ): void {
    btnGenerate.addEventListener("click", () => {
      for (let i = 0; i < 100; i++) {
        const randomNumCarsName: string = this.getRandomCarsName();
        const randomNumCarsModel: string = this.getRandomCarsModel();
        const randomNumColor: string = this.getRandomColorCars();
        this.createCar(
          randomNumCarsName + " " + randomNumCarsModel,
          randomNumColor,
          drawGarage
        );
      }
    });
  }

  private getRandomCarsName(): string {
    const carsName: string[] = [
      "Tesla",
      "Ford",
      "BMW",
      "Mercedes",
      "Opel",
      "Porsche",
      "Audi",
      "Honda",
      "Hyundai",
      "Kia",
      "Mazda",
      "Acura",
      "Citroen",
      "Lexus",
      "Skoda",
    ];
    const min: number = Math.ceil(0);
    const max: number = Math.floor(14);
    const randomNum: number = Math.floor(Math.random() * (max - min + 1)) + min;
    return carsName[randomNum];
  }

  private getRandomCarsModel(): string {
    const carsModel: string[] = [
      "Model S",
      "Mondeo",
      "iX M60",
      "GLA",
      "Zafira Life",
      "Cayman",
      "Q7",
      "Accord",
      "Tucson",
      "Ceed",
      "CX-9",
      "MDX",
      "C5 AIRCROSS",
      "RX",
      "Octavia",
    ];
    const min: number = Math.ceil(0);
    const max: number = Math.floor(14);
    const randomNum: number = Math.floor(Math.random() * (max - min + 1)) + min;
    return carsModel[randomNum];
  }

  private getRandomColorCars(): string {
    const color: string[] = [
      "#ff0099",
      "	#ff0033",
      "#0033ff",
      "#00ffcc",
      "#33cc00",
      "#33cc99",
      "#663399",
      "#ff6666",
      "#ffff00",
      "#990000",
      "#ffcccc",
      "#006633",
      "#666600",
      "#003399",
      "#cc66cc",
    ];
    const min: number = Math.ceil(0);
    const max: number = Math.floor(14);
    const randomNum: number = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomNum);
    return color[randomNum];
  }

  private onClickHandlerRace(
    btnRace: HTMLButtonElement,
    btnReset: HTMLButtonElement,
    getPage: () => number,
    getLimitCars: () => number
  ): void {
    btnRace.addEventListener("click", () => {
      btnRace.disabled = true;
      this.startRace(getPage, getLimitCars);
      this.changeDisabledBtn(true, false);
    });
  }

  private onClickHandlerReset(
    btnRace: HTMLButtonElement,
    btnReset: HTMLButtonElement,
    getPage: () => number,
    getLimitCars: () => number,
    drawGarage: () => void
  ): void {
    btnReset.addEventListener("click", () => {
      this.stopCar(btnRace, btnReset, getPage, getLimitCars);
      this.clearTimers(this.timeoutsID);
      drawGarage();
      this.isWin = false;
    });
  }

  private changeDisabledBtn(btnRunDisabled: boolean, btnStopDisabled: boolean) {
    const buttonsRun: NodeListOf<Element> | null = document.querySelectorAll(
      ".control-auto__run"
    );
    const buttonsStop: NodeListOf<Element> | null = document.querySelectorAll(
      ".control-auto__stop"
    );
    const btnRunArr: HTMLButtonElement[] = Array.prototype.slice.call(
      buttonsRun
    );
    const btnStopArr: HTMLButtonElement[] = Array.prototype.slice.call(
      buttonsStop
    );
    if (btnRunArr && btnStopArr) {
      btnRunArr.forEach((btnRun) => {
        btnRun.disabled = btnRunDisabled;
      });
      btnStopArr.forEach((btnStop) => {
        btnStop.disabled = btnStopDisabled;
      });
    }
  }

  private async startRace(
    getPage: () => number,
    getLimitCars: () => number
  ): Promise<void> {
    const autos: IAutos[] | undefined = await this.getAutos(
      getPage(),
      getLimitCars()
    );
    if (!autos) {
      return;
    }
    autos.forEach((auto) => {
      this.startAuto(auto, this.timeoutsID);
    });
  }

  private async getAutos(
    page: number,
    limitCars: number
  ): Promise<IAutos[] | undefined> {
    return await this.controller.getAutosId(page, limitCars);
  }

  private async startAuto(auto: IAutos, timeoutsID: Record<number, number>) {
    const time = await this.controller.startEngine(auto.id);
    if (!time) {
      return;
    }
    this.startAnimation(time, auto.id);
    this.startTimer(auto, timeoutsID, time);
    const isDrive = await this.controller.startDrive(auto.id);
    if (!isDrive) {
      this.clearTimerByID(timeoutsID, auto.id);
      this.stopAnimation(auto.id);
    }
  }

  private clearTimers(timeoutsID: Record<number, number>) {
    for (const key in timeoutsID) {
      clearTimeout(timeoutsID[key]);
    }

    timeoutsID = {};
  }

  private clearTimerByID(timeoutsID: Record<number, number>, id: number) {
    for (const key in timeoutsID) {
      if (key == id.toString()) {
        clearTimeout(timeoutsID[key]);
      }
    }
  }

  private startTimer(
    auto: IAutos,
    timeoutsID: Record<number, number>,
    time: number
  ): void {
    const timeoutID = window.setTimeout(() => {
      this.setWinner(auto.id, auto.name, Math.round(time / 10) / 100);
      this.clearTimers(timeoutsID);
    }, time);

    timeoutsID[auto.id] = timeoutID;
  }

  private startAnimation(time: number, id: number): void {
    const imgAuto: HTMLElement | null = document.getElementById(id.toString());
    if (!imgAuto) {
      return;
    }

    imgAuto.classList.add("animation-active");
    imgAuto.style.animationDuration = time / 1000 + "s";
  }

  private stopAnimation(id: number): void {
    const imgAuto: HTMLElement | null = document.getElementById(id.toString());
    if (!imgAuto) {
      return;
    }
    const left: number = imgAuto.getBoundingClientRect().left;
    imgAuto.style.left = left + "px";
    imgAuto.classList.remove("animation-active");
  }

  private async stopCar(
    btnRace: HTMLButtonElement,
    btnReset: HTMLButtonElement,
    getPage: () => number,
    getLimitCars: () => number
  ): Promise<void> {
    const page: number = getPage();
    const limitCars: number = getLimitCars();
    const response: IAutos[] | undefined = await this.controller.getAutosId(
      page,
      limitCars
    );
    if (response) {
      response.forEach((auto) => {
        this.controller.stopCar(auto, btnRace, btnReset);
      });
    }
  }

  private setWinner(id: number, name: string, time: number): void {
    if (this.isWin) {
      return;
    }
    const winnerNameEl: HTMLElement | null = document.querySelector(
      ".winner-modal__name"
    );
    const winnerTimeEl: HTMLElement | null = document.querySelector(
      ".winner-modal__time"
    );
    const modalEl: HTMLElement | null = document.getElementById("modal-winner");
    if (winnerNameEl && winnerTimeEl && modalEl) {
      modalEl.classList.add("modal--open");
      winnerNameEl.textContent = `${name} Winner!`;
      winnerTimeEl.textContent = `(${time + "s"})!`;
      const btnReset: HTMLButtonElement | null = document.querySelector(
        ".control-panel__reset"
      );
      if (btnReset) {
        btnReset.disabled = false;
      }
    }
    this.isWin = true;
    this.controller.createWinner(id, time);
  }

  private createInputName(
    classNameOne: string,
    inputType: string,
    classNameTwo?: string
  ): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add(classNameOne);
    if (classNameTwo) {
      input.classList.add(classNameTwo);
    }
    input.type = inputType;
    return input;
  }

  private createInputColor(
    classNameOne: string,
    inputType: string,
    color: string
  ): HTMLInputElement {
    const input: HTMLInputElement = document.createElement("input");
    input.classList.add(classNameOne);
    input.type = inputType;
    input.value = color;
    return input;
  }

  private createBtn(
    classNameOne: string,
    classNameTwo: string,
    classNameThree: string,
    content: string
  ): HTMLButtonElement {
    const btn: HTMLButtonElement = document.createElement("button");
    btn.classList.add(classNameOne);
    btn.classList.add(classNameTwo);
    btn.classList.add(classNameThree);
    btn.textContent = content;
    return btn;
  }
}

export default ControlPanel;
