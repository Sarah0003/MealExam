
  



 $(document).ready(function() {
  //loading page
  $("#spinner").fadeOut(1000,function(){
    $("#loading").fadeOut(1000,function(){
      $("body").css("overflow","auto");
      $("#loading").remove();
    });
  })

//scrollBehavior: 
$("a[href^='#']").click(function (eventInfo) { 
  let aHref=eventInfo.target.getAttribute("href");
  var sectionOffset= $(aHref).offset().top;

  $("html,body").animate({scrollTop:sectionOffset},500)
});


  //Open Menue
  $("#menueIcon").click(function () { 
    $("#menue").animate({width:'200px'});
    $("#menueIcon").animate({"left":"10%"});
  });
  //Close Menue
  $("#closeBtn").click(function () { 
    $("#menue").animate({width:'0px'});
    $("#menueIcon").animate({"left":"0%"});
  });

//Second section
  $(".innerContent").hide();
  
  $(".sectionHeader").click(function() {
    $('.innerContent').not($(this).next()).slideUp(200,"linear");
    $(this).next(".innerContent").slideToggle(200,"linear");
  });


});






var countDownDate = new Date("Jan 1, 2024 00:00:00").getTime();

var x = setInterval(function() {

  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("day").innerHTML = days+" days";
  document.getElementById("hour").innerHTML = hours+" hr";
  document.getElementById("min").innerHTML = minutes+" min";
  document.getElementById("sec").innerHTML = seconds+" sec";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);




