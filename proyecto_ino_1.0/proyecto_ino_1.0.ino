#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include "max6675.h"
#include <Wire.h> 
//-------------------VARIABLES GLOBALES--------------------------
int contconexion = 0;

const char *ssid = "***********";
const char *password = "***********";

unsigned long previousMillis = 0;

char *host = "***********" ;
String strhost = "***********";
String strurl = "/datosSensores.php";

int thermoDO = 12;
int thermoCS = 13;
int thermoCLK = 14;

MAX6675 thermocouple(thermoCLK, thermoCS, thermoDO);

//-------Función para Enviar Datos a la Base de Datos SQL--------

String enviardatos(String datos) {
  String linea = "error";
  WiFiClient client;
  //strhost.toCharArray(host, 49);
  if (!client.connect(host, 80)) {
    Serial.println("Fallo de conexion");
    return linea;
  }

  client.print(String("POST ") + strurl + " HTTP/1.1" + "\r\n" + 
               "Host: " + strhost + "\r\n" +
               "Connection: keep-alive" + "\r\n" + 
               "Content-Length: " + datos.length() + "\r\n" +
               "Cache-Control: max-age=0" + "\r\n" + 
               "Upgrade-Insecure-Requests: 1" + "\r\n" + 
               "Origin: ***********" + "\r\n" + 
               "Content-Type: application/x-www-form-urlencoded" + "\r\n" + 
               "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" + "\r\n" + 
               
               "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" + "\r\n" + 
               "Referer: http://pruebaesp.epizy.com/" + "\r\n" + 
               "Accept-Encoding: gzip, deflate" + "\r\n" + 
               "Accept-Language: es-ES,es;q=0.9,en;q=0.8" + "\r\n" + 
               //"Cookie: _ga=GA1.2.502390546.1617007589; _gid=GA1.2.1477337022.1617169836; __test=c63a4363360a09dd85596b39aec395c5" + "\r\n" +              
               "Cookie: _ga=GA1.2.502390546.1617007589; _gid=GA1.2.530560426.1618294575; __test=dceaadb3359cb26f0e2039d5655ca320" + "\r\n" +
               "\r\n" + datos);           
  delay(10);             
  
  Serial.print("Enviando datos a SQL...");
  
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println("Cliente fuera de tiempo!");
      client.stop();
      return linea;
    }
  }
  // Lee todas las lineas que recibe del servidro y las imprime por la terminal serial
  while(client.available()){
    linea = client.readStringUntil('\r');
    Serial.print(linea);
  }  
  //Serial.println(linea);
  return linea;
}

//-------------------------------------------------------------------------

void setup() {

  // Inicia Serial
  Serial.begin(115200);
  Serial.println("");

  // Conexión WIFI
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED and contconexion <50) { //Cuenta hasta 50 si no se puede conectar lo cancela
    ++contconexion;
    delay(500);
    Serial.print(".");
  }
  if (contconexion <500) {
      //para usar con ip fija     
      Serial.println("");
      Serial.println("WiFi conectado");
      Serial.println(WiFi.localIP());
  }
  else { 
      Serial.println("");
      Serial.println("Error de conexion");
  }
}

//--------------------------LOOP--------------------------------//
void loop() {

  unsigned long currentMillis = millis();
  
  if (currentMillis - previousMillis >= 10000) { //envia la temperatura cada 10 segundos
    previousMillis = currentMillis;
    float temp = thermocouple.readCelsius();
    String nombreChip = "Sensor****";
    String codigo_Sensor = "TS2021-001";
    Serial.println(" ---- " + String(temp));
    Serial.println(" ---- " + nombreChip);
    enviardatos("&temperatura=" + String(temp, 2) + "&nombreChip=" + nombreChip + "&codigo_Sensor=" + codigo_Sensor );
  }
}
