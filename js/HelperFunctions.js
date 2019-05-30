// Helper Functionsby Philipp Rappold
// https://codepen.io/rppld/pen/KpbZWY

// hasClass
function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

// toggleClass
function toggleClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  } else {
    elem.className += ' ' + className;
  }
}

// select
function select(selector) {
  var elements = document.querySelectorAll(selector);

  if (elements.length > 1) {
    return elements;
  } else {
    return elements.item(0);
  }
}