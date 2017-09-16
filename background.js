
chrome.tabs.executeScript({ file: "filterContent.js" }, function() {
  if (chrome.runtime.lastError) {
    console.log("ERROR: " + chrome.runtime.lastError.message);
  } 
});


// chrome.tabs.query({'url': 'https://www.youtube.com/*'}, function(tabs) {
// 	for (var tab in tabs) {
// 	  chrome.tabs.executeScript(tab.id, { file: "filterContent.js" });
// 	}
// });
