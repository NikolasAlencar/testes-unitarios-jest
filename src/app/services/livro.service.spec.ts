import { TestBed } from '@angular/core/testing';
import { GeneroLiterario, Livro } from '../componentes/livro/livro';
import { livros } from '../mock-livros';
import { ErroGeneroLiterario, LivroService } from './livro.service';

describe('LivroService', () => {
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LivroService],
    });

    service = TestBed.inject(LivroService);
  });

  it('should be create!', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new book', () => {
    const livro: Livro = {
      titulo: 'Novo livro',
      autoria: 'Autor',
      imagem: 'http://example.com/cover.jpg',
      genero: { id: 'romance', value: 'Romance' },
      dataLeitura: '2024-04-19',
      classificacao: 5,
    };

    service.adicionarLivro(livro);

    const livrosPorGenero = service.obterLivrosPorGenero('romance');

    expect(livrosPorGenero).toContain(livro);
  });

  it('should return book by gender', () => {
    const livrosPorGenero = service.obterLivrosPorGenero('romance');
    const livrosEsperados = livros.filter(
      (livro) => livro.genero.id === 'romance'
    );

    expect(livrosPorGenero).toEqual(livrosEsperados);
  });

  it('should initialize the correct genders', () => {
    const generosEsperados: GeneroLiterario[] = [
      {
        id: 'romance',
        value: 'Romance',
      },
      {
        id: 'misterio',
        value: 'Mistério',
      },
      {
        id: 'fantasia',
        value: 'Fantasia',
      },
      {
        id: 'ficcao-cientifica',
        value: 'Ficção Científica',
      },
      {
        id: 'tecnicos',
        value: 'Técnicos',
      },
    ];

    expect(service.generos).toEqual(generosEsperados);
  });

  it('should throw error with unknown gender', () => {
    const livro: Livro = {
      titulo: 'Novo livro',
      autoria: 'Autor',
      imagem: 'http://example.com/cover.jpg',
      genero: { id: 'nao-existe', value: 'nao-existe' },
      dataLeitura: '2024-04-19',
      classificacao: 5,
    };

    expect(() => service.adicionarLivro(livro)).toThrow(ErroGeneroLiterario);
  });
});
