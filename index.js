const APIkey = 'XRZU7BWG5WUQZQC4WRWNLD9YW';
const userLocationInput = document.getElementById(`inputLocation`);


async function getData(){
    try{
        let tempInput = document.getElementById(`inputLocation`).value;
        data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${tempInput}?unitGroup=us&key=${APIkey}`)
        if(!data.ok){
            throw 'we failed';
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
    let locationData = await getData();
    console.log(locationData);
    displayFeatured(locationData);
    
} 

function displayFeatured(data){
    document.getElementById('cityName').textContent = data.resolvedAddress;
    document.getElementById('timeInformation').textContent = `${data.timezone} - UTC${data.tzoffset>=1 ? '+'+data.tzoffset : data.tzoffset}`
    document.getElementById('weatherStatus').textContent = data.days[0].conditions;
    document.getElementById('temperature').textContent = `${Math.ceil(data.days[0].temp)}°`;
}