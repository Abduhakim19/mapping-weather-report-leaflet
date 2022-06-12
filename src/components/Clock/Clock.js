import './Clock.scss'
class ClockBar extends HTMLElement {
    set getTime(time) {
        this._time = time
        this.render();
    }

    render() {
        const styles = ['is-primary', 'is-size-4', 'is-paddingless-horizontal'];
        this.className = styles.join(' ');
        this.innerHTML = `
            ${this._time}
        `
    }
}

customElements.define('clock-bar', ClockBar);