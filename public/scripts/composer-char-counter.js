// To track textarea typed characters and output # of each character
// Also changes the color of text based on amount of characters left out of the max allowed which is 140

$(document).ready(function () {
  $('textarea').on('keyup', function (event) {
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
