// Kalder controller function
myController();

/**
 * Controller function
 * Kalder og behandler data fra modellen og 
 * sender dem videre til et view
 */
function myController() {
    const data = myModel();
    const fullname = `${data.firstname} ${data.lastname}`;    
    myView(fullname, data.birthday);
}

/**
 * Model function
 * Returnerer et objekt (model)
 */
function myModel() {
    return {
        firstname: 'John',
        lastname: 'Doe',
        birthday: '13-02-1988'
    }
}

/**
 * View function
 * Præsenterer data
 * @param {string} name 
 * @param {string} birthday 
 */
function myView(name, birthday) {
    console.log(arguments);
    const div = document.createElement('div');
    div.innerHTML = `<span>${name}</span>
                        <span>${birthday}</span>`;
    document.body.appendChild(div);
}


