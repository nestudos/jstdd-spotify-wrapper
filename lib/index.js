"use strict";

var _search = require("./search");

var _album = require("./album");

module.exports = {
  searchAlbums: _search.searchAlbums, searchArtists: _search.searchArtists, searchPlaylists: _search.searchPlaylists, search: _search.search,
  getAlbum: _album.getAlbum, getAlbums: _album.getAlbums, getAlbumTracks: _album.getAlbumTracks
};