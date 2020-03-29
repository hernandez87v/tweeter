/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const $article = $('<article>').addClass('tweets-container');
    const $header = $('<header>').addClass('head-container');
    const $userName = $('<div>').text(tweet.user.name);
    const $userHandle = $('<div>')
      .addClass('tweet-username-container')
      .text(tweet.user.handle);
    const $content = $('<p>').text(tweet.content.text);
    const $footer = $('<footer>').addClass('foot-container');
    // const $date = $('<div>').text(tweet.created_at);

    let currentTime = Math.floor(Date.now() / 1000);
    let unix_timestamp = Math.floor(tweet.created_at) / 1000;
    let elapsedTime = currentTime - unix_timestamp;
    let seconds = Math.floor(elapsedTime);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    let $time = 0;
    if (years >= 1) {
      $time = $('<p>').text(years + ' years ago');
    } else if (months >= 1) {
      $time = $('<p>').text(months + ' months ago');
    } else if (days >= 1) {
      $time = $('<p>').text(days + ' days ago');
    } else if (hours >= 1) {
      $time = $('<p>').text(hours + ' hours ago');
    } else if (minutes >= 1) {
      $time = $('<p>').text(minutes + ' minutes ago');
    } else $time = $('<p>').text(seconds + ' seconds ago');

    $header.append($userName);
    $header.append($userHandle);
    $article.append($header);
    $article.append($content);
    $footer.append($time);
    $article.append($footer);
    return $article;
  };

  $('.tweet-block').submit(function(event) {
    event.preventDefault();
    let $form = $(this).serialize();
    let $counter = $('.counter');
    let $error = $('#error-message');

    if ($form === 'text=') {
      $error.removeClass('hide');
      $error.text('No tweet to submit!');
      $counter.text('140');
    } else if ($form.length > 140) {
      $error.removeClass('hide');
      $error.text('Your tweet exceeds 140 characters!');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $form
      })
        .then(() =>
          $('.tweet-block').each(function() {
            this.reset();
            $error.addClass('hide');
            $counter.text('140');
          })
        )
        .then(data => loadTweets(data));
    }
  });

  const renderTweets = function(tweets) {
    // tweets.reverse();
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
      .done(function(response) {
        renderTweets(response);
      })
      .fail(function(error) {
        console.log(`Error ${error.message}`);
      });
  };

  loadTweets();
  //renderTweets(tweet);
});
