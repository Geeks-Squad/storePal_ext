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
    http.open("POST", "http://128.199.81.127:5000/getdata", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = tab.url;
    http.send("url="+params);
    prev_tab_id = tabId;
  }
  else{
    if ((previous != tab.url) && (prev_tab_id != tabId)){
      var http = new XMLHttpRequest();
      http.open("POST", "http://128.199.81.127:5000/getdata", true);
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
     http.open("POST", "http://128.199.81.127:5000/getdata", true);
     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     var params = tab.url;
     http.send('url=' + params);
   }
});
//nudging
var opt = {
    type: "image",
    title: "Primary Title",
    message: "Primary message to display",
    imageUrl:"icon2.png",
    iconUrl: "icon2.png"
};
var str1="";
function pushNotification()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://128.199.81.127:5000/notify", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {

            str = xhr.responseText;
            if(str!=="null") {
                str = str.split(',');

                opt['title'] = str[0];
                opt['message'] = "Honeywell " + str[0] + " would be the best for you!";
                opt['imageUrl'] = "img/" + str[1] + ".jpg";
                chrome.notifications.create(opt);
                chrome.notifications.onClicked.addListener(function f() {
                    notify();
                });
            }
        }
    }
    xhr.send();
}
pushNotification();
function notify() {
    chrome.tabs.create({url: "http://www.honeywellstore.com/store/categories/honeywell-vacuums.htm"});
}


function myFunction() {
    console.log("flag");
    //    document.getElementById("sendreq").click();
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://128.199.81.127:5000/long_rec", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            //var resp = JSON.parse(xhr.responseText);
            console.log("check!")
            var str =xhr.responseText;
            str="Air_conditioning Air_purifier Doorbell Filter Generator Electric_heating Humidifier Electric_light Boot Personal_protective_equipment Home_security Thermostat Vacuum_cleaner Water_cooler"
            var res = str.split(" ");
            var res1=[];
            for(i=0;i<4;i++)
            {
                if(res[i].length>11)
                {
                    var k = res[i].substring(0,10);
                    res1.push(k.concat("..."));
                }
                else
                    res1.push(res[i]);

            }
            /*document.getElementById('A11').innerHTML=" "+res1[0];
            document.getElementById('a1').src="/img/"+res[0]+".jpg";
            document.getElementById('A12').innerHTML=" "+res1[1];
            document.getElementById('a2').src="/img/"+res[1]+".jpg";
            document.getElementById('A13').innerHTML=" "+res1[2];
            document.getElementById('a3').src="/img/"+res[2]+".jpg";
            document.getElementById('A14').innerHTML=" "+res1[3];
            document.getElementById('a4').src="/img/"+res[3]+".jpg";*/

            document.getElementById('B11').innerHTML=" "+res1[0];
            document.getElementById('b1').src="/img/"+res[0]+".jpg";
            document.getElementById('B12').innerHTML=" "+res1[1];
            document.getElementById('b2').src="/img/"+res[1]+".jpg";
            document.getElementById('B13').innerHTML=" "+res1[2];
            document.getElementById('b3').src="/img/"+res[2]+".jpg";
            document.getElementById('B14').innerHTML=" "+res1[3];
            document.getElementById('b4').src="/img/"+res[4]+".jpg";

        }
    }
    xhr.send();
}
myFunction();
function shortRecom() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://128.199.81.127:5000/session_rec", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            //var resp = JSON.parse(xhr.responseText);
            console.log("check!")
            var str =xhr.responseText;
            str="Air_conditioning Air_purifier Doorbell Filter Generator Electric_heating Humidifier Electric_light Boot Personal_protective_equipment Home_security Thermostat Vacuum_cleaner Water_cooler"
            var res = str.split(" ");
            var res1=[];
            for(i=0;i<4;i++)
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

           /* document.getElementById('B11').innerHTML=" "+res1[0];
            document.getElementById('b1').src="/img/"+res[0]+".jpg";
            document.getElementById('B12').innerHTML=" "+res1[1];
            document.getElementById('b2').src="/img/"+res[1]+".jpg";
            document.getElementById('B13').innerHTML=" "+res1[2];
            document.getElementById('b3').src="/img/"+res[2]+".jpg";
            document.getElementById('B14').innerHTML=" "+res1[3];
            document.getElementById('b4').src="/img/"+res[4]+".jpg";*/

        }
    }
    xhr.send();

}
shortRecom();
window.onload = function(){
        document.getElementById("notification").onclick = function() {showNotifications()};
    }

var s=" ";
function showNotifications() {

   // var res = sendtoShow();
    console.log("res",res);
    console.log("OUT s ",res);

    var x = document.getElementById("data");
    if (x.style.display === "none") {
        x.style.display = "block";
        //console.log("IN");
        document.getElementById('notinfo').innerHTML=" ";
    } else {
        var xhr = new XMLHttpRequest();
        var res=[],str1="",str2="",str3="",str4="",str5="";
        xhr.open("GET","http://128.199.81.127:5000/get_notification", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // JSON.parse does not evaluate the attacker's scripts.
                //var resp = JSON.parse(xhr.responseText);
                console.log("check!")
                var str =xhr.responseText;
                //console.log("GOT: ",str);
                res=str.split(",");
                s=str.split(",");
                s = "<div class=\"card bg-dark text-white\">\n" +
                    "    <div class=\"card-body\">"+res[0]+ "<i class=\"fa fa-star pull-right\" aria-hidden=\"true\"></i></div>\n" +
                    "  </div><br>" + "<div class=\"card bg-dark text-white\">\n" +
                    "    <div class=\"card-body\">"+res[1]+"<i class=\"fa fa-star pull-right\" aria-hidden=\"true\"></i></div>\n" +
                    "  </div><br>" + "<div class=\"card bg-dark text-white\">\n" +
                    "    <div class=\"card-body\">"+res[2]+"<i class=\"fa fa-star pull-right\" aria-hidden=\"true\"></i></div>\n" +
                    "  </div><br>" + "<div class=\"card bg-dark text-white\">\n" +
                    "    <div class=\"card-body\">"+res[3]+"<i class=\"fa fa-star pull-right\" aria-hidden=\"true\"></i></div>\n" +
                    "  </div><br>" + "<div class=\"card bg-dark text-white\">\n" +
                    "    <div class=\"card-body\">"+res[4]+"<i class=\"fa fa-star pull-right\" aria-hidden=\"true\"></i></div>\n" +
                    "  </div>";
                document.getElementById('notinfo').innerHTML=s;
            }
        };
        xhr.send();
        x.style.display = "none";
        console.log("OUT");
        console.log("ChECk:",s);

        //document.getElementById('notinfo').innerHTML=" ";
    }

    //console.log("CHeck!");
}

