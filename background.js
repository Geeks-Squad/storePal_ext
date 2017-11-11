chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    chrome.tabs.getSelected(null,function(tab) {
        document.getElementById("url").value  = tab.url;
        document.getElementById("tabid").value = tab.id;
    });
    document.getElementById("time").value = Date();
    document.getElementById("submit").click();
},{urls: [ "<all_urls>" ]},['requestHeaders','blocking']);
