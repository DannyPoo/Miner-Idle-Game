document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("buttonsContainer").addEventListener("click", function(event) {
    const target = event.target;
    const mineralType = target.getAttribute("data-mineral");

    if (target.tagName.toLowerCase() === "button") {
      if (target.id.startsWith("mine")) {
        if (mineralType === "coal" || mineralType === "gold") {
          const canvas = document.createElement("canvas");
          canvas.width = target.offsetWidth;
          canvas.height = target.offsetHeight;
          const context = canvas.getContext("2d");
          const image = new Image();
          image.src = `sources/${mineralType}.png`;
          image.crossOrigin = "Anonymous";
          image.onload = function() {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            const pixelData = context.getImageData(event.offsetX, event.offsetY, 1, 1).data;
            if (pixelData[3] !== 0) {
              mineMineral(mineralType);
            }
          };
        } else {
          mineMineral(mineralType);
        }
      }

      if (target.id.startsWith("buy")) {
        buyPerClickUpgrade(mineralType);
      }
    }
  });

  // Add an event listener to the stats button to switch to the stats screen
  document.getElementById("statsBtn").addEventListener("click", function() {
    document.getElementById("miningScreen").style.display = "none";
    document.getElementById("prestigeScreen").style.display = "none";
    document.getElementById("statsScreen").style.display = "block";
  });
  
  // Add an event listener to the back button to switch back to the mining screen
  document.querySelectorAll(".backToMiningBtn").forEach(btn => {
    btn.addEventListener("click", function() {
      document.getElementById("statsScreen").style.display = "none";
      document.getElementById("prestigeScreen").style.display = "none";
      document.getElementById("miningScreen").style.display = "block";
    });
  });

  document.getElementById("prestigeBtn").addEventListener("click", function(){
    prestige();
  })

});