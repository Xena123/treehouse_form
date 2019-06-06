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
  $('#title').change(function(){
    $(this).find("option:selected").each(function(){
      var optionValue = $(this).attr("value");
      if (optionValue === 'other') {
        $(otherTextInput).show();
      } else {
        $(otherTextInput).hide();
      }
    });
  });




});