import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaquetePage } from './paquete.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('PaquetePage', () => {
  let component: PaquetePage;
  let fixture: ComponentFixture<PaquetePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaquetePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PaquetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
