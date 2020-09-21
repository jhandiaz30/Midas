import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

/* SE IMPORTA LA LIBRERIA PARA GRAFICAS */
import { Chart } from "chart.js";

@Component({
  selector: "app-estadisticas",
  templateUrl: "./estadisticas.page.html",
  styleUrls: ["./estadisticas.page.scss"],
})
export class EstadisticasPage implements OnInit {
  public datos: any;

  public meses: any = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  @ViewChild("graficaIli") lineCanvas: ElementRef;

  private lineChart: Chart;

  constructor(private activateR: ActivatedRoute) {}

  ngOnInit() {
    //AQUI SE TRAEN LOS DATOS DE LA PAGINA DE ILI
    this.datos = JSON.parse(this.activateR.snapshot.paramMap.get("data"));

    //COLOR DE LA FUENTE GENERAL
    Chart.defaults.global.defaultFontColor = "#004694";

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: [
          this.meses[this.datos[0].MES - 1],
          this.meses[this.datos[1].MES - 1],
          this.meses[this.datos[2].MES - 1],
          this.meses[this.datos[3].MES - 1],
          this.meses[this.datos[4].MES - 1],
          this.meses[this.datos[5].MES - 1],
        ],
        datasets: [
          {
            label: "Indicador de lesiones incapacitantes",
            fill: false, //relleno de la linea que marca los datos
            lineTension: 0.1,
            backgroundColor: "#009BDB", //color del relleno del cuadro
            borderColor: "#004694", // color de la linea que traza los datos
            borderCapStyle: "round",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "round",
            borderWidth: 2,
            pointBorderColor: "#96cce3", // color del borde de los circulos
            pointBackgroundColor: "#009BDB", //color del relleno de los circulos
            pointBorderWidth: 1, //grosor de la linea de los circulos
            pointHoverRadius: 5, // tamaño de los circulos en modo hover
            pointHoverBackgroundColor: "#009BDB", // color del relleno del cuadro que muestra informacion detallada hover
            pointHoverBorderColor: "#96cce3", // color del borde de los circulos en modo hover
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [
              this.datos[0].ILI,
              this.datos[1].ILI,
              this.datos[2].ILI,
              this.datos[3].ILI,
              this.datos[4].ILI,
              this.datos[5].ILI,
            ],
            spanGaps: false,
          },
        ],
      },
    });
  }
}
