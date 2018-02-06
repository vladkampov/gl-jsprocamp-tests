import lesson5 from '../src/lesson5';

const {
  Game,
  Hero,
  Monster
} = lesson5.task;

describe('OOP in JavaScript', function () {
  var warrior, rogue, sorcerer, zombie, skeleton, holem, game;

  beforeAll(function () {
    warrior = new Hero("test-hero-warrior", "warrior");
    rogue = new Hero("test-hero-rogue", "rogue");
    sorcerer = new Hero("test-hero-sorcerer", "sorcerer");

    zombie = new Monster("zombie");
    skeleton = new Monster("skeleton");
    holem = new Monster("holem");
  });


  describe('Test Hero creation', function () {

    var createPalladin = function () {
      new Hero("test-hero-palladin", "palladin");
    }

    it('It should be possible to create a Hero instance', function () {
      expect(warrior).toBeInstanceOf(Hero);
      expect(rogue).toBeInstanceOf(Hero);
      expect(sorcerer).toBeInstanceOf(Hero);
    });


    it('It should be possible get Hero character class', function () {
      expect(warrior.getCharClass()).toBe("Warrior");
      expect(rogue.getCharClass()).toBe("Rogue");
      expect(sorcerer.getCharClass()).toBe("Sorcerer");
    });


    it('It should be possible get Hero name', function () {
      expect(warrior.getName()).toBe("test-hero-warrior");
      expect(rogue.getName()).toBe("test-hero-rogue");
      expect(sorcerer.getName()).toBe("test-hero-sorcerer");
    });

    it('Hero should have predefined value of health', function () {
      expect(warrior.life).toEqual(30);
      expect(rogue.life).toEqual(25);
      expect(sorcerer.life).toEqual(20);
    });

    it('Hero should not attack other Heroes', function () {
      expect(warrior.attack(sorcerer)).toBe('I will attack only monsters');
    });

    it('Error should be returned when creating heroes of non existed character class(palladin)', function () {
      expect(createPalladin).toThrowError("Incorrect character class provided");
    });

  });

  describe('Test Monster creation', function () {

    var createViper = function () {
      new Monster("viper");
    }

    it('It should be possible to create a Hero instance', function () {
      expect(zombie instanceof Monster).toBe(true);
      expect(skeleton instanceof Monster).toBe(true);
      expect(holem instanceof Monster).toBe(true);
    });


    it('It should be possible get Monster character class', function () {
      expect(zombie.getCharClass()).toBe("Zombie");
      expect(skeleton.getCharClass()).toBe("Skeleton");
      expect(holem.getCharClass()).toBe("Holem");
    });


    it('It should be possible get Hero name', function () {
      expect(zombie.getName()).toBe("I am Zombie I don`t have name");
      expect(skeleton.getName()).toBe("I am Skeleton I don`t have name");
      expect(holem.getName()).toBe("I am Holem I don`t have name");
    });

    it('Hero should have predefined value of health', function () {
      expect(zombie.life).toEqual(8);
      expect(skeleton.life).toEqual(10);
      expect(holem.life).toEqual(15);
    });

    it('Monster should not attack other Monsters', function () {
      expect(holem.attack(skeleton)).toBe('I will attack only Hero');
    });

    it('Error should be returned when creating monsters of non existed character class(viper)', function () {
      expect(createViper).toThrowError("Incorrect character class provided");
    });

  });

  describe('Test Attacking skills', function () {

    it('Heroes and monsters should have appropriate amount of health', function () {
      expect(rogue.life).toEqual(25);
      expect(skeleton.life).toEqual(10);
      expect(rogue.damage).toEqual(3);
      expect(skeleton.damage).toEqual(6);
    });

    it('Monster should have heath decreased by the amount of Heroes damage', function () {

      var attackResult = rogue.attack(skeleton);

      expect(attackResult).toBe("Hero attacked, done 3 damage to Skeleton");
      expect(rogue.life).toEqual(25);
      expect(skeleton.life).toEqual(7);
    });

    it('Monster should not have life < 0', function () {

      rogue.attack(skeleton);
      var attackResult = sorcerer.attack(skeleton);

      expect(attackResult).toBe("Hero attacked, Skeleton killed");
      expect(skeleton.life).toEqual(0);
    });

    it('Hero should have heath decreased by the amount of Monster damage', function () {

      holem.attack(sorcerer);

      expect(sorcerer.life).toEqual(14);
    });

    it('Hero should not have life < 0', function () {

      holem.attack(sorcerer);
      holem.attack(sorcerer);
      holem.attack(sorcerer);

      expect(sorcerer.life).toEqual(0);
    });
  });

  describe('Test Game Creation', function () {
    const game = new Game();

    var beginJourney = function () {
      game.beginJourney();
    }

    it('Game default initiaing parameters should be correct', function () {
      expect(game.status).toBe("Idle");
      expect(game.hero).not.toBeDefined();
      expect(game.monsters.length).toEqual(0);
    });

    it('should not be possible to begin journey without hero and monsters', function () {
      expect(beginJourney).toThrowError("Cannot start journey, populate the world with hero and monsters first");
    });
  });

  describe('Test Game Adding Characters', function () {
    game = new Game();
    warrior = new Hero("test-hero-warrior", "warrior");
    zombie = new Monster("zombie");
    skeleton = new Monster("skeleton");

    it('should not be possible add hero of unallowed class, like Monster can`t be Hero', function () {
      var addMonsterAsHero = function () {
        return game.addHero(skeleton)
      }
      expect(addMonsterAsHero).toThrowError("Only hero instance can be hero");
      expect(game.hero).not.toBeDefined();
    });

    it('should not be possible create add monsters of unallowed class, like Hero can`t be Monster', function () {
      var addHeroAsMonster = function () {
        return game.addMonster(sorcerer)
      }
      expect(addHeroAsMonster).toThrowError("Only monster Instances can become monsters");
      expect(game.monsters.length).toEqual(0);
    });

    it('should be possible to fill game with hero and monster instances', function () {
      game.addHero(warrior);
      game.addMonster(skeleton);
      game.addMonster(zombie);

      expect(game.hero).toBeDefined();
      expect(game.monsters.length).toEqual(2);
    });

    it('should not be possible add more that one hero', function () {
      var addSecondHero = function () {
        return game.addHero(rogue)
      }
      expect(addSecondHero).toThrowError("Only one hero can exist");
    });

    it('should not be possible add more that 2 monsters', function () {
      var addThirdMonster = function () {
        return game.addMonster(holem)
      }
      expect(addThirdMonster).toThrowError("Only 2 monsters can exist");
    });
  });


  describe('Test Game Fighting Mechanism', function () {
    beforeAll(function () {
      game = new Game();
      warrior = new Hero("test-hero-warrior", "warrior");
      zombie = new Monster("zombie");
      skeleton = new Monster("skeleton");
    })


    it('should not be possible initiate fight between hero and monster, if game is not in "In progress" state', function () {
      expect(game.fight.bind(game)).toThrowError("Begin your journey to start fighting monsters");
    });

    it('should be possible to begin journey', function () {
      game.addHero(warrior);
      game.addMonster(skeleton);
      game.addMonster(zombie);

      var beginJourneyResult = game.beginJourney();
      expect(beginJourneyResult).toBe("Your journey has started, fight monsters");
      expect(game.status).toBe("In progress");
    });

    it('should be possible to initiate fight between hero and monster', function () {
      var fightResult = game.fight();
      expect(fightResult).toContain("Hero win");
    });

    it('First monster should be killed', function () {
      expect(game.monsters[0].life).toEqual(0);
    });
  });

  describe('Test Game Fighting Mechanism', function () {
    beforeAll(function () {
      game = new Game();
      warrior = new Hero("test-hero-warrior", "warrior");
      zombie = new Monster("zombie");
      skeleton = new Monster("skeleton");
      game.addHero(warrior);
      game.addMonster(skeleton);
      game.addMonster(zombie);
      game.beginJourney();
      game.fight();
    })

    it('Should not be possible to finish game, until any monster is alive, or hero is not dead', function () {
      var finishResult = game.finishJourney()
      expect(finishResult).toEqual("Don`t stop. Some monsters are still alive. Kill`em all");
      expect(game.status).toBe("In progress");
    });

    it('Should be possible to finish game, after all monsters are dead', function () {
      game.fight();
      var finishResult = game.finishJourney();
      expect(finishResult).toEqual("The Game is finished. Monsters are dead. Congratulations");
      expect(game.status).toBe("Finished")
    });
  });
});
