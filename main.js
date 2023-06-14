var gameData = {
    minerals: {
        coal: {
            quantity: 0,
            totalMined: 0,
            level: 1,
            perClick: 1,
            perClickCost: 10,
        },
        gold: {
            quantity : 0,
            totalMined: 0,
            level: 1,
            perClick: 1,
            perClickCost: 50,
        },
        iron: {
            quantity : 0,
            totalMined: 0,
            perClick: 1,
            level: 1,
            perclickCost: 75
        }
    },
    prestigeCurrency :0,

    lastTick: Date.now()
}

let timePlayed = 0;
function update(id, content){
    document.getElementById(id).innerHTML = content;
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
        mineral.level += 1;
        update(
            mineralType + "Mined",
            format(mineral.quantity, "scientific") + " " + mineralType + " Mined"
          );
          update( "buy" + mineralType +
            "PerClickBtn",
            "Upgrade Pickaxe (Currently Level " +
              format(mineral.level, null) +
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
          
    }
}

function HowMuchTotalMined(){
  const totalCoalMined = gameData.minerals.coal.totalMined;
  const totalIronMined = gameData.minerals.iron.totalMined;
  const totalGoldMined = gameData.minerals.gold.totalMined;

  const totalMaterialMined = totalCoalMined + totalGoldMined + totalIronMined;

  return totalMaterialMined;
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

      console.log(materialData);
  
      if (
        prerequisiteMineral.perClick >= prerequisiteLevel &&
        (!prerequisiteMineral2 || prerequisiteMineral2.perClick >= prerequisiteLevel2)
      ) {
        console.log(mineralType);
        unlockMaterial(mineralType);
      }
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
      format(mineral.level, null) +
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
  console.log(gameData.minerals.coal.perClick);
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

    checkPrestige();
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

function format(number, type) {
  let exponent = Math.floor(Math.log10(number));
  let mantissa = number / Math.pow(10, exponent);

  if (exponent < 3) {
    return number.toFixed(1);
  }

  if (type == "scientific" && number >= 10000000) {
    return mantissa.toFixed(2) + "e" + exponent;
  }

  if (type == "engineering" && number >= 10000000) {
    return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3);
  }

  return number.toFixed(1);
}

