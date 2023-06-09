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
      this.reward();
      console.log(`${this.name} has been unlocked! ${this.description}`);
    }
  }
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
     () => gameData.minerals.coal.totalMined >= 10, 
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
  
  