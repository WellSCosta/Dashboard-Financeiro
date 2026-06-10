import { Injectable, signal, computed } from '@angular/core';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  // Lista robusta de transações de exemplo para deixar o painel rico em informações
  private transactionsSignal = signal<Transaction[]>([
    { id: '1', description: 'Salário Mensal', amount: 4800, type: 'income', category: 'Salário', date: new Date(2026, 5, 1) },
    { id: '2', description: 'Compras Mensais Supermercado', amount: 680.50, type: 'expense', category: 'Alimentação', date: new Date(2026, 5, 2) },
    { id: '3', description: 'Desenvolvimento Site Portfólio', amount: 1200, type: 'income', category: 'Freelance', date: new Date(2026, 5, 3) },
    { id: '4', description: 'Aluguel do Apartamento', amount: 1500, type: 'expense', category: 'Moradia', date: new Date(2026, 5, 4) },
    { id: '5', description: 'Mensalidade da Academia', amount: 110, type: 'expense', category: 'Saúde', date: new Date(2026, 5, 5) },
    { id: '6', description: 'Combustível Carro', amount: 240, type: 'expense', category: 'Transporte', date: new Date(2026, 5, 5) },
    { id: '7', description: 'Rendimento de Ações', amount: 154.20, type: 'income', category: 'Investimentos', date: new Date(2026, 5, 6) },
    { id: '8', description: 'Jantar Restaurante Japonês', amount: 185, type: 'expense', category: 'Lazer', date: new Date(2026, 5, 6) },
    { id: '9', description: 'Assinatura Netflix & Spotify', amount: 74.80, type: 'expense', category: 'Assinaturas', date: new Date(2026, 5, 7) },
    { id: '10', description: 'Curso de Design e UX/UI', amount: 350, type: 'expense', category: 'Educação', date: new Date(2026, 5, 8) },
    { id: '11', description: 'Compra de Casaco de Inverno', amount: 299, type: 'expense', category: 'Vestuário', date: new Date(2026, 5, 8) }
  ]);

  public transactions = this.transactionsSignal.asReadonly();

  public expensesOnly = computed(() => {
    return this.transactionsSignal().filter(t => t.type === 'expense');
  });

  public totalIncomes = computed(() => {
    return this.transactionsSignal()
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  public totalExpenses = computed(() => {
    return this.transactionsSignal()
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  public netBalance = computed(() => {
    return this.totalIncomes() - this.totalExpenses();
  });

  // Lista expandida de categorias
  public categories = {
    income: ['Salário', 'Freelance', 'Investimentos', 'Prêmios', 'Vendas', 'Outros'],
    expense: ['Alimentação', 'Transporte', 'Lazer', 'Moradia', 'Saúde', 'Educação', 'Vestuário', 'Assinaturas', 'Outros']
  };

  getTransactionById(id: string): Transaction | undefined {
    return this.transactionsSignal().find(t => t.id === id);
  }

  addTransaction(transaction: Omit<Transaction, 'id' | 'date'>) {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date()
    };
    
    this.transactionsSignal.update(currentTransactions => [
      newTransaction, 
      ...currentTransactions
    ]);
  }

  updateTransaction(id: string, updatedTransaction: Omit<Transaction, 'id' | 'date'>) {
    this.transactionsSignal.update(currentTransactions =>
      currentTransactions.map(t => 
        t.id === id 
          ? { ...t, ...updatedTransaction } 
          : t
      )
    );
  }

  deleteTransaction(id: string) {
    this.transactionsSignal.update(currentTransactions => 
      currentTransactions.filter(t => t.id !== id)
    );
  }
}