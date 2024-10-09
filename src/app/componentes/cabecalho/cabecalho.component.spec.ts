import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabecalhoComponent } from './cabecalho.component';

describe('CabecalhoComponent', () => {
  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CabecalhoComponent],
    });

    fixture = TestBed.createComponent(CabecalhoComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should define the inputs alt and src', () => {
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });

  it('should render the content based in inputs alt and src', () => {
    component.alt = 'Teste';
    component.src = 'https://teste.com/teste.jpg';
    expect(component).toMatchSnapshot();
  });
});
