Slots = (function() {
  var slots = {}

  slots.start = function() {
    setupView(getSlotsData());
  }

  function setupView(data) {
    setupTemplates();
    var template = Handlebars.compile(Templates.slots);
    var slotsView = template(data);
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
      if ($(event.target).hasClass('disabled')) {
        return;
      } else {
        $(event.target).addClass('disabled')
        handleSpin();
      }
    });
  }

  function getSlotsData() {
    var reels = [];
    _.each(['machine', 'tool', 'mat'], function(category) {
      reels.push(generateReelData(category));
    });

    return reels;
  }

  function generateReelData(category) {
    var values = [0,1,2,0,1,2];
    var slotBoxDataList = _.map(values, function(val, i) {
      return new SlotBox(val, category);
    });
    
    return slotBoxDataList;
  }

  function handleSpin() {
    $('.slot-boxes').removeClass('paused').addClass('spinning');
    var baseSpinTime = 1700;
    _.each($('.slot-boxes'), function(el) {
      baseSpinTime += (Math.floor(Math.random() * 3) + 1) * 175;
      setTimeout(function() { $(el).addClass('paused'); }, baseSpinTime);
      baseSpinTime += 900;
    });

    setTimeout(function() {
        $('#spin-button').removeClass('disabled');
        checkResult();
      }, baseSpinTime);
  }

  function checkResult() {
    var valCounts = [0,0,0];
    _.each($('.slot-boxes'), function(el) {
      if ($(el).position().top <= 38 && $(el).position().top > -94) {
        valCounts[1]++;
      } else if ($(el).position().top <= -94 && $(el).position().top > -216) {
        valCounts[2]++;
      } else if ($(el).position().top <= -216 && $(el).position().top > -338) {
        valCounts[0]++;
      } else {
        valCounts[1]++;
      }
    });

    var result = _.find(valCounts, function(count) {
      return count >= 3;
    });

    if (result) {
      handleWinner(result);
    }
  }

  function handleWinner(value) {
    console.log('win!')
  }

  return slots;
})();
