export default class {
  constructor() {
    this.alaramSettingBarCreated = false;
    this.alaramSettingStatus = {
      id:
        localStorage.getItem("alaramId") !== null
          ? localStorage.getItem("alaramId")
          : 0,
      ampm: "오전",
      hour: "00",
      minute: "00",
    };
    this.alaramArray = JSON.parse(localStorage.getItem("data-alarams")) || [];

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
      if (this.alaramSettingBarCreated === true) return;

      const alaramSettingBar = document.querySelector("#alaram-setting-bar");
      alaramSettingBar.style.visibility = "visible";
    };
  }

  setAlaramSetting = (settingObj) => {
    this.alaramSettingStatus = settingObj;
  };

  setAlaramList = (alaramObj) => {
    this.alaramArray = alaramObj;
    localStorage.setItem("data-alarams", JSON.stringify(this.alaramArray));
  };

  onChangeTimer = (event) => {
    const clickedsParent = event.target.parentNode.parentNode;
    const targetToChange = clickedsParent.querySelector("span");
    const is_up = event.target.classList.contains("up");
    const offset = is_up ? 1 : -1;

    switch (clickedsParent.id) {
      case "am-pm": {
        this.setAlaramSetting({
          ...this.alaramSettingStatus,
          ampm: this.alaramSettingStatus.ampm === "오전" ? "오후" : "오전",
        });
        targetToChange.textContent = this.alaramSettingStatus.ampm;
        break;
      }

      case "hour": {
        const parsedHour = Number(this.alaramSettingStatus.hour) + offset;
        let nextHour;

        if (parsedHour >= 12) nextHour = "01";
        else if (parsedHour <= 0) nextHour = "12";
        else {
          if (parsedHour < 10) {
            let tmpHour = "0" + parsedHour.toString();
            nextHour = tmpHour;
          } else nextHour = parsedHour;
        }

        this.setAlaramSetting({
          ...this.alaramSettingStatus,
          hour: nextHour,
        });

        targetToChange.textContent = this.alaramSettingStatus.hour;
        break;
      }

      case "minute": {
        const parsedMinute = Number(this.alaramSettingStatus.minute) + offset;
        let nextMinute;

        if (parsedMinute >= 60) nextMinute = "00";
        else if (parsedMinute < 0) nextMinute = "59";
        else {
          if (parsedMinute < 10) {
            let tmpMinute = "0" + parsedMinute.toString();
            nextMinute = tmpMinute;
          } else nextMinute = parsedMinute;
        }

        this.setAlaramSetting({
          ...this.alaramSettingStatus,
          minute: nextMinute,
        });

        targetToChange.textContent = this.alaramSettingStatus.minute;
        break;
      }

      default:
        break;
    }
  };

  onInsertAlaram = () => {
    const currentTime = new Date();
    let currentYear = currentTime.getFullYear();
    let currentMonth = currentTime.getMonth();
    let currentDay = currentTime.getDate();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();

    let {
      ampm: settingAmPm,
      hour: settingHour,
      minute: settingMinute,
    } = this.alaramSettingStatus;

    settingHour = parseInt(settingHour);
    settingMinute = parseInt(settingMinute);

    if (settingAmPm === "오후" && settingHour >= 1 && settingHour < 12) {
      settingHour += 12;
    }

    if (settingAmPm === "오전" && settingHour == 12) settingHour = 0;

    // H 혹은 M이 뒤인 경우.

    // 익일로 넘어가는 경우
    if (currentHour >= settingHour && currentMinute > settingMinute) {
      currentDay += 1;
    }
    /*  */
    const settingTimeVal = new Date(
      currentYear,
      currentMonth,
      currentDay,
      settingHour,
      settingMinute
    ).valueOf();

    const alaramTimeLeft = settingTimeVal - currentTime;

    const newAlaram = {
      ...this.alaramSettingStatus,
      id: this.alaramSettingStatus.id++,
      settingTimeVal,
    };
    localStorage.setItem("alaramId", this.alaramSettingStatus.id);
    this.setAlaramList(this.alaramArray.concat(newAlaram));

    /* makes alaram */
    setTimeout(() => {
      alert(`${newAlaram.hour}시 ${newAlaram.minute}분이 되었습니다!`);
      this.deleteAlaramItem(newAlaram.id, false);
    }, alaramTimeLeft);

    this.addNewAlaramItem(newAlaram);
  };

  addNewAlaramItem = (newAlaram) => {
    const newAlaramItem = document.createElement("li");
    newAlaramItem.className = "alaram-item";
    newAlaramItem.key = newAlaram.id;

    const timeInfo = document.createElement("span");
    timeInfo.textContent =
      newAlaram.ampm + " " + newAlaram.hour + "시 " + newAlaram.minute + "분";

    const deleteButton = document.createElement("button");
    deleteButton.className = "alaram-delete-button";
    deleteButton.textContent = "삭제";
    deleteButton.onclick = this.onClickRemoveAlaramButton;

    newAlaramItem.appendChild(timeInfo);
    newAlaramItem.appendChild(deleteButton);
    document.querySelector("#alaram-list").appendChild(newAlaramItem);
  };

  onClickRemoveAlaramButton = (event) => {
    const selectedAlaramItem = event.target.parentNode;
    const selectedId = selectedAlaramItem.key;

    this.deleteAlaramItem(selectedId, true);
    selectedAlaramItem.remove();
  };

  deleteAlaramItem = (selectedId, updateDone) => {
    const nextAlaramArray = this.alaramArray.filter(
      (alaramItem) => alaramItem.id !== selectedId
    );
    this.setAlaramList(nextAlaramArray);

    if (updateDone) return;
    try {
      const selectedAlaramItem = Array.from(
        document.querySelectorAll(".alaram-item")
      ).find((alaramItem) => alaramItem.key === selectedId);

      selectedAlaramItem.remove();
    } catch (error) {
      console.log("current page is not alaram page");
    }
  };

  renderAlaramList = () => {
    const AlaramList = this.alaramArray;
    for (let AlaramItem of AlaramList) {
      this.addNewAlaramItem(AlaramItem);
    }
  };

  alaramChecker = () => {
    if (this.alaramArray !== null) {
      let cleanedAlaramArr = this.alaramArray;

      cleanedAlaramArr = cleanedAlaramArr.filter((alaramItem) => {
        let currentTime = new Date().valueOf();
        let settedTimeVal = parseInt(alaramItem.settingTimeVal);
        if (settedTimeVal < currentTime) {
          return false;
        }

        setTimeout(() => {
          alert(`${alaramItem.hour}시 ${alaramItem.minute}분이 되었습니다!`);
          this.deleteAlaramItem(alaramItem.id, false);
        }, settedTimeVal - currentTime);
        return true;
      });
      this.setAlaramList(cleanedAlaramArr);
    }
  };

  getHtml() {
    return `
    <div id = "alaram-setting-bar">
      <div id = "am-pm" class = "alaram-setting-component">
        <span>오전</span>
        <div class = "up-down-button">
          <button class="up">△</button>
          <button class="down">▽</button>
        </div>
      </div>

      <div id = "hour" class = "alaram-setting-component">
        <span>00</span>
        <span>시</span>
        <div class = "up-down-button">
          <button class= "up">△</button>
          <button class= "down">▽</button>
        </div>
      </div>

      <div id = "minute" class = "alaram-setting-component">
        <span>00</span>
        <span>분</span>
        
        <div class = "up-down-button">
          <button class= "up">△</button>
          <button class= "down">▽</button>
        </div>
      </div>
      <div class = "dummy-div"></div>
      <button id = "alaram-add-button">저장</button>
    </div>
    <div id = "alaram-list">
    </div>
    `;
  }
}
