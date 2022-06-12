import Table from './Table/Table';

class InfoBar extends HTMLElement {
    set getWeather(dataWeather) {
        this._dataWeather = dataWeather;
        this.render();
    }
    

    render() {
        const styles = ['columns', 'is-mobile']
        this.className = styles.join(' ');
        const table = new Table(this._dataWeather.weather)
        this.innerHTML =  `
            <div class="column">
                <h1 class="is-size-4 has-text-weight-semibold">${this._dataWeather.region.regionName}</h1>
            </div>
        `;
        this.querySelector('.column').append(table.render())
    }
}

customElements.define('weather-info', InfoBar);