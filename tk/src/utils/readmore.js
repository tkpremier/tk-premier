function readMore(wrapper, el, start) {
  $("#team-list-backbone").on('click touchstart', '.readMore', function (e) {
    e.preventDefault();
    var $self = $(this);
    var $element = $(this).parent();
    if ($element.hasClass('toggle')) {
      $element.velocity({
          height: function () {
            var bioHeight = $self.siblings('.bio').height() + $self.height();
            return bioHeight;
          }
        },
        {
          easing: "ease",
          duration: 600,
          progress: function () {
            $self.html('Close');
          },
          complete: function () {
            $element.removeClass('toggle');
          }
        }
      );
    } else {
      $element.velocity("reverse",
        {
          easing: "ease",
          duration: 600,
          progress: function () {
            $self.html('Read More');
          },
          complete: function () {
            $element.addClass('toggle');
          }
        }
      );
    }

    // var bioHeight = $(this).siblings('.bio').height() + $(this).height();
    // $(this).parent('.float').css('height', bioHeight);
    // $(this).parent('.float').toggleClass('toggle');
    // if (!$(this).parent('.float').hasClass('toggle')) {
    //     $(this).html('Less');
    // } else {
    //     $(this).html('Read More');
    // }
  });

  //if (typeof startHt === 'number' && !isNaN(startHt)) {
  //	$(parentEl).css('height', startHt);
  //	console.log(startHt);
  //} else {
  //	console.warn('NaN');
  //}
  var $wrapper = $(wrapper),
    startHt = $(wrapper).css('height'),
    mql = window.matchMedia("(min-width: 48.01rem)");

  function toggleReadMore(hideToggle) {
    if (hideToggle.matches) {
      $wrapper.css('height', 'auto');
      $wrapper.addClass('no-toggle');
    } else {
      $wrapper.removeClass('no-toggle');
      $wrapper.css('height', start);
    }
  }

  if (mql.addListener) {
    mql.addListener(toggleReadMore);
  }
  toggleReadMore(mql);
  $wrapper.on('click touchstart', '.toggle-more', function (e) {
    e.preventDefault();
    var elHt = $(el).outerHeight(true),
      $this = $(e.currentTarget),
      fullHt = $this.height() + elHt + 16;

    if (!$wrapper.hasClass('open')) {
      $wrapper.css('height', fullHt);
      $wrapper.addClass('open');
      $this.html('Close');
    } else {
      $wrapper.css('height', startHt);
      $wrapper.removeClass('open');
      $this.html('Read more');
    }
  });
  $()
}

module.exports = readMore;
