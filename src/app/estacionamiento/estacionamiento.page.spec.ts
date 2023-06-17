import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstacionamientoPage } from './estacionamiento.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('EstacionamientoPage', () => {
  let component: EstacionamientoPage;
  let fixture: ComponentFixture<EstacionamientoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstacionamientoPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EstacionamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
