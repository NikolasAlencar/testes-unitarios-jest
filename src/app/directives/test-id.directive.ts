import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: ':not([data-testeid])',
  standalone: true,
})
export class TestIdDirective {
  private static callCount = 0; // Contador de chamadas

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const startTime = performance.now(); // Inicia o cronômetro
    TestIdDirective.callCount++; // Incrementa o contador de chamadas

    const nativeElement = this.el.nativeElement;

    // Evita aplicar em componentes personalizados (tags com hífen)
    if (
      nativeElement instanceof HTMLElement &&
      !nativeElement.hasAttribute('data-testeid') &&
      !nativeElement.tagName.includes('-')
    ) {
      const textContent = nativeElement.textContent?.toLowerCase();

      if (textContent) {
        // Função para remover acentos
        const removeAccents = (text: string) => {
          return text
            .normalize('NFD') // Normaliza o texto
            .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos
        };

        // Formata o texto
        let formattedText = removeAccents(textContent)
          .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais, mantendo espaços e hífens
          .trim() // Remove espaços em branco do início e do fim
          .replace(/\s+/g, '-') // Substitui espaços por hífens
          .replace(/--+/g, '-') // Substitui múltiplos hífens por um único hífen
          .replace(/^-|-$/g, ''); // Remove hífens do início e do fim

        const tagName = nativeElement.tagName.toLowerCase();
        const dataTestId = `${tagName}-${formattedText}`;
        this.renderer.setAttribute(nativeElement, 'data-testeid', dataTestId);
      }
    }

    const endTime = performance.now(); // Para o cronômetro
    console.log(`ngOnInit execution time: ${endTime - startTime} ms`);
    console.log(`TestIdDirective has been called ${TestIdDirective.callCount} times`);
  }
}
