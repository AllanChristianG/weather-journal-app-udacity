'use strict'

const apikey = '4bf2928c6cab72dc536719d0a75eff85';
const baseURL = 'https://api.openweathermap.org/data/2.5';


const textarea = document.querySelector('textarea')

const initialRows = 1
const initialCols = 24

textarea.rows = initialRows
textarea.cols = initialCols

const formInput = document.querySelector(".form-input")
const entryHolder = document.querySelector(".entry-holder")
const revealButton = document.querySelector('.reveal-button')


textarea.addEventListener('input', () => {
    // This updates textarea's rows based on scroll height
    textarea.rows = 1;
    const rows = Math.ceil(textarea.scrollHeight / textarea.clientHeight);
    textarea.rows = rows;
  });


const weatherForm = document.querySelector('#weather-form')
weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(weatherForm)
    const zip = formData.get('zip')
    const content = formData.get('content')

    let data = "";

    (async function getFetchData() {
        const response = await fetch(`${baseURL}/weather?zip=${zip}&appid=${apikey}&units=imperial`)

        try {
            data = await response.json();

            postData('/postData', {
                temperature: data.main.temp,
                date: new Date().toLocaleDateString(),
                userResponse: content,
                icon: data.weather[0].icon,
                description: data.weather[0].description,
                local: data.name,
                country: data.sys.country,
            });
            console.log('DATA', data)
        } catch {
            console.log('Error was generated when fetching response')
        }
    })()

    async function postData(path, data) {

        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });        

        try {
            await response.json()
                .then((object) => {
                    updateUI(object);
                })
        } catch {
            console.log('Error when posting data')
        }
    }

    async function updateUI(object) {
        const {
            temperature, 
            userResponse,
            local,
            country,
            description,
            icon } = object;

        const request = await fetch('/all');

        const dtDate = new Date();
        const day = dtDate.getDate();
        const hour = dtDate.getHours();
        const minute = dtDate.getMinutes();
        const optionsDay = {weekday: 'short'};
        const weekday = dtDate.toLocaleString('en-US', optionsDay);
        const optionsMonth = {month: 'short'};
        const month = dtDate.toLocaleString('en-US', optionsMonth);
        const formatHour = hour.toString().padStart(2, '0');
        const formatMinute = minute.toString().padStart(2, '0');

        try {
            // Transform into JSON
            const allData = await request.json()

            // Write updated data to DOM elements
            document.querySelector('.temp').innerHTML = Math.round(temperature);
            document.getElementById('feelings').innerHTML = userResponse;
            document.querySelector('.city').innerHTML = local;
            document.querySelector('.country').innerHTML = ` / ${country}`;
            document.getElementById("date").innerHTML = `${month}, ${day} ${weekday} - ${formatHour}:${formatMinute}`
            document.querySelector(".description").innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
            document.getElementById("icon").src = `https://openweathermap.org/img/wn/${icon}.png`

        } catch (error) {
            // appropriately handle the error
            console.log("error", error);
        }
    }
})







