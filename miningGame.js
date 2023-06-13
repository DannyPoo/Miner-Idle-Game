document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("buttonsContainer").addEventListener("click", function(event) {
    const target = event.target;

    if (target.tagName.toLowerCase() === "button") {
      const mineralType = target.getAttribute("data-mineral");

      if (target.id.startsWith("mine")) {
        mineMineral(mineralType);
      }

      if (target.id.startsWith("buy")) {
        buyPerClickUpgrade(mineralType);
      }
    }
  });

  // Add an event listener to the stats button to switch to the stats screen
  document.getElementById("statsBtn").addEventListener("click", function() {
    document.getElementById("miningScreen").style.display = "none";
    document.getElementById("statsScreen").style.display = "block";
  });
  
  // Add an event listener to the back button to switch back to the mining screen
  document.getElementById("backToMiningBtn").addEventListener("click", function() {
    document.getElementById("statsScreen").style.display = "none";
    document.getElementById("miningScreen").style.display = "block";
  });
});
