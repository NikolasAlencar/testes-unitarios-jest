import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LivroService } from '../../services/livro.service';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: LivroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [LivroService, FormBuilder],
    }).compileComponents(); // compilar fora do CLI

    service = TestBed.inject(LivroService);
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // pode ser usado pra chamar a detecção de mudanças em todos os testes ao invés de chamar manualmente em cada um
  });

  it('should initialize the form with empty values', () => {
    expect(component.formulario.value).toEqual({
      titulo: '',
      autoria: '',
      imagem: '',
      genero: '',
      dataLeitura: '',
      classificacao: null,
    });
  });

  it('should add a new book', () => {
    const NEW_BOOK = {
      titulo: 'Teste Livro',
      autoria: 'Teste Autoria',
      imagem: 'http://teste.com/teste.jpg',
      genero: 'romance',
      dataLeitura: '2024-04-19',
      classificacao: 5,
    };

    const adicionarLivroSpy = jest.spyOn(service, 'adicionarLivro');
    const routerSpy = jest.spyOn(component['router'], 'navigate');

    component.formulario.setValue(NEW_BOOK);
    component.adicionarLivro();

    expect(adicionarLivroSpy).toHaveBeenCalledWith({
      ...NEW_BOOK,
      genero: component.generos.find((g) => g.id === NEW_BOOK.genero),
    });

    expect(component.formulario.value).toEqual({
      titulo: null,
      autoria: null,
      imagem: null,
      genero: null,
      dataLeitura: null,
      classificacao: null,
    });

    expect(routerSpy).toHaveBeenCalledWith(['lista-livros']);
  });
});
