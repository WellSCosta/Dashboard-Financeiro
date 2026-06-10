import { Component, inject, signal, computed, AfterViewInit, OnDestroy, ElementRef, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinanceService, Transaction } from '../../core/services/finance.service';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { HighlightAmountDirective } from '../../shared/directives/highlight-amount.directive';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Mapa de cores fixo e profissional compartilhado entre o Gráfico e a lista de Breakdown
const CATEGORY_COLORS: { [key: string]: string } = {
  'Alimentação': '#ef4444',   // Vermelho
  'Transporte': '#f97316',    // Laranja
  'Lazer': '#eab308',         // Amarelo
  'Moradia': '#a855f7',       // Roxo
  'Saúde': '#ec4899',         // Rosa
  'Educação': '#3b82f6',      // Azul Claro
  'Vestuário': '#06b6d4',     // Ciano
  'Assinaturas': '#10b981',   // Verde Esmeralda
  'Outros': '#64748b'         // Cinza Slate
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyFormatPipe, HighlightAmountDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  private financeService = inject(FinanceService);

  public transactions = this.financeService.transactions;
  public expensesOnly = this.financeService.expensesOnly;
  public totalIncomes = this.financeService.totalIncomes;
  public totalExpenses = this.financeService.totalExpenses;
  public netBalance = this.financeService.netBalance;

  public currentFilter = signal<'all' | 'income' | 'expense'>('all');

  @ViewChild('expenseChartCanvas') private expenseChartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartInstance: Chart | null = null;

  public filteredTransactions = computed(() => {
    const filter = this.currentFilter();
    const allTransactions = this.transactions();

    if (filter === 'all') return allTransactions;
    return allTransactions.filter(t => t.type === filter);
  });

  // Computed signal que agrupa despesas para alimentar o Chart.js
  private categoryData = computed(() => {
    const expenses = this.expensesOnly();
    const grouped: { [category: string]: number } = {};

    expenses.forEach(expense => {
      grouped[expense.category] = (grouped[expense.category] || 0) + expense.amount;
    });

    const labels = Object.keys(grouped);
    // Associa as cores do array dinamicamente com base na categoria
    const colors = labels.map(label => CATEGORY_COLORS[label] || '#64748b');

    return {
      labels: labels,
      values: Object.values(grouped),
      colors: colors
    };
  });

  // Computed signal para listar os detalhes das categorias com barras de progresso abaixo do gráfico
  public categoryBreakdown = computed(() => {
    const expenses = this.expensesOnly();
    const totalExp = this.totalExpenses();
    if (totalExp === 0) return [];

    const grouped: { [category: string]: number } = {};
    expenses.forEach(e => {
      grouped[e.category] = (grouped[e.category] || 0) + e.amount;
    });

    return Object.keys(grouped).map(cat => {
      const amount = grouped[cat];
      const percentage = (amount / totalExp) * 100;
      return {
        category: cat,
        amount: amount,
        percentage: percentage,
        color: CATEGORY_COLORS[cat] || '#64748b'
      };
    }).sort((a, b) => b.amount - a.amount); // Ordena do maior gasto para o menor
  });

  constructor() {
    effect(() => {
      const data = this.categoryData();
      if (this.chartInstance) {
        this.updateChart(data.labels, data.values, data.colors);
      }
    });
  }

  ngAfterViewInit() {
    const data = this.categoryData();
    this.initChart(data.labels, data.values, data.colors);
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private initChart(labels: string[], values: number[], colors: string[]) {
    const ctx = this.expenseChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#1e293b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Escondemos a legenda padrão do Chart.js porque vamos exibir uma lista muito mais bonita abaixo do gráfico!
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const val = context.raw as number;
                return ` R$ ${val.toFixed(2)}`;
              }
            }
          }
        },
        cutout: '70%' // Deixa o doughnut com o círculo central maior (estilo minimalista profissional)
      }
    });
  }

  private updateChart(labels: string[], values: number[], colors: string[]) {
    if (!this.chartInstance) return;
    this.chartInstance.data.labels = labels;
    this.chartInstance.data.datasets[0].data = values;
    this.chartInstance.data.datasets[0].backgroundColor = colors;
    this.chartInstance.update();
  }

  setFilter(filter: 'all' | 'income' | 'expense') {
    this.currentFilter.set(filter);
  }

  deleteTransaction(id: string) {
    this.financeService.deleteTransaction(id);
  }
}
