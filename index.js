document.addEventListener('DOMContentLoaded', function() {
  const tinify = require("./node_modules/tinify");
  tinify.key = "bQlO3JqRybvDD8Qrv13tIFFQMjef99ur";

  // tinify.fromFile("unoptimized.png").toFile("optimized.png");

  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
  var elems2 = document.querySelectorAll('.tooltipped');
  var instances2 = M.Tooltip.init(elems2);
  axios.get('https://photos.app.goo.gl/PWUbgDcymgCeiQZ97')
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
});
