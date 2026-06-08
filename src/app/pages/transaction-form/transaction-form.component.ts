import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FinanceService } from '../../core/services/finance.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);
  private financeService = inject(FinanceService);
  private router = inject(Router);

  // 1. Declaramos o FormGroup que gerencia todo o formulário
  public transactionForm: FormGroup;

  constructor() {
    // 2. Construímos o formulário com campos e suas respectivas validações
    this.transactionForm = this.fb.group({
      description: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      amount: [null, [
        Validators.required,
        Validators.min(0.01) // O valor deve ser positivo e maior que zero
      ]],
      type: ['income', [
        Validators.required
      ]]
    });
  }

  // Getters para facilitar o acesso e verificação de erros no template HTML
  get f() {
    return this.transactionForm.controls;
  }

  // Método disparado ao submeter o formulário
  onSubmit() {
    // Se o formulário estiver inválido, interrompe o envio
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched(); // Marca todos os campos como tocados para exibir os erros
      return;
    }

    // Obtém os valores prontos do formulário
    const { description, amount, type } = this.transactionForm.value;

    // Adiciona a transação no serviço (que atualiza o Signal reativo)
    this.financeService.addTransaction({
      description,
      amount,
      type
    });

    // Navega de volta ao Dashboard (que configuraremos no roteador na próxima etapa)
    this.router.navigate(['/']);
  }
}
