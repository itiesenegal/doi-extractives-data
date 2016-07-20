(function(exports) {

  var EXPANDED = 'aria-expanded';
  var HIDDEN = 'aria-hidden';
  var CONTROLS = 'aria-controls';

  var toggle = function(button, expanded) {
    if (typeof expanded !== 'boolean') {
      expanded = button.getAttribute(EXPANDED) !== 'true';
    }
    var target = document.getElementById(button.getAttribute(CONTROLS));
    button.setAttribute(EXPANDED, expanded);
    target.setAttribute(HIDDEN, !expanded);
    return expanded;
  };

  var click = function(event) {
    toggle(this);
    event.preventDefault();
  };

  exports.ARIAToggle = document.registerElement('aria-toggle', {
    'extends': 'button',
    prototype: Object.create(
      HTMLButtonElement.prototype,
      {
        createdCallback: {value: function() {
          this.setAttribute('type', 'button');
        }},

        attachedCallback: {value: function() {
          if (this.hasAttribute(EXPANDED)) {
            toggle(this, this.getAttribute(EXPANDED) === 'true');
          }
          this.addEventListener('click', click);
        }},

        toggle: {value: function(expanded) {
          return toggle(this, expanded);
        }},

        detachedCallback: {value: function() {
          this.removeEventListener('click', click);
        }}
      }
    )
  });

})(this);
