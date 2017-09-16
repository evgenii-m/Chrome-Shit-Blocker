var documentHeight;

$(document).ready(function() {
  documentHeight = $(document).height();
  applyFilter();
}); 

$(window).scroll(function() {
  var currentDocumentHeight = $(document).height();
  if (currentDocumentHeight != documentHeight) {
    documentHeight = currentDocumentHeight;
    applyFilter();    
  }
});

function applyFilter() {
  chrome.storage.sync.get({'dictionary': []}, function (result) {  
    console.log("Start filter content!");

    var elementsTitleMap = {};

    $("ytd-grid-video-renderer").each(function(i, e) {
      var videoTitle = $("a#video-title", e).text();
      elementsTitleMap[videoTitle] = e;
    });

    for (var keywordId in result.dictionary) {
      var keyword = result.dictionary[keywordId];
      for (var t in elementsTitleMap) {
        if (t.indexOf(keyword) != -1) {
          var element = elementsTitleMap[t];
          element.style.display = 'none';
          console.log(t);
        }
      }
    }
  });
}
