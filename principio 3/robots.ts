class RobotOld {
  makeAmericanCoffee() {
    console.log("american coffee");
  }
}

class RobotModern extends RobotOld {
  makeCapucchino() {
    console.log("capucchino");
  }
}

const robot = new RobotModern();
robot.makeAmericanCoffee();
