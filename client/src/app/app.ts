import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('client');
  protected readonly forecasts = signal<WeatherForecast[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<WeatherForecast[]>(environment.weatherForecastUrl).subscribe({
      next: forecasts => {
        this.forecasts.set(forecasts);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.error.set(error instanceof Error ? error.message : 'Unknown request error');
        this.loading.set(false);
      }
    });
  }
}
