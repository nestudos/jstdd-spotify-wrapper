import { searchAlbums, searchArtists, searchPlaylists, search } from "./search";
import { getAlbum, getAlbums, getAlbumTracks } from "./album";
import { API_URL } from "./config";
// module.exports = {
//   searchAlbums, searchArtists, searchPlaylists, search,
//   getAlbum, getAlbums, getAlbumTracks
// }

export default class SpotifyWrapper{
  constructor(options){
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
  }
}
