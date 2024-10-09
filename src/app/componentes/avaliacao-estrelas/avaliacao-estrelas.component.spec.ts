import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

describe('AvaliacaoEstrelasComponent', () => {
  let component: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvaliacaoEstrelasComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true,
        },
      ],
    });

    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
    component = fixture.componentInstance;
    component.readOnly = false;
    fixture.detectChanges(); // pode ser usado pra chamar a detecção de mudanças em todos os testes ao invés de chamar manualmente em cada um
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined a value to classification with writeValue', () => {
    const VALUE = 3;
    component.writeValue(VALUE);
    expect(component.classificacao).toBe(3);
  });

  it('should be call onChange and onTouched', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    const VALUE = 3;
    component.classificar(VALUE);
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should not update a classification when a input readonly is true', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    component.readOnly = true;
    const VALUE = 5;
    component.classificar(VALUE);
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(onTouchedSpy).not.toHaveBeenCalled();
    expect(component.classificacao).not.toBe(5);
  });

  it('should ignore invalid values and set 1 to classification', () => {
    const INVALID_VALUES = [0, '', undefined, -1, 6];
    INVALID_VALUES.forEach((invalidValue) => {
      component.writeValue(invalidValue as number);
      expect(component.classificacao).toBe(1);
    });
  });

  it('should update DOM when changing classification', () => {
    const VALUE = 3;
    component.classificar(VALUE);
    const CHANGED_STAR = fixture.nativeElement.querySelector('.filled');
    expect(CHANGED_STAR).toBeTruthy();
  });

  it('should be render 5 stars', () => {
    const STARS = component.estrelas;
    expect(STARS.length).toBe(5);
    const BUTTONS_STARS =
      fixture.nativeElement.querySelectorAll('.estrelas button');
    expect(BUTTONS_STARS.length).toBe(5);
  });

  it('should call classificar when click in the button star', () => {
    const CLASSIFICAR = jest.spyOn(component, 'classificar');
    const FIRST_BUTTON = fixture.nativeElement.querySelector('.estrelas button');
    FIRST_BUTTON.click();
    expect(CLASSIFICAR).toHaveBeenCalledTimes(1);
  });
});
