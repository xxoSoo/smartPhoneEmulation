export default class {
  constructor() {
    this.initialState = ` 
        <div id = "app-router-container">
          <a
            id="app-alaram"
            class="apps-items"
            draggable="true"
            href="/alaram"
            app-link
          >
            알람
          </a>
          <a
            id="app-memo"
            class="apps-items"
            draggable="true"
            href="/memo"
            app-link
          >
            메모
          </a>
          <a
            id="app-gallery"
            class="apps-items"
            draggable="true"
            href="/gallery"
            app-link
          >
            사진
          </a>
          <a id="app-1" class="apps-items empty-space"></a>
          <a id="app-2" class="apps-items empty-space"></a>
          <a id="app-3" class="apps-items empty-space"></a>
          <a id="app-4" class="apps-items empty-space"></a>
          <a id="app-5" class="apps-items empty-space"></a>
          <a id="app-6" class="apps-items empty-space"></a>
          <a id="app-7" class="apps-items empty-space"></a>
          <a id="app-8" class="apps-items empty-space"></a>
          <a id="app-9" class="apps-items empty-space"></a>
          <a id="app-10" class="apps-items empty-space"></a>
          <a id="app-11" class="apps-items empty-space"></a>
          <a id="app-12" class="apps-items empty-space"></a>
          <a id="app-13" class="apps-items empty-space"></a>
          </div>
          `;

    this.content = document.querySelector("#app-contents-container").innerHTML =
      localStorage.getItem("appContainerStatus");
  }

  getHtml = () => {
    return this.content || this.initialState;
  };
}
