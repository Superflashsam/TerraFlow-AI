import { KpiCards } from './kpi-cards';
import { CompletionRateChart } from './completion-rate-chart';
import { TeamPerformanceTable } from './team-performance-table';

export function TaskAnalytics() {
  return (
    <div className="space-y-6">
      <KpiCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <CompletionRateChart />
        </div>
        <div className="lg:col-span-3">
          <TeamPerformanceTable />
        </div>
      </div>
    </div>
  );
}
