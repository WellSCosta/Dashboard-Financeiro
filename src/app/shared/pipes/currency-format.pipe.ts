import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true // Standalone pipe para importar diretamente nos componentes que precisarem
})
export class CurrencyFormatPipe implements PipeTransform {
  // O método transform é obrigatório. O primeiro parâmetro é o valor de entrada,
  // os demais são parâmetros adicionais que o pipe aceita no template (ex: value | currencyFormat:true)
  transform(value: number, showSign: boolean = false, type?: 'income' | 'expense'): string {
    if (value === null || value === undefined) return '';

    // Formata o número para o padrão de moeda do Real Brasileiro
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

    if (!showSign || !type) {
      return formatted;
    }

    // Adiciona o sinal explicitamente dependendo do tipo
    return type === 'income' ? `+ ${formatted}` : `- ${formatted}`;
  }
}
