import { expect } from "chai";
import SpotifyWrapper from "../src/index";

describe('Index library', () => {

  it('Deve criar uma nova instância do spotify wrapper.', () => {

    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('Deve receber uma apiURL com option', () => {
    
    let spotify =new SpotifyWrapper({ apiURL: 'bla'});

    expect(spotify.apiURL).to.be.equal('bla')
  });

  it('Deve passar uma URL padrão caso a url não for fornecida', () => {
    
    let spotify = new SpotifyWrapper({ });

    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('Deve receber um token como option', () => {

    let spotify = new SpotifyWrapper({ token:'foo' });

    expect(spotify.token).to.be.equal('foo');

  });
});
