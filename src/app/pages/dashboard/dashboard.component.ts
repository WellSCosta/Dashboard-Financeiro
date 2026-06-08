import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinanceService, Transaction } from '../../core/services/finance.service';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { HighlightAmountDirective } from '../../shared/directives/highlight-amount.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyFormatPipe, HighlightAmountDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Injetamos o serviço de forma moderna utilizando a função inject()
  private financeService = inject(FinanceService);

  // Expomos os signals do serviço diretamente para o template do HTML
  public transactions = this.financeService.transactions;
  public totalIncomes = this.financeService.totalIncomes;
  public totalExpenses = this.financeService.totalExpenses;
  public netBalance = this.financeService.netBalance;

  // Signal local para gerenciar o filtro atual ('all' | 'income' | 'expense')
  public currentFilter = signal<'all' | 'income' | 'expense'>('all');

  // Computed signal que filtra a lista de transações com base no currentFilter
  public filteredTransactions = computed(() => {
    const filter = this.currentFilter();
    const allTransactions = this.transactions();

    if (filter === 'all') return allTransactions;
    return allTransactions.filter(t => t.type === filter);
  });

  // Método para mudar o filtro ativo
  setFilter(filter: 'all' | 'income' | 'expense') {
    this.currentFilter.set(filter);
  }

  // Método para acionar a exclusão de uma transação
  deleteTransaction(id: string) {
    this.financeService.deleteTransaction(id);
  }
}
