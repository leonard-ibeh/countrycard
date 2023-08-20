"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} million people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
          </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML("beforeend", msg);
  countriesContainer.style.opacity = 1;
};
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
/*const whereAmI = function (lat, lon) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=ac5318f3464340739468959070a59218`,
    requestOptions
  )
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(
        `You are in ${data.results[0].state}, ${data.results[0].country}`
      );
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.results[0].country}`
      );
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => console.error(`${err.message}!!`));
};
*/
// whereAmI(6.45003087165378, 3.394913656136737);
// whereAmI(11.45003087165378, 4.394913656136737);
// whereAmI(23.45003087165378, 8.394913656136737);

/*const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery Draw is Happening");
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You WIN !!!");
    } else {
      reject(new Error("You LOST your Money!!!"));
    }
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log("I waited for 1 second");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 3 seconds");
    return wait(1);
  })
  .then(() => console.log("I waited for 4 seconds"));

Promise.resolve("abc").then((x) => console.log(x));
Promise.reject(new Error("Problem!!!")).catch((x) => console.error(x));

// === Working with geolocation Api===
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then((pos) => console.log(pos));

var requestOptions = {
  method: "GET",
};
const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;
      return fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=ac5318f3464340739468959070a59218`,
        requestOptions
      );
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(
        `You are in ${data.results[0].state}, ${data.results[0].country}`
      );
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.results[0].country}`
      );
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => console.error(`${err.message}!!`));
};

btn.addEventListener("click", whereAmI);
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
var requestOptions = {
  method: "GET",
};

const whereAmI = async function () {
  try {
    // Geolocaation
    const pos = await getPosition();
    const { latitude: lat, longitude: lon } = pos.coords;

    // Reverse Geolocation
    const resGeo = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=ac5318f3464340739468959070a59218`,
      requestOptions
    );
    if (!resGeo.ok) throw new Error("Problem getting location data");
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.results[0].country}`
    );
    if (!resGeo.ok) throw new Error("Problem getting country");
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.results[0].city}, ${dataGeo.results[0].country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong !!! ${err.message}`);

    // Reject promise return from async function
    throw err;
  }
};

/*whereAmI()
  .then((city) => console.log(`2:${city}`))
  .catch((err) => console.error(`2:${err.message} !!!`))
  .finally(() => console.log("3: Finished getting location"));
console.log("FIRST");
*/
/*
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2 ${err.message} !!!`);
  }
  console.log("3: Finished getting locattion");
})();

const get3Countries = async function (C1, C2, C3) {
  try {
    const [data1] = await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${C1}`
    );
    const [data2] = await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${C2}`
    );
    const [data3] = await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${C3}`
    );

    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${C1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${C2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${C3}`),
    ]);
    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries("canada", "portugal", "nigeria");
*/
// Promsie.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long"));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://countries-api-836d.onrender.com/countries/name/nigeria`),
  timeout(5),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
]).then((res) => console.log(res[0]));

// Promise.any [ES2021]

Promise.any([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolved("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
