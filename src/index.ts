import "./sass/style.scss";
import Router from "./utils/Routing";
import MainPage from "./pages/main";
import WinnersPage from "./pages/winners";
import Header from "./components/header";

import { IRout, IMainPage, IHeader, IWinnersPage } from "./types/index";

const mainPage: IMainPage = new MainPage();
const winnersPage: IWinnersPage = new WinnersPage();

const header: IHeader = new Header();

// router start a
// список страниц с колбеками: путь и что делать
const routs: IRout[] = [
  {
    path: "",
    cb: mainPage.draw.bind(mainPage),
  },
  {
    path: "winners",
    cb: winnersPage.drawPage.bind(winnersPage),
  },
  // {
  //   path: "products/:id",
  //   cb: (id) => {
  //     productPage.draw(id);
  //   },
  // },
];
//объект роутера
const router = new Router(routs, mainPage.draw);
header.drawElements(router);
// mainPage.draw();
// проврка какая скйчас страница
mainPage.router = router;
router.init();
