// Replace with your Bitly API key
const BITLY_API_KEY = 'c6459853155be815acf4df813e6ebe3f90283742';

document.addEventListener('DOMContentLoaded', function() {
  const shortenBtn = document.getElementById('shortenBtn');
  const longUrlInput = document.getElementById('longUrl');
  const shortenedUrlInput = document.getElementById('shortenedUrl');

  shortenBtn.addEventListener('click', function() {
    const shortUrl = shortenUrl(longUrlInput.value.trim());
    if (shortUrl !== null) {
      shortenedUrlInput.value = shortUrl;
    } else {
      alert('There was an error shortening the URL. Please try again.');
    }
  });

  function shortenUrl(longUrl) {
    const url = new URL('https://ismaelc-bitly.p.rapidapi.com/bitly-shorten', 'https://api.bitly.com');
    url.searchParams.append('access_token', BITLY_API_KEY);
    url.searchParams.append('long_url', encodeURIComponent(longUrl));

    fetch(url)
      .then(response => response.json())
      .then(data => data.link || null)
      .catch(err => console.error('Error:', err));
  }
});
