function loadGame() {
    //get buildings
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.status = 200 && xhr.readyState == 4) {
            buildings = JSON.parse(xhr.responseText)
         }
        }
    
    xhr.open("GET", "assets/json/buildings.json",false)
    xhr.send()
    //if a game save exists load it (save exists doesnt do anything but store a blank value so the game knows that theres a save)
    if (localStorage.getItem('saveExists')) {
        //get coin count and display it
        coins = parseFloat(localStorage.getItem('coins'));
        //get the buildings owned and display it
        ownedBuildings = JSON.parse(localStorage.getItem('ownedBuildings'));
        console.log(ownedBuildings)

         
    } else {
        console.log('no save exists')
    }
}
function saveGame() {
    //just incase this is the first time playing it can load correcctly
    localStorage.setItem('saveExists', 'true')
    localStorage.setItem('coins', coins)
    localStorage.setItem('ownedBuildings', JSON.stringify(ownedBuildings))
}
