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
    http.open("POST", "http://127.0.0.1:8000/getdata/", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = tab.url;
    http.send("url="+params);
    prev_tab_id = tabId;
  }
  else{
    if ((previous != tab.url) && (prev_tab_id != tabId)){
      var http = new XMLHttpRequest();
      http.open("POST", "http://127.0.0.1:8000/getdata/", true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      var params = tab.url;
      http.send("url="+params);
      prev_tab_id = tabId;
    }
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
   if (tab.url != 'chrome://newtab/'){
     var http = new XMLHttpRequest();
     http.open("POST", "http://127.0.0.1:8000/getdata/", true);
     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     var params = tab.url;
     http.send("url="+params);
   }
});
