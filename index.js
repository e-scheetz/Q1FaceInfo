document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
  var elems2 = document.querySelectorAll('.tooltipped');
  var instances2 = M.Tooltip.init(elems2);
  axios.get('https://photos.app.goo.gl/PWUbgDcymgCeiQZ97')
    .then(function (response){
      console.log(response)
    })
    .catch(function (error){
      console.log(error)
    })
});
