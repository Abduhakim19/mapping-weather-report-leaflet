import '../../components/WeatherInfo/WeatherInfo';
import '../../components/Map/Map';

import './Main.scss'

class Main extends HTMLElement {
    set getWeather(dataWeather) {
        this._dataWeather = dataWeather;
        this.render()
    }

    render() {
        this.className = 'grid';
        const weatherInfo = document.createElement('weather-info');
        const map = document.createElement('map-bar');

        this.innerHTML = `
        <section class="section is-paddingless-horizontal Main">
            <div class="container">
                <div class="columns is-multiline is-mobile is-padingless">
                    <div class="column is-paddingless-horizontal weatherInfo">
                        
                    </div>
                    <div class="column is-paddingless-horizontal is-full mapBar">
                    
                    </div>
                </div>
            </div>
        </section>
        `;

        weatherInfo.getWeather = this._dataWeather[0];
        map.getWeather = this._dataWeather;
        
        this.querySelector('.weatherInfo').appendChild(weatherInfo);
        this.querySelector('.mapBar').appendChild(map);
    }
}

customElements.define('main-bar', Main);