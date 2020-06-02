$(document).ready(function () {
  $('textarea').on('input', function (event) {
    const count = $(event.target).val().length;
    const limit = 140 - count;
    $('.counter').text(limit);

    if (limit <= 0) {
      $('.counter').css({ color: 'red' });
    } else if (limit <= 20) {
      $('.counter').css({ color: 'peru' });
    } else if (limit >= 21) {
      $('.counter').css({ color: '#545149' });
    }
  });
});
