export interface IRout {
  path: string;
  cb: (param?: string) => void;
}

export interface IRouter {
  navigate: (path: string) => void;
  init: () => void;
}

export interface IController {
  getAutos: (
    page: number,
    limitCars: number
  ) => Promise<IAutosData | undefined>;
  getAutosId: (
    page: number,
    limitCars: number
  ) => Promise<IAutos[] | undefined>;
  createCar: (
    name: string,
    color: string
  ) => Promise<IResponseCreateCar | undefined>;
  deleteCar: (id: number) => Promise<void>;
  startCarEngine: (id: number) => Promise<IResponseCarEngine | undefined>;
  startEngineDrive: (id: number) => Promise<IResponseEngineDrive | undefined>;
  stopCarEngine: (id: number) => Promise<void>;
  updateCar: (
    id: number,
    name: string,
    color: string
  ) => Promise<IResponseUpdateCar | undefined>;
  startCar: (
    auto: IAutos,
    btnRun: HTMLButtonElement,
    btnStop: HTMLButtonElement,
    setWinner?: (id: number, name: string, time: number) => void
  ) => Promise<void>;
  stopCar: (
    auto: IAutos,
    btnRun: HTMLButtonElement,
    btnStop: HTMLButtonElement
  ) => Promise<void>;
  createWinner: (id: number, time: number) => Promise<IWinner | undefined>;
  updateWinner: (
    id: number,
    wins: number,
    time: number
  ) => Promise<IWinner | undefined>;
  getWinners: (
    page: number,
    limit: number,
    sort: string,
    direction: string
  ) => Promise<IWinnersData | undefined>;
  getWinnersAll: () => Promise<IWinner[] | undefined>;
  getAutosAll: () => Promise<IAutos[] | undefined>;
  startEngine: (id: number) => Promise<number | undefined>;
  startDrive: (id: number) => Promise<boolean>;
  deleteWinner: (id: number) => Promise<void>;
}

export interface IMainPage {
  draw: () => void;
  router?: IRouter;
  getPage: () => number;
  getLimitCars: () => number;
}

export interface IAutos {
  name: string;
  color: string;
  id: number;
}

export interface IGarage {
  createGarage: (
    autos: IAutos[],
    drawGarage: () => void,
    countCars: number,
    getPage: () => number,
    getLimitCars: () => number
  ) => HTMLElement;
}

export interface IResponseCarEngine {
  velocity: number;
  distance: number;
}

export interface IResponseEngineDrive {
  success: true;
}

export interface IControlPanel {
  createControlPanel: (
    drawGarage: () => void,
    getPage: () => number,
    getLimitCars: () => number
  ) => HTMLElement;
}

export interface IResponseCreateCar {
  name: string;
  color: string;
  id: number;
}

export interface IResponseUpdateCar {
  name: string;
  color: string;
  id: number;
}

export interface ITemplate {
  createBtn: (
    myClassOne: string,
    myClassTwo: string,
    content: string,
    myClassThree?: string
  ) => HTMLButtonElement;
  createSpan: (myClass: string, content: string) => HTMLElement;
}

export interface IPagination {
  createPagination: (
    getPage: () => number,
    getLimitCars: () => number,
    countCars: number,
    drawGarage: () => void
  ) => HTMLElement;
}

export interface IAutosData {
  autos: IAutos[];
  countCars: number;
}

export interface IWinnersData {
  winners: IWinner[];
  countWinners: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IHeader {
  drawElements: (router: IRouter) => void;
}

export interface IWinnersPage {
  draw: (page?: number) => Promise<void>;
  drawPage: () => void;
  getPage: () => number;
  getLimitWinners: () => number;
}

export interface IModal {
  createModal: () => HTMLElement;
}
