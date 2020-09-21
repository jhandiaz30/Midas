import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  rutas = [
    {
      title:'Ili'
    },
    {
      title:'Cinco Reglas de Oro'
    },
    {
      title:'ODC'
    },
    {
      title:'Encuesta'
    }
  ];

  constructor() { }

  ngOnInit() {}

}
