import chai, { expect } from "chai";
import SpotifyWrapper from '../src/index';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from "sinon-stub-promise";
sinonStubPromise(sinon);
chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({ token: 'foo'});
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {

    stubedFetch.restore();
  });

  describe('Smoke tests', () => {

    it('Deve ter o método getAlbum', () => {

      expect(spotify.album.getAlbum).to.exist;

    });

    it('Deve ter o método getAlbumTracks', () => {

      expect(spotify.album.getTracks).to.exist;

    });

    it('Deve ter o método getAlbums', () => {

      expect(spotify.album.getAlbums).to.exist;

    });

  });

  describe('getAlbum', () => {

    it('Deve chamar o método fetch', () => {

      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');
      
      const album2 = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTk');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('Deve retornar o dado correto da Promise', () => {

      promise.resolves({ album:'name'});
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(album.resolveValue).to.be.eql({ album:'name'});

    });

  });

  describe('getAlbums', () => {

    it('Deve chamar o método fetch', () => {

      const albums = spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const albums = spotify.album.getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc');
            
    });

    it('Deve retornar o dado correto da Promise', () => {

      promise.resolves({ album:'name'});
      const albums= spotify.album.getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);

      expect(albums.resolveValue).to.be.eql({ album:'name'});

    });

  });

  describe('getTracks', () => {

    it('Deve chamar o método fetch', () => {

      const albumTracks = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      const albums = spotify.album.getTracks('382ObEPsp2rxGrnsizN5TX');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX/tracks');
            
    });

    it('Deve retornar o dado correto da Promise', () => {

      promise.resolves({ album:'name'});
      const albums= spotify.album.getTracks('382ObEPsp2rxGrnsizN5TX');

      expect(albums.resolveValue).to.be.eql({ album:'name'});

    });

  });

});
