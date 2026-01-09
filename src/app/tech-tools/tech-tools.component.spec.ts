// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TechToolsComponent } from './tech-tools.component';

// describe('TechToolsComponent', () => {
//   let component: TechToolsComponent;
//   let fixture: ComponentFixture<TechToolsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [TechToolsComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(TechToolsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechToolsComponent } from './tech-tools.component';

describe('TechToolsComponent', () => {
  let component: TechToolsComponent;
  let fixture: ComponentFixture<TechToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechToolsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TechToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // -----------------------------
  // BASIC CREATION
  // -----------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // -----------------------------
  // DATA STRUCTURE
  // -----------------------------
  it('should have categories defined', () => {
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('each category should have items', () => {
    component.categories.forEach(category => {
      expect(category.items.length).toBeGreaterThan(0);
    });
  });

  // -----------------------------
  // INITIAL STATE
  // -----------------------------
  it('should initialize expandedState for all items as false', () => {
    component.categories.forEach(category => {
      category.items.forEach(item => {
        const key = `${category.id}_${item.name}`;
        expect(component.expandedState[key]).toBeFalse();
      });
    });
  });

  // -----------------------------
  // TOGGLE READ MORE
  // -----------------------------
  it('should toggle read more state correctly', () => {
    const category = component.categories[0];
    const item = category.items[0];
    const key = `${category.id}_${item.name}`;

    // initial
    expect(component.expandedState[key]).toBeFalse();

    // toggle ON
    component.toggleReadMore(category.id, item.name);
    expect(component.expandedState[key]).toBeTrue();

    // toggle OFF
    component.toggleReadMore(category.id, item.name);
    expect(component.expandedState[key]).toBeFalse();
  });

  // -----------------------------
  // isExpanded()
  // -----------------------------
  it('isExpanded should reflect expandedState value', () => {
    const category = component.categories[0];
    const item = category.items[0];

    component.toggleReadMore(category.id, item.name);
    expect(component.isExpanded(category.id, item.name)).toBeTrue();
  });

  // -----------------------------
  // INTRO TEXT
  // -----------------------------
  it('should have intro text defined', () => {
    expect(component.tools).toBeTruthy();
    expect(component.tools.length).toBeGreaterThan(10);
  });
});
