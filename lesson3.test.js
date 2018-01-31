import lesson3 from '../src/lesson3';

const {
  countOptional,
  bindContext,
  addLogCapability,
  logger,
  compose,
  partial
} = lesson3.task;

describe('Functions and FP lesson', () => {

  describe('countOptional', () => {
    it('should properly count optional parameters', () => {

      expect(countOptional('one', 'two')).toEqual(0);
      expect(countOptional('one', 'two', 'three')).toEqual(1);
      expect(countOptional('one')).toEqual(0);
    });
  });

  describe('bindContext', () => {
    it('should work like native bind', () => {

      function getWidth() {
        return this.width;
      }

      function getIncrementedWidth(inc) {
        return this.width * inc;
      }

      const p = {
        width: 25
      }

      expect(bindContext(getWidth, p)()).toEqual(getWidth.bind(p)());
      expect(bindContext(getIncrementedWidth, p, 4)()).toEqual(getIncrementedWidth.bind(p, 4)());
    });
  });

  describe('addLogCapability', () => {
    it('should make object implement loggable interface', () => {

      const o = {
        name: 'Lesson 3'
      }

      const p = {
        author: 'Me'
      }

      addLogCapability(o);
      addLogCapability(p);

      expect(o.log).toBeDefined();
      expect(typeof o.log).toEqual('function');
      expect(o.log()).toEqual('Log message #1: my name is Lesson 3');
      expect(o.log()).toEqual('Log message #2: my name is Lesson 3');

      expect(p.log).toBeDefined();
      expect(p.log()).toEqual('Log message #1: I dont have name');
    });
  });

  describe('logger', () => {
    it('should create custom logger functions', () => {

      const myLogger = logger('Lesson 3');

      expect(myLogger('function')).toEqual('Lesson 3: function');
    });
  });

  describe('compose', () => {
    it('should compose function from left to right', () => {

      function sayTitle(name) {
        return `Mr ${name}`;
      }

      function sayGreeting(name) {
        return `Hello ${name}`;
      }
      const sayHi = compose(sayTitle, sayGreeting);

      expect(sayHi('Anderson')).toEqual('Hello Mr Anderson');
    });
  });

  describe('partial', () => {
    it('should create partial application', () => {

      function concat(str1, str2, str3) {
        return `${str1} ${str2} ${str3}`
      }

      const partialConcat = partial(concat);

      const concatWithMyName = partialConcat('My', 'name is');

      expect(concatWithMyName('Neo')).toEqual('My name is Neo');
    });
  });

});