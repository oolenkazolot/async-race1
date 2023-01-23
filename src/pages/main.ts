import {
  IRouter,
  IController,
  IAutos,
  IGarage,
  IControlPanel,
  IAutosData,
  IModal,
} from "../types/index";
import Controller from "../utils/controller";
import Garage from "../components/garage";
import ControlPanel from "../components/control-panel";
import Modal from "../components/modal";

class MainPage {
  private controller: IController;
  public router?: IRouter;
  private garage: IGarage;
  private controlPanel: IControlPanel;
  private page: number;
  private limitCars: number;
  private modal: IModal;

  constructor() {
    this.controller = new Controller();
    this.garage = new Garage();
    this.controlPanel = new ControlPanel();
    this.page = 1;
    this.limitCars = 7;
    this.modal = new Modal();
  }

  public draw(): void {
    const mainElement: HTMLElement | null = document.querySelector("main");
    if (!mainElement) {
      return;
    }
    mainElement.classList.add("main");
    mainElement.textContent = "";
    const modal: HTMLElement = this.modal.createModal();
    mainElement.append(modal);
    const controlPanel: HTMLElement = this.controlPanel.createControlPanel(
      this.drawGarage.bind(this),
      this.getPage.bind(this),
      this.getLimitCars.bind(this)
    );
    mainElement.append(controlPanel);
    this.drawGarage();
  }

  private async drawGarage(page?: number): Promise<void> {
    if (page) {
      this.page = page;
    }

    const autosData: IAutosData | undefined = await this.controller.getAutos(
      this.page,
      this.limitCars
    );
    if (!autosData) {
      return;
    }
    const garage: HTMLElement = this.garage.createGarage(
      autosData.autos,
      this.drawGarage.bind(this),
      autosData.countCars,
      this.getPage.bind(this),
      this.getLimitCars.bind(this)
    );
    let section: HTMLElement | null = document.querySelector(".garage");
    if (!section) {
      section = document.createElement("section");
      section.classList.add("garage");
    } else {
      section.textContent = "";
    }
    section.append(garage);
    const main: HTMLElement | null = document.querySelector(".main");
    if (!main) {
      return;
    }
    main.append(section);
  }

  public getPage(): number {
    return this.page;
  }

  public getLimitCars(): number {
    return this.limitCars;
  }
}

export default MainPage;
