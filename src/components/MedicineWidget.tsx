
import { Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  timesPerDay: number;
  timesTaken: number;
  nextDose: string;
}

const medicines: Medicine[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    timesPerDay: 2,
    timesTaken: 1,
    nextDose: "8:00 PM",
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    timesPerDay: 3,
    timesTaken: 2,
    nextDose: "6:00 PM",
  },
  {
    id: "3",
    name: "Vitamin D",
    dosage: "1000 IU",
    timesPerDay: 1,
    timesTaken: 1,
    nextDose: "Tomorrow",
  },
];

const MedicineWidget = () => {
  return (
    <Card>
      <CardHeader className="pb-2 space-y-0">
        <CardTitle className="text-xl">Medication Tracker</CardTitle>
        <CardDescription>Track your daily medication intake</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-elder-purple" />
                  <span className="font-medium">{medicine.name}</span>
                  <span className="text-sm text-slate-500">{medicine.dosage}</span>
                </div>
                <div className="text-sm">
                  {medicine.timesTaken}/{medicine.timesPerDay} doses
                </div>
              </div>
              <Progress
                value={(medicine.timesTaken / medicine.timesPerDay) * 100}
                className="h-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Next dose: {medicine.nextDose}</span>
                {medicine.timesTaken < medicine.timesPerDay ? (
                  <Button variant="outline" size="sm">Take Dose</Button>
                ) : (
                  <span className="text-green-600 font-medium">All doses taken ✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <Link to="/medicine">Manage Medications</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicineWidget;
