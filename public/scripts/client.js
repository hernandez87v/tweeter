/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const createTweetElement = function (tweet) {
    const $article = $('<article>').addClass('tweets-container');
    const $header = $('<header>').addClass('head-container');
    const $userName = $('<div>').text(tweet.user.name);
    const $userHandle = $('<div>')
      .addClass('tweet-username-container')
      .text(tweet.user.handle);
    const $content = $('<p>').text(tweet.content.text);
    const $footer = $('<footer>').addClass('foot-container');
    // Tweet countdown timer when posted -- START --
    const currentTime = Math.floor(Date.now() / 1000);
    const unix_timestamp = Math.floor(tweet.created_at) / 1000;
    const elapsedTime = currentTime - unix_timestamp;
    const seconds = Math.floor(elapsedTime);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    let time = 1;
    if (years >= 1) {
      time = $('<p>').text(years + ' years ago');
    } else if (months >= 1) {
      time = $('<p>').text(months + ' months ago');
    } else if (days >= 1) {
      time = $('<p>').text(days + ' days ago');
    } else if (hours >= 1) {
      time = $('<p>').text(hours + ' hours ago');
    } else if (minutes >= 1) {
      time = $('<p>').text(minutes + ' minutes ago');
    } else time = $('<p>').text(seconds + ' seconds ago');
    // Tweet countdown timer when posted -- END --
    $header.append($userName);
    $header.append($userHandle);
    $article.append($header);
    $article.append($content);
    $footer.append(time);
    $article.append($footer);
    return $article;
  };
  //Event listener for the tweet button
  $('.tweet-block').submit(function (event) {
    event.preventDefault();
    const $counter = $('.counter');
    const $form = $(this).serialize();
    const $error = $('#error-message');
    //Text area validations
    if ($form === 'text=') {
      $error.removeClass('hide');
      $error.text('No tweet to submit!');
      $counter.text('140');
    } else if ($form.length > 145) {
      $error.removeClass('hide');
      $error.text('Your tweet exceeds 140 characters!');
    } else {
      //Issue POST request with jQuery Ajax
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $form,
      })
        .then(() =>
          // Success in getting the response from the request
          $('.tweet-block').each(function () {
            this.reset();
            $error.addClass('hide');
            $counter.text('140');
          })
        )
        .then(() => {
          $('#tweet-text').val('');
          $('#tweets-container').empty();
          loadTweets();
        });
    }
  });

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets/',
    }).then((data) => renderTweets(data));
  };

  loadTweets();
});
