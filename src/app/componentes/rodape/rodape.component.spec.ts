import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RodapeComponent } from './rodape.component';

describe('RodapeComponent', () => {
  let component: RodapeComponent;
  let fixture: ComponentFixture<RodapeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RodapeComponent],
    });

    fixture = TestBed.createComponent(RodapeComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined inputs alt and src', () => {
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });

  it('should render the content based in inputs alt and src', () => {
    component.src = 'Teste';
    component.alt = 'https://teste.com/teste.jpg';
    expect(component).toMatchSnapshot();
  });
});
