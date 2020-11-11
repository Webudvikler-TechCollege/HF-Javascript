// Kalder controller
BusTimeController();

/**
 * Controller
 * 
 * Controlleren sørger for at bygge en forbindelse mellem vores model og vores view
 * Den henter data modellen og forbereder disse til at blive vist i et view
 */
function BusTimeController() {
    // Url til API
    const url = "http://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1";
    // Variabel til vores eget array model
    const model = [];

    // Fetcher API url
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Modtager json objekt fra API'et
            // Egenskaben Departure er et array over kommende bustider    
            // Looper arrayet

            console.log(data.MultiDepartureBoard.Departure);
            for(let item of data.MultiDepartureBoard.Departure) {
                // Customizer API item model til vores egen model med metoden BusTimeModel
                // og pusher elementer ind i vores eget model array
                model.push(BusTimeModel(item));
            }

            // Looper custom array model
            for(let item of model) {
                BusTimeView(item.line, item.date, item.time, item.direction);
            }
        })
}

/**
 * Model 
 * @param {object} obj 
 * 
 * Modellen tegner den struktur som data kommer i og ligger typisk i API'et
 * I dette eksempel er der lavet en principiel model for at vise modellens rolle
 */
function BusTimeModel(obj) {
    // Modellen returnerer et objekt med strukturerede data
    return {        
        line: obj.line, // Bussens nummer
        direction: obj.direction, // Bussens retning
        date: obj.date, // Dag, Måned, År
        time: obj.time // Time, Minut 
    }
}

/**
 * View
 * @param {string} line 
 * @param {string} date 
 * @param {string} time 
 * @param {string} direction 
 * 
 * Et view skal kun kunne modtage data og præsentere dem
 * Jo mere detaljerede dine parameter data er - jo nemmere er det at læse view'et 
 * og hvilke data der bliver brugt hvor
 */
function BusTimeView(line, date, time, direction) {
    // Opretter div
    const div = document.createElement('div');
    // Looper funktionens argumenter og opretter dem i span tags 
    for(let arg of arguments) {
        const span = document.createElement('span');
        span.innerText = arg;
        div.appendChild(span);
    }
    // Tilføjer div som body child
    document.body.appendChild(div);
}


