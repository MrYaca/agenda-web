import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MyDdComponent } from './my-dd.component';

describe('MyDdComponent', () => {
  let component: MyDdComponent;
  let fixture: ComponentFixture<MyDdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDdComponent ],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
