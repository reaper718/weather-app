"use strict";

import { fetchData, url } from "./api.js";
import * as module from "./module.js";

function setWeatherBackground(condition) {
  const body = document.body;
  const backgroundMap = {
    Clear: 'https://media.istockphoto.com/id/1188520316/photo/landscape-of-the-clear-sky.jpg?s=612x612&w=0&k=20&c=Vnk6XNgITN9AkTk7KMSdYZG7Olk4rAIvJNpm_nCM7t0=',
    "Few Clouds": 'data:image/jpeg;base64,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',
    Haze: 'https://images.unsplash.com/photo-1534081333815-ae5019106621',
    Rain: 'https://images.unsplash.com/photo-1509622902803-8e7ef71d639e',
    Snow: 'https://images.unsplash.com/photo-1608889175112-7a1e2f2b76e0',
    Thunderstorm: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    Mist: 'https://images.unsplash.com/photo-1602081109531-61c065a728a1'
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
  //setWeatherBackground(currentWeather.weather[0].main);
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
