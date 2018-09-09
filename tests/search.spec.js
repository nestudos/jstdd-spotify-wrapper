import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

import SpotifyWrapper from "../src/index";

describe('Search', () => {

  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({ token: 'foo'});
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();

  });

  describe('Smoke tests', () => {

    it('Deve existir o método albums', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('Deve existir o método artists', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('Deve existir o método tracks', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('Deve existir o método playlists', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('Artists', () => {
    it('Deve chamar a função fetch', () => {
      const artists = spotify.search.artists('Incubus');

      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const artists = spotify.search.artists('Incubus');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=artist");

      const artists2 = spotify.search.artists('Muse');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Muse&type=artist");

    });


  });

  describe('Search Albums', () => {
    it('Deve chamar a função fetch', () => {
      const albums = spotify.search.albums('Incubus');

      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const albums = spotify.search.albums('Incubus');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=album");

      const albums2 = spotify.search.albums('Muse');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Muse&type=album");

    });
  });

  describe('Search Tracks', () => {
    it('Deve chamar a função fetch', () => {
      const tracks = spotify.search.tracks('Incubus');

      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const tracks = spotify.search.tracks('Incubus');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=track");

      const tracks2 = spotify.search.tracks('Muse');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Muse&type=track");

    });
  });

  describe('Search Playlists', () => {
    it('Deve chamar a função fetch', () => {
      const playlists = spotify.search.playlists('Incubus');

      expect(fetchedStub).to.been.have.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const playlists = spotify.search.playlists('Incubus');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Incubus&type=playlist");

      const playlists2 = spotify.search.playlists('Muse');

      expect(fetchedStub).to.been.have.calledWith("https://api.spotify.com/v1/search?q=Muse&type=playlist");

    });
  });

});
