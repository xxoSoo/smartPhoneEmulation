function swapElements(obj1, obj2) {
  var temp = document.createElement("div");
  obj1.parentNode.insertBefore(temp, obj1);
  obj2.parentNode.insertBefore(obj1, obj2);
  temp.parentNode.insertBefore(obj2, temp);
  temp.parentNode.removeChild(temp);
}
/* LOAD */
export function makeDraggable() {
  const appsItems = document.querySelectorAll(".apps-items");

  for (let [index, elements] of appsItems.entries()) {
    elements.ondragstart = (event) => {
      event.dataTransfer.setData("dragged", index);
      const emptySpace = document.querySelectorAll(".empty-space");
      for (let empty of emptySpace) {
        empty.style.visibility = "visible";
        empty.style.background = "none";
      }
    };

    elements.ondragover = (event) => {
      event.preventDefault();
    };

    elements.ondrop = (event) => {
      let dragged_index = event.dataTransfer.getData("dragged");
      swapElements(appsItems[dragged_index], event.target);

      const emptySpace = document.querySelectorAll(".empty-space");

      for (let empty of emptySpace) {
        empty.style.visibility = "hidden";
        empty.style.background = "white";
      }

      localStorage.setItem(
        "appContainerStatus",
        document.querySelector("#app-contents-container").innerHTML
      );
    };
  }
}
