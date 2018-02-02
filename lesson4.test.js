import lesson4 from '../src/lesson4';

const {
  createSet,
  createMap,
} = lesson4.task;

describe('Objects lesson', () => {

  describe('set', () => {
    it('should allow to create without initial data', () => {

      const mySet = createSet();
      expect(mySet.size).toEqual(0);
    });

    it('should allow to create with initial data', () => {

      const mySet = createSet(['a', 1, undefined]);
      expect(mySet.size).toEqual(3);
    });

    it('should allow add data', () => {

      const mySet = createSet();
      mySet.add({});
      mySet.add({});
      expect(mySet.size).toEqual(2);
    });

    it('should allow add data 2', () => {

      const mySet = createSet();
      mySet.add('hello');
      mySet.add('world');
      mySet.add('hello');
      expect(mySet.size).toEqual(2);
    });

    it('should allow remove data', () => {

      const mySet = createSet(['a', 'b', 'c']);
      mySet.delete('b');
      expect(mySet.size).toEqual(2);
    });

    it('should preseve addition order', () => {

      const init = [0, 1, 2, 3, NaN];
      const mySet = createSet(init);
      const result = [];
      mySet.forEach(e => result.push(e));
      expect(result).toEqual(init);
    });
  });

  describe('map', () => {
    it('should allow to create without initial data', () => {

      const myMap = createMap();
      expect(myMap.size).toEqual(0);
    });

    it('should allow to create with initial data', () => {

      const myMap = createMap([['a', 1], ['b', 2], ['c', 3]]);
      expect(myMap.size).toEqual(3);
    });

    it('should allow set data', () => {

      const myMap = createMap();
      myMap.set({}, 'a');
      myMap.set({}, 'b');
      expect(myMap.size).toEqual(2);
    });

    it('should allow mySet data 2', () => {

      const myMap = createMap();
      myMap.set('hello', 'a');
      myMap.set('world', 'b');
      myMap.set('hello', 'a');
      expect(myMap.size).toEqual(2);
    });

    it('should allow remove data', () => {

      const myMap = createMap([['a', 1], ['b', 2], ['c', 3]]);
      myMap.delete('b');
      expect(myMap.size).toEqual(2);
    });

    it('should preseve addition order', () => {

      const init = [['a', 1], ['b', 2], ['c', 3]];
      const myMap = createMap(init);
      const result = [];
      myMap.forEach((v, k) => result.push([k, v]));
      expect(result).toEqual(init);
    });
  });

});
