const formSearch = document.querySelector(".form-search");
const inputCitiesFrom = document.querySelector(".input__cities-from");
const downdropCitiesFrom = document.querySelector(".dropdown__cities-from");
const inputCitiesTo = document.querySelector(".input__cities-to");
const downdropCitiesTo = document.querySelector(".dropdown__cities-to");
const inputDateDepart = document.querySelector(".input__date-depart");
const cheapestTicket = document.getElementById("cheapest-ticket");
const otherCheapTickets = document.getElementById("other-cheap-tickets");

const API_KEY = "aa64af6a9c1b115421ef84e0cdaea3ad";
const citiesApi = `http://api.travelpayouts.com/data/ru/cities.json`;
const proxy = `https://cors-anywhere.herokuapp.com/`;
const calendar = "http://min-prices.aviasales.ru/calendar_preload";
let city = [];

const getData = (url, callback) => {
  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("readystatechange", () => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      callback(request.response);
    }
  });

  request.send();
};

const showCity = (input, list) => {
  list.textContent = "";

  if (input.value !== "") {
    const filterCity = city.filter(item => {
      const fixItem = item.name.toLowerCase();

      return fixItem.startsWith(input.value.toLowerCase());
    });

    filterCity.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.textContent = item.name;
      list.append(li);
    });
  }
};

const selectCity = (event, input, list) => {
  const target = event.target;
  list.textContent = "";
  if (target.tagName.toLowerCase() === "li") {
    input.value = target.textContent;
  }
};

const createCard = data => {
  const ticket = document.createElement("article");
  ticket.classList.add("ticket");
  console.log(data);

  let deep = "";

  if (data) {
    deep = `<h3 class="agent">${data.gate}</h3>
    <div class="ticket__wrapper">
      <div class="left-side">
        <a href="https://www.aviasales.ru/search/SVX2905KGD1" class="button button__buy">Купить ${data.value}</a>
      </div>
      <div class="right-side">
        <div class="block-left">
          <div class="city__from">Вылет из города
            <span class="city__name">${data.origin}</span>
          </div>
          <div class="date">${data.depart_date}</div>
        </div>
    
        <div class="block-right">
          <div class="changes">Без пересадок</div>
          <div class="city__to">Город назначения:
            <span class="city__name">${data.destination}</span>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    deep = "<h3>There is no ticket</h3>";
  }
  ticket.insertAdjacentHTML("afterbegin", deep);

  return ticket;
};

const renderCheapDay = cheapTicket => {
  const ticket = createCard(cheapTicket[0]);
  console.log(cheapTicket);

  cheapestTicket.append(ticket);
};

const renderCheapYear = cheapTickets => {
  cheapTickets.sort((a, b) => a.value - b.value);

  console.log(cheapTickets);
};

const renderCheap = (data, date) => {
  const cheapTicketYear = JSON.parse(data).best_prices;

  const cheapTicketDay = cheapTicketYear.filter(item => {
    return item.depart_date === date;
  });
  console.log(cheapTicketDay);

  renderCheapDay(cheapTicketDay);
  renderCheapYear(cheapTicketYear);
};

inputCitiesFrom.addEventListener("input", () => {
  showCity(inputCitiesFrom, downdropCitiesFrom);
});

inputCitiesTo.addEventListener("input", () => {
  showCity(inputCitiesTo, downdropCitiesTo);
});

downdropCitiesFrom.addEventListener("click", event => {
  selectCity(event, inputCitiesFrom, downdropCitiesFrom);
});

downdropCitiesTo.addEventListener("click", event => {
  selectCity(event, inputCitiesTo, downdropCitiesTo);
});

formSearch.addEventListener("submit", event => {
  event.preventDefault();

  const cityFrom = city.find(item => {
    return inputCitiesFrom.value === item.name;
  });

  const cityTo = city.find(item => {
    return inputCitiesTo.value === item.name;
  });

  const formData = {
    from: cityFrom,
    to: cityTo,
    when: inputDateDepart.value
  };

  const requestData = `?depart_date=${formData.when}&origin=${formData.from.code}&destination=${formData.to.code}&one_way=true`;

  getData(proxy + calendar + requestData, data => {
    renderCheap(data, formData.when);
  });
});

getData(proxy + citiesApi, data => {
  city = JSON.parse(data).filter(item => {
    return item.name;
  });

  city.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }

    return 0;
  });
});
