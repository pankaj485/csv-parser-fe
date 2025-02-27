import { Component, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AppwriteService } from '../services/appwrite.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { MessageService } from 'primeng/api';
import { StatesService } from '../services/states.service';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from '../shared/loader/loader.component';

interface StatData {
  success: boolean;
  stats: {
    [key: number]: number[];
  };
}

@Component({
  selector: 'app-files-stat',
  standalone: true,
  imports: [CardModule, HighchartsChartModule, ToastModule, LoaderComponent],
  templateUrl: './files-stat.component.html',
  styleUrl: './files-stat.component.css',
  providers: [MessageService],
})
export class FilesStatComponent implements OnInit {
  private appwriteService = inject(AppwriteService);
  private messageService = inject(MessageService);
  public statesService = inject(StatesService);

  selectedYear = new Date().getFullYear();
  Highcharts: typeof Highcharts = Highcharts;
  chartDataLoaded = false;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Files Parsed So Far',
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yAxis: {
      title: {
        text: '',
      },
    },
  };

  ngOnInit(): void {
    this.chartDataLoaded = false;
    this.appwriteService.getFilesStat().subscribe({
      next: (value) => {
        if (value.status === 200) {
          const statData = value.body as StatData;
          const currentYearData = statData.stats[this.selectedYear];
          this.generateChart(currentYearData);
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Error getting parser analytics',
          life: this.statesService.messageLife(),
        });
      },
    });
  }

  generateChart(data: number[]) {
    this.chartDataLoaded = true;
    this.chartOptions.series = [
      {
        type: 'areaspline',
        data: data,
        name: 'Files Parsed',
      },
    ];
  }
}
