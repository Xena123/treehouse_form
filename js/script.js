$(document).ready(function() {
  // Add focus to name input on page load
  $("#name").focus();

  const otherTextInput = $('#other-title');

  // Hide the other text input to begin with
  otherTextInput.hide();

  // If the "other" option is selected then show the "other" text input
  // Else hide it
  $('#title').change(function() {
    $(this).find("option:selected").each(function() {
      const optionValue = $(this).attr("value");
      if (optionValue === 'other') {
        otherTextInput.show();
      } else {
        otherTextInput.hide();
      }
    });
  });

  // when the dropdown menu is changed
  $('#design').change(function() {
    // find the option that has been selected
    $(this).find("option:selected").each(function() {
      // find the value of the option element selected and store it
      const designOptionValue = $(this).attr('value');
      const colorOptions = $('#color option');

      // if the value of the option selected equals 'js puns'
      if (designOptionValue === 'js puns') {
        // then loop through all the option elements
        $(colorOptions).each(function (index, value) {
          let currentOptionText = ($(colorOptions[index]).text());
          // first hide all the option elements
          $(colorOptions[index]).hide();
          // then if any of them match 'puns' then show them
          if (currentOptionText.indexOf('Puns') >= 0) {
            $(colorOptions[index]).show();
          }
        });
        // the same for 'heart js'
      } else if (designOptionValue === 'heart js') {
        $(colorOptions).each(function (index, value) {
          let currentOptionText = ($(colorOptions[index]).text());
          $(colorOptions[index]).hide();
          if (currentOptionText.indexOf('I') >= 0) {
            $(colorOptions[index]).show();
          }
        });
        // else reset and show all the options
      } else {
        $(colorOptions).each(function (index, value) {
          $(colorOptions[index]).show();
        }); 
      }
    });
  });

  // when the fieldset with the class '.activites' is clicked or changed
  $('.activities').change(function(event) {
    let target = $(event.target);
    const activityLabels = document.querySelectorAll('.activities label');
    // and if the element clicked is an input
    if (target.is('input')) {
      let clickedLabel = target.parent().text();
      // find the text between the – and the , and store it in a variable
      let clickedLabelDate = clickedLabel.match(" — (.*), ");
      
      // check to see if the text of the clicked input matches any of the other labels text
      $(activityLabels).each(function (index, value) {
        let currentLabelText = value.textContent;
        if (clickedLabelDate != null) {
          if ((currentLabelText !== clickedLabel) && (currentLabelText.indexOf(clickedLabelDate[1]) != -1)) {
              let currentValue = $(value).find('input')[0];
              $(currentValue).attr('disabled', true);
              $(value).css('color', 'grey');
          }
        }
      });
    }
  });


});