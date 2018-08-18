#include "credentials.h"

#include <ESP8266WiFi.h>

#define PERSON_WEIGHT 150
#define WEIGHT_PIN A0

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
 
    delay(1000);
    Serial.println("Connecting..");
 
  }
 
  Serial.println(WiFi.localIP());
}

void loop() {}
