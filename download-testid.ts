export function saveDataTestIds(): void {
  // Seleciona todos os elementos que possuem o atributo data-testeid
  const elements = document.querySelectorAll<HTMLElement>('[data-testeid]');
  const ids: string[] = [];

  // Percorre os elementos e armazena os valores de data-testeid
  elements.forEach((element: HTMLElement) => {
    const dataTestId = element.getAttribute('data-testeid');
    const tagName = element.tagName.toLowerCase(); // Pega o nome da tag (ex: button, h3, etc.)

    // Verifica se o dataTestId existe
    if (dataTestId) {
      // Cria a string no formato desejado
      const xpath = `//${tagName}[@data-testeid="${dataTestId}"][contains(.,"${element.textContent?.trim()}")]`;
      const formattedId = `${tagName}: ${dataTestId} // ${xpath}`;
      ids.push(formattedId);
    }
  });

  // Cria uma string com todos os ids, cada um em uma nova linha, e adiciona uma linha em branco entre eles
  const data = ids.join('\n\n'); // Adiciona uma linha em branco entre cada entrada

  // Cria um blob com os dados
  const blob = new Blob([data], { type: 'text/plain' });

  // Cria um link temporário para o download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'data-testeids.txt'; // Nome do arquivo

  // Adiciona o link ao documento e clica nele para iniciar o download
  document.body.appendChild(link);
  link.click();

  // Remove o link do documento
  document.body.removeChild(link);
}
