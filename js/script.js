
const isValidEmailAddress = (emailAddress) => {
  const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
}

const hideAndShow = (varShow, varHide1, varHide2) => {
  varShow.show();
  varHide1.hide();
  varHide2.hide();
}

const invalidFormField = (varToAdErrorMsg, errorMsg, varToAddClass) => {
  event.preventDefault();
  $(varToAdErrorMsg).after(errorMsg);
  $(varToAddClass).addClass('invalid');
}


$(document).ready(function() {
  // Add focus to name input on page load
  $("#name").focus();
  const otherTextInput = $('#other-title');
  const colorDropdown = $('#colors-js-puns');

  // Hide the other text input to begin with
  otherTextInput.hide();
  // Hide the other color dropdown to begin with
  colorDropdown.hide();
  // Select credit card option by default
  $('#payment option[value="credit card"]').attr("selected", true);

  // *** OTHER JOB ROLE FUNCTIONALITY
  // If the "other" option is selected then show the "other" text input
  // Else hide it
  $('#title').change(function() {
    $(this).find("option:selected").each(function() {
      const optionValue = $(this).attr("value");
      console.log(optionValue);
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

      // only show the color dropdown if the either of the color options are picked
      if ((designOptionValue === 'js puns') || (designOptionValue === 'heart js')) {
        colorDropdown.show();
      // otherwise hide it again
      } else {
        colorDropdown.hide();
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
    

    if ($('.total')) {
      $('.total').remove();
    }

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
        let costElement = `<p class="total">Total: $${runningTotal}</p>`;
        $('.activities').append(costElement);
      } else {
        runningTotal = runningTotal - amount;
        let costElement = `<p class="total">Total: $${runningTotal}</p>`;
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
  $('#payment option[value="select_method"]').attr('disabled', true);

  // when an option from the payment dropdown menu is selected
  $('#payment').change(() => {
    // loop through the options
    $(this).find("option:selected").each(function() {
      const optionValue = $(this).attr("value");
      // hide and show based on selection
      if (optionValue === 'paypal') {
        hideAndShow(paypalInfo, bitcoinInfo, creditCardInfo);
      } else if (optionValue === 'bitcoin') {
        hideAndShow(bitcoinInfo, creditCardInfo, paypalInfo);
      } else if (optionValue === 'credit card') {
        hideAndShow(creditCardInfo, bitcoinInfo, paypalInfo);
      } 
    });
  });

  // DYNAMIC FORM VALIDATION
  const invalidEmailMsg = $('<span class="error error--email">Please enter a valid email address</span>');
  
  $('#mail').keyup((event) => {
    let inputValue = $(event.target).val();
    $('.error--email').remove();
    $('#mail').removeClass('invalid');

    if (inputValue.length != 0) {
      if (!(isValidEmailAddress(inputValue))) {
        $('label[for="mail"]').after(invalidEmailMsg);
        $('#mail').addClass('invalid');
      }
    }
  });

  // FORM VALIDATION ON SUBMIT
  $('#submit').click((event) => {
    const emailAddress = $('#mail').val();
    const name = $('#name').val();
    const actCheckboxes = $('.activities input:checked').length;
    const selectedPayment = $('#payment option:selected').text();
    const cvvRegex = /^[0-9]{3}$/;
    const ccRegex = /^[0-9]{13,16}$/;
    const zipRegex = /^[0-9]{5}$/;
    const cvvVal = $('#credit-card #cvv').val();
    const cardVal = $('#credit-card #cc-num').val();
    const zipVal = $('#credit-card #zip').val();

    $('.invalidEmailMsg').remove();
    $('.error').remove();
    $('input').removeClass('invalid');

    // if email address is invalid
    if (!(isValidEmailAddress(emailAddress))) {
      invalidFormField('label[for="mail"]', invalidEmailMsg, '#mail');
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    // if name input is empty
    if (name.length < 1) {
      invalidFormField('label[for="name"]', '<span class="error error--name">This field is required</span>', '#name');
      $("html, body").animate({ scrollTop: 0 }, "slow"); 
    }
    
    // if none of the checkboxes in the activities section are checked
    if (actCheckboxes === 0) {
      event.preventDefault();
      $('.activities legend').after('<span class="error error--activities">Please check at least one box</span>');
    }
    
    // if credit card payment option is selected
    if (selectedPayment === 'Credit Card') {
      // if the cvv number is not 3 digits long
      if ((cvvRegex.exec(cvvVal)) === null) {
        invalidFormField('label[for="cvv"]', '<span class="error error--cvv">Invalid CVV</span>', '#cvv');
      }
      // if the credit card number is not between 13 and 16 digits long
      if ((ccRegex.exec(cardVal)) === null) {
        invalidFormField('label[for="cc-num"]', '<span class="error error--cc">Please enter a number between 13 and 16 digits long</span>', '#cc-num');
      }
      // if the zip code number is not 5 digits long
      if ((zipRegex.exec(zipVal)) === null) {
        invalidFormField('label[for="zip"]', '<span class="error error--zip">Invalid Zip Code</span>', '#zip');
      }
    }
  });
});
