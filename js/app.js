"use strict";

import { fetchData, url } from "./api.js";
import * as module from "./module.js";

function setWeatherBackground(condition) {
  const body = document.body;
  const backgroundMap = {
    Clear: 'https://media.istockphoto.com/id/1188520316/photo/landscape-of-the-clear-sky.jpg?s=612x612&w=0&k=20&c=Vnk6XNgITN9AkTk7KMSdYZG7Olk4rAIvJNpm_nCM7t0=',
    Clouds: 'data:image/jpeg;base64,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',
    Haze: 'data:image/jpeg;base64,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',
    Rain: 'data:image/jpeg;base64,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',
    Snow: 'https://th.bing.com/th/id/OIP.mjy1TlO9gHjynjWA5jZJSAHaNK?w=187&h=333&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
    Thunderstorm: 'https://www.bing.com/th/id/OIP.27LynYsKFDGqRbZfhNyLSwHaEK?w=266&h=180&c=7&r=0&o=5&pid=1.7',
    Mist: 'data:image/jpeg;base64,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'
  };

  const url = backgroundMap[condition] || backgroundMap['Clear'];
  body.style.transition = 'background-image 1s ease-in-out';
  body.style.backgroundImage = `url('${url}')`;
  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
  body.style.backgroundRepeat = 'no-repeat';
}

document.addEventListener( 'DOMContentLoaded', () =>
{
  const errorSection = document.querySelector( '[data-error-content]' );

  if ( window.matchMedia( '(hover: none) and (pointer: coarse)' ).matches )
  {
    const errorHeading = errorSection.querySelector( '.mobile-error' );

    const mobileMessage = document.createElement( 'h1' );
    mobileMessage.className = 'mobile-error-message';
    mobileMessage.textContent = 'ERROR: 170V380085';
    const lineBreak = document.createElement( 'br' );
    errorHeading.replaceWith( mobileMessage );
    mobileMessage.after( lineBreak );
  }

  const cursorDot = document.querySelector( '.cursor-dot' );
  const cursorOutline = document.querySelector( '.cursor-outline' );

  // Only initialize if we're not on a touch device
  if ( window.matchMedia( '(pointer: fine)' ).matches )
  {
    // Show cursors when mouse enters the window
    document.addEventListener( 'mouseenter', () =>
    {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    } );

    // Hide cursors when mouse leaves the window
    document.addEventListener( 'mouseleave', () =>
    {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    } );

    // Update cursor position
    document.addEventListener( 'mousemove', ( e ) =>
    {
      // Check if the mouse is within the viewport
      if ( e.clientY >= 0 &&
        e.clientX >= 0 &&
        e.clientX <= window.innerWidth &&
        e.clientY <= window.innerHeight )
      {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';

        // Update position
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
      } else
      {
        // Hide cursors if mouse is outside viewport
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
      }
    } );
  }
} );

/**
 * ------------------------------ Add event listener on multiple elements ------------------------------
 * @param {NodeList} elements Elements node array
 * @param {string} eventType Event Type e.g.; "click", "mouseover"
 * @param {Function} callback Callback function
 */
const addEventOnElements = function ( elements, eventType, callback )
{
  for ( const element of elements ) element.addEventListener( eventType, callback );
};

/**
 * ---------------------------------- Toggle Search in Mobile Devices -----------------------------------
 */
const searchView = document.querySelector( "[data-search-view]" );
const searchTogglers = document.querySelectorAll( "[data-search-toggler]" );

const toggleSearch = () => searchView.classList.toggle( "active" );
addEventOnElements( searchTogglers, "click", toggleSearch );

/**
 * ----------------------------------------- Search Integration ------------------------------------------
 */

const searchField = document.querySelector( "[data-search-field]" );
const searchResult = document.querySelector( "[data-search-result]" );

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener( "input", function ()
{
  searchTimeout ?? clearTimeout( searchTimeout );
  if ( !searchField.value )
  {
    searchResult.classList.remove( "active" );
    searchResult.innerHTML = "";
    searchField.classList.remove( "searching" );
  } else
  {
    searchField.classList.add( "searching" );
  }

  if ( searchField.value )
  {
    searchTimeout = setTimeout( () =>
    {
      fetchData( url.geo( searchField.value ), function ( locations )
      {
        searchField.classList.remove( "searching" );
        searchResult.classList.add( "active" );
        searchResult.innerHTML = `
          <ul class="view-list" data-search-list></ul>
        `;

        const /** {NodeList} | [] */ items = [];
        for ( const { name, lat, lon, country, state } of locations )
        {
          const searchItem = document.createElement( "li" );
          searchItem.classList.add( "view-item" );
          searchItem.innerHTML = `
            <span class="m-icon">location_on</span>
            <div>
              <p class="item-title">${ name }</p>
              <p class="label-2 item-subtitle">${ state || "" } ${ country }</p>
            </div>
            <a href="#/weather?lat=${ lat }&lon=${ lon }" class="item-link has-state" aria-label="${ name } weather" data-search-toggler></a>
          `;

          searchResult
            .querySelector( "[data-search-list]" )
            .appendChild( searchItem );
          items.push( searchItem.querySelector( "[data-search-toggler]" ) );
        }

        addEventOnElements( items, "click", function ()
        {
          toggleSearch();
          searchResult.classList.remove( "active" );
        } );
      } );
    }, searchTimeoutDuration );
  }
} );

const container = document.querySelector( "[data-container]" );
const loading = document.querySelector( "[data-loading]" );
const currentLocationBtn = document.querySelector(
  "[data-current-location-btn]"
);
const errorContent = document.querySelector( "[data-error-content]" );

/**
 * --------------------------- Render All Weather Data in the HTML Page ------------------------------
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
export const updateWeather = function ( lat, lon )
{
  loading.style.display = "grid";
  container.style.overflowY = "hidden";
  container.classList.remove( "fade-in" );
  errorContent.style.display = "none";

  const currentWeatherSection = document.querySelector(
    "[data-current-weather]"
  );
  const highlightSection = document.querySelector( "[data-highlights]" );
  const hourlySection = document.querySelector( "[data-hourly-forecast]" );
  const forecastSection = document.querySelector( "[data-5-day-forecast]" );

  currentWeatherSection.innerHTML = "";
  highlightSection.innerHTML = "";
  hourlySection.innerHTML = "";
  forecastSection.innerHTML = "";

  if ( window.location.hash === "#/current-location" )
  {
    currentLocationBtn.setAttribute( "disabled", "" );
  } else
  {
    currentLocationBtn.removeAttribute( "disabled" );
  }

  /**
   * ----------------------------------- Current Weather Section ----------------------------------------
   */

  fetchData( url.currentWeather( lat, lon ), function ( currentWeather )
  {
  setWeatherBackground(currentWeather.weather[0].main);
    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: { temp, feels_like, pressure, humidity },
      visibility,
      timezone,
    } = currentWeather;
    const [ { description, icon } ] = weather;
    const card = document.createElement( "div" );
    card.classList.add( "card", "card-lg", "current-weather-card" );

    // Determine the icon based on the description
    const weatherIcon =
      description === "broken clouds" ? "04.0d" : icon;

    card.innerHTML = `
      <h2 class="title-2 card-title">Now</h2>
      <div class="weapper">
        <p class="heading">${ parseInt( temp ) }&deg;<sup>c</sup></p>
        <img
          src="./public/images/weather_icons/${ weatherIcon }.png"
          width="64"
          height="64"
          alt="${ description }"
          class="weather-icon"
        />
      </div>

      <p class="body-3">${ description }</p>

      <ul class="meta-list">
        <li class="meta-item">
          <span class="m-icon">calendar_today</span>
          <p class="title-3 meta-text">${ module.getDate( dateUnix, timezone ) }</p>
        </li>
        <li class="meta-item">
          <span class="m-icon">location_on</span>
          <p class="title-3 meta-text" data-location></p>
        </li>
      </ul>
    `;

    fetchData( url.reverseGeo( lat, lon ), function ( [ { name, country } ] )
    {
      card.querySelector( "[data-location]" ).innerHTML = `${ name }, ${ country }`;
    } );
    currentWeatherSection.appendChild( card );

    /**
     * ------------------------------------ Today's Highlights ---------------------------------------------
     */
    fetchData( url.airPollution( lat, lon ), function ( airPollution )
    {
      const [
        {
          main: { aqi },
          components: { no2, o3, so2, pm2_5 },
        },
      ] = airPollution.list;

      const card = document.createElement( "div" );
      card.classList.add( "card", "card-lg" );

      card.innerHTML = `
        <h2 class="title-2" id="highlights-label">Today's Highlights</h2>

        <div class="highlight-list">
          <div class="card card-sm highlight-card one">
            <h3 class="title-3">Air Quality Index</h3>
            <div class="wrapper">
              <span class="m-icon">air</span>
              <ul class="card-list">
                <li class="card-item">
                  <p class="title-1">${ pm2_5.toPrecision( 3 ) }</p>
                  <p class="label-1">PM<sub>2.5</sub></p>
                </li>
                <li class="card-item">
                  <p class="title-1">${ so2.toPrecision( 3 ) }</p>
                  <p class="label-1">SO<sub>2</sub></p>
                </li>
                <li class="card-item">
                  <p class="title-1">${ no2.toPrecision( 3 ) }</p>
                  <p class="label-1">NO<sub>2</sub></p>
                </li>
                <li class="card-item">
                  <p class="title-1">${ o3.toPrecision( 3 ) }</p>
                  <p class="label-1">O<sub>3</sub></p>
                </li>
              </ul>
            </div>
            <span class="badge aqi-${ aqi } label-${ aqi }" title="${ module.aqiText[ aqi ].message
        }">
              ${ module.aqiText[ aqi ].level }
            </span>
          </div>

          <div class="card card-sm highlight-card two">
            <h3 class="title-3">Sunrise & Sunset</h3>
            <div class="card-list">
              <div class="card-item">
                <span class="m-icon">clear_day</span>
                <div>
                  <p class="label-1">Sunrise</p>
                  <p class="title-1">${ module.getTime(
          sunriseUnixUTC,
          timezone
        ) }</p>
                </div>
              </div>
              <div class="card-item">
                <span class="m-icon">clear_night</span>
                <div>
                  <p class="label-1">Sunset</p>
                  <p class="title-1">${ module.getTime(
          sunsetUnixUTC,
          timezone
        ) }</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card card-sm highlight-card">
            <h3 class="title-3">Humidity</h3>
            <div class="wrapper">
              <span class="m-icon">humidity_percentage</span>
              <p class="title-1">${ humidity }<sub>%</sub></p>
            </div>
          </div>

          <div class="card card-sm highlight-card">
            <h3 class="title-3">Pressure</h3>
            <div class="wrapper">
              <span class="m-icon">airwave</span>
              <p class="title-1">${ pressure }<sub>hPa</sub></p>
            </div>
          </div>

          <div class="card card-sm highlight-card">
            <h3 class="title-3">Visibility</h3>
            <div class="wrapper">
              <span class="m-icon">visibility</span>
              <p class="title-1">${ visibility / 1000 }<sub>km</sub></p>
            </div>
          </div>

          <div class="card card-sm highlight-card">
            <h3 class="title-3">Feels Like</h3>
            <div class="wrapper">
              <span class="m-icon">thermostat</span>
              <p class="title-1">${ parseInt( feels_like ) }&deg;<sup>c</sup></p>
            </div>
          </div>
        </div>
      `;
      highlightSection.appendChild( card );
    } );

    /**
     * ------------------------------------ 24-Hour Forecast Section ------------------------------------------
     */
    fetchData( url.forecast( lat, lon ), function ( forecast )
    {
      const {
        list: forecastList,
        city: { timezone },
      } = forecast;

      hourlySection.innerHTML = `
        <h2 class="title-2">Today at</h2>
        <div class="slider-container">
          <ul class="slider-list" data-temp></ul>
          <ul class="slider-list" data-wind></ul>
        </div>
      `;

      for ( const [ index, data ] of forecastList.entries() )
      {
        if ( index > 7 ) break;
        const {
          dt: dateTimeUnix,
          main: { temp },
          weather,
          wind: { deg: windDirection, speed: windSpeed },
        } = data;
        const [ { icon, description } ] = weather;

        const weatherIcon = description === "broken clouds" ? "04.0d" : icon;

        const tempLi = document.createElement( "li" );
        tempLi.classList.add( "slider-item" );
        tempLi.innerHTML = `
          <div class="card card-sm slider-card">
            <p class="body-3">${ module.getHours( dateTimeUnix, timezone ) }</p>
            <img
              src="./public/images/weather_icons/${ weatherIcon }.png"
              width="48"
              height="48"
              loading="lazy"
              title="${ description }"
              alt="${ description }"
              class="weather-icon"
            />
            <p class="body-3">${ parseInt( temp ) }&deg;</p>
          </div>
        `;
        hourlySection.querySelector( "[data-temp]" ).appendChild( tempLi );

        const windLi = document.createElement( "li" );
        windLi.classList.add( "slider-item" );
        windLi.innerHTML = `
          <div class="card card-sm slider-card">
            <p class="body-3">${ module.getHours( dateTimeUnix, timezone ) }</p>
            <img
              src="./public/images/weather_icons/direction.png"
              width="48"
              height="48"
              loading="lazy"
              alt="direction"
              class="weather-icon"
              style = "transform: rotate(${ windDirection - 180 }deg)"
            />
            <p class="body-3">${ parseInt( module.mps_to_kmh( windSpeed ) ) } km/h</p>
          </div>
        `;
        hourlySection.querySelector( "[data-wind]" ).appendChild( windLi );
      }

      /**
       * ------------------------------------ 5-Day Forecast Section --------------------------------------------
       */
      forecastSection.innerHTML = `
        <h2 class="title-2" id="forecast-label">5 Days Forecast</h2>
        <div class="card card-lg forecast-card">
          <ul data-forecast-list>
          </ul>
        </div>
      `;

      for ( let i = 7, len = forecastList.length; i < len; i += 8 )
      {
        const {
          main: { temp_max },
          weather,
          dt_txt,
        } = forecastList[ i ];
        const [ { icon, description } ] = weather;

        const weatherIcon = description === "broken clouds" ? "04.0d" : icon;

        const date = new Date( dt_txt );
        const li = document.createElement( "li" );
        li.classList.add( "card-item" );
        li.innerHTML = `
          <div class="icon-wrapper">
            <img
              src="./public/images/weather_icons/${ weatherIcon }.png"
              width="36"
              height="36"
              alt="${ description }"
              class="weather-icon"
              title = "${ description }"
            />
            <span class="span">
              <p class="title-2">${ parseInt( temp_max ) }&deg;</p>
            </span>
          </div>
          <p class="label-1">${ date.getDate() } ${ module.monthNames[ date.getUTCMonth() ]
          }</p>
          <p class="label-1"> ${ module.weekDayNames[ date.getUTCDay() ] }</p>
        `;

        forecastSection.querySelector( "[data-forecast-list]" ).appendChild( li );
      }

      loading.style.display = "none";
      container.style.overflowY = "overlay";
      container.classList.add( "fade-in" );
    } );
  } );
};

export const error404 = () => ( errorContent.style.display = "flex" );
