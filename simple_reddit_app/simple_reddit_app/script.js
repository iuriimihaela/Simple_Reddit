document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("subreddits")) {
        fetch("https://www.reddit.com/subreddits/popular.json")
            .then(response => response.json())
            .then(data => {
                let subreddits = data.data.children;
                
                // Amestecă aleatoriu subredditurile
                subreddits.sort(() => Math.random() - 0.5);
                
                let subredditsDiv = document.getElementById("subreddits");
                subreddits.slice(0, 9).forEach(sub => { // Selectează 9 subreddits random
                    let subreddit = sub.data;
                    let card = document.createElement("div");
                    card.className = "subreddit-card";
                    let imageUrl = subreddit.icon_img || subreddit.community_icon;
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = `https://www.reddit.com${imageUrl}`;
                    }
                    card.innerHTML = `
                        <h3>${subreddit.title}</h3>
                        ${imageUrl ? `<img src="${imageUrl}" alt="${subreddit.title}">` : ''}
                        <p>${subreddit.public_description || 'No description '}</p>
                        <a href="https://www.reddit.com${subreddit.url}" target="_blank">
                            <button>Visitsubreddit</button>
                        </a>
                    `;
                    subredditsDiv.appendChild(card);
                });
            })
            .catch(error => console.error("Eroare la preluarea datelor de la Reddit:", error));
    }
});
