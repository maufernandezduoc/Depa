import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PatentePage } from './patente.page';
describe('PatentePage', () => {
  let component: PatentePage;
  let fixture: ComponentFixture<PatentePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatentePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PatentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
