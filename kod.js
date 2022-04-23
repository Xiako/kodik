var token = "5138867062:AAFguVKUBjTwEkdOKAnaNcp4K5AHKZnfpzc"; 
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbxo-s39ENdpkgbvI4xwmko30suuIC1QWGFj3BaRTVRBu0_jmtqxNCxmijqyA8Sva6xsuA/exec";

function setWebhook() {
var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
var response = UrlFetchApp.fetch(url);
}

function sendMessage(chat_id, text) {
var url = telegramUrl + "/sendMessage?chat_id=" + chat_id + "&text="+ text;
var response = UrlFetchApp.fetch(url);
Logger.log(response.getContentText()); 
}

function doPost(e) {
  var contents = JSON.parse(e.postData.contents);
  var chat_id = contents.message.from.id; 
  var text = contents.message.text;//"Beep boop bop, message received.";
  sendMessage(chat_id,findbytable(text.toLowerCase()))

}


function findbytable(text) {
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1LqJzWRRIk2hrlVCoQHCOyyKLmDEcwjYvuvQ2ddMbt48/edit');
  //Logger.log(ss.getName());
  var sheet = ss.getActiveSheet();//SpreadsheetApp.getActiveSpreadsheet()
  var arrData = sheet.getRange(1, 1, sheet.getLastRow(),sheet.getLastColumn()).getDisplayValues() 
  // Или = sheet.getDataRange().getDisplayValues()
  for(var row = 0; row<arrData.length; row++){
    //for(var col = 0; col<arrData[0].length; col++){
      if(arrData[row][0] == text){
        return "начальные: "+arrData[row][1]+" наличные: "+arrData[row][2]+" безналичные: "+arrData[row][3]+" поставщик: "+arrData[row][5]+" остаток: "+arrData[row][6]
      }
    //}
  }
  return "ой!"
}   

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function test () {
  Logger.log(getRandomInRange(1, 3))
}
