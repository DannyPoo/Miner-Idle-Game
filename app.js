$(document).ready(function () {
  var meats = 0;
  var swords = 0;
  var money = 0;
  var meatPlus = 1;
  var autoMeatsPlus = 0;
  var autoAttackerPrice = 100;
  var swordPrice = 50;
  var meatsPrice = 1;
  var menu;

  setInterval(function(){
    meats += autoMeatsPlus;
    updateInventory();
    updateMarket();
  }, 1000);

  $("#attack").click(function () {
    meats += meatPlus;
    updateInventory();
    updateMarket();
  });

  $("#sell1").click(function(){
    meats--;
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

  $("#autoAttacker").click(function(){
    money -= autoAttackerPrice;
    autoMeatsPlus++;
    autoAttackerPrice *=4;
    updateInventory();
    updateMarket();
  });

  $("#buySword").click(function(){
    money -= swordPrice;
    swords++;
    swordPrice *= 2;
    updateInventory();
    updateMarket();
    updateSword();
  });

  $("#visit").click(function () {
    menu = switchMenu("marketplace");
    updateMarket();
  });

  $("#return").click(function () {
    menu = switchMenu("main");
  });

  function updateInventory() {
    $("#money").html("Money: $" + money);
    $("#buySword").html("Buy Sword Upgrade " + swordPrice);

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
    else {
      $("#swords").html("You now own " + swords + " swords.");
    }
  }

  function updateSword(){
    var pow = 2;
    pow = pow++;
      meatPlus = Math.pow(swords + 1, pow);
      console.log(meatPlus);
    }
    
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

    if(money >= swordPrice && swords < 7){
      $("#buySword").css("display", "block");
    }else
    {
      $("#buySword").css("display", "none");
    }

  }

  function switchMenu(menu) {
    $(".menus").children().css("display", "none");
    $("." + menu).css("display", "block");
    return menu;
  }

});
