import { expect } from "chai";
import { search,searchAlbums, searchArtists,searchTracks,searchPlaylists } from "../src/main";

describe('Spotify Wrapper', () => {
  describe('Smoke tests', () => {
    //search genérico que pode buscar mais de um tipo
    //searchAlbums
    //searchArtists
    //searchTracks
    //searchPlaylists

    it('Deve existir o método search', function(){
      expect(search).to.exist;
    });

    it('Deve existir o método searchAlbums', function(){
      expect(searchAlbums).to.exist;
    });

    it('Deve existir o método searchArtists', function(){
      expect(searchArtists).to.exist;
    });

    it('Deve existir o método searchTracks', function(){
      expect(searchTracks).to.exist;
    });

    it('Deve existir o método searchPlaylists', function(){
      expect(searchPlaylists).to.exist;
    });
  });  
});
