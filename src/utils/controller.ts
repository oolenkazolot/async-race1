import {
  IAutos,
  IResponseCarEngine,
  IResponseEngineDrive,
  IResponseCreateCar,
  IResponseUpdateCar,
  IWinner,
  IAutosData,
  IWinnersData,
} from "../types/index";

class Controller {
  public async getAutosAll(): Promise<IAutos[] | undefined> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage`);
      const autos: IAutos[] = await response.json();
      return autos;
    } catch (e) {
      console.log(e);
    }
  }

  public async getAutos(
    page: number,
    limitCars: number
  ): Promise<IAutosData | undefined> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/garage/?_page=${page}&_limit=${limitCars}`
      );
      const countCars: string | null = response.headers.get("X-Total-Count");
      const autos: IAutos[] = await response.json();
      return { autos: autos, countCars: Number(countCars) };
    } catch (e) {
      console.log(e);
    }
  }

  public async getAutosId(
    page: number,
    limitCars: number
  ): Promise<IAutos[] | undefined> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/garage/?_page=${page}&_limit=${limitCars}`
      );
      const autos: IAutos[] = await response.json();
      if (autos) {
        return autos;
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async createCar(
    name: string,
    color: string
  ): Promise<IResponseCreateCar | undefined> {
    console.log(name);
    try {
      const response = await fetch("http://127.0.0.1:3000/garage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          color: color,
        }),
      });
      const res: Promise<
        IResponseCreateCar | undefined
      > = await response.json();
      if (res) {
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteCar(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: "DELETE",
      });
      const res = await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  public async startCarEngine(
    id: number
  ): Promise<IResponseCarEngine | undefined> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine/?id=${id}&status=started`,
        {
          method: "PATCH",
        }
      );
      const res: Promise<
        IResponseCarEngine | undefined
      > = await response.json();
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  public async startEngineDrive(
    id: number
  ): Promise<IResponseEngineDrive | undefined> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine/?id=${id}&status=drive`,
        {
          method: "PATCH",
        }
      );
      if (response.status === 500) {
        throw new Error(
          "Car has been stopped suddenly. It's engine was broken down."
        );
      }

      const res: Promise<
        IResponseEngineDrive | undefined
      > = await response.json();
      if (res) {
        return res;
      }
    } catch (e) {
      this.stopCarEngine(id);
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  public async stopCarEngine(id: number): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine/?id=${id}&status=stopped`,
        {
          method: "PATCH",
        }
      );
      const res = await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  public async updateCar(
    id: number,
    name: string,
    color: string
  ): Promise<IResponseUpdateCar | undefined> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          color: color,
        }),
      });
      const res: Promise<
        IResponseUpdateCar | undefined
      > = await response.json();
      if (res) {
        return res;
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  public async startEngine(id: number): Promise<number | undefined> {
    const responseCarEngine:
      | IResponseCarEngine
      | undefined = await this.startCarEngine(id);
    if (!responseCarEngine) {
      return;
    }

    return responseCarEngine.distance / responseCarEngine.velocity;
  }

  public async startDrive(id: number): Promise<boolean> {
    const response:
      | IResponseEngineDrive
      | undefined = await this.startEngineDrive(id);
    return !!response;
  }

  public async startCar(
    auto: IAutos,
    btnRun: HTMLButtonElement,
    btnStop: HTMLButtonElement,
    setWinner?: (id: number, name: string, time: number) => void
  ): Promise<void> {
    const responseCarEngine:
      | IResponseCarEngine
      | undefined = await this.startCarEngine(auto.id);
    if (!responseCarEngine) {
      return;
    }
    btnRun.disabled = true;

    let timeoutID;
    const imgAuto: HTMLElement | null = document.getElementById(
      auto.id.toString()
    );
    if (imgAuto) {
      imgAuto.classList.add("animation-active");
      imgAuto.style.animationDuration =
        responseCarEngine.distance / responseCarEngine.velocity / 1000 + "s";
      const durationAnimation: number =
        responseCarEngine.distance / responseCarEngine.velocity;

      if (setWinner) {
        timeoutID = setTimeout(() => {
          console.log(auto.name);

          setWinner(
            auto.id,
            auto.name,
            Math.round(durationAnimation / 10) / 100
          );
        }, durationAnimation);
      }
    }
    const responseEngineDrive:
      | IResponseEngineDrive
      | undefined = await this.startEngineDrive(auto.id);
    if (!responseEngineDrive) {
      clearTimeout(timeoutID);

      if (imgAuto) {
        const left: number = imgAuto.getBoundingClientRect().left;
        imgAuto.style.left = left + "px";
        imgAuto.classList.remove("animation-active");
      }
    }
  }

  public async stopCar(
    auto: IAutos,
    btnRun: HTMLButtonElement,
    btnStop: HTMLButtonElement
  ): Promise<void> {
    await this.stopCarEngine(auto.id);
    const imgAuto = document.getElementById(auto.id.toString());
    if (imgAuto) {
      imgAuto.classList.remove("animation-active");
      imgAuto.style.left = 5 + "%";
    }
    btnRun.disabled = false;
    btnStop.disabled = true;
  }

  public async createWinner(
    id: number,
    time: number
  ): Promise<IWinner | undefined> {
    const winners: IWinner[] | undefined = await this.getWinnersAll();

    if (!winners) {
      return;
    }
    const winner: IWinner | undefined = winners.find((winner) => {
      return winner.id === id;
    });
    if (winner) {
      const newTime: number = winner.time > time ? winner.time : time;
      const newCountWins: number = winner.wins + 1;
      this.updateWinner(winner.id, newCountWins, newTime);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:3000/winners`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          wins: 1,
          time: time,
        }),
      });
      const res: Promise<IWinner> | undefined = await response.json();
      if (res) {
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async getWinnersAll(): Promise<IWinner[] | undefined> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners`, {
        method: "GET",
      });
      const res: IWinner[] | undefined = await response.json();

      if (res) {
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async getWinners(
    page: number,
    limit: number,
    sort: string,
    direction: string
  ): Promise<IWinnersData | undefined> {
    try {
      const sortParams: string = sort
        ? `&_sort=${sort}&_order=${direction}`
        : "";
      const response = await fetch(
        `http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}${sortParams}`,
        {}
      );
      const countWinners: string | null = response.headers.get("X-Total-Count");
      const winners: IWinner[] = await response.json();
      return { winners: winners, countWinners: Number(countWinners) };
    } catch (e) {
      console.log(e);
    }
  }

  public async updateWinner(
    id: number,
    wins: number,
    time: number
  ): Promise<IWinner | undefined> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wins: wins,
          time: time,
        }),
      });
      const res: IWinner | undefined = await response.json();
      if (res) {
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteWinner(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: "DELETE",
      });
      const res = await response.json();
    } catch (e) {
      console.log(e);
    }
  }
}

export default Controller;
