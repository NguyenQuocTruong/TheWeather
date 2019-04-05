window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/accbce88acf5d5d061317e236df43af2/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // kiểm tra dữ liệu trả về 
                    console.log(data);
                    const {temperature, summary, icon }= data.currently;

                    // Set dữ liệu cho các ptu
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // Chuyển đổi nhiệt độ
                    let celsius = (temperature - 32) * (5 /9);

                    // Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    // Change temperature to C/F
                    temperatureSection.addEventListener("click",() =>{
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.round(celsius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    
});