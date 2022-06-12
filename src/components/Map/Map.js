import './Map.scss';
import L from 'leaflet';
import {WeatherRule} from '../../helpers/helpers'
import IconBerawan from '../../assets/Wether_Icon/berawan.png';
import IconHujan from '../../assets/Wether_Icon/hujan.png';
import IconCerah from '../../assets/Wether_Icon/cerah.png';
import moment from 'moment';

import {changeTimeToText} from '../../helpers/helpers';

class Map extends HTMLElement {
    
    set getWeather(dataWeather) {
        this._dataWeather = dataWeather;
        this._change = this.getAttribute('change');
        this.render();
    }

    generateIcon(weather) {
        for (let key in weather) {
            let timeText = changeTimeToText(moment().format('HH'));
            if (timeText === weather[key].time) {
                for (let keyRule in WeatherRule) {
                    if (keyRule === weather[key].weatherId) {
                        const id = parseInt(weather[key].weatherId);
                        const idCerah = [0, 101, 1, 102, 2];
                        const idBerawan = [103, 3, 104, 4, 5, 10, 45];
                        if (idCerah.includes(id)) {
                            return IconCerah
                        } else if (idBerawan.includes(id)) {
                            return IconBerawan
                        } else {
                            return IconHujan
                        }
                    }
                }
            }
        }
    }

    clickedMapMarker(data) {
        const classw = document.querySelector('.weatherInfo')
        const weatherInfo = document.createElement('weather-info')

        classw.removeChild(classw.firstElementChild)
        weatherInfo.getWeather = data
        classw.append(weatherInfo)
    }

    render() {
        
        const mapBar = document.querySelector('.mapBar') 
        const elementMap = document.createElement('div');
        elementMap.id = 'mapid';
        if (!this._change) {
            elementMap.innerHTML = `
            <div class="shadow-map is-size-4 has-text-white has-text-weight-light">Click Icon To Choose</div>
        `
        }
        
        this.setAttribute('caption', JSON.stringify(this._dataWeather));
        const shadowMap = elementMap.querySelector('.shadow-map');
        mapBar.append(elementMap);

        const tileUrl = 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
        const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        const defaultLatitude = -6.893707;
        const defaultLongitude = 107.761566;

        const map = L.map(elementMap, { 
            zoomControl: false 
        })

        map.setView([defaultLatitude, defaultLongitude], 8);
        
        L.tileLayer(tileUrl, {
            attribution : attribution
        }).addTo(map);
        
        for (let key in this._dataWeather) {
            const WratherIcon = L.icon({
                iconUrl: this.generateIcon(this._dataWeather[key].weather),
                iconSize: [42, 42],
                iconAnchor: [16, 22],
            });

            L.marker([this._dataWeather[key].region.latitude, this._dataWeather[key].region.longitude], {
                icon: WratherIcon
            })
            .bindTooltip(this._dataWeather[key].region.regionName)
            .on('mouseover', (e) => e.target.openTooltip())
            .addTo(map)
            .on('click', () => this.clickedMapMarker(this._dataWeather[key]));
        }

        shadowMap.addEventListener('mouseover', () => {
            this.setAttribute('change', true);
            shadowMap.className = 'shadow-map shadow-map-none'
            
        });
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
    }
}

customElements.define('map-bar', Map)