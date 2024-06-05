fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F')
    .then(response => response.json())
    .then(data => {
        const newsList = document.getElementById('news-list');
        data.items.forEach(item => {
            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const a = document.createElement('a');
            const author = document.createElement('p');
            author.textContent = `Author: ${item.author}`
            h2.textContent = item.title;
            p.textContent = item.description.replace(/<\/?[^>]+(>|$)/g, '');
            a.textContent = 'Read More...';
            a.href = item.link;
            a.target = '_blank';
            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(author);
            li.appendChild(a);
            newsList.appendChild(li);
        });
    });