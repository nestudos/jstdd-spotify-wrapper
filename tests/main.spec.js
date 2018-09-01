import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from "../src/main";

describe('Spotify Wrapper', () => {
  describe('Smoke tests', () => {
    //search genérico que pode buscar mais de um tipo
    //searchAlbums
    //searchArtists
    //searchTracks
    //searchPlaylists

    it('Deve existir o método search', () => {
      expect(search).to.exist;
    });

    it('Deve existir o método searchAlbums', () => {
      expect(searchAlbums).to.exist;
    });

    it('Deve existir o método searchArtists', () => {
      expect(searchArtists).to.exist;
    });

    it('Deve existir o método searchTracks', () => {
      expect(searchTracks).to.exist;
    });

    it('Deve existir o método searchPlaylists', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe("Search genérico", () => {

    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();

    });

    it('Deve chamar a função fetch', () => {

      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Deve chamar o fetch com a URL correta', () => {

      context('passando um tipo', () => {

        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=artist");

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=album");
      });

      context('passando mais de um tipo', () => {

        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=artist,album");

      });

    });

    it('Deve retornar o dado JSON da promise', () => {

      promise.resolves({ body: 'json' });

      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' })

    });
  });
});
