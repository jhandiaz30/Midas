import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

/*GUARD*/
import { AuthGuard } from "./guard/auth.guard";

//AQUI SE PRESENTAN LAS RUTAS DE CADA PAGINA DE LA APLICACION
const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: "./pages/auth/login/login.module#LoginPageModule",
  },
  {
    path: "home",
    loadChildren: "./pages/home/home.module#HomePageModule",
    canLoad: [AuthGuard],
  },

  {
    path: "odc",
    loadChildren: "./pages/odc/odc.module#OdcPageModule",
    canLoad: [AuthGuard],
  },
  {
    path: "accidentalidad",
    loadChildren:
      "./pages/accidentalidad/accidentalidad.module#AccidentalidadPageModule",
  },
  {
    path: "ili",
    loadChildren: "./pages/accidentalidad/ili/ili.module#IliPageModule",
  },

  {
    path: "accidentes-form",
    loadChildren:
      "./pages/accidentalidad/accidentes-form/accidentes-form.module#AccidentesFormPageModule",
  },

  {
    path: "accidentes-form2/:datos",
    loadChildren:
      "./pages/accidentalidad/accidentes-form2/accidentes-form2.module#AccidentesForm2PageModule",
  },

  {
    path: "estadisticas/:data",
    loadChildren:
      "./pages/accidentalidad/ili/estadisticas/estadisticas.module#EstadisticasPageModule",
  },

  {
    path: "encuesta",
    loadChildren: "./pages/encuesta/encuesta.module#EncuestaPageModule",
  },

  {
    path: "mostrar-encuesta",
    loadChildren:
      "./pages/encuesta/mostrar-encuesta/mostrar-encuesta.module#MostrarEncuestaPageModule",
  },

  {
    path: "ver-encuesta",
    loadChildren:
      "./pages/encuesta/ver-encuesta/ver-encuesta.module#VerEncuestaPageModule",
  },

  {
    path: "editar-encuesta/:datos",
    loadChildren:
      "./pages/encuesta/editar-encuesta/editar-encuesta.module#EditarEncuestaPageModule",
  },

  {
    path: "editar-accidentes",
    loadChildren:
      "./pages/accidentalidad/editar-accidentes/editar-accidentes.module#EditarAccidentesPageModule",
  },

  {
    path: "lista-accidentes",
    loadChildren:
      "./pages/accidentalidad/lista-accidentes/lista-accidentes.module#ListaAccidentesPageModule",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
