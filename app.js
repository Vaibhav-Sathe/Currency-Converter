const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
      for (currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            select.append(newOption);
            if(select.name === "from" && currCode === "USD") {
                  newOption.selected = true;
            }
            else if (select.name === "to" && currCode === "INR") {
                  newOption.selected = true;
            }
      }
      select.addEventListener("change", (evt) => {
            updateFlags(evt.target);
      });
}

const updateFlags = (element) => {
      let currCode = element.value;
      // console.log(currCode);
      let countryCode = countryList[currCode];
      let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
      let img = element.parentElement.querySelector("img");
      img.src = newScr;
}

btn.addEventListener("click", async (evt) => {
      evt.preventDefault();
      let amount = document.querySelector(".amount input");
      let amtVal = amount.value;
      if(amtVal === "" || amtVal < 1 ) {
            amtVal = 1;
            amount.value = "1";
      }
      // console.log(fromCurr.value, toCurr.value);
      const URL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
      let response = await fetch(URL);
      let data = await response.json();
      let rate = data[toCurr.value.toLowerCase()];
      console.log(rate )
      let finalAmount = amtVal * rate;
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

