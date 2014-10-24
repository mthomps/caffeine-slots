Slots = (function() {
  var slots = {}

  slots.start = function() {
    setupView();
  }

  function setupView() {
    setupTemplates();
    var template = Handlebars.compile(Templates.slots);
    var slotsView = template(getSlotsData());
    $('#slot-columns').html(slotsView);
    bindEvents();
  }

  function setupTemplates() {
    Templates = {};
    Templates.slots = $('#slots-template').html();
    Templates._reel = $('#reel-template').html();
    Templates._box = $('#box-template').html();

    Handlebars.registerPartial('_reel', Templates._reel);
    Handlebars.registerPartial('_box', Templates._box);
  }

  function bindEvents() {
    $('#spin-button').click(function(event) {
      event.preventDefault();
      handleSpin();
    });
  }

  function handleSpin() {
    console.log('yo');
  }

  function getSlotsData() {
    return [[0,1,2,0,1,2], [0,1,2,0,1,2], [0,1,2,0,1,2]];
  }

  return slots;
})();
