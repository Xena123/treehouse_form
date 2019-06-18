// *** T-SHIRT INFO FUNCTIONALITY
  // when the dropdown menu is changed
  $('#design').change(function() {
    // find the option that has been selected
    $(this).find("option:selected").each(function() {
      const designOptionText = $(this).text();
      // find the value of the option element selected and store it
      const designOptionValue = $(this).attr('value');
      const colorOptions = $('#color option');

      // hide the color dropdown if the selected design option text content is "Select Theme"
      if (designOptionText === 'Select Theme') {
        colorDropdown.hide();
      // otherwise show it
      } else {
        colorDropdown.show();
      }

      // if the value of the option selected equals 'js puns'
      if (designOptionValue === 'js puns') {
        // then loop through all the option elements
        $(colorOptions).each((index) => {
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
        $(colorOptions).each((index) => {
          let currentOptionText = ($(colorOptions[index]).text());
          $(colorOptions[index]).hide();
          if (currentOptionText.indexOf('I') >= 0) {
            $(colorOptions[index]).show();
          }
        });
      // else reset and show all the options
      } else {
        $(colorOptions).each((index) => {
          $(colorOptions[index]).show();
        }); 
      }
    });
  });
