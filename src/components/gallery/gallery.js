export default class {
  constructor() {
    this.selectedPic = null;
    const headerLeftButton = document.querySelector("#button-left");
    headerLeftButton.textContent = "BACK";
    headerLeftButton.style.visibility = "visible";
    headerLeftButton.onclick = () => {
      history.back();
      headerLeftButton.style.visibility = "hidden";
    };
  }

  dispatchEventListener = () => {
    const pictures = document.querySelectorAll(".picture-list-item");
    for (let picture of pictures) {
      picture.onclick = (event) => {
        const nowPicture = document.querySelector("#picture-now");

        if (this.selectedPic === event.target) {
          event.target.classList.toggle("selected");
          this.selectedPic = null;
          nowPicture.src = "";
          nowPicture.style.visibility = "hidden";
          return;
        }

        if (this.selectedPic !== null) {
          this.selectedPic.classList.toggle("selected");
        }

        event.target.classList.toggle("selected");
        this.selectedPic = event.target;
        nowPicture.src = event.target.src;
        nowPicture.style.visibility = "visible";
      };
    }
  };

  loadImage(imageArray) {
    const pictureListItem = document.querySelectorAll(".picture-list-item");
    for (let i = 0; i < pictureListItem.length; i++) {
      pictureListItem[i].src = imageArray[i].src;
    }
  }

  getHtml() {
    return `
    <div id = "gallery-container">
      <div id = "picture-list">
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
        <div class = "picture-container">
          <img class = "picture-list-item" />
        </div>
      </div>
      <div id = "picture-now-contanier">
        <img id="picture-now"/>
      </div>
    </div>`;
  }
}
