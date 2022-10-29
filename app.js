$(document).ready(function () {

  //intialize variables
  var beef = 0;
  var swords = 0;
  var money = 0;
  var beefPlus = 1;
  var autoBeefPlus = 0;
  var autoAttackerPrice = 100;
  var swordPrice = 50;
  var beefPrice = 1;
  var menu;
  var autoBeefPlusUpgCost = 100;
  var totalSwordUpgrades = 8;
  var clickAttack = 1;
  var totalBeef = 0;
  var isDone = false;
  var inflationNum = 100;
  var autoSellPrice = 100;
  var isUpgraded = false;
  var isMonsterUnlocked = true;


  // gives 1 beef every second per each minion
  setInterval(function () {
    if (autoBeefPlus > 0 && !isUpgraded) {
      checktotalBeef(totalBeef, totalBeef + beefPlus);
      beef += autoBeefPlus;
      totalBeef += autoBeefPlus;
      updateInventory();
      updateMarket();
      console.log(totalBeef);
    }
    else if (autoBeefPlus > 0) {
      checktotalBeef(totalBeef, totalBeef + beefPlus);
      money += autoBeefPlus;
      totalBeef += autoBeefPlus;
      updateInventory();
      updateMarket();
      console.log(totalBeef);
    }
  }, 1000);

  function checktotalBeef(preTotalBeef, postTotalBeef) {
    if (preTotalBeef < inflationNum && postTotalBeef >= inflationNum) {
      beefPrice /= 2;
      console.log(beefPrice);
    }
  }

  //Attacks and gives you beef.
  $("#attackcow").click(function () {
    checktotalBeef(totalBeef, totalBeef + beefPlus);
    beef += beefPlus;
    totalBeef += beefPlus;
    updateInventory();
    updateMarket();
    updateAttack();
  });


  // Sell functions
  $("#sell1").click(function () {
    beef--;
    money += beefPrice;
    updateInventory();
    updateMarket();
  });

  $("#sell10").click(function () {
    beef -= 10;
    money += beefPrice * 10;
    updateInventory();
    updateMarket();
  });

  $("#sellAll").click(function () {
    money += beefPrice * beef;
    beef = 0;
    updateInventory();
    updateMarket();
  });

  //Buys a minion.
  $("#autoAttacker").click(function () {
    if (money >= autoAttackerPrice) {
      money -= autoAttackerPrice;
      autoBeefPlus++;
      autoAttackerPrice *= 4;
      updateInventory();
      updateMarket();
      $("#autoAttacker").html("Buy 1 minion for $" + autoAttackerPrice);
    }
  });

  //Buys a sword upgrade.
  $("#buySword").click(function () {
    if (money >= swordPrice && swords < totalSwordUpgrades) {
      money -= swordPrice;
      swords++;
      swordPrice *= 2;
      updateInventory();
      updateMarket();
      updateSword();
      $("#buySword").html("Buy Sword Upgrade $" + swordPrice);
    } else {
      document.getElementById("moneys").innerHTML = 'You dont have enough to purchase a sword!';
    }
  });

  $("#monsters").click(function () {
    menu = switchMenu("monsterden");
    updateMonsterDen();
  });
  // visit marketplace and return to main menu functions
  $("#visit").click(function () {
    menu = switchMenu("marketplace");
    updateMarket();
  });

  $(".return").click(function () {
    menu = switchMenu("main");
    document.getElementById("moneys").innerHTML = "";
  });

  // add upgrade functionality to minion, doesnt work atm
  $("#upgradeMinion").click(function () {
    if (money >= autoBeefPlusUpgCost) {
      money -= autoBeefPlusUpgCost;
      autoBeefPlus *= 2;
      autoBeefPlusUpgCost *= 4;
      $("#upgradeMinion").html("Buy minion upgrade $ " + autoBeefPlusUpgCost);
    }
  });

  $("#autoSellUpgrade").click(function () {
    if (money >= autoSellPrice && !isUpgraded) {
      money -= autoSellPrice;
      isUpgraded = true;
    } else {
      console.log("You alreay have this upgrade!")

    }
  });

  //Updates inventory
  function updateInventory() {
    $("#money").html("Money: $" + money);

    if (beef == 1) {
      $("#beef").html("You now own " + beef + " beef.");
    } else {
      $("#beef").html("You now own " + beef + " beef.");
    }
    if (swords == 1) {
      $("#swords").html("You now own a bronze sword.");

    } else if (swords == 2) {
      $("#swords").html("You now own a iron sword.");
    }
    else if (swords == 3) {
      $("#swords").html("You now own an gold sword.");
    }
    else if (swords == 4) {
      $("#swords").html("You now own a steel sword.");
    }
    else if (swords == 5) {
      $("#swords").html("You now own an adamantite sword.");
    }
    else if (swords == 6) {
      $("#swords").html("You now own a rune sword.");
    }
    else if (swords == 7) {
      $("#swords").html("You now own a dragon sword.");
    }
    else if (swords == 8) {
      $("#swords").html("You now own a god sword.");
    }
    else {
      $("#swords").html("You now own " + swords + " swords.");
    }
  }

  //Updates attack based on achievement level.

  function updateAttack() {
    if (!isDone && totalBeef > 500) {
      clickAttack += 5;
      console.log(beefPlus)
      isDone = true;
    }
    else {
    }
  }

  //Updates sword damage.
  function updateSword() {
    var pow = 2;
    pow = pow++;
    beefPlus = Math.pow(swords + 1 + clickAttack, pow);
    console.log(beefPlus);
  }

  function updateMonsterDen() {
    if (isMonsterUnlocked = true) {
      $("#attackchicken").show();
    } else { 
      $("#attackchicken").hide();
    }
  }
  //Updates market
  function updateMarket() {
    if (beef > 0) {
      $("#sellAll").css("display", "inline-block");
    } else {
      $("#sellAll").css("display", "none");
    }
    if (beef >= 1) {
      $("#sell1").css("display", "inline-block");
    } else {
      $("#sell1").css("display", "none");
    }
    if (beef >= 10) {
      $("#sell10").css("display", "inline-block");
    } else {
      $("#sell10").css("display", "none");
    }
    if (money >= autoAttackerPrice) {
      $("#autoAttacker").css({ "display": "inline-block", "background-color": "purple" });
    } else {
      $("#autoAttacker").css("background-color", "grey");
    }
    if (money >= swordPrice && swords < totalSwordUpgrades) {
      $("#buySword").css({ "display": "inline-block", "background-color": "purple"});
    } else if (money < swordPrice && swords < totalSwordUpgrades) {
      $("#buySword").css("background-color", "grey");
    } else {
      $("#buySword").css("display", "none");
    }
    if (money >= autoBeefPlusUpgCost && autoBeefPlus > 0) {
      $("#upgradeMinion").css({ "display": "block", "background-color": "white" });
    } else {
      $("#upgradeMinion").css("background-color", "grey");
    }
    if (money >= autoSellPrice && autoBeefPlus > 0) {
      $("#autoSellUpgrade").css({ "display": "block", "background-color": "white" });
    } else {
      $("#autoSellUpgrade").css("background-color", "grey");
    }

  }

  function switchMenu(menu) {
    $(".menus").children().css("display", "none");
    $("." + menu).css("display", "block");
    return menu;
  }

});
