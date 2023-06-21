import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


const startButton = document.querySelector("[data-start]");
startButton.disabled = true
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = new Date(selectedDates[0])
      if (!selectedDate || selectedDate < new Date()) {
        startButton.disabled = true
        Notiflix.Notify.warning("Please choose a date in the future");
        return;
      }
    startButton.disabled = false
  },
};

const datetimePicker = document.getElementById("datetime-picker");
flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

// const startButton = document.querySelector("[data-start]");
const daysField = document.querySelector("[data-days]");
const hoursField = document.querySelector("[data-hours]");
const minutesField = document.querySelector("[data-minutes]");
const secondsField = document.querySelector("[data-seconds]");

let countdownIntervalId;

startButton.addEventListener("click", () => {
  const selectedDates = flatpickr.parseDate(datetimePicker.value, "Y-m-d H:i");
/*  if (!selectedDates || selectedDates < new Date()) {
    Notiflix.Notify.warning("Please choose a date in the future");
    return;
  }*/

  const targetTimestamp = selectedDates.getTime();

  countdownIntervalId = setInterval(() => {
    const currentTimestamp = Date.now();
    const remainingTime = targetTimestamp - currentTimestamp;

    if (remainingTime <= 0) {
      clearInterval(countdownIntervalId);
      displayTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.success("Countdown has finished");
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    displayTime({ days, hours, minutes, seconds });
  }, 1000);
});

function displayTime({ days, hours, minutes, seconds }) {
  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}
