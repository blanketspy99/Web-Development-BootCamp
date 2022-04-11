
$("h1").css("color", "red");
$(document).on("keypress",function(event){
    console.log(event);
    $("h1").text(event.key);
});