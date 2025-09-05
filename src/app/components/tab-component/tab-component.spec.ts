import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab-component';
import { AppStateService } from '../../state/app-state';
import { By } from '@angular/platform-browser';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let mockAppState: any;

  beforeEach(async () => {
    mockAppState = { setIndex: jasmine.createSpy() };
    await TestBed.configureTestingModule({
      imports: [TabComponent],
      providers: [
        { provide: AppStateService, useValue: mockAppState }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 it('creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('renderizar los botones del índice', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(component.indices.length);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('IPSA');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('IGPA');
    expect(buttons[2].nativeElement.textContent.trim()).toBe('NASDAQ');
    expect(buttons[3].nativeElement.textContent.trim()).toBe('DOW JONES');
    expect(buttons[4].nativeElement.textContent.trim()).toBe('SP/BVL');
  });

  it('seleccionar un índice y setearlo', () => {
    const index = component.indices[1];
    component.selectIndex(index);
    fixture.detectChanges();

    expect(component.activeIndex()).toBe(index);
    expect(mockAppState.setIndex).toHaveBeenCalledWith('IGPA');
  });

  it('actualizar los botones cuando se setea el índice activo', () => {
    const index = component.indices[2];
    component.selectIndex(index);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[2].nativeElement.classList).toContain('border-b-2');
    expect(buttons[2].nativeElement.classList).toContain('border-cyan-500');
  });
});
