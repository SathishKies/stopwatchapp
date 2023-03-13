class Timer {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.ctrlBtn = this.element.querySelector(".start-stop");
    this.resetBtn = this.element.querySelector(".reset");
    this.hourEl = this.element.querySelector(".hour");
    this.minuteEl = this.element.querySelector(".minute");
    this.secondEl = this.element.querySelector(".second");
    this.timerId = null;
    this.isRunning = false;
    this.hr = this.min = this.sec = 0;
    this.startTime = null;
    this.elapsedTime = 0;
    
    this.ctrlBtn.addEventListener("click", () => {
      if (this.isRunning === false) {
        this.start();
      } else {
        this.stop();
      }
    });
    this.resetBtn.addEventListener("click", () => this.reset());
    
    this.retrieveTimerValues();
    this.updateDisplay();
  }
  
  start() {
    this.isRunning = true;
    this.ctrlBtn.innerText = "Stop";
    this.ctrlBtn.classList.add("active");
    this.startTime = performance.now() - this.elapsedTime;
    this.timerId = setInterval(() => {
      this.elapsedTime = performance.now() - this.startTime;
      this.hr = Math.floor(this.elapsedTime / 3600000);
      this.min = Math.floor((this.elapsedTime / 60000) % 60);
      this.sec = Math.floor((this.elapsedTime / 1000) % 60);
      this.storeTimerValues();
      this.updateDisplay();
    }, 10);
  }
  
  stop() {
    this.isRunning = false;
    if (this.timerId) {
      this.ctrlBtn.innerText = "Start";
      this.ctrlBtn.classList.remove("active");
      clearInterval(this.timerId);
    }
  }
  
  reset() {
    this.isRunning = false;
    if (confirm("Confirm reset timer?")) {
      this.ctrlBtn.innerText = "Start";
      this.ctrlBtn.classList.remove("active");
      clearInterval(this.timerId);
      this.elapsedTime = 0;
      this.hr = this.min = this.sec = 0;
      this.storeTimerValues();
      this.updateDisplay();
    }
  }
  
  storeTimerValues() {
    const timerValues = { hr: this.hr, min: this.min, sec: this.sec, elapsed: this.elapsedTime };
    localStorage.setItem(`timerValues_${this.element.dataset.id}`, JSON.stringify(timerValues));
  }
  
  retrieveTimerValues() {
    if (localStorage.getItem(`timerValues_${this.element.dataset.id}`)) {
      const storedValues = JSON.parse(localStorage.getItem(`timerValues_${this.element.dataset.id}`));
      this.hr = storedValues.hr;
      this.min = storedValues.min;
      this.sec = storedValues.sec;
      this.elapsedTime = storedValues.elapsed;
    }
  }
  
  updateDisplay() {
    this.hourEl.innerText = this.hr.toString().padStart(2, "0");
    this.minuteEl.innerText = this.min.toString().padStart(2, "0");
    this.secondEl.innerText = this.sec.toString().padStart(2, "0");
  }
}

const timer1 = new Timer("#timer1");
const timer2 = new Timer("#timer2");