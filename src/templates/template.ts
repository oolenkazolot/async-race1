class Template {
  public createBtn(
    myClassOne: string,
    myClassTwo: string,
    content: string,
    myClassThree?: string
  ): HTMLButtonElement {
    const btnEl: HTMLButtonElement = document.createElement("button");
    btnEl.classList.add(myClassOne);
    btnEl.classList.add(myClassTwo);
    if (myClassThree) {
      btnEl.classList.add(myClassThree);
    }
    btnEl.textContent = content;
    return btnEl;
  }

  public createSpan(myClass: string, content: string): HTMLElement {
    const span: HTMLElement = document.createElement("span");
    span.classList.add(myClass);
    span.textContent = content;
    return span;
  }
}

export default Template;
