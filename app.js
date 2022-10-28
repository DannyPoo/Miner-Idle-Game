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
    changeInventory();
    changeMarket();
  }, 1000);

  $("#attack").click(function () {
    meats += meatPlus;
    changeInventory();
    changeMarket();
  });

  $("#sell1").click(function(){
    meats--;
    money += meatsPrice;
    changeInventory();
    changeMarket();
  });

  $("#sell10").click(function(){
    meats-=10;
    money += meatsPrice *10;
    changeInventory();
    changeMarket();
  });

  $("#sellAll").click(function(){
    money += meatsPrice * meats;
    meats = 0;
    changeInventory();
    changeMarket();
  });

  $("#autoAttacker").click(function(){
    money -= autoAttackerPrice;
    autoMeatsPlus++;
    changeInventory();
    changeMarket();
  });

  $("#buySword").click(function(){
    money -= swordPrice;
    swords++;
    changeInventory();
    changeMarket();
    changeAttack();
  });

  $("#visit").click(function () {
    menu = switchMenu("marketplace");
    changeMarket();
  });

  $("#return").click(function () {
    menu = switchMenu("main");
  });


  function changeInventory() {
    $("#money").html("Money: $" + money);

    if (meats == 1) {
      $("#meats").html("You now own " + meats + " meats.");
    } else {
      $("#meats").html("You now own " + meats + " meats.");
    }
    if (swords > 0) {
      $("#swords").html("You now own " + swords + " swords.");
    } else {
      $("#swords").html("You now own " + swords + " swords.");
    }
  }

  function changeAttack(){
      meatPlus = Math.floor(Math.log(swords)+2);
      console.log(meatPlus);
    }

  function changeMarket() {
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

    if(money >= swordPrice){
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
