export default class {
  constructor() {
    this.optionTimeParsing = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  }

  updateClock = () => {
    let currentTime = new Date();
    document.querySelector("#current-time").textContent =
      currentTime.toLocaleString("ko-KR", this.optionTimeParsing);
    setTimeout(this.updateClock, 1000);
  };
}
