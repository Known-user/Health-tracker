import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WorkoutService } from '../../services/workout.service'; // Import your WorkoutService
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  imports: [FormsModule, CommonModule],
  styles: ``,
})
export class WorkoutChartComponent implements OnInit, AfterViewInit {
  @ViewChild('workoutChart') workoutChart!: ElementRef<HTMLCanvasElement>;

  users: any[] = [];  // Store users
  chartData: any = {
    labels: ['Day 1', 'Day 2', 'Day 3'],
    datasets: [
      {
        data: [10, 20, 30],
        label: 'Workouts',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  chartType: keyof ChartTypeRegistry = 'bar';
  chart: any;
  selectedUser: any = null;  // To track selected user

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    // Fetch users from WorkoutService
    this.users = this.workoutService.getUsers();
    // Check if there are users available, and set default selected user to the first user
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.updateChartData();
    }
  }

  ngAfterViewInit() {
    if (this.workoutChart) {
      this.createChart();
    }
  }

  createChart() {
    const ctx = this.workoutChart.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  // Handle user selection change
  onUserSelect(event: any) {
    const userId = event.target.value;
    this.selectedUser = this.users.find(user => user.id === +userId);
    this.updateChartData();
  }

  // Update chart data based on selected user
  updateChartData() {
    if (this.selectedUser) {
      const workoutTypes = this.selectedUser.workouts.map((w: any) => w.type);
      const workoutMinutes = this.selectedUser.workouts.map((w: any) => w.minutes);

      this.chartData = {
        labels: workoutTypes,
        datasets: [
          {
            data: workoutMinutes,
            label: `${this.selectedUser.name}'s Workouts`,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      if (this.chart) {
        this.chart.data = this.chartData;
        this.chart.update();
      }
    }
  }
}
