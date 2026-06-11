# Bestellapp

Eine kleine responsive Bestell-App für ein fiktives Restaurant namens **BurgerHouse**. Die App zeigt Burger, Pizza und Salate, erlaubt das Hinzufügen von Artikeln in den Warenkorb und berechnet Zwischensumme, Lieferung und Gesamtpreis direkt im Browser.

## Features

- responsive Oberfläche für Desktop und Mobile
- Kategorien für Burger, Pizza und Salate
- Warenkorb mit Mengensteuerung
- optionale Lieferauswahl mit Distanzpreisen
- Speicherung von Warenkorb und Lieferauswahl im Browser
- Bestellbestätigung als Modal
- Impressum- und Datenschutzseiten

## Technologien

- HTML
- CSS
- JavaScript
- Local Storage für gespeicherte Warenkorb-Daten

## Lokal starten

Das Projekt benötigt keinen Build-Schritt. Es kann direkt im Browser geöffnet werden.

Empfohlen ist ein kleiner lokaler Server:

```bash
python -m http.server 8765
```

Danach im Browser öffnen:

```text
http://127.0.0.1:8765
```

## Projektstruktur

```text
assets/      Bilder und Icons
scripts/     JavaScript für Daten, Templates, Warenkorb und App-Start
styles/      CSS für Layout, Warenkorb, Mobile-Ansicht und Grundstile
index.html   Hauptseite der App
```

## Open Source

Der Code ist als Open-Source-Projekt gedacht. Falls das Repository öffentlich geteilt wird, sollte noch eine passende `LICENSE`-Datei ergänzt werden, damit die Nutzungsrechte eindeutig geregelt sind.
