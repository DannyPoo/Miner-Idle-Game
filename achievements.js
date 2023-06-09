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
    "Mine 100 coal", 
    "Mine 100 coal for the first time",
     () => gameData.minerals.coal.quantity >= 100, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Mine 1000 coal", 
    "Mine 1000 coal for the first time",
     () => gameData.minerals.coal.quantity >= 1000, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Mine 5000 coal", 
    "Mine 5000 coal for the first time",
     () => gameData.minerals.coal.quantity >= 5000, 
     () => applyProductionBoost()
  ),

  //Unlock Material Achievements
  new Achievement(
    "Unlock gold", 
    "Unlock gold for the first time",
     () => gameData.minerals.coal.perClick >= 10, 
     () => applyProductionBoost(1.5)
  ),

  //Gold Related Achievements
  new Achievement(
    "Mine 250 gold", 
    "Mine 250 gold for the first time",
     () => gameData.minerals.gold.quantity >= 250, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Mine 2500 gold", 
    "Mine 2500 gold for the first time",
     () => gameData.minerals.gold.quantity >= 2500, 
     () => applyProductionBoost()
  ),
  new Achievement(
    "Mine 10000 gold", 
    "Mine 10000 gold for the first time",
     () => gameData.minerals.gold.quantity >= 10000, 
     () => applyProductionBoost()
  ),

  // and so on...
];



  function applyProductionBoost(multiplier = 1.01) {
    for (const mineralType in gameData.minerals) {
      const mineral = gameData.minerals[mineralType];
      mineral.perClick *= multiplier; // Increase perClick by multiplier default is 1%
    }
  }
  
  