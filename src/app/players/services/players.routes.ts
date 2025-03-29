import { Routes } from "@angular/router";
import { PlayerLayoutsComponent } from "../layouts/playerLayouts/playerLayouts.component";
import { CharactersComponent } from "../pages/characters/characters.component";
import { ByDeathsComponent } from "../pages/by-deaths/by-deaths.component";
import { ByKillsComponent } from "../pages/by-kills/by-kills.component";
import { IdPageComponent } from "../pages/id-page/id-page.component";
export const playersRoutes: Routes = [
  {
    path: '',
    component: PlayerLayoutsComponent,
    children: [
      {
        path: 'characters',
        component: CharactersComponent,
      },
      {
        path: 'by-deaths',
        component: ByDeathsComponent,
      },
      {
        path: 'by-kills',
        component: ByKillsComponent,
      },
      {
        path: 'by/:id-player',
        component: IdPageComponent,
      },
      {
        path: '**',
        redirectTo: 'characters',
      },
    ],
  },
];


export default playersRoutes;
