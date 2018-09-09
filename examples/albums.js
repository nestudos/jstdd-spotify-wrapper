global.fetch = require('node-fetch');

import SpotifyWrapper from "../src/index";

let spotify = new SpotifyWrapper({ token: ''});

const albums = searchAlbums('Incubus');

albums.then(data => console.log(data));
