/* Global Variables */
/*API Key for OpenWeatherMap API*/
const apiKey = '737a5183233c04d6ca0778281f1ec753&units=imperial'

/*PostData object */
postData = {};
/*Zipcode
The search works default country as USA
*/
const zipcode = document.getElementById("zip");
const feelings = document.getElementById("feelings");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const generate = document.getElementById("generate");
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
generate.addEventListener("click",getWeatherbyzipcode);

//Get weather information from openweathermap API
const getweather = async ()=>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode.value},us&APPID=${apiKey}`)
    try {
        const data = await response.json();
        console.log('Weather API:', data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

//Send Weather information to Server API
const addWeatherInfo = async (data)=>{
    postData.date = newDate;
    postData.temp = data.main.temp;
    postData.fellings = feelings.value;
    const responseAddWeather = await fetch('/add', {
        method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
    });
    try {
        const dataAddWeather = await responseAddWeather.json();
        console.log('AddWeatherInfo: ',dataAddWeather);
        return dataAddWeather;
    } catch (error) {
        console.log(error.message);
    }
}

//Get Weather information from Server API
const getWeatherInfo = async (url="")=>{
    const responseGetWeather = await fetch(url);
    try {
        const dataGetWeather = await responseGetWeather.json();
        date.innerHTML = `Date: ${dataGetWeather.date}`;
        temp.innerHTML = `Temperature(°F): ${dataGetWeather.temp}`;
        content.innerHTML = `Fellings: ${dataGetWeather.fellings}`;
        console.log('Get WeatherInfo: ', dataGetWeather);
    } catch (error) {
        console.log(error.message);
    }
}

//Main Function
function getWeatherbyzipcode(){
    init();
    getweather()
    .then((data)=>{
        if (data.cod == 200) {
            addWeatherInfo(data);
        }else{
            return false;
        }
    })
    .then((param)=>{
        if (param != false) {
            getWeatherInfo("/all");
        }
    });
}

function init(){
    date.innerHTML = "Date:";
    temp.innerHTML = "Temperature(°F):";
    content.innerHTML = "Fellings:";
}

