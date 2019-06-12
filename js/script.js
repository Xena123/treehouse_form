$(document).ready(function() {
  // Add focus to name input on page load
  $("#name").focus();
  const otherTextInput = $('#other-title');

  // Hide the other text input to begin with
  otherTextInput.hide();

  // *** OTHER JOB ROLE FUNCTIONALITY
  // If the "other" option is selected then show the "other" text input
  // Else hide it
  $('#title').change(() => {
    $(this).find("option:selected").each(() => {
      const optionValue = $(this).attr("value");
      if (optionValue === 'other') {
        otherTextInput.show();
      } else {
        otherTextInput.hide();
      }
    });
  });

  // *** T-SHIRT INFO FUNCTIONALITY
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
        $(colorOptions).each((index, value) => {
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
        $(colorOptions).each((index, value) => {
          let currentOptionText = ($(colorOptions[index]).text());
          $(colorOptions[index]).hide();
          if (currentOptionText.indexOf('I') >= 0) {
            $(colorOptions[index]).show();
          }
        });
        // else reset and show all the options
      } else {
        $(colorOptions).each((index, value) => {
          $(colorOptions[index]).show();
        }); 
      }
    });
  });


  // *** ACTIVITIES SECTION FUNCTIONALITY
  let runningTotal = 0;
  // when the fieldset with the class '.activites' is clicked or changed
  $('.activities').change((event) => {
    let target = $(event.target);
    const activityLabels = document.querySelectorAll('.activities label');
    let clickedLabel = target.parent().text();
    // find the text between the '–' and the ',' of the clicked label 
    let clickedLabelDate = clickedLabel.match(" — (.*), ");
    // find the number after the dollar sign of the clicked label
    const clickedLabelAmt = clickedLabel.match(/\$(\d+)/);
    let amount = parseInt(clickedLabelAmt[1]);
    

    // and if the element clicked is an input
    if (target.is('input')) {
      // check to see if the text of the clicked input matches any of the other labels text
      $(activityLabels).each((index, value) => {
        let currentLabelText = value.textContent;
        let currentValue = $(value).find('input')[0];

        // if the input is checked
        if ((target).is(":checked")) {
          // and there is a date ie. the first one does not have a date so variable is null
          if (clickedLabelDate != null) {
            // loop through the labels and check if the date matches any of the other labels
            if ((currentLabelText !== clickedLabel) && (currentLabelText.indexOf(clickedLabelDate[1]) != -1)) {  
              $(currentValue).prop("disabled", true);
              $(value).css('color', 'grey');

            }
          }
        // else enable all the checkboxes and reset the color property
        } else {
          $(currentValue).prop("disabled", false);
          $(value).css('color', '');
        }
      });

      if ((target).is(":checked")) {
        runningTotal = runningTotal + amount;
        const costElement = `<p class="total">$${runningTotal}</p>`;
        if ($('.total')) {
          $('.total').remove();
        }
        $('.activities').append(costElement);
      }
    }
  });

  // *** PAYMENT FUNCTIONALITY
  const creditCardInfo = $('#credit-card');
  const paypalInfo = $('#paypalInfo');
  const bitcoinInfo = $('#bitcoinInfo');
  // hide paypal and bitcoin info divs to begin with
  paypalInfo.hide();
  bitcoinInfo.hide();
  // make sure you cannot select the first option of the payment method
  $("#payment option[value=select_method]").attr('disabled', true);

  // when an option from the payment dropdown menu is selected
  $('#payment').change(() => {
    // loop through the options
    $(this).find("option:selected").each(function() {
      const optionValue = $(this).attr("value");
      // hide and show based on selection
      if (optionValue === 'paypal') {
        paypalInfo.show();
        bitcoinInfo.hide();
        creditCardInfo.hide();
      } else if (optionValue === 'bitcoin') {
        bitcoinInfo.show();
        creditCardInfo.hide();
        paypalInfo.hide();
      } else if (optionValue === 'credit card') {
        creditCardInfo.show();
        bitcoinInfo.hide();
        paypalInfo.hide();
      } 
    });
  });

  // DYNAMIC FORM VALIDATION
  const invalidEmailMsg = $('<span class="invalidEmailMsg">Please enter a valid email address</span>');
  
  $('#mail').keyup((event) => {
    let inputValue = $(event.target).val();
    $('.invalidEmailMsg').remove();
    $('#mail').removeClass('invalid');


    if (inputValue.length != 0) {
      if (isValidEmailAddress(inputValue)) {
        console.log('valid email');
      } else {
        $('label[for="mail"]').after(invalidEmailMsg);
        $('#mail').addClass('invalid');
      }
    }
  });

  // FORM VALIDATION ON SUBMIT
  $('#submit').click((event) => {
    const emailAddress = $('#mail').val();
    const name = $('#name').val();
    $('.invalidEmailMsg').remove();
    $('.error').remove();
    $('input').removeClass('invalid');

    if (!(isValidEmailAddress(emailAddress))) {
      event.preventDefault();
      $('label[for="mail"]').after(invalidEmailMsg);
      $('#mail').addClass('invalid');
      $("html, body").animate({ scrollTop: 0 }, "slow");
      
    }
    if (name.length < 1) {
      event.preventDefault();
      $('label[for="name"]').after('<span class="error">This field is required</span>');
      $('#name').addClass('invalid');
      $("html, body").animate({ scrollTop: 0 }, "slow");
     
    }
    
  });


  
});

const isValidEmailAddress = (emailAddress) => {
  const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
}