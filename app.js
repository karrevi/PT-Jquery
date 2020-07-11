const api_url = 'https://www.micole.net/api/regions';
const username = 'micoleAPI';
const key = 'M9^&yAzHTvVedh4=';
let regionId = "";
let regionName = "";

$(document).ready(function () {
    getRegions()
    $("#boton-regiones").on("click", function () {
        if (regionId !== "") {
            getMadridCities()
            console.log(regionName)
            console.log(regionId)
        }
    });
});

function getRegions() {
    $.ajax({
        url: api_url,
        method: 'GET',
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + key));
        },
        success: function (results) {
            $(results).each(function () {
                if (this.name === "Madrid") {
                    regionName = this.name
                    regionId = this.id
                }
            })
        },
        error: function () {
            console.log('No se pudo obtener la información');
        }
    });
}

function getMadridCities() {
    const citiesEndpoint = api_url + "/" + regionId
    console.log(citiesEndpoint)
    $.ajax({
        url: citiesEndpoint,
        method: 'GET',
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + key));
        },
        success: function (results) {
            $(results).each(function () {
                if (testVowels(this.name) === true) {
                    const citiesList = $('ul.cities_list')
                    const cityCard = `<li class="citiesItem">
                    <div class="card" style="width: 18rem;">
                    <img src="./city_icon.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${this.name}</h5>
                        <p class="card-text">${regionName}</p>
                        </div>
                    </div>
                    </li>`
                    citiesList.append(cityCard)
                }
            })
        },
        error: function () {
            console.log('No se pudo obtener la información');
        }
    });
}

function testVowels(name) {
    const regex = new RegExp('^[aeiou].*', 'i');
    const lastVowel = name.slice(-1)
    let regexOutput = regex.test(lastVowel);

    if (regexOutput) {
        return true
    } else {
        return false
    }
}