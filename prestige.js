function calculatePrestigeCurrency(){
    const totalMaterialMined = HowMuchTotalMined();
    const prestigeCurrency = Math.floor(totalMaterialMined / 1000);

    return prestigeCurrency;
}

function prestige(){
    const prestigeCurrency = calculatePrestigeCurrency();

    gameData.prestigeCurrency += prestigeCurrency;

    resetGameData();

    switchScreens();

    alert(`You now have ${gameData.prestigeCurrency} prestige points.`)
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
  