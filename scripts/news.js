// scripts/news.js

const apiKey = '301fe7f068b14af8979f6cc1c50035b3'; // Your NewsAPI key
const newsList = document.getElementById('newsList');

// Function to fetch and display news
async function fetchNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.status !== 'ok') {
            throw new Error('Failed to fetch news.');
        }

        newsList.innerHTML = ''; // Clear any existing news

        data.articles.forEach(article => {
            const li = document.createElement('li');
            li.textContent = article.title;
            newsList.appendChild(li);
        });

        let currentIndex = 0;
        const newsItems = data.articles.length;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % newsItems;
            newsList.style.transform = `translateY(-${currentIndex * 40}px)`; // Adjust scroll speed and height
            newsList.style.transition = 'transform 0.5s ease-in-out';
        }, 4000); // Change every 4 seconds

    } catch (error) {
        newsList.innerHTML = '<li>Failed to load news.</li>';
        console.error('Error fetching news:', error);
    }
}

// Call function to start displaying the news
window.onload = fetchNews;
