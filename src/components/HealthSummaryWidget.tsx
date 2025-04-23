
import { Activity, Heart, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const HealthSummaryWidget = () => {
  return (
    <Card>
      <CardHeader className="pb-2 space-y-0">
        <CardTitle className="text-xl">Health Summary</CardTitle>
        <CardDescription>Daily activity and health metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Steps Today</p>
                <p className="font-semibold text-lg">2,453</p>
              </div>
            </div>
            <Progress value={49} className="h-1.5 mt-2" />
            <p className="text-xs text-slate-500 mt-1">Goal: 5,000 steps</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="h-4 w-4 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Heart Rate</p>
                <p className="font-semibold text-lg">72 bpm</p>
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <TrendingUp className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1 text-center">Within normal range</p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <p className="font-medium">Recent Health Notes</p>
          <div className="mt-2 space-y-2">
            <div className="text-sm pb-2 border-b border-slate-100">
              <p>Blood pressure: 128/82 mmHg</p>
              <p className="text-xs text-slate-500">Yesterday, 8:30 AM</p>
            </div>
            <div className="text-sm">
              <p>Sleep duration: 7 hours 20 minutes</p>
              <p className="text-xs text-slate-500">Today, 6:00 AM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSummaryWidget;
