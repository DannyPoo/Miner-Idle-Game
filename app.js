$(document).ready(function () {

  //intialize variables
  var meats = 0;
  var swords = 0;
  var money = 0;
  var meatPlus = 1;
  var autoMeatsPlus = 0;
  var autoAttackerPrice = 100;
  var swordPrice = 50;
  var meatsPrice = 1;
  var menu;
  var autoMeatsPlusUpgCost = 100;
  var totalSwordUpgrades = 8;
  var clickAttack = 1;
  var totalMeats = 0;
  var isDone = false;
  var inflationNum = 100;
  var autoSellPrice = 100;


  // gives 1 meat every second per each minion
  setInterval(function(){
    if (autoMeatsPlus > 0){
    checkTotalMeats(totalMeats, totalMeats + meatPlus);
    meats += autoMeatsPlus;
    totalMeats += autoMeatsPlus;
    updateInventory();
    updateMarket();
    console.log(totalMeats);
    }
  }, 1000);

  function checkTotalMeats(pretotalMeats, postTotalMeats){
    if(pretotalMeats < inflationNum && postTotalMeats >= inflationNum){
      meatsPrice/=2;
      console.log(meatsPrice);
     }
  }

  //Attacks and gives you meat.
  $("#attack").click(function () {
    checkTotalMeats(totalMeats, totalMeats + meatPlus);
    meats += meatPlus;
    totalMeats += meatPlus;
    updateInventory();
    updateMarket();
    updateAttack();
  });


  // Sell functions
  $("#sell1").click(function(){
    meats --;
    money += meatsPrice;
    updateInventory();
    updateMarket();
  });

  $("#sell10").click(function(){
    meats-=10;
    money += meatsPrice *10;
    updateInventory();
    updateMarket();
  });

  $("#sellAll").click(function(){
    money += meatsPrice * meats;
    meats = 0;
    updateInventory();
    updateMarket();
  });

  //Buys a minion.
  $("#autoAttacker").click(function(){
    money -= autoAttackerPrice;
    autoMeatsPlus++;
    autoAttackerPrice *=4;
    updateInventory();
    updateMarket();
    $("#autoAttacker").html("Buy 1 minion for $" + autoAttackerPrice);
  });

  //Buys a sword upgrade.
  $("#buySword").click(function(){
    if(money >= swordPrice && swords < totalSwordUpgrades){
    money -= swordPrice;
    swords++;
    swordPrice *= 2;
    updateInventory();
    updateMarket();
    updateSword();
    $("#buySword").html("Buy Sword Upgrade $" + swordPrice);
  } else {
    document.getElementById("moneys").innerHTML ='You dont have enough to purchase a sword!';
  }
  });


  // visit marketplace and return to main menu functions
  $("#visit").click(function () {
    menu = switchMenu("marketplace");
    updateMarket();
  });

  $("#return").click(function () {
    menu = switchMenu("main");
    document.getElementById("moneys").innerHTML = "";
  });

  // add upgrade functionality to minion, doesnt work atm
  $("#upgradeMinion").click(function (){
    if(money >= autoMeatsPlusUpgCost){
    money -= autoMeatsPlusUpgCost;
    autoMeatsPlus *= 2;
    autoMeatsPlusUpgCost *=4;
    $("#upgradeMinion").html("Buy minion upgrade $ " + autoMeatsPlusUpgCost);
    }
  });

  $("#autoSellUpgrade").click(function (){
    money -= autoSellPrice;
  });

  //Updates inventory
  function updateInventory() {
    $("#money").html("Money: $" + money);

    if (meats == 1) {
      $("#meats").html("You now own " + meats + " meats.");
    } else {
      $("#meats").html("You now own " + meats + " meats.");
    }
    if (swords == 1) {
      $("#swords").html("You now own a bronze sword.");
      
    }else if(swords == 2){
      $("#swords").html("You now own a iron sword.");
    }
    else if(swords == 3){
      $("#swords").html("You now own an gold sword.");
    }
    else if(swords == 4){
      $("#swords").html("You now own a steel sword.");
    }
    else if(swords == 5){
      $("#swords").html("You now own an adamantite sword.");
    }
    else if(swords == 6){
      $("#swords").html("You now own a rune sword.");
    }
    else if(swords == 7){
      $("#swords").html("You now own a dragon sword.");
    }
    else if(swords == 8){
      $("#swords").html("You now own a god sword.");
    }
    else {
      $("#swords").html("You now own " + swords + " swords.");
    }
  }

  //Updates attack based on achievement level.

function updateAttack(){
    if(!isDone && totalMeats > 500){
      clickAttack += 5;
      console.log(meatPlus)
      isDone = true;
    }
    else{
    }
  }

  //Updates sword damage.
  function updateSword(){
    var pow = 2;
    pow = pow++;
      meatPlus = Math.pow(swords + 1 + clickAttack, pow);
      console.log(meatPlus);
    }
    
  //Updates market
  function updateMarket() {
    if (meats > 0) {
      $("#sellAll").css("display", "block");
    } else {
      $("#sellAll").css("display", "none");
    }
    if (meats >= 1) {
      $("#sell1").css("display", "block");
    } else {
      $("#sell1").css("display", "none");
    }
    if (meats >= 10) {
      $("#sell10").css("display", "block");
    } else {
      $("#sell10").css("display", "none");
    }
    if(money >= autoAttackerPrice){
      $("#autoAttacker").css("display", "block");
    }else
    {
      $("#autoAttacker").css("display", "none");
    }
    if(money >= swordPrice && swords < totalSwordUpgrades){
      $("#buySword").css({"display": "block", "background-color": "white"});
    }else if( money < swordPrice && swords < totalSwordUpgrades)
    {
      $("#buySword").css("background-color", "grey");
    }else{
      $("#buySword").css("display", "none");
    } 
    if (money >= autoMeatsPlusUpgCost && autoMeatsPlus > 0){
      $("#upgradeMinion").css("display", "block");
    }else{
      $("#upgradeMinion").css("display", "none");
    }
    if (money >= autoSellPrice && autoMeatsPlus > 0){
      $("#autoSellUpgrade").css("display", "block");
    }else{
      $("#autoSellUpgrade").css("display", "none");
    }

  }

  function switchMenu(menu) {
    $(".menus").children().css("display", "none");
    $("." + menu).css("display", "block");
    return menu;
  }

});
