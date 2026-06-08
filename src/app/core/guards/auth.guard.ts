import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Simulação didática de autenticação:
  // Se não existir o item 'auth_token' no localStorage, simulamos um bloqueio.
  // Para que você consiga usar a aplicação sem travar, se o token não existir, 
  // nós vamos criá-lo automaticamente e permitir a entrada, mas exibindo logs informativos no console do navegador.
  const token = localStorage.getItem('auth_token');

  if (!token) {
    console.warn('AuthGuard: Nenhum token encontrado! Gerando um token de demonstração...');
    localStorage.setItem('auth_token', 'demo-token-12345');
  } else {
    console.log('AuthGuard: Usuário autenticado. Acesso concedido para a rota:', state.url);
  }

  return true; // Retorna true para permitir a navegação
};
