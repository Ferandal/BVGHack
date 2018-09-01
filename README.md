# "Smarter Sitz" für den BVGHack

## Motivation
An Bahngleisen stehen die Fahrgäste beliebig rum und hoffen, dass sie reibungslos in den Zug kommen und am besten einen Sitzplatz erhalten. Gleichzeitig besitzt die BVG ein automatisches Fahrgastzählsystem in 25% ihrer Züge. Unsere Vision ist es, den Fahrgästen durch eine leuchtende Bahnsteig-Anzeige zu zeigen, welche Abschnitte des nächsten Wagens frei sind. Das bedeutet für uns, wo auf jeden Fall Sitzplätze vorhanden sind. Gleichzeitig erfassen wir für BVG in Echtzeit die Auslastung der Wagons und können so Rush-Hours erkennen und Abfahrtsintervalle anpassen oder mehr Zugwagons einsetzen. Somit können wir erfassen, wie gut die Verkehrsplanung der BVG funktioniert und wo die Mobilitäts-Angebote ausgebaut werden sollten.

## Funktionsweise
Unser "Smarter Sitz" besitzt einen Sensor zur Erkennung, ob dieser besetzt ist. Wir senden somit sofort ein Signal und verfolgen die Auslastung der Wagons. Am Gleis der nächsten Station existiert eine leuchtende Anzeige, welche mit grün, orange und rot in Echtzeit signalisiert, in welchen Abschnitten freie Plätze sind und man sich somit dort einsortieren kann.
Gleichzeitig erhält BVG an einem Monitor eine Liveansicht ihrer Züge und erkennt auch durch Einfärbung der Wagons frühzeitig, ob der Einsatz von weiteren Fahrzeugen nötig ist oder die Auslastung so gering ist, dass Intervalle verlängert oder Wagons eingespart werden können.

## Wie haben wir es gebaut?
Wir haben einen Arduino mit esp8266-Wlan-Modul und einen Drucksensor genutzt, um die Information über einen besetzten Platz zu sammeln. Für die Bahnsteig-Anzeige haben wir einen Wagon aus Pappe gebastelt und einen WS2812b-LED-Streifen verbaut.
Für unsere BVG-Monitor haben wir die bereitgestellten Daten des [AFZS (Automatisches Fahrgastzählsystem)](https://bvg-hackathon-2018.devpost.com/forum_topics/7883-nachfrage-und-betriebsdaten-der-bvg) von BVG genutzt.

## Herausforderungen
Die Daten nutzbar für unseren Anwendungszweck zu machen und die Hardware aufzutreiben, waren Herausforderungen beim Entwickeln. Außerdem einen typischen BVG-Bezug für den "Smarten Stuhl" zu basteln.

## Worauf sind wir stolz?
Dieser Sitz kann nicht nur in Zügen sondern auch in den Bussen der BVG eingesetzt werden. Wir sind begeistert, wie schön die LED-Anzeige geworden ist und intuitiv uns die Anzeige der Fahrgastzähldaten auf dem [BVG-Monitor](https://youtu.be/cu15WmLzTO8) gelungen ist.

## Was haben wir gelernt?
Heute zeigen wir, wie man mit kaum Schlaf präsentiert.

## Weitere Schritte für "Smarter Sitz"
Die Fahrgäste sollen Vorschläge erhalten, auf welche alternativen Verkehrsmittel sie zurückgreifen könnten (bspw Roller oder Bike), um stressfreier ans Ziel zu gelangen.


Ganz nach dem Motto: Suchst du noch oder sitzt du schon?
