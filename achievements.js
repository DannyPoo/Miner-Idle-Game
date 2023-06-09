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
    "Unlock gold", 
    "Unlock gold for the first time",
     () => gameData.minerals.coal.perClick >= 10, 
     () => applyProductionBoost(1.5)
  ),

];



  function applyProductionBoost(multiplier = 1.01) {
    for (const mineralType in gameData.minerals) {
      const mineral = gameData.minerals[mineralType];
      mineral.perClick *= multiplier; // Increase perClick by multiplier default is 1%
    }
  }
  
  