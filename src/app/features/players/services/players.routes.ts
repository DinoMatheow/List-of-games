import { Routes } from "@angular/router";
import { PlayerLayoutsComponent } from "../../../shared/layouts/playerLayouts/playerLayouts.component";
import { PodiumComponent } from "../pages/podium/podium.component";
import { ByDeathsComponent } from "../pages/by-deaths/by-deaths.component";
import { ByKillsComponent } from "../pages/by-kills/by-kills.component";
import { IdPageComponent } from "../pages/id-page/id-page.component";

export const playersRoutes: Routes = [
  {
    path: '',
    component: PlayerLayoutsComponent,
    children: [
      {
        path: 'home-menu',
        component: IdPageComponent,
      },
      {
        path: 'by-deaths',
        component: ByDeathsComponent,
      },
      {
        path: 'create-podium',
        component: PodiumComponent,
      },
      {
        path: 'by/:id-player',
        component: IdPageComponent,
      },
      {
        path: 'by-kills',
        component: ByKillsComponent,
      },
      {
        path: '**',
        redirectTo: 'home-menu',
      },
    ],
  },
];

export default playersRoutes;
