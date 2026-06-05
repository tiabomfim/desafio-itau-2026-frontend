import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPessoaModal } from './form-pessoa-modal';

describe('FormPessoaModal', () => {
  let component: FormPessoaModal;
  let fixture: ComponentFixture<FormPessoaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPessoaModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPessoaModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
