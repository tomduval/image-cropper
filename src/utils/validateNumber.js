/**
 * for onKeyPress event
 * @param evt
 * @param first_zero_accept
 * @param float
 */

const validateNumber = (evt, first_zero_accept = false, float = true) => {
  var theEvent = evt || window.event;
  var key;
  // Handle paste
  if (theEvent.type === "paste") {
    key = window.event.clipboardData.getData("text/plain");
  } else {
    // Handle key press
    key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  let regex;

  if (float === false) {
    regex = /^[0-9]*$/;
  } else {
    regex = /^[0-9|.]*$/;
  }

  var firstKey = true;

  if (first_zero_accept === false) {
    if (theEvent.target.selectionStart === 0) {
      firstKey = key === 0 ? false : true;
    }
  }

  if (!regex.test(key) || !firstKey) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
};

export default validateNumber;
