#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

#define PIN            6
#define NUMPIXELS      30
#define NUMPIXELSPERWINDOW 2
#define BAUD 9600

#define RED pixels.Color(155,0,0)
#define ORANGE pixels.Color(255,165,0)
#define GREEN pixels.Color(0,155,0)
#define OFF pixels.Color(0,0,0)

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

int delayval = 500; // delay for half a second
int receivedNumbers[2];

void setup() {
  pixels.begin(); // This initializes the NeoPixel library.
  Serial.begin(BAUD);           // set up Serial library at 9600 bps
  pixels.setBrightness(155);
  for (int i = 0; i<6;  i++) {
      setWindow(i, RED);
    }
}

void loop() {
  if (Serial.available() > 0) {
    recvWithEndMarker();
    uint32_t color;
    switch (receivedNumbers[1]) {
      case 0: color = GREEN; break;
      case 1: color = RED; break;
      case 2: color = OFF; break;
      }
      setWindow(receivedNumbers[0],color);
  }
}

void recvWithEndMarker() {
 String input = Serial.readStringUntil('\n');
 receivedNumbers[0] = input.substring(0, 1).toInt();
 receivedNumbers[1] = input.substring(2, 3).toInt();
}

void setWindow(int window, uint32_t color) {
  int pixelInd = NUMPIXELSPERWINDOW*window + window;
  for (int i = pixelInd; i < pixelInd + NUMPIXELSPERWINDOW; i++ ) {
    pixels.setPixelColor(i, color);
    pixels.show();
  }
}

