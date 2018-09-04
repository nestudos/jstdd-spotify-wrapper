import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from "../src/search";

describe('Search', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();

  });

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

  describe('Search Artistas', () => {
    it('Deve chamar a função fetch', () => {
      const artists = searchArtists('Incubus');

      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const artists = searchArtists('Incubus');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=artist");

      const artists2 = searchArtists('Muse');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Muse&type=artist");

    });


  });

  describe('Search Albums', () => {
    it('Deve chamar a função fetch', () => {
      const albums = searchAlbums('Incubus');

      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const albums = searchAlbums('Incubus');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=album");

      const albums2 = searchAlbums('Muse');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Muse&type=album");

    });
  });

  describe('Search Tracks', () => {
    it('Deve chamar a função fetch', () => {
      const tracks = searchTracks('Incubus');

      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const tracks = searchTracks('Incubus');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=track");

      const tracks2 = searchTracks('Muse');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Muse&type=track");

    });
  });

  describe('Search Playlists', () => {
    it('Deve chamar a função fetch', () => {
      const playlists = searchPlaylists('Incubus');

      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const playlists = searchPlaylists('Incubus');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=playlist");

      const playlists2 = searchPlaylists('Muse');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Muse&type=playlist");

    });
  });

});
