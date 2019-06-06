$(document).ready(function() {
  // Add focus to name input on page load
  $("#name").focus();

  // create the other input field and append to the document
  // const firstfield = $("#form fieldset:first-child");

  // const otherTextInput = $("<input type=\"text\" id=\"other-title\" placeholder=\"Your Job Role\" />");;
  // $(firstfield).append(otherTextInput);

  const otherTextInput = $('#other-title');

  // Hide the other text input to begin with
  $(otherTextInput).hide();

  // If the other option is selected then show the other text input
  // Else hide it
  $('#title').change(function() {
    $(this).find("option:selected").each(function() {
      const optionValue = $(this).attr("value");
      if (optionValue === 'other') {
        $(otherTextInput).show();
      } else {
        $(otherTextInput).hide();
      }
    });
  });


  $('#design').change(function() {
    $(this).find("option:selected").each(function() {
      const designOptionValue = $(this).attr("value");
      const colorOptions = $('#color option');

      if (designOptionValue === 'js puns') {
        $(colorOptions).each(function (index, value) {
          let currentOptionText = ($(colorOptions[index]).text());
          $(colorOptions[index]).hide();
          if (currentOptionText.indexOf('Puns') >= 0) {
            $(colorOptions[index]).show();
          }
        });
      } else if (designOptionValue === 'heart js') {
        $(colorOptions).each(function (index, value) {
          let currentOptionText = ($(colorOptions[index]).text());
          $(colorOptions[index]).hide();
          if (currentOptionText.indexOf('I') >= 0) {
            $(colorOptions[index]).show();
          }
        });
      } else {
        $(colorOptions).each(function (index, value) {
          $(colorOptions[index]).show();
        }); 
      }
    });
  });
});