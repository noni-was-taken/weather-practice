const APIkey = 'XRZU7BWG5WUQZQC4WRWNLD9YW';
const userLocationInput = document.getElementById(`inputLocation`);

document.addEventListener("DOMContentLoaded", async (event) => { 
    let locationData = await getData("Japan");
    console.log(locationData);
    displayFeatured(locationData);
});

async function getData(inputLocation){
    try{
        data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputLocation}?unitGroup=us&key=${APIkey}`)
        if(!data.ok){
            throw 'Failed to fetch data.';
        }
        let receivedData = data.json();
        return receivedData;
    }
    catch(error){
        console.log(error);
    }
};

userLocationInput.addEventListener(`keydown`, function(event){
    if(event.key == 'Enter'){
        fetchLocationData();
    }
});

async function fetchLocationData(){
    let locationInput = document.getElementById('inputLocation').value;
    let locationData = await getData(locationInput);
    console.log(locationData);
    displayFeatured(locationData);
} 

function displayFeatured(data){
    document.getElementById('cityName').textContent = data.resolvedAddress;
    document.getElementById('timeInformation').textContent = `${data.timezone} - UTC${data.tzoffset>=1 ? '+'+data.tzoffset : data.tzoffset}`
    document.getElementById('weatherStatus').textContent = data.days[0].conditions;
    document.getElementById('temperature').textContent = `${Math.ceil(data.days[0].temp)}°`;

    document.getElementById('weatherIcon').setAttribute('src', `/weatherIcons/${data.days[0].icon}.png`)
}