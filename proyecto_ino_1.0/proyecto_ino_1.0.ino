#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include "max6675.h"
#include <EMailSender.h>

//TERMOSENSOR
int thermoDO = 12;
int thermoCS = 13;
int thermoCLK = 14;
MAX6675 thermocouple(thermoCLK, thermoCS, thermoDO);

int counterTemp = 0;
int counterVoltaje = 0;
unsigned long previousMillis = 0;


//MEDIDOR DE VOLTAJE
int readValue;
int maxValue = 0;
int minValue = 1024;
float Vpp;
float Vrms;
float current;
float power;


const char *ssid = "*********";
const char *password = "*********";

//Web/Server address to read/write from
const char *host = "*********";
const int httpsPort = 443;  //HTTPS= 443 and HTTP = 80

//SHA1 huella digital del certificado de la web
const char fingerprint[] PROGMEM = "E6 EF CA 92 DD A6 50 4B 88 2D DE 44 D7 4C A6 A7 75 78 E3 68";

//TELEGRAM
//const String BOTtoken  = "*****(token)*****";  // your Bot Token (Get from Botfather)
//const String CHAT_ID = "*****(ID_TELEGRAM_CHAT)*****";
//X509List cert(TELEGRAM_CERTIFICATE_ROOT);
//WiFiClientSecure clientTelegram;
//UniversalTelegramBot bot(BOTtoken, clientTelegram);

//GMAIL
//Configura el emisor del email
EMailSender emailSend("****(email)*****", "*****(password)*****");

//=======================================================================
//                    Power on setup
//=======================================================================

void setup() {
  delay(1000);
  Serial.begin(115200);
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(1000);
  WiFi.mode(WIFI_STA);        //Only Station No AP, This line hides the viewing of ESP as wifi hotspot

  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");

  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP

  //********************* EMAIL *********************

  EMailSender::EMailMessage message;
  message.subject = "Conexión iniciada en ****";
  message.message = "Sensor conectado a WIFI";

  //Configura el receptor del email
  EMailSender::Response resp = emailSend.send("*********", message);

  Serial.println("Sending status: ");

  Serial.println(resp.status);
  Serial.println(resp.code);
  Serial.println(resp.desc);

  //********************* TELEGRAM *********************
  //    configTime(0, 0, "pool.ntp.org");      // get UTC time via NTP
  //    clientTelegram.setTrustAnchors(&cert); // Add root certificate for api.telegram.org
  //    bot.sendMessage(CHAT_ID, "Bot Restarted", "");

}

//=======================================================================
//                    Main Program Loop
//=======================================================================
void loop() {
  //Lee el sensor de temperatura y almacena el valor en esta variable
  float temp = thermocouple.readCelsius();

  uint32_t startTime = millis();

//  //Lee la entrada analogica y calcula los valores del voltaje
//  while ( millis() - startTime < 1000) {
//    /* Lee el valor del sensor en el puerto analogico */
//    readValue = analogRead(A0);
//
//    /* Determina el valor maximo */
//    if (readValue > maxValue) maxValue = readValue;
//
//    /* Determina el valor minimo */
//    if (readValue < minValue) minValue = readValue;
//  }
//
//  /* Cualcula el VPP */
//  Vpp = ((maxValue - minValue) * 3.3) / 1024.0;
//
//  /* Determina el Vrms */
//  Vrms = (Vpp / 2.0) * 0.707;
//
//  /*
//    Then find the current using sensitivity of sensor
//    It is 185mV/A for 5A, 100 mV/A for 20A and 66mV/A for 30A Module
//    We are using 5A sensor
//  */
//  current = (Vrms * 1000.0) / 185.0;
//
//  /* Finally calculate the power considering ideal state with pure resistive load */
//  power = 230.0 * current;

  ///////////////////////////////////////////////
  ////////////Alertas sensor Voltaje/////////////
  ///////////////////////////////////////////////
  /*


    if (power <= 11) {

      counterVoltaje++;
      //Serial.println("CounterVoltaje = " + String(counterVoltaje));
    } else {
      counterVoltaje = 0;
      //Serial.println("CounterVoltaje = " + String(counterVoltaje));
    }

    if (counterVoltaje == 6) {
      Serial.println("Enviando correo...");
      EMailSender::EMailMessage message;
      message.subject = "Alerta voltaje ****";
      String mensaje = "Sensor no mide voltaje desde hace un tiempo ";
      message.message = mensaje;

      EMailSender::Response resp = emailSend.send("*********", message);
      counterVoltaje = 0;
      delay(200);
    }
  */
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////

  //Este if comprueba que la temperatura esté dentro de los valores indicados
  //Si no es así suma 1 al contador para mandar un mail
  if (temp > 20 && temp <= 24) {
    counterTemp = 0;
    //Serial.println("CounterTemperatura = " + String(counterTemp));
  } else {
    counterTemp++;
    //Serial.println("CounterTemperatura = " + String(counterTemp));
  }
    Serial.println(" ---- " + String(temp));
    Serial.println("CounterTemperatura = " + String(counterTemp));

  //Este if envia un email de alerta si el contador de temperatura llega a 6
  if (counterTemp == 6) {
    Serial.println("Enviando correo...");
    EMailSender::EMailMessage message;
    message.subject = "Alerta por temperatura ****";
    String mensaje = "Sensor ha medido una temperatura de ";
    mensaje += temp;
    mensaje += "°C ";
    message.message = mensaje;
    
    EMailSender::Response resp = emailSend.send("*********", message);
    counterTemp = 0;
    delay(200);
  }

  unsigned long currentMillis = millis();
  //Cada 60'' envía el valor de la temperatura a la BBDD
  if (currentMillis - previousMillis >= 60000) {
    previousMillis = currentMillis;
    enviarDatosBBDD();
  }

}

//Esta función envía una petición HTTP GET a la base de datos
//La cual almacena los datos del sensor de temperatura
void enviarDatosBBDD() {
  WiFiClientSecure httpsClient;    //Declare object of class WiFiClient

  Serial.println(host);

  Serial.printf("Using fingerprint '%s'\n", fingerprint);
  httpsClient.setFingerprint(fingerprint);
  httpsClient.setTimeout(15000); // 15 Seconds
  delay(1000);

  Serial.print("HTTPS Connecting");
  int r = 0; //retry counter
  while ((!httpsClient.connect(host, httpsPort)) && (r < 30)) {
    delay(100);
    Serial.print(".");
    r++;
  }
  if (r == 30) {
    Serial.println("Connection failed");
  }
  else {
    Serial.println("Connected to web");
  }

  float temp = thermocouple.readCelsius();

  String  Link;

  //GET Data
  Link = "/iot.php?temp=" + String(temp, 2) ;

  Serial.print("requesting URL: ");
  Serial.println(host + Link);

  httpsClient.print(String("GET ") + Link + " HTTP/1.1\r\n" +
                    "Host: " + host + "\r\n" +
                    "Connection: close\r\n\r\n");

  Serial.println("request sent");

  while (httpsClient.connected()) {
    String line = httpsClient.readStringUntil('\n');
    if (line == "\r") {
      Serial.println("headers received");
      break;
    }
  }

  Serial.println("reply was:");
  Serial.println("==========");
  String line;
  while (httpsClient.available()) {
    line = httpsClient.readStringUntil('\n');  //Read Line by Line
    Serial.println(line); //Print response
  }
  Serial.println("==========");
  Serial.println("closing connection");


}

//=======================================================================
