const achievements = [
    {
      name: "Mined 100 Times!",
      condition: (mineralsMined) => mineralsMined >= 100,
      achieved: false
    },

    {
        name: "Mined 1000 Times!",
        condition: (mineralsMined) => mineralsMined >= 1000,
        achieved: false
    },

    {
        name: "Mined 10,000 Times!",
        condition: (mineralsMined) => mineralsMined >= 10000,
        achieved: false
    },
    {
        name: "Mined 100,000 Times!",
        condition: (mineralsMined) => mineralsMined >= 100000,
        achieved: false
    }
  ];
  
  function checkAchievements(...args) {
    for (const achievement of achievements) {
      if (!achievement.achieved && achievement.condition(...args)) {
        achievement.achieved = true;
        console.log(`Achievement unlocked: ${achievement.name}`);
        applyProductionBoost();
      }
    }
  }

  function applyProductionBoost() {
    for (const mineralType in gameData.minerals) {
      const mineral = gameData.minerals[mineralType];
      mineral.perClick *= 1.01; // Increase perClick by 1%
    }
  }
  
  