'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
//---------------------------------------------------------------------------------------------------

/*
const getCountryArticle = function (countryName) {
  //XML or AJAX call
  const urlEndpoint = `https://restcountries.com/v3.1/name/${countryName}`;
  const request = new XMLHttpRequest();
  request.open('GET', urlEndpoint);
  request.send();

  request.addEventListener('load', function () {
    const serverResponse = this.responseText;

    const [parsedCountryData] = JSON.parse(serverResponse);

    const {
      name: { common },
      flags: { svg },
      region,
      population,
      languages,
      currencies,
    } = parsedCountryData;

    const [language] = Object.values(languages);
    const [currencyData] = Object.values(currencies);
    const { name, symbol } = currencyData;

    // prettier-ignore
    const article = craftArticleElement(svg, common, region, population, language, name);
    countriesContainer.append(article);
    countriesContainer.style.opacity = 1;
  });
};
*/

const getCountryAndNeighbors = function (countryName) {
  //XML or AJAX call
  //Country 1 - Main
  const urlEndpoint = `https://restcountries.com/v3.1/name/${countryName}`;
  const request = new XMLHttpRequest();
  request.open('GET', urlEndpoint);
  request.send();

  request.addEventListener('load', function () {
    const serverResponseMainCountry = this.responseText;

    const [parsedCountryDataMainCountry] = JSON.parse(
      serverResponseMainCountry
    );

    const {
      name: { common },
      flags: { svg },
      region,
      population,
      languages,
      currencies,
    } = parsedCountryDataMainCountry;

    const [language] = Object.values(languages);
    const [currencyData] = Object.values(currencies);
    const { name, symbol } = currencyData;

    //Crafting Main Country
    // prettier-ignore
    const mainCountry = craftArticleElement(svg, common, region, population, language, name);

    countriesContainer.append(mainCountry);

    const neighborsCodesArr = parsedCountryDataMainCountry?.borders;

    //Selected country has no neighbors
    if (!neighborsCodesArr) {
      return;
    }

    const [neighbor1Code, neighbor2Code, ...neighborsRest] = neighborsCodesArr;

    //Crafting Neighbor countries
    const neighborCountry1 = new XMLHttpRequest();
    neighborCountry1.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${neighbor1Code}`
    );
    neighborCountry1.send();

    neighborCountry1.addEventListener('load', function () {
      const neighborCountry1Res = this.responseText;

      const [parsedNeighborCountry1] = JSON.parse(neighborCountry1Res);

      const {
        name: { common },
        flags: { svg },
        region,
        population,
        languages,
        currencies,
      } = parsedNeighborCountry1;

      const [language] = Object.values(languages);
      const [currencyData] = Object.values(currencies);
      const { name, symbol } = currencyData;

      const neighbor1 = craftArticleElement(
        svg,
        common,
        region,
        population,
        language,
        name
      );

      const neighborCountry2 = new XMLHttpRequest();
      neighborCountry2.open(
        'GET',
        `https://restcountries.com/v3.1/alpha/${neighbor2Code}`
      );
      neighborCountry2.send();

      neighborCountry2.addEventListener('load', function () {
        const neighborCountry2Res = this.responseText;

        const [parsedNeighborCountry2] = JSON.parse(neighborCountry2Res);

        const {
          name: { common },
          flags: { svg },
          region,
          population,
          languages,
          currencies,
        } = parsedNeighborCountry2;

        const [language] = Object.values(languages);
        const [currencyData] = Object.values(currencies);
        const { name, symbol } = currencyData;

        const neighbor2 = craftArticleElement(
          svg,
          common,
          region,
          population,
          language,
          name
        );

        countriesContainer.append(neighbor1, neighbor2);
      });
    });

    //To trigger transition animation and reveal elements
    countriesContainer.style.opacity = 1;
  });
};

function craftArticleElement(
  imgSource,
  countryName,
  countryRegion,
  population,
  language,
  currency
) {
  const article = document.createElement('article');
  article.classList.add('country');

  const img = document.createElement('img');
  img.classList.add('country__img');
  img.src = imgSource;

  const div = document.createElement('div');
  div.classList.add('country__data');

  const h3 = document.createElement('h3');
  h3.classList.add('country__name');
  h3.textContent = countryName;

  const h4 = document.createElement('h4');
  h4.classList.add('country__region');
  h4.textContent = countryRegion;

  const pCountryRowPopulation = document.createElement('p');
  pCountryRowPopulation.classList.add('country__row');
  const popNumber = (Number(population) / 1_000_000).toFixed(2);
  const spanPop = document.createElement('span');
  spanPop.textContent = '👫';
  pCountryRowPopulation.append(spanPop, `${popNumber} million`);

  const pCountryRowLang = document.createElement('p');
  pCountryRowLang.classList.add('country__row');
  const spanLang = document.createElement('span');
  spanLang.textContent = '🗣️';
  pCountryRowLang.append(spanPop, `${language}`);

  const pCountryRowCurrency = document.createElement('p');
  pCountryRowCurrency.classList.add('country__row');
  const spanCurrency = document.createElement('span');
  spanCurrency.textContent = '💰';
  pCountryRowCurrency.append(spanCurrency, `${currency}`);

  div.append(
    h3,
    h4,
    pCountryRowPopulation,
    pCountryRowLang,
    pCountryRowCurrency
  );

  article.append(img, div);

  return article;
}

getCountryAndNeighbors('bulgaria');

console.log('Works!');
