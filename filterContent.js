var documentHeight;

$(document).ready(function() {
  documentHeight = $(document).height();
  performFiltering();
  // на странице просмотра видео блок "Up next" появляется с задержкой, прицепиться к событиям добавления элементов не удалось, поэтому так...
  window.setTimeout(performFiltering, 1000); 
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
        var keywordParts = keyword.split("///", 2);

        var keywordRegExp;
        if ((keywordParts == null) || (keywordParts.length == 0))
          keywordRegExp = new RegExp(keyword, "");
        else if (keywordParts.length == 1)
          keywordRegExp = new RegExp(keywordParts[0], "");
        else
          keywordRegExp = new RegExp(keywordParts[0], keywordParts[1]);

        var regExpResult = t.search(keywordRegExp);
        if (regExpResult != -1) {
          element.style.display = 'none';
          console.log("Filtered: " + t);
        }
      }
    }

  });
}
