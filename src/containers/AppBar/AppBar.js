import '../../components/Clock/Clock';
import '../../components/Calendar/Calendar';
import './AppBar.scss';

import {changeTimeToText} from '../../helpers/helpers';

class AppBar extends HTMLElement {
    set getTime(time) {
        this._time = time
        this.render();
    }


    generateGreeting(timeString) {
        return 'Hallo, Selamat ' + changeTimeToText(timeString);
    }

    render(){
        this.className= 'grid'
        const clockBar = document.createElement('clock-bar');
        const calendarBar = document.createElement('calendar-bar');
        
        this.innerHTML = `
        <section class="section is-paddingless-horizontal AppBar">
            <div class="container">
                <div class="columns is-multiline is-mobile is-padingless">
                    <div class="column is-full is-paddingless-horizontal">
                        <p class="is-size-3 has-text-weight-bold is-info">${this.generateGreeting(this._time.time)}</p>
                    </div>
                    <div class="column is-5 is-paddingless-horizontal left clockBar">
                        
                    </div>
                    <div class="column right is-paddingless-horizontal calendarBar">
                        
                    </div>
                </div>
            </div>
        </section>
        `;

        clockBar.getTime = this._time.time;
        calendarBar.getCalendar = this._time.calendar;
        this.querySelector('.clockBar').appendChild(clockBar);
        this.querySelector('.calendarBar').appendChild(calendarBar);
    }
}

customElements.define('app-bar', AppBar);