export const WeatherRule = {
    0   : "Cerah",
    101 : "Cerah Berawan",
    1   : "Cerah Berawan",
    102 : "Cerah Berawan",
    2   : "Cerah Berawan",
    103 : "Berawan",
    3   : "Berawan",
    104 : "Berawan",
    4   : "Berawan",
    5   : "Udara Kabur",
    10  : "Asap",
    45  : "Kabut",
    60  : "Hujan Ringan",
    61  : "Hujan Sedang",
    63  : "Hujan Lebat",
    80  : "Hujan Lokal",
    95  : "Hujan Petir",
    97  : "Hujan Petir"
}

export const TimeRule = {
    "06" : "Pagi",
    "12" : "Siang",
    "18" : "Malam"
}

export const changeTimeToText = (timeString) => {
    let timeText;
    const timeInt = parseInt(timeString);
    if ((timeInt >= 12) && (timeInt < 16)) {
        timeText = 'Siang'
    } else if ((timeInt >= 16) && (timeInt < 18)) {
        timeText = 'Sore'
    } else if ((timeInt >= 18) && (timeInt <= 23)) {
        timeText = 'Malam'
    } else {
        timeText = 'Pagi'
    }
    return timeText
}

export const cors_anywhere = "https://limitless-castle-57044.herokuapp.com/";