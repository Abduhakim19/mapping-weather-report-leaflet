import './index.scss';
import './containers/AppBar/AppBar';
import './containers/Main/Main';
import './components/UI/Backdrop/Backdrop';
import Spinner from './components/UI/Spinner/Spinner';
import Modal from './components/UI/Modal/Modal';
import DataSource from './store/data-source';
import moment from 'moment';

const index = () => {

    const backdrop = document.querySelector('back-drop');
    const main = document.querySelector('main-bar');
    const appBar = document.querySelector("app-bar");
    

    const getWeatherInfo = async () => {
    try {
            backdrop.getComponent = Spinner();
            const result = await DataSource();
            if (result) {
                renderMain(result);
                updateTime();
                backdrop.remove();
            }
        } catch (error) {
            console.log(error)
            backdrop.getComponent = Modal('Check Your Internet Connection');
        }
    }

    const renderMain = (dataWeather) => {
        main.getWeather = dataWeather;
    }

    const getTime = () => {
        moment.locale('id');
        appBar.getTime = {
            calendar: moment().format('LL'),
            time : moment().format('HH : mm')
        }
    };

    const refreshMap = () => {
        const mapid = main.querySelector('#mapid');
        const map = main.querySelector('map-bar');
        const data = JSON.parse(map.getAttribute('caption'));
        const change = map.getAttribute('change')
        mapid.remove();
        map.getWeather = data;
        map.setAttribute('change', change);
    }

    const updateTime = () => {
        getTime();
        const renderMainReload00 = moment(moment().format('HHmmss'), 'HHmmss').isSame(moment('000000', 'HHmmss'))
        const renderMainReload18 = moment(moment().format('HHmmss'), 'HHmmss').isSame(moment('180000', 'HHmmss'))
        const renderMainReload12 = moment(moment().format('HHmmss'), 'HHmmss').isSame(moment('120000', 'HHmmss'))
        const renderMainReload06 = moment(moment().format('HHmmss'), 'HHmmss').isSame(moment('060000', 'HHmmss'))
        
        if (renderMainReload00) {
            getWeatherInfo()
        }

        if (renderMainReload06 || renderMainReload12 || renderMainReload18) {
            refreshMap()
        }

        setTimeout(updateTime, 1000)
    }
    getWeatherInfo();
 
    
}

index();
        