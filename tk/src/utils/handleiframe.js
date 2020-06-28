// iframe message response for signIn popup
function handleIframe(e) {
  handle_iframe_message = function (e) {
    var origin = 'http://localhost:9090';
    if (e.origin == origin) {
      var url = e.data.split('*')[2];
      var firstName = e.data.split('*')[1];
      var title = e.data.split('*')[0];
      if (title == '[MyPhillips]') {
        localStorage.setItem('firstName', firstName);
        $('.modal-iframe-container#signIniframe').remove();
        $("body").css("overflow", "auto");
        if (url != 'undefined') {
          window.location.href = url;
        }
      }
    }
  }
  window.addEventListener('message', handle_iframe_message, false);
}

module.exports = handleIframe;
