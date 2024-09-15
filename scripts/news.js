// scripts/news.js

// Simulated news feed (replace this with API calls later)
const techNews = [
    "Apple announces new iPhone 15 with groundbreaking features.",
    "Google AI reaches new milestone in language understanding.",
    "Microsoft unveils next-gen Surface products.",
    "Elon Musk announces latest developments in SpaceX's Mars mission.",
    "Amazon introduces new AI-driven shopping assistant.",
    "Meta focuses on expanding virtual reality experiences."
];

// Function to display rolling tech news
function displayNews() {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = ''; // Clear any existing news

    techNews.forEach((news) => {
        const li = document.createElement('li');
        li.textContent = news;
        newsList.appendChild(li);
    });

    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % techNews.length;
        newsList.style.transform = `translateY(-${currentIndex * 40}px)`; // Adjust scroll speed and height
        newsList.style.transition = 'transform 0.5s ease-in-out';
    }, 4000); // Change every 4 seconds
}

// Call function to start displaying the news
window.onload = displayNews;
