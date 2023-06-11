'use strict'

const baseURL = 'http://api.openweathermap.org/geo/1.0'
const apikey = '4bf2928c6cab72dc536719d0a75eff85';

// http://api.openweathermap.org/geo/1.0/zip?zip=90210&appid={{apikey}}

const weatherForm = document.querySelector('#weather-form')
weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(weatherForm)
    const zip = formData.get('zip')
    const content = formData.get('content')

    
    // console.log('testZIP', zip)
    // console.log('testCONTENT', content) 

    let data = "";

    (async function getFetchData() {
        const response = await fetch(`${baseURL}/zip?zip=${zip}&appid=${apikey}&units=imperial`)
        console.log("ENTREI", response)

        // const test = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${response.country}&appid=${apikey}`)

        console.log(test)
        // try {
        //     data = await response.json();
        //     console.log('data', data)    
        //     postData('/postData', {
        //         temperature: data.temperature,
        //         date: new Date().toLocaleDateString(),
        //         userContent: 'TESTE'
        //     });
        // } catch {
        //     console.log('Error')
        // }
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
            const responseData = await response.json()
                .then(() => {
                    updateUI();
                })
            // console.log('Posted Data', responseData)
        } catch {
            console.log('Error')
        }
    }

    async function updateUI() {
        console.log('AKIIII')
    }
})







