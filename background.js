
function performFiltering() {
  chrome.tabs.executeScript({ file: "filterContent.js" }, function() {
    if (chrome.runtime.lastError) {
      console.log("ERROR: " + chrome.runtime.lastError.message);
    } 
  });
}

$(document).ready(function() {
  performFiltering();
});
