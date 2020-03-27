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
    const $date = $('<div>').text(tweet.created_at);
    // $('<div>').text(moment(tweet.created_at).fromNow());
    // .text(tweet.created_at);
    $header.append($userName);
    $header.append($userHandle);
    $article.append($header);
    $article.append($content);
    $footer.append($date);
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
