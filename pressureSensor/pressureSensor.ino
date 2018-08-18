// In order to signal that the train switched stations, send a POST request to hostname/nextStation
// E.g.: curl -X POST http://123.45.67.89/nextStation

#include "connections.h"

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define PERSON_WEIGHT 150
#define WEIGHT_PIN A0

#define MODEL "D"
#define WAGON_COUNT 6
#define SEAT_COUNT 36

int currentStation = 0;
#define MAX_STATION 28
int travelDirection = 1;

HTTPClient http;
WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  connectToWifi();
  startServer();
}

void connectToWifi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
 
    delay(1000);
    Serial.println("Connecting..");
 
  }
  Serial.println(WiFi.localIP());
}

void startServer() {
  server.begin();
  Serial.println("Server started");

  Serial.print("Use this URL : ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
}

void loop() {
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }
 
  // Read the first line of the request
  String request = client.readStringUntil('\r');
  client.flush();

  // Handle request
  if (request.indexOf("/nextStation") != -1) {
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/plain");
    client.println("");
    client.println("Received");

    sendSeatingJson();
  }
  else {
    client.println("HTTP/1.1 404 Not Found");
  }
}

bool isPersonSitting(int carIndex, int seatIndex) {
  if (carIndex != 0 || seatIndex != 0) return true;
  int value = analogRead(WEIGHT_PIN);
  if (value >= PERSON_WEIGHT) return true;
  return false;
}

int getCurrentStation() {
  int station = currentStation;
  currentStation += travelDirection;
  if (currentStation == 0) {
    travelDirection = 1;
  }
  else if (currentStation == MAX_STATION) {
    travelDirection = -1;
  }
  return station;
}

String getDirectionString() {
  return travelDirection == 1 ? "H" : "R";
}

int getWagonSeatingCount(int wagonIndex) {
  int count = 0;
  for (int i=0; i < SEAT_COUNT; i++) {
    if (isPersonSitting(wagonIndex, i)) {
      count++;
    }
  }
  return count;
}

String makeSeatingJson() {
  String jsonString = "{\"line\":\"U6\",\"id\":16,\"baureihe\":\"D\"";
  jsonString += ",\"station\":" + String(getCurrentStation());
  jsonString += ",\"direction\":\"" + getDirectionString() + "\"";
  jsonString += ",\"wagons\":[";
  for (int i=0; i < WAGON_COUNT; i++) {
    jsonString += String(getWagonSeatingCount(i));
    if(i < WAGON_COUNT - 1) {
      jsonString += ",";
    }
  }
  jsonString += "]}";
  return jsonString;
}

void sendSeatingJson() {
  HTTPClient http;  //Declare an object of class HTTPClient
  http.begin(seatingUrl);  //Specify request destination
  http.addHeader("Content-Type", "application/json");
  String jsonString = makeSeatingJson();
  int httpCode = http.POST(jsonString.c_str());            
  http.end();   //Close connection
  Serial.println(httpCode);
}

