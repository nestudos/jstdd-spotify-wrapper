import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from "../src/index";

describe('Index library', () => {

  it('Deve criar uma nova instância do spotify wrapper.', () => {

    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('Deve receber uma apiURL com option', () => {

    let spotify = new SpotifyWrapper({ apiURL: 'bla' });

    expect(spotify.apiURL).to.be.equal('bla')
  });

  it('Deve passar uma URL padrão caso a url não for fornecida', () => {

    let spotify = new SpotifyWrapper({});

    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('Deve receber um token como option', () => {

    let spotify = new SpotifyWrapper({ token: 'foo' });

    expect(spotify.token).to.be.equal('foo');

  });


  describe('Método request', () => {

    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('Deve ter o método request', () => {

      let spotify = new SpotifyWrapper({});

      expect(spotify.request).to.exist;
    });

    it('Deve chamar o fetch quando chamar o request', () => {

      let spotify = new SpotifyWrapper({ token: 'foo' });
      
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('Deve chamar a URL correta', () => {

      let spotify = new SpotifyWrapper({ token:'foo'});
      
      spotify.request('url')
      expect(stubedFetch).to.have.been.calledWith('url');
    });

    it('Deve chamar o fetch com o token correto.', () => {

      let spotify = new SpotifyWrapper({ token:'foo'});
      
      const headers = {
        headers: {
          Authorization: 'Bearer foo'
        }
      };

      spotify.request('url')
      expect(stubedFetch).to.have.been.calledWith('url', headers);
    });


  });
});
