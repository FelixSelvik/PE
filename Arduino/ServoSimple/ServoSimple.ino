#include <Stepper.h>

const int stepsPerRevolution = 32;  // change this to fit the number of steps per revolution
// for your motor

// initialize the stepper library on pins 8 through 11:
Stepper myStepper(stepsPerRevolution, 11, 10, 9, 11);

void setup() {
  // set the speed at 60 rpm:
  myStepper.setSpeed(120);
  // initialize the serial port:
  Serial.begin(9600);
}

void loop() {

  // step one revolution in the other direction:
  Serial.println("counterclockwise");
  myStepper.step((stepsPerRevolution/4));
  delay(200);
  
}