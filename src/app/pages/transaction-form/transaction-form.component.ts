import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../core/services/finance.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private financeService = inject(FinanceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Injetamos para ler parâmetros da URL

  public transactionForm: FormGroup;
  
  // Variáveis para controlar o modo de Edição
  public isEditMode = false;
  private transactionId: string | null = null;

  // Lista dinâmica de categorias com base no tipo selecionado (Receita / Despesa)
  public categoriesList: string[] = [];

  constructor() {
    this.transactionForm = this.fb.group({
      description: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      amount: [null, [
        Validators.required,
        Validators.min(0.01)
      ]],
      type: ['income', [
        Validators.required
      ]],
      category: ['', [
        Validators.required // Categoria passa a ser obrigatória
      ]]
    });
  }

  ngOnInit() {
    // 1. Escuta mudanças no campo "type" (Entrada/Saída) para carregar as categorias correspondentes
    this.categoriesList = this.financeService.categories['income']; // Padrão inicial

    this.transactionForm.get('type')?.valueChanges.subscribe(type => {
      this.categoriesList = this.financeService.categories[type as 'income' | 'expense'];
      
      // Limpa a categoria anterior ao mudar de tipo para evitar erros
      this.transactionForm.get('category')?.setValue('');
    });

    // 2. Verifica se existe o parâmetro "id" na rota ativa
    this.transactionId = this.route.snapshot.paramMap.get('id');
    
    if (this.transactionId) {
      this.isEditMode = true;
      const transaction = this.financeService.getTransactionById(this.transactionId);

      if (transaction) {
        // Atualiza a lista de categorias apropriada antes de preencher o valor
        this.categoriesList = this.financeService.categories[transaction.type];

        // Preenche o formulário reativamente com os dados antigos
        this.transactionForm.patchValue({
          description: transaction.description,
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category
        });
      } else {
        // Se a transação por ID não for encontrada, redireciona de volta
        this.router.navigate(['/']);
      }
    }
  }

  get f() {
    return this.transactionForm.controls;
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const { description, amount, type, category } = this.transactionForm.value;

    if (this.isEditMode && this.transactionId) {
      // Executa a modificação reativa se for edição
      this.financeService.updateTransaction(this.transactionId, {
        description,
        amount,
        type,
        category
      });
    } else {
      // Cria uma nova transação
      this.financeService.addTransaction({
        description,
        amount,
        type,
        category
      });
    }

    this.router.navigate(['/']);
  }
}
