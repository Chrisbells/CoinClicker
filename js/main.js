var coinsPerSecond = 0;
var coins=0;
var buildings;
var ownedBuildings = {
    "laptop": 0,
    "desktop": 0,
    "gpu": 0,
    "asicMiner": 0,
    "virus": 0,
    "server": 0,
    "googleServer": 0
};
loadGame()
coins=parseFloat(coins);
keys = Object.keys(ownedBuildings)
for (var i = 0; i < keys.length; i++) {
    key = keys[i]
    buildings[key].cost = Math.floor(buildings[key].cost * Math.pow(1.1, ownedBuildings[key]))
    coinsPerSecond += buildings[key].cps * ownedBuildings[key]
}

var clickerScreen = new Vue({
    el: '#clickerScreen',
    "data": {
        "coins": coins,
        "cps": '0'
    }
})
var storeScreen = new Vue({
    el: "#shop",
    "data": {
        "ownedBuildings": ownedBuildings,
        "buildings": buildings
    }
})
var clicks = 0
clicker = document.getElementById('coin')
clicker.onclick = function () { addCoin(); addFallingCoin(true); clicks++ }
function buy(buildingName) {
    if (coins >= buildings[buildingName].cost) {
        coinsPerSecond += buildings[buildingName].cps
        coins -= buildings[buildingName].cost
        buildings[buildingName].cost *= 1.1;
        buildings[buildingName].cost = Math.floor(buildings[buildingName].cost)
        ownedBuildings[buildingName]++
        storeScreen.ownedBuildings = ownedBuildings
        clickerScreen.coins = coins
    }
}
function addCoin() {
    coins += 1
    clickerScreen.coins = coins
}
function random(min, max, floored) {
    number = Math.random() * (max - min) + min;
    if (floored = true) {
        return Math.floor(number) + 1
    } else {
        return number
    }
}
//clicker background affect
clickerBackgroundCanvas = document.getElementById('clickerBackground')
clickerBackgroundCanvas.width = window.innerWidth * .295
clickerBackgroundCanvas.height = window.innerHeight
clickerBackgroundContext = clickerBackgroundCanvas.getContext('2d')
var coinImg = document.createElement('img');
coinImg.src = 'assets/img/coin.png'
canvasAspectRatio = clickerBackgroundCanvas.width / clickerBackgroundCanvas.height
var maxFallingCoins = 100
var fallingCoins = []
function addFallingCoin(forced) {
    if (fallingCoins.length < maxFallingCoins) {
        var decidingFactor = Math.random();
        if ((decidingFactor < .05 || forced == true) || (decidingFactor < .05 && forced == true)) {
            fallingCoins.push(new Array(random(clickerBackgroundCanvas.width * .1, clickerBackgroundCanvas.width * .9, true), 1))
        }
    }
}
function updateFallingCoins() {
    clickerBackgroundContext.clearRect(0, 0, clickerBackgroundCanvas.width, clickerBackgroundCanvas.height)
    for (i = 0; i < fallingCoins.length; i++) {
        clickerBackgroundContext.drawImage(coinImg, fallingCoins[i][0], fallingCoins[i][1], 32, 32)
        fallingCoins[i][1] += 1;
        if (fallingCoins[i][1] > clickerBackgroundCanvas.height) {
            fallingCoins.splice(i, 1)
        }
    }
}
var sum = 0;
clicksFromPastSecond = []
function updateCps() {
    if (clicksFromPastSecond.length > 4) {
        clicksFromPastSecond.pop()
    }
    clicksFromPastSecond.unshift(clicks)
    sum = 0
    for (i = 0; i < clicksFromPastSecond.length; i++) {
        sum += clicksFromPastSecond[i]

    }
    clicks = 0
    clickerScreen.cps = sum
}
setInterval(function () { saveGame(); console.log('saved') }, 10000)
setInterval(function () { updateFallingCoins(); addFallingCoin(); }, 1000 / 60)
setInterval(function () { updateCps(); }, 200)
setInterval(function () { if (coinsPerSecond > 0) { coins += coinsPerSecond; coins=Number((coins).toFixed(2)); clickerScreen.coins = coins; console.log(coins) } }, 1000)