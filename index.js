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



