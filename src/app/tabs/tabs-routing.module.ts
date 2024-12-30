import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'status',
        loadChildren: () => import('../status/status.module').then(m => m.StatusPageModule),
      },
      {
        path:'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule),
      },
      {
        path: '',
        redirectTo: 'home', // Cambia a ruta relativa
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home', // Cambia a ruta absoluta si viene de fuera del contexto
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
