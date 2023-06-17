import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitaPage } from './visita.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('VisitaPage', () => {
  let component: VisitaPage;
  let fixture: ComponentFixture<VisitaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitaPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
