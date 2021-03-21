const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here
  it("constructor sets position and default values for mode and generatorWatts.",function() {
    let rover=new Rover(123);
    expect(rover.position).toEqual(123);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
    });
    //test 8

    it("response returned by receiveMessage contains name of message",function(){
      let rover=new Rover(123);
      let command=[new Command("abc")];
      let message=new Message("name of message",command);
      let response=rover.receiveMessage(message)
      expect(response.message).toEqual("name of message");
    });

    // test 9
    it("response returned by receiveMessage includes two results if two commands are sent in the message" ,function(){
      let rover=new Rover(123);
      let command=[new Command('MODE_CHANGE','LOW_POWER'), new Command('STATUS_CHECK')];
      let message=new Message("two message",command);
      let response=rover.receiveMessage(message);
      expect(response.results.length).toEqual(2);
      });

    // test 10
    it("responds correctly to status check command", function(){
      let rover=new Rover(123);
      let command=[new Command("STATUS_CHECK")];
      let message=new Message("one comend",command);
      let response=rover.receiveMessage(message);
      expect(response.results).toEqual([{completed: true, roverStatus:{ mode: 'NORMAL', generatorWatts: 110, position:123 }}])
    })
    //test 11
    it("responds correctly to status check command", function(){
      let rover=new Rover(123);
      let command=[new Command("MODE_CHANGE","LOW_POWER")];
      let message=new Message("one comend",command);
      let response=rover.receiveMessage(message);
      expect(response.results).toEqual([{completed: true}]);
      expect(rover.mode).toEqual('LOW_POWER')
    })
    //test 12
   it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
      let rover=new Rover(123);
      let command=[new Command("MODE_CHANGE","LOW_POWER"),new Command("Move",321)];
      let message=new Message("two comend",command);
      let response=rover.receiveMessage(message);
      expect(response.results).toEqual([{completed: true}],[{completed: false}]);
      expect(rover.position).toEqual(123);
    })
    //test 13
  it("responds with position for move command", function(){
      let rover=new Rover(123);
      let command=[new Command("MOVE",321)];
      let message=new Message("one comend",command);
      let response=rover.receiveMessage(message);
      expect(response.results).toEqual([{completed: true}])
      expect(rover.position).toEqual(321)
    })

  })

