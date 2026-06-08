import { Injectable, signal, computed } from '@angular/core';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
}

@Injectable({
  providedIn: 'root' // Torna o serviço disponível globalmente na aplicação (Singleton)
})

export class FinanceService {
  // 1. Criamos um Signal privado para armazenar as transações.
  // Signals encapsulam valores e reagem a mudanças.
  private transactionsSignal = signal<Transaction[]>([
    { id: '1', description: 'Salário', amount: 3500, type: 'income', date: new Date() },
    { id: '2', description: 'Supermercado', amount: 450, type: 'expense', date: new Date() },
    { id: '3', description: 'Freelance Design', amount: 800, type: 'income', date: new Date() },
    { id: '4', description: 'Conta de Energia', amount: 180, type: 'expense', date: new Date() }
  ]);

  // Expomos um sinal somente-leitura das transações para os componentes consumirem
  public transactions = this.transactionsSignal.asReadonly();

  // 2. Computed Signals: Valores que dependem de outros signals.
  // Eles são atualizados automaticamente apenas quando as dependências (transactionsSignal) mudarem.

  // Total de Entradas (Income)
  public totalIncomes = computed(() => {
    return this.transactionsSignal()
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  // Total de Saídas (Expense)
  public totalExpenses = computed(() => {
    return this.transactionsSignal()
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  // Saldo Líquido Total
  public netBalance = computed(() => {
    return this.totalIncomes() - this.totalExpenses();
  });

  // 3. Método para Adicionar uma Transação
  addTransaction(transaction: Omit<Transaction, 'id' | 'date'>) {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(), // Gera um ID único
      date: new Date()
    };

    // Para atualizar um Signal, usamos o método update().
    // Ele recebe o valor atual e retorna o novo valor atualizado.
    this.transactionsSignal.update(currentTransactions => [
      newTransaction,
      ...currentTransactions
    ]);
  }

  // 4. Método para Excluir uma Transação
  deleteTransaction(id: string) {
    this.transactionsSignal.update(currentTransactions =>
      currentTransactions.filter(t => t.id !== id)
    );
  }
}