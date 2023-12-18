class Upgrade{
    constructor(name, cost, effect){
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.purchased = false;
    }

    purchase(){
        if(prestigeCurrency >= this.cost){
            prestigeCurrency -= this.cost;
            this.purchased = true;
        }
    }
}


function calculatePrestigeCurrency(){
    const totalMaterialMined = HowMuchTotalMined();
    const prestigeCurrency = Math.floor(totalMaterialMined / 1000);

    console.log(prestigeCurrency);
    return prestigeCurrency;
}

function prestige(){
    const prestigeCurrency = calculatePrestigeCurrency();

    gameData.prestigeCurrency += prestigeCurrency;

    resetGameData();
    resetUI();

    for(let mineral in gameData.minerals){
    gameData.minerals[mineral].perClick += prestigeCurrency;
    }

    switchScreens();
}

function checkPrestige(){
    var prestigeCurrency = calculatePrestigeCurrency();

    if(prestigeCurrency >= 1){
        showButton();
    }
}

function showButton(){
    document.getElementById("prestigeBtn").style.display = "block";
}

function switchScreens(){
    document.getElementById("statsScreen").style.display = "none";
    document.getElementById("miningScreen").style.display = "none";
    document.getElementById("prestigeScreen").style.display = "block";
}

function resetGameData() {
    gameData = {
        minerals: {
            coal: {
                quantity: 0,
                totalMined: 0,
                perClick: 1,
                perClickCost: 10,
            },
            gold: {
                quantity : 0,
                totalMined: 0,
                perClick: 1,
                perClickCost: 50,
            },
            iron: {
                quantity : 0,
                totalMined: 0,
                perClick: 1,
                perClickCost: 100,
            }
        },
        prestigeCurrency: gameData.prestigeCurrency, // Keep the prestigeCurrency value
        lastTick: Date.now()
    }
}

function resetUI(){
    document.getElementById("goldContainer").style.display = "none";
    document.getElementById("ironContainer").style.display = "none";
}
  