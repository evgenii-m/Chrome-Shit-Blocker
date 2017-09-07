
var dictionary = [ "val1", "val2" ];

function addKeyToDictionary(key) {
  dictionary.push(key);
}
  
function fillDictionaryBlock() {
  for (i = 0; i < dictionary.length; i++) {
    
    var item = $("<li/>", {
      id: "dictionaryItem" + i,
      class: "dictionary-item"
    }).appendTo($("#dictionary"));

    $("<div/>", {
      text: dictionary[i],
      class: "dictionary-item-text"
    }).appendTo(item);

    $("<button/>", {
      text: "Remove",
      class: "dictionary-item-remove-button"
    }).appendTo(item);

  }

}

document.addEventListener('DOMContentLoaded', function () {

  fillDictionaryBlock();

  $('#addButton').click(function() {
    var key = $('#keyWordInput').val();
    addKeyToDictionary(key);
  });

  $("#applyButton").click(function() {
  });

  $("#offButton").click(function() {
  });

});
