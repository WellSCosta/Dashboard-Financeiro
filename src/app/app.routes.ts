import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionFormComponent } from './pages/transaction-form/transaction-form.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Finanças - Dashboard'
  },
  {
    path: 'nova-transacao',
    component: TransactionFormComponent,
    title: 'Finanças - Nova Transação',
    canActivate: [authGuard] // Protegendo esta rota com o Guard didático
  },
  {
    path: '**', // Rota curinga para redirecionar caminhos não encontrados (404)
    redirectTo: ''
  }
];
