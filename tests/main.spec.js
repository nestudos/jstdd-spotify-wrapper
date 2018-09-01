import { expect } from "chai";
import FizzBuzz from "../src/main";
describe('Main', () => {
  it('Deve retornar `Fizz` quando multiplo de 3.', () => {
    expect(FizzBuzz(3)).to.be.equal('Fizz');
    expect(FizzBuzz(6)).to.be.equal('Fizz');

  });

  it('Deve retornar `Buzz` quando multiplo de 5.', () => {
    expect(FizzBuzz(5)).to.be.equal('Buzz');
    expect(FizzBuzz(10)).to.be.equal('Buzz');

  });

  it('Deve retornar `FizzBuzz` quando multiplo de 3 e 5.', () => {
    expect(FizzBuzz(15)).to.be.equal('FizzBuzz');
    expect(FizzBuzz(30)).to.be.equal('FizzBuzz');
  });

  it('Deve retornar um número quando não for multiplo.', () => {
    expect(FizzBuzz(7)).to.be.equal(7);
  });

  it('Deve retornar 0 quando receber 0.', () => {
    expect(FizzBuzz(0)).to.be.equal(0);
  });
});
