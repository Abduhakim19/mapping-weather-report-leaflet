import './Table.scss';
import { WeatherRule } from '../../../helpers/helpers'

class Table {
    constructor(data){
        this._data = data;
    }

    changeCodeWether(code) {
        for (let keyRule in WeatherRule) {
            if (keyRule === code) {
                return WeatherRule[keyRule];
            }
        }
    }
                            
    generateTableBody(table, data) {
        const styles = ['table', 'Table']
        table.className = styles.join(' ')
        const tbody = table.createTBody();
        for (let key in data) {
            let row = tbody.insertRow();
            for (let key2 in data[key]) {
                let text = document.createTextNode(data[key][key2]);
                if (key2 === "weatherId") {
                    text = document.createTextNode(this.changeCodeWether(data[key][key2]));
                }
                let cell = row.insertCell();
                cell.appendChild(text);
            }
        }
    }

    render () {
        const table = document.createElement('table');
        this.generateTableBody(table, this._data);
        return table;
        
    }
}

export default Table;