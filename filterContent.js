var documentHeight;

$(document).ready(function() {
  documentHeight = $(document).height();
  performFiltering();
}); 

$(window).scroll(function() {
  var currentDocumentHeight = $(document).height();
  if (currentDocumentHeight > documentHeight) {
    documentHeight = currentDocumentHeight;
    performFiltering();    
  }
});

function performFiltering() {
  chrome.storage.sync.get({'dictionary': []}, function (result) {  
    console.log("Start filter content!");

    var elementsMap = {};

    $("ytd-video-renderer,ytd-grid-video-renderer,ytd-compact-video-renderer").each(function(i, e) {
      var videoTitle = $("a#video-title,span#video-title", e).text();
      elementsMap[videoTitle] = e;
    });

    for (var t in elementsMap) {
      var element = elementsMap[t];
      element.style.display = 'inline-block';
      for (var keywordId in result.dictionary) {
        var keyword = result.dictionary[keywordId];
        if (t.indexOf(keyword) != -1) {
          element.style.display = 'none';
          console.log("Filtered: " + t);
        }
      }
    }

  });
}
