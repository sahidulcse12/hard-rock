const searchSongs = async () => {
    const searchSong = document.getElementById('search-field').value;

    const url = `https://api.lyrics.ovh/suggest/${searchSong}`;
    try {
        const res = await (fetch(url));
        const data = await (res.json());
        displaySongs(data.data);
    }catch(error){
        displayError('Something went wrong!! please try again later!');
    }


    //load data
    // fetch(url)
    // .then(res =>res.json())
    // .then(data =>displaySongs(data.data))
}

const displaySongs = songs => {

    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    songs.forEach(song => {

        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';

        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls src="${song.preview}"></audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;

        songContainer.appendChild(songDiv);

    });
}

const getLyric = (artist, title) => {

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
        .catch(error => displayError('Something went wrong!! please try again later!'))
}

const displayLyrics = lyrics => {

    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = lyrics;
}

const displayError = error => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
}