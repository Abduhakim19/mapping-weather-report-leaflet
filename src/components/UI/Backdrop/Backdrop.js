import './Backdrop.scss'

class Backdrop extends HTMLElement {
    set getComponent(component){
        this._component = component;
        this.render()
    }
    
    render() {
        const styles = ['Backdrop'];
        this.className = styles.join(' ');
        this.innerHTML = this._component;
    }
}

customElements.define('back-drop', Backdrop);