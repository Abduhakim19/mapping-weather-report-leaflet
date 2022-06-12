import convert from 'xml-js';
import moment from 'moment';
import {TimeRule, cors_anywhere} from '../helpers/helpers';


const DataSource = () => {
    const getWeather = async () => {
        try {
            const url = `${cors_anywhere}https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-JawaBarat.xml`
            const response = await fetch(url);
            const getXml = await response.text();
            const responseJson = JSON.parse(convert.xml2json(getXml));
            const WeatherData =  responseJson.elements[0].elements[0].elements;
            return WeatherData;
        } catch (error) {
            return { error : ` ${error} ` }
        }
    };

    const resturctureJson = (datas) => {
        datas.shift();datas.pop();
        let datasArray = [];
        for (let key in datas) {
            let data = {
                region : {
                    regionName: datas[key].elements[0].elements[0].text,
                    latitude: datas[key].attributes.latitude,
                    longitude: datas[key].attributes.longitude,
                },
                weather : []
            }
            const weatherData = datas[key].elements[8].elements;
            for (let key2 in weatherData) {
                const weatherDate = moment(weatherData[key2].attributes.datetime.toString(), 'YYYYMMDHHmm');
                if (moment(weatherDate).isBetween(moment('05', 'HH'),moment('19', 'HH') )) {
                    let weatherDateInfo;
                    for (let keyTime in TimeRule) {
                        if (moment(weatherDate).isSame(moment(keyTime, 'HH'))) {
                            weatherDateInfo = TimeRule[keyTime]
                        }
                    }
                    const weather = {
                        time: weatherDateInfo,
                        weatherId: weatherData[key2].elements[0].elements[0].text
                    }
                    data.weather.push(weather)
                }
            }
                
            datasArray.push(data);
        }
        return datasArray;
    }

    return getWeather().then( data => resturctureJson(data))
}

export default DataSource;