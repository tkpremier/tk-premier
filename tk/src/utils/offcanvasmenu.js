function offCanvasMenu() {
  // Close off canvas menu when link, inner-wrap, and menu-trigger is clicked
  $('.offcanvas li .section').on("click", function (e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    $this.toggleClass('open');
    var menuList = $this.siblings("ul");
    var listItems = menuList.find("li");
    var itemHgt = 0;
    listItems.each(function (item, i) {
      itemHgt = itemHgt + parseInt($(i).css("height"), 10);
    });
    //var number = listItems.length;
    if (menuList.hasClass("show")) {
      menuList.css("height", 0)
        .removeClass("show");
    } else {
      menuList.css({
        "height": itemHgt + "px"
      }).addClass("show");
    }
  });
  $(".exit-off-canvas").on("click touchstart", function (e) {
    e.preventDefault();
    $(this).removeClass("visible");
    $(".off-campus-menu.visible").removeClass("visible");
    $("html").removeClass("disable-scroll");
  });
  $(".off-campus-menu").on("transitionend", function(event) {
    event.preventDefault();
    $('.search-box').get(0).focus();
  });
}

module.exports = offCanvasMenu;
