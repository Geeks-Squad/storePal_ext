var previous = ''
var prev_tab_id = -100
/*
chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  if (details.url != "http://127.0.0.1:8000/getdata/"){
    if (previous == ''){
      previous = details.url
      var http = new XMLHttpRequest();
      var params = "url=" + str(details.url)
      http.open("POST", "http://127.0.0.1:8000/getdata/", true);
      http.send(params)
    }
    else {
      if (previous != details.url)
      {
        previous = details.url
        var http = new XMLHttpRequest();
        var params = "url=" + str(details.url)
        http.open("POST", "http://127.0.0.1:8000/getdata/", true);
        http.send(params)
      }
    }
  }
},{urls: [ "<all_urls>" ]},['requestHeaders','blocking']);
*/
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (previous == ''){
    var http = new XMLHttpRequest();
    http.open("POST", "http://127.0.0.1:5000/getdata", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = tab.url;
    http.send("url="+params);
    prev_tab_id = tabId;
  }
  else{
    if ((previous != tab.url) && (prev_tab_id != tabId)){
      var http = new XMLHttpRequest();
      http.open("POST", "http://127.0.0.1:5000/getdata", true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      var params = tab.url;
      http.send('url=' + params);
      prev_tab_id = tabId;
    }
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
   if (tab.url != 'chrome://newtab/'){
     var http = new XMLHttpRequest();
     http.open("POST", "http://127.0.0.1:5000/getdata", true);
     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     var params = tab.url;
     http.send('url=' + params);
   }
});


function myFunction() {
    console.log("flag");
    //    document.getElementById("sendreq").click();
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:5000/sendData", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            //var resp = JSON.parse(xhr.responseText);
            console.log("check!")
            var str =xhr.responseText;
            str="Air_conditioning Air_purifier Doorbell Filter Generator Electric_heating Humidifier Electric_light Boot Personal_protective_equipment Home_security Thermostat Vacuum_cleaner Water_cooler"
            var res = str.split(" ");
            var res1=[];
            for(i=0;i<8;i++)
            {
                if(res[i].length>11)
                {
                    var k = res[i].substring(0,10);
                    res1.push(k.concat("..."));
                }
                else
                    res1.push(res[i]);

            }
            document.getElementById('A11').innerHTML=" "+res1[0];
            document.getElementById('a1').src="/img/"+res[0]+".jpg";
            document.getElementById('A12').innerHTML=" "+res1[1];
            document.getElementById('a2').src="/img/"+res[1]+".jpg";
            document.getElementById('A13').innerHTML=" "+res1[2];
            document.getElementById('a3').src="/img/"+res[2]+".jpg";
            document.getElementById('A14').innerHTML=" "+res1[3];
            document.getElementById('a4').src="/img/"+res[3]+".jpg";

            document.getElementById('B11').innerHTML=" "+res1[4];
            document.getElementById('b1').src="/img/"+res[4]+".jpg";
            document.getElementById('B12').innerHTML=" "+res1[5];
            document.getElementById('b2').src="/img/"+res[5]+".jpg";
            document.getElementById('B13').innerHTML=" "+res1[6];
            document.getElementById('b3').src="/img/"+res[6]+".jpg";
            document.getElementById('B14').innerHTML=" "+res1[7];
            document.getElementById('b4').src="/img/"+res[7]+".jpg";

        }
    }
    xhr.send();
}
myFunction();

