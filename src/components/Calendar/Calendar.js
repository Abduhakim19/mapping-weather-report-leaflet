import './Calendar.scss';

class CalendarBar extends HTMLElement {
    set getCalendar(calendar) {
        this._calendar = calendar;
        this.render()
    }

    render() {
        const styles = ['is-primary', 'is-size-4', 'is-paddingless-horizontal'];
        this.className = styles.join(' ');
        this.innerHTML = `
            ${this._calendar}
        `;
    }
}

customElements.define('calendar-bar', CalendarBar);