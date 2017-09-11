
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function addKeywordToDictionary(keyword) {
  chrome.storage.sync.get({'dictionary': {}}, function (result) {
    var dictionary = result.dictionary;
    var id = uuidv4();
    dictionary[id] = keyword;
    chrome.storage.sync.set({'dictionary': dictionary}, function() {
        console.log('New keyword [' + keyword + '] saved to dictionary.');
        appendKeywordToDictionaryBlock(keyword, id);
    });
  });
}

function removeKeywordFromDictionary(id) {
  chrome.storage.sync.get({'dictionary': {}}, function (result) {
    var dictionary = result.dictionary;
    var keyword = dictionary[id];
    delete dictionary[id];
    chrome.storage.sync.set({'dictionary': dictionary}, function() {
        console.log('Keyword [' + keyword + '] removed from dictionary.');
        removeKeywordFromDictionaryBlock(id);
    });
  });
}

function appendKeywordToDictionaryBlock(keyword, id) {
  var item = $("<li/>", {
    id: id,
    class: "dictionary-item"
  }).appendTo($("#dictionary"));

  $("<div/>", {
    text: keyword,
    class: "dictionary-item-text"
  }).appendTo(item);

  var removeButton = $("<button/>", {
    text: "X",
    class: "dictionary-item-remove-button"
  }).appendTo(item);

  removeButton.click(function() {
    var keywordId = $(this).parent().attr('id');
    removeKeywordFromDictionary(keywordId);
  });
}

function removeKeywordFromDictionaryBlock(id) {
  $('.dictionary-item#' + id).remove();
}
  
function fillDictionaryBlock() {
  chrome.storage.sync.get({'dictionary': []}, function (result) {
    var dictionary = result.dictionary;
    for (var id in dictionary) {
      appendKeywordToDictionaryBlock(dictionary[id], id);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {

  fillDictionaryBlock();

  $('#addButton').click(function() {
    var keyword = $('#keywordInput').val();
    addKeywordToDictionary(keyword);
    $('#keywordInput').val('');
  });

  $("#applyButton").click(function() {
  });

  $("#offButton").click(function() {
  });

  $("#clearButton").click(function() {
    chrome.storage.sync.clear(function() {
      $("#dictionary").empty();
    });
  });

});
