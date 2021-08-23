export default class {
  constructor() {
    this.currentMemoId =
      localStorage.getItem("memoId") !== null
        ? localStorage.getItem("memoId")
        : 0;
    this.currentReading = null;
    this.inputBarCreated = false;
    //JSON.parse

    this.memos = JSON.parse(localStorage.getItem("data-memos")) || [];
    this.input = "";
    const appContentsContainer = document.querySelector(
      "#app-contents-container"
    );
    const headerLeftButton = document.querySelector("#button-left");
    const headerRightButton = document.querySelector("#button-right");
    headerLeftButton.textContent = "BACK";
    headerRightButton.textContent = "NEW";

    headerLeftButton.style.visibility = "visible";
    headerRightButton.style.visibility = "visible";

    headerLeftButton.onclick = () => {
      history.back();
      headerLeftButton.style.visibility = "hidden";
      headerRightButton.style.visibility = "hidden";
    };

    headerRightButton.onclick = () => {
      if (this.inputBarCreated === true) return;

      this.inputBarCreated = true;
      const memoInput = document.createElement("input");
      memoInput.id = "memo-input";
      memoInput.type = "text";
      memoInput.placeholder = "메모를 입력하세요.";
      memoInput.value = this.input;
      memoInput.onchange = (event) => {
        this.setInput(event.target.value);
      };
      memoInput.onkeyup = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          this.insertMemo(this.input);
        }
      };

      appContentsContainer.prepend(memoInput);
    };
  }
  processOverflow(text) {
    if (text.length >= 49) return text.substr(0, 48) + "...more";

    return text;
  }

  setInput(input) {
    this.input = input;
  }

  insertMemo(input) {
    let is_overflow = input.length >= 49;
    let newlyMemo = {
      id: this.currentMemoId++,
      text: input,
    };
    localStorage.setItem("memoId", this.currentMemoId);
    this.memos = this.memos.concat(newlyMemo);
    localStorage.setItem("data-memos", JSON.stringify(this.memos));

    this.setInput("");
    const memoInput = document.querySelector("#memo-input");
    memoInput.value = this.input;

    const appContentsContainer = document.querySelector("#memo-container");
    const new_li = document.createElement("li");
    new_li.className = "memo-paper";
    new_li.textContent = this.processOverflow(newlyMemo.text);
    new_li.key = newlyMemo.id;

    new_li.onclick = (event) => {
      if (
        event.target.classList.contains("summarized") &&
        !event.target.classList.contains("reading")
      ) {
        if (this.currentReading) {
          this.currentReading.classList.toggle("reading");
          this.currentReading.classList.add("summarized");
          this.currentReading.textContent = this.processOverflow(
            this.currentReading.textContent
          );
        }
        event.target.classList.toggle("reading");
        event.target.classList.remove("summarized");
        event.target.textContent = this.memos[event.target.key].text;
        this.currentReading = event.target;
      } else if (event.target.classList.contains("reading")) {
        event.target.textContent = this.processOverflow(
          this.processOverflow(this.currentReading.textContent)
        );
        event.target.classList.toggle("reading");
        event.target.classList.toggle("summarized");
        this.currentReading = null;
      }
    };

    if (is_overflow) new_li.classList.add("summarized");

    appContentsContainer.appendChild(new_li);
  }

  getHtml() {
    const renderedMemo = this.memos.map((memo) => {
      let is_overflow = memo.text.length >= 49;
      const new_li = document.createElement("li");
      new_li.textContent = this.processOverflow(memo.text);

      new_li.className = "memo-paper";
      new_li.setAttribute("key", memo.id);
      if (is_overflow) new_li.classList.add("summarized");

      return new_li.outerHTML;
    });
    return `<div id = "memo-container">
    ${renderedMemo.join(" ")}
    </div>`;
  }

  assignEventListener() {
    const DOMmemos = document.querySelectorAll(".memo-paper");

    for (let memo of DOMmemos) {
      memo.onclick = (event) => {
        if (
          event.target.classList.contains("summarized") &&
          !event.target.classList.contains("reading")
        ) {
          if (this.currentReading) {
            this.currentReading.classList.toggle("reading");
            this.currentReading.classList.add("summarized");
            this.currentReading.textContent = this.processOverflow(
              this.currentReading.textContent
            );
          }
          event.target.classList.toggle("reading");
          event.target.classList.remove("summarized");

          event.target.textContent =
            this.memos[event.target.getAttribute("key")].text;
          this.currentReading = event.target;
        } else if (event.target.classList.contains("reading")) {
          /* 읽고 있던 중이라면 읽던 것을 다시 축약시킴. */
          event.target.textContent = this.processOverflow(
            event.target.textContent
          );
          event.target.classList.toggle("reading");
          event.target.classList.toggle("summarized");
          this.currentReading = null;
        }
      };
    }
  }
}
