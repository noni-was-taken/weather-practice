let weatherData = [];
const container = document.querySelector('.container');
const accessCode = 'c68dde0bc16acf498555406d31fedf76';

async function getData(){
    let location = document.getElementById('inputLocation').value;
    try{
        response = await fetch(`http://api.weatherstack.com/current?access_key=${accessCode}&query=${location}`)
        if(!response.ok){
            throw new Error("nt tried");
        }
        const locationData = await response.json();
        console.log(locationData);

        return locationData;
    }

    catch(error){
        console.error(error);
    }
}


async function addLocation(){
    let dataToAdd = await getData();
    weatherData.push({
        dataToAdd
    });
    console.log(weatherData);
    updateList();
}

function updateList(){
    container.innerHTML='';
    weatherData.forEach((loc,inx) => {
        console.log(loc);
        let toAdd = document.createElement(`div`);
        toAdd.setAttribute('class','weatherBox');
        toAdd.innerHTML = `
            <div class="cityInformation">
                    <h1>${loc.dataToAdd.location.name}, ${loc.dataToAdd.location.country}</h1>
                    <small>${loc.dataToAdd.request.type}</small>
                </div>
                <h1 class="Temperature">${loc.dataToAdd.current.temperature}°</h1>
            </div>
            <div class="bottomSide">
                <p>${loc.dataToAdd.current.weather_descriptions}</p>
                <img src="${loc.dataToAdd.current.weather_icons}" alt="cloud-icon">
            </div>
        `;
        container.appendChild(toAdd);
    });
}
