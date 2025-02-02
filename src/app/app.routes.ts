import { Routes } from '@angular/router';
import { UserInputComponent } from './components/user-input/user-input.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: UserInputComponent },
    { path: 'workouts', component: WorkoutListComponent },
    { path: 'workout-chart', component: WorkoutChartComponent }
  ];
  

