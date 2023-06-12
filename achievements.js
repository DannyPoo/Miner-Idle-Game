class Achievement {
  constructor(name, description, checkCondition, reward){
    this.name = name;
    this.description = description;
    this.isUnlocked = false;
    this.checkCondition = checkCondition;
    this.reward = reward;
  }

  tryUnlock(){
    if(!this.isUnlocked && this.checkCondition()){
      this.isUnlocked = true;
      displayAchievements();
      this.reward();
      showAchievementPopup(this.name, this.description);
    }
  }
}

function showAchievementPopup(name, description){
  document.getElementById("achievementName").textContent = name;
  document.getElementById("achievementDescription").textContent = description;

  document.getElementById("achievementPopup").style.display = "block";
  
  setTimeout(hideAchievementPopup, 3000);
}

function hideAchievementPopup(){
  document.getElementById("achievementPopup").style.display = "none";
}


let achievements = [

  //Coal Related Achievements
  new Achievement(
    "The Journey has started", 
    "Mine 1 coal for the first time",
     () => gameData.minerals.coal.totalMined >= 1, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Coal Newbie", 
    "Mine 1,000 coal for the first time",
     () => gameData.minerals.coal.totalMined >= 1000, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Coal Amaeteur", 
    "Mine 10,000 coal for the first time",
     () => gameData.minerals.coal.totalMined >= 10000, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Just another Coal Miner", 
    "Mine 100,000 coal for the first time",
     () => gameData.minerals.coal.totalMined >= 100000, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Level 99 Mining", 
    "Amount of coal to hit level 99 mining!",
     () => gameData.minerals.coal.totalMined >= 260689, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Coal Baron", 
    "Mine 1,000,000 coal for the first time",
     () => gameData.minerals.coal.totalMined >= 1000000, 
     () => applyProductionBoost()
  ),

  //Unlock Material Achievements
  new Achievement(
    "Unlock gold", 
    "Unlock gold for the first time",
     () => gameData.minerals.coal.perClick >= 10, 
     () => applyProductionBoost(1.5)
  ),

  new Achievement(
    "Unlock iron", 
    "Unlock iron for the first time",
     () => gameData.minerals.coal.perClick >= 25 && gameData.minerals.gold.perClick >= 10, 
     () => applyProductionBoost(1.5)
  ),

  //Gold Related Achievements
  new Achievement(
    "We've struck gold!", 
    "Mined gold for the first time!",
     () => gameData.minerals.gold.totalMined >= 1, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Mine 250 gold", 
    "Mine 250 gold for the first time",
     () => gameData.minerals.gold.totalMined >= 2500, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Mine 2500 gold", 
    "Mine 2,500 gold for the first time",
     () => gameData.minerals.gold.totalMined >= 25000, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Mine 250000 gold", 
    "Mine 250,000 gold for the first time",
     () => gameData.minerals.gold.totalMined >= 250000, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Level 99 Mining", 
    "Amount of gold to hit level 99 mining!",
     () => gameData.minerals.gold.totalMined >= 200530, 
     () => applyProductionBoost()
  ),

  new Achievement(
    "We are rich!", 
    "Have 100,000 current gold!",
     () => gameData.minerals.gold.quantity >= 100000, 
     () => applyProductionBoost()
  ),

  //Iron Related Achievements

  // and so on...
];



  function applyProductionBoost(multiplier = 1.01) {
    for (const mineralType in gameData.minerals) {
      const mineral = gameData.minerals[mineralType];
      mineral.perClick *= multiplier; // Increase perClick by multiplier default is 1%
    }
  }
  


  // Get the container element for the achievement grid
const achievementGrid = document.getElementById("achievementGrid");

// Function to generate HTML for an achievement card
function createAchievementCard(achievement) {
  const card = document.createElement("div");
  card.classList.add("achievement-card");
  
  if (achievement.isUnlocked) {
    card.classList.add("unlocked"); // Apply "unlocked" class to change the color
  }
  
  card.innerHTML = `
    <h3>${achievement.name}</h3>
    <p>${achievement.description}</p>
    <span class="achievement-status">${achievement.isUnlocked ? "Unlocked" : "Locked"}</span>
  `;
  return card;
}


function displayAchievements() {
  // Sort achievements based on unlocked status
  achievements.sort((a, b) => {
    if (a.isUnlocked && !b.isUnlocked) {
      return -1; // a comes before b
    } else if (!a.isUnlocked && b.isUnlocked) {
      return 1; // b comes before a
    }
    return 0; // no change in order
  });

  // Clear the existing grid
  achievementGrid.innerHTML = "";

  // Generate and append HTML for each achievement
  for (const achievement of achievements) {
    const card = createAchievementCard(achievement);
    achievementGrid.appendChild(card);
  }
}

// Call the function to display achievements initially
displayAchievements();
  