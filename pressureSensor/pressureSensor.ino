#include "connections.h"

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>


#define PERSON_WEIGHT 150
#define WEIGHT_PIN A0

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
  Serial.println(request);
  client.flush();

  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println(""); //  do not forget this one
  client.println("<!DOCTYPE HTML>");
  client.println("<html>Done</html>");

  
  HTTPClient http;  //Declare an object of class HTTPClient

  http.begin("http://192.168.193.144");  //Specify request destination
  int httpCode = http.GET();               
  http.end();   //Close connection
  Serial.println(httpCode);
 
}

