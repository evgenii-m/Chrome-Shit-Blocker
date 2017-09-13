var filteredElements = $("ytd-grid-video-renderer");

console.log(filteredElements.length);

chrome.storage.sync.get({'dictionary': []}, function (result) {  
  for (var keyword in result.dictionary) {
    console.log(keyword);
  }
});
