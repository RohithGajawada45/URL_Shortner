document.addEventListener('DOMContentLoaded', () => {
    const btnShorten = document.getElementById('short');
    const btnCopy = document.getElementById('copy');
    const inputLongURL = document.getElementById('longurl');
    const inputShortURL = document.getElementById('shorturl');

    btnShorten.addEventListener('click', async () => {
        const longURL = inputLongURL.value.trim();

        try {
            const accessToken = 'c6459853155be815acf4df813e6ebe3f90283742'; // Replace with your actual Bitly access token
            const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ long_url: longURL })
            });

            if (response.ok) {
                const responseData = await response.json();

                if (responseData && responseData.link) {
                    const shortenedURL = responseData.link;
                    inputShortURL.value = shortenedURL;
                    console.log('Shortened URL:', shortenedURL);
                } else {
                    console.error('Error: Unexpected response structure from API');
                }
            } else {
                console.error('Failed to shorten URL');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    btnCopy.addEventListener('click', () => {
        inputShortURL.select();
        document.execCommand('copy');
        console.log('Copied to clipboard:', inputShortURL.value);
    });
});
