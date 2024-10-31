const userSearch = document.getElementById('user-search');
const userPfp = document.getElementById('user-pfp');
const username = document.getElementById('username');
const userId = document.getElementById('user-id');
const numberOfFollowers = document.getElementById('number-of-followers');
const numberOfFollowing = document.getElementById('number-of-following');
const numberOfRepos = document.getElementById('number-of-repos');
const userGhLink = document.getElementById('user-gh-link');
const themeChangeBtn = document.getElementById('theme-change-btn');

const footerText = document.getElementById('footer-text');
footerText.innerHTML += new Date().getFullYear();

let example_user = 'user908812';

function setUser() {
    return !userSearch.value ? example_user : userSearch.value;
}

function fetchUserData() {
    fetch(`https://api.github.com/users/${setUser()}`)
        .then(res => res.ok ? res.json() : Promise.reject('Invalid username!'))
        .then(data => {
            console.log(data);
            userPfp.src = data.avatar_url;
            username.innerHTML = data.login;
            userId.innerHTML = data.id;
            numberOfFollowers.innerHTML = data.followers;
            numberOfFollowing.innerHTML = data.following;
            numberOfRepos.innerHTML = data.public_repos;
            userGhLink.href = data.html_url;
            userGhLink.innerHTML = data.html_url;

            userPfp.addEventListener('dragend', () => open(data.html_url, '_blank'));

        })
        .catch(err => alert('Error: ' + err));
}
fetchUserData();

function setTheme() {
    if (document.body.style.backgroundColor === 'white') {
        themeChangeBtn.innerHTML = '☀︎';
        document.body.style.transition = 'all 0.5s 0.2s';
        document.body.style.backgroundColor = '	#424549';
    } else {
        themeChangeBtn.innerHTML = '☾';
        document.body.style.transition = 'all 0.5s 0.2s'; 
        document.body.style.backgroundColor = 'white';
    }
}