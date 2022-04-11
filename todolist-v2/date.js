
exports.getDate=function (){
let today = new Date();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
let currentDay = today.getDay();
let day = today.toLocaleDateString("en-US", options);
return day
}