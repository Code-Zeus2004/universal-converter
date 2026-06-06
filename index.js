const form = document.getElementById("form");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("From");
const toSelect = document.getElementById("To");
const result = document.getElementById("result");



document.getElementById("header").textContent =
  '"OmniConvert - Time Converter";'


 function updateHeader() {
   const amount = amountInput.value || "0";
   const From = fromSelect.value || " ..... ";
   const To = toSelect.value || " ..... ";
   header.textContent = `Convert ${amount} ${From} to ${To}`;
  }
  amountInput.addEventListener("input", updateHeader);
  fromSelect.addEventListener("change", updateHeader);
  toSelect.addEventListener("change", updateHeader);


const timeUnits = {
  nanosecond: 0.000000001,
  microsecond: 0.000001,
  milisecond: 0.001,
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2629800,
  year: 31557600,
  decade: 315576000,
  century: 3155760000,
  millennium: 31557600000
};

function secondsToHMS(totalSeconds) {

  totalSeconds = Math.floor(totalSeconds);

  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


function convertTime(value, fromUnit, toUnit) {

  const seconds = value * timeUnits[fromUnit];

  return seconds / timeUnits[toUnit];
}




form.addEventListener("submit", function (e) {

  e.preventDefault();

  const amount = parseFloat(amountInput.value);

  const from = fromSelect.value;

  const to = toSelect.value;


 
  if (isNaN(amount)) {

    result.innerHTML =
      "<span class='text-red-500'>Please enter a valid number.</span>";

    return;
  }




  if (from === to) {

    result.textContent =
      `${amount} ${from}${amount !== 1 ? "s" : ""}`;

    return;
  }


  

  if (to === "hrsminutesseconds") {

    if (from === "hrsminutesseconds") {

      result.textContent = amount;

      return;
    }

    const totalSeconds =
      amount * timeUnits[from];

    result.textContent =
      secondsToHMS(totalSeconds);

    return;
  }



  if (from === "hrsminutesseconds") {

    result.innerHTML =
      "<span class='text-red-500'>Hours:Minutes:Seconds can only be used as a destination unit.</span>";

    return;
  }


  

  const answer =
    convertTime(amount, from, to);

  result.innerHTML = `
    <span class="font-semibold">
      ${amount}
    </span>
    ${from}
    =
    <span class="text-blue-600 font-bold">
      ${parseFloat(answer.toFixed(8))}
    </span>
    ${to}
  `;
});

const swapBtn = document.getElementById("swapBtn");

swapBtn.addEventListener("click", function (e) {

  e.preventDefault();

  const temp = fromSelect.value;

  fromSelect.value = toSelect.value;

  toSelect.value = temp;

});