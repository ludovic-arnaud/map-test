import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient){}

  // Fonction d'initialisation du composant.
  ngOnInit() {
  // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
  const myMap = L.map('testmap').setView([43.62447, 1.48526], 15);
 
  // Ajout du fond de carte issu d'OSM et atrribution de myMap
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Test Map'
  }).addTo(myMap);

  // Création d'un marqueur personnalisé
  const myIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });
  L.marker([43.62447, 1.48526], {icon: myIcon}).bindPopup('AFPA de Balma').addTo(myMap).openPopup();

  // Création de marqueurs à partir de Data Toulouse (agenda des manifestations culturelles)
  this.http.get('https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=agenda-des-manifestations-culturelles-so-toulouse&q=&facet=type_de_manifestation').subscribe((data: any) => {
    data.records.forEach(manifestation => {
      L.marker([manifestation.geometry.coordinates[1], manifestation.geometry.coordinates[0]], {icon: myIcon}).bindPopup(manifestation.fields.descriptif_court).addTo(myMap);
    });
  });
}
}