var gameData = {
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
            perclickCost: 100
        },
        steel:{
          quantity : 0,
          totalMined: 0,
          perClick: 1,
          perclickCost: 100

        }
    },

    lastTick: Date.now()
}

let timePlayed = 0;
function update(id, content){
    document.getElementById(id).innerHTML = content;
}

function smeltSteel(){
  const iron = gameData.minerals.iron;
  const coal = gameData.minerals.coal;
  const steel = gameData.minerals.steel;


  if(iron.quantity >= 10 && coal.quantity >= 20){
    iron.quantity -= 10;
    steel.quantity += 1;
    steel.totalMined +=1;
  }
}

function mineMineral(mineralType){
    const mineral = gameData.minerals[mineralType];
    console.log(mineralType);
    mineral.quantity += mineral.perClick;
    mineral.totalMined += mineral.perClick;
    checkAchievements();
    update(mineralType + "Mined", format(mineral.quantity, "scientific") + " " + mineralType + " Mined");
}

function buyPerClickUpgrade(mineralType){
    const mineral = gameData.minerals[mineralType];
    console.log(mineralType);
    if(mineral.quantity >= mineral.perClickCost) {
        mineral.quantity -= mineral.perClickCost;
        mineral.perClick += 1;
        mineral.perClickCost *= 1.1;
        update(
            mineralType + "Mined",
            format(mineral.quantity, "scientific") + " " + mineralType + " Mined"
          );
          update( "buy" + mineralType +
            "PerClickBtn",
            "Upgrade Pickaxe (Currently Level " +
              format(mineral.perClick, "scientific") +
              " ) Cost: " +
              format(mineral.perClickCost, "scientific") +
              " " +
              mineralType
          );

          if(mineralType == "coal"){
            checkMaterialUnlock("gold");
          }
          else if(mineralType == "gold"){
            checkMaterialUnlock("iron");
          }
          else if(mineralType == "iron"){
            checkMaterialUnlock("steel");
          }
          
    }
}

function checkMaterialUnlock(mineralType) {
    const unlockRequirements = {
      gold: {
        prerequisite: "coal",
        prerequisiteLevel: 10
      },
      iron: {
        prerequisite: "coal",
        prerequisiteLevel: 25,
        prerequisite2: "gold",
        prerequisiteLevel2: 10
      },
      // Add more materials and their prerequisites here
    };
  
    const materialData = unlockRequirements[mineralType];
    if (materialData) {
      const prerequisiteType = materialData.prerequisite;
      const prerequisiteLevel = materialData.prerequisiteLevel;
      const prerequisiteType2 = materialData.prerequisite2;
      const prerequisiteLevel2 = materialData.prerequisiteLevel2;
  
      const prerequisiteMineral = gameData.minerals[prerequisiteType];
      const prerequisiteMineral2 = prerequisiteType2 ? gameData.minerals[prerequisiteType2] : null;
  
      if (
        prerequisiteMineral.perClick >= prerequisiteLevel &&
        (!prerequisiteMineral2 || prerequisiteMineral2.perClick >= prerequisiteLevel2)
      ) {
        unlockMaterial(mineralType);
      }
    }
    if(mineralType == "steel"){
      unlockMaterial(mineralType);
    }
  }
  
  
  

  function unlockMaterial(mineralType) {
    const mineral = gameData.minerals[mineralType];
    
    update(
      mineralType + "Mined",
      format(mineral.quantity, "scientific") + " " + mineralType + " Mined"
    );
    
    update(
      "buy" + mineralType + "PerClickBtn",
      "Upgrade Pickaxe (Currently Level " +
      format(mineral.perClick, "scientific") +
      " ) Cost: " +
      format(mineral.perClickCost, "scientific") +
      " " +
      mineralType
    );
    
    // Show the material container
    const materialContainer = document.getElementById(mineralType + "Container");
    materialContainer.style.display = "block";
  }

  var mainGameLoop = window.setInterval(function() {
    var currentTime = Date.now();
    var diff = currentTime - gameData.lastTick;
    gameData.lastTick = currentTime;

    timePlayed += diff / 1000 / 3600;
    update("timePlayed", "Time Played: " + timePlayed.toFixed(2) + " hours") 
  
    for (let mineralType in gameData.minerals) {
      const mineral = gameData.minerals[mineralType];
  
      // Check if the mineral is unlocked before updating its quantity
      if (isMineralUnlocked(mineralType)) {
        mineral.quantity += mineral.perClick * (diff / 1000);
        mineral.totalMined += mineral.perClick * (diff / 1000);
        update(
          mineralType + "Mined",
          format(mineral.quantity, "scientific") + " " + mineralType + " Mined"
        );
      }
    }

    checkAchievements();
  }, 1000);
  
  function isMineralUnlocked(mineralType) {
    // Add logic to determine if the mineral is unlocked
    // Return true if it is unlocked, otherwise return false
  
    // Example logic: Check if the mineral container is visible
    const mineralContainer = document.getElementById(mineralType + "Container");
    return mineralContainer.style.display !== "none";
  }

function checkAchievements(){
  achievements.forEach((achievement) => {
    achievement.tryUnlock();
  })
}

var saveGameLoop = window.setInterval(function(){
    localStorage.setItem("minerSave", JSON.stringify(gameData))
}, 15000)

function format(number, type){
    let exponent = Math.floor(Math.log10(number))
    let mantissa = number / Math.pow(10, exponent)
    if(exponent < 3) return number.toFixed(1)
    if(type == "scientific") return mantissa.toFixed(2) + "e" + exponent
    if(type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent /3) * 3)
}
