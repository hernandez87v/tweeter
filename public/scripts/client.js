/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* <article class="tweets-container">
  <header class="head-container">
    <div id="tweet-name-container">
      <font color="#545149">Vlad</font>
    </div>
    <div id="tweet-username-container">
      <font color="#C8CFE4">@vlad</font>
    </div>
  </header>
  <p class="last-tweet-container">
    Writing a random tweet for testing and seeing if it works. Also extra long
    to fix spacing.
  </p>
  <footer class="foot-container">
    <font color="#545149">1 day ago</font>
  </footer>
</article>; */

$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: 'Newton',
        avatars: 'https://i.imgur.com/73hZDYK.png',
        handle: '@SirIsaac'
      },
      content: {
        text:
          'If I have seen further it is by standing on the shoulders of giants'
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: 'Descartes',
        avatars: 'https://i.imgur.com/nlhLi3I.png',
        handle: '@rd'
      },
      content: {
        text: 'Je pense , donc je suis'
      },
      created_at: 1461113959088
    }
  ];

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
    $header.append($userName);
    $header.append($userHandle);
    $article.append($header);
    $article.append($content);
    $footer.append($date);
    $article.append($footer);
    // console.log(tweet.content.text);
    // console.log(tweet.created_at);
    return $article;
  };

  const $form = $('form');
  $form.on('submit', event => {
    event.preventDefault();
    const formData = $form.serialize();
    $.post('/tweets/', formData).then(res => {
      // console.log(res);
    });
  });

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };

  renderTweets(data);
});
