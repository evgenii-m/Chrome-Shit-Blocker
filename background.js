
chrome.tabs.query({'url': 'https://www.youtube.com/*'}, function(tabs) {
	for (var tab in tabs) {
	  chrome.tabs.executeScript(tab.id, { file: "filterContent.js" });
	}
});
