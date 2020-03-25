$(document).ready(function() {
  $('textarea').on('input', function() {
    let count = $(this).val();
    let limit = 140 - count.length;

    if (limit <= 0) {
      $('.counter').css({ color: 'red' });
    } else if (limit <= 20) {
      $('.counter').css({ color: 'peru' });
    } else if (limit >= 21) {
      $('.counter').css({ color: '#545149' });
    }
    $('.counter').text(limit);
  });
});
