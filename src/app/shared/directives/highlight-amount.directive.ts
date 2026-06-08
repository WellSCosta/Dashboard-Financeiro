import { Directive, ElementRef, Input, Renderer2, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightAmount]', // Nome do atributo usado no HTML para aplicar a diretiva
  standalone: true // Standalone directive para ser importada diretamente nos componentes
})
export class HighlightAmountDirective implements OnInit, OnChanges {
  // Input que recebe o tipo da transação
  @Input('appHighlightAmount') type: 'income' | 'expense' = 'income';

  // Usamos ElementRef para obter a referência do elemento HTML,
  // e Renderer2 que é a API segura do Angular para manipular estilos do DOM sem acessar o 'nativeElement' diretamente
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.applyHighlight();
  }

  // Monitora mudanças nas propriedades de entrada do componente (@Input)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.applyHighlight();
    }
  }

  private applyHighlight() {
    // Remove classes anteriores se existirem para evitar conflitos
    this.renderer.removeClass(this.el.nativeElement, 'bg-income');
    this.renderer.removeClass(this.el.nativeElement, 'bg-expense');

    // Aplica a classe CSS apropriada e estilos inline seguros adicionais
    if (this.type === 'income') {
      this.renderer.addClass(this.el.nativeElement, 'bg-income');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#10b981');
      this.renderer.setStyle(this.el.nativeElement, 'fontWeight', '600');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'bg-expense');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#f43f5e');
      this.renderer.setStyle(this.el.nativeElement, 'fontWeight', '600');
    }

    // Estilo básico comum do elemento (ex: padding e borda arredondada para parecer um badge elegante)
    this.renderer.setStyle(this.el.nativeElement, 'padding', '4px 8px');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '6px');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }
}