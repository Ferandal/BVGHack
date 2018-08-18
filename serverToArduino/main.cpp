#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include "SerialPort.h"
#include "SerialPort.cpp"

using namespace std;

char *port_name = "COM3";
SerialPort arduino(port_name);

char incomingData[MAX_DATA_LENGTH];

void sendColorSettingsToArduino(string colorsetting) {
	if (arduino.isConnected()) {
		char *c_string = new char[colorsetting.size() + 1];
		copy(colorsetting.begin(), colorsetting.end(), c_string);

		c_string[colorsetting.size()] = '\n';

		arduino.writeSerialPort(c_string, MAX_DATA_LENGTH);

		delete[] c_string;
	}
}

int main()
{
	if (arduino.isConnected()) cout << "Connection Established" << endl;
	else cout << "ERROR, check port name";

	while (arduino.isConnected()) {
		string input_string;
		getline(cin, input_string);
		sendColorSettingsToArduino(input_string);
	}
}