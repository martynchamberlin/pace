const kilometers_to_miles = (kilometers) => kilometers / 1.60934;
const miles_to_kilometers = (miles) => miles * 1.60934;

jQuery(document).ready(($) => {
  $('.wrap').centerVertically();

  $('select[name="original_length"]').change((e) => {
    $('.typeof_distance').css('opacity', 0);
    var div = $(e.currentTarget);
    setTimeout(() => {
      $('.typeof_distance').val($(div).val());
      $('.typeof_distance').css('opacity', 1);
    }, 500);
    $('.what-is-their').addClass('animated pulse');
  });

  $('.animatable').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', (e) => {
    $(e.currentTarget).removeClass('pulse shake zoomIn animated');
  });

  $('form').submit(() => {
    var original_length = $('select[name="original_length"]').val();
    var target_length = $('select[name="target_length"]').val();

    $('input').removeClass('error');
    var length = $('input[name="distance"]');
    var minutes = $('input[name="minutes"]');
    var seconds = $('input[name="seconds"]');

    var nums = [length, minutes, seconds];
    var valid = true;

    for (var i = 0; i < nums.length; i++) {
      if ($.isNumeric(nums[i].val())) {
        nums[i] = nums[i].val();
      }
      else {
        valid = false;
        $(nums[i]).addClass('error shake animated');
      }
    }

    if (valid) {
      length = parseFloat(length.val());
      minutes = parseFloat(minutes.val());
      seconds = parseFloat(seconds.val());

      var target_length_amount = length;

      if (original_length == 'miles' && target_length == 'kilometers') {
        target_length_amount = miles_to_kilometers(length);
      }
      else if (original_length == 'kilometers' && target_length == 'miles') {
        target_length_amount = kilometers_to_miles(length);
      }
      const total_seconds = minutes * 60 + seconds;
      const seconds_per_length = total_seconds / target_length_amount;
      const answer_minutes = Math.floor(seconds_per_length / 60);
      let answer_seconds = Math.round(seconds_per_length % 60);

      if (answer_seconds < 10) {
        answer_seconds = `${0}answer_seconds`;
      }

      $('form').addClass('hiding');
      $('.answer').html(`<div class="huge">${answer_minutes}:${answer_seconds} / ${target_length.substr(0, target_length.length - 1)}</div><a href="" class="repeat">Go back</a>`);
      $('.answer').show().addClass('zoomIn animated');
    }
    return false;
  });

  $('document').on('click', 'a.repeat', () => {
    $('.answer').hide();
    $('form').removeClass('hiding').addClass('zoomIn animated');
    return false;
  });

  $('button').mouseenter((e) => $(e.currentTarget).addClass('pulse animated'));
});

(function($) {
  $.fn.extend({
    centerVertically() {
      return this.each((index, element) => {
        const height = $(element).outerHeight();
        const marginTop = $(element).css('marginTop');

        const adjustMargin = () => {
          if ($(window).height() > height) {
            $(element).css('margin-top', ( $(window).height() - height ) / 2 + 'px');
          } else {
            $(element).css('margin-top', marginTop);
          }
        };
        adjustMargin();
        $(window).resize(adjustMargin);
      });
    }
  });
})(jQuery);
