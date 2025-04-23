
import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pill, Plus, X, Check } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: {
    time: string;
    taken: boolean;
  }[];
  instructions?: string;
  daysOfWeek: string[];
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

const Medicine = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      schedule: [
        { time: "08:00", taken: true },
        { time: "20:00", taken: false },
      ],
      instructions: "Take with food",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      schedule: [
        { time: "08:00", taken: true },
        { time: "14:00", taken: true },
        { time: "20:00", taken: false },
      ],
      daysOfWeek: ["Monday", "Wednesday", "Friday"],
    },
    {
      id: "3",
      name: "Vitamin D",
      dosage: "1000 IU",
      schedule: [{ time: "08:00", taken: true }],
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
  ]);

  const [selectedDay, setSelectedDay] = useState<string>(currentDay);
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [newMedication, setNewMedication] = useState<{
    name: string;
    dosage: string;
    instructions: string;
    times: string[];
    daysOfWeek: string[];
  }>({
    name: "",
    dosage: "",
    instructions: "",
    times: ["08:00"],
    daysOfWeek: [currentDay],
  });

  const handleAddTimeField = () => {
    setNewMedication({
      ...newMedication,
      times: [...newMedication.times, ""],
    });
  };

  const handleRemoveTimeField = (index: number) => {
    const updatedTimes = newMedication.times.filter((_, i) => i !== index);
    setNewMedication({
      ...newMedication,
      times: updatedTimes,
    });
  };

  const handleTimeChange = (index: number, value: string) => {
    const updatedTimes = [...newMedication.times];
    updatedTimes[index] = value;
    setNewMedication({
      ...newMedication,
      times: updatedTimes,
    });
  };

  const handleDayToggle = (day: string) => {
    const updatedDays = newMedication.daysOfWeek.includes(day)
      ? newMedication.daysOfWeek.filter((d) => d !== day)
      : [...newMedication.daysOfWeek, day];
    
    setNewMedication({
      ...newMedication,
      daysOfWeek: updatedDays,
    });
  };

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage || newMedication.times.some(t => !t)) {
      toast.error("Please fill all required fields");
      return;
    }

    if (newMedication.daysOfWeek.length === 0) {
      toast.error("Please select at least one day");
      return;
    }

    const medication: Medication = {
      id: Date.now().toString(),
      name: newMedication.name,
      dosage: newMedication.dosage,
      schedule: newMedication.times.map(time => ({ time, taken: false })),
      instructions: newMedication.instructions,
      daysOfWeek: newMedication.daysOfWeek,
    };

    setMedications([...medications, medication]);
    setNewMedication({
      name: "",
      dosage: "",
      instructions: "",
      times: ["08:00"],
      daysOfWeek: [currentDay],
    });
    setIsAddMedicineOpen(false);
    toast.success("Medication added successfully");
  };

  const handleTakeMedication = (medicationId: string, timeIndex: number) => {
    setMedications(
      medications.map((med) => {
        if (med.id === medicationId) {
          const updatedSchedule = [...med.schedule];
          updatedSchedule[timeIndex] = {
            ...updatedSchedule[timeIndex],
            taken: true,
          };
          return { ...med, schedule: updatedSchedule };
        }
        return med;
      })
    );
    toast.success("Medication marked as taken");
  };

  const filteredMedications = medications.filter((med) =>
    med.daysOfWeek.includes(selectedDay)
  );

  const calculateProgress = (medication: Medication) => {
    const total = medication.schedule.length;
    const taken = medication.schedule.filter((s) => s.taken).length;
    return (taken / total) * 100;
  };

  return (
    <MainLayout>
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-slate-800">Medicine Tracker</h1>
        <p className="text-slate-500">Track your daily medication intake</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Days of Week</CardTitle>
              <CardDescription>Select a day to view medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day}
                    variant={selectedDay === day ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                    {day === currentDay && (
                      <span className="ml-auto bg-elder-light-purple text-elder-dark-purple text-xs px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setIsAddMedicineOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Medication
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-9">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div>
                <CardTitle className="text-xl">Medications for {selectedDay}</CardTitle>
                <CardDescription>
                  {filteredMedications.length} medications scheduled
                </CardDescription>
              </div>
              <Button size="sm" onClick={() => setIsAddMedicineOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                <span>Add Medication</span>
              </Button>
            </CardHeader>
            <CardContent>
              {filteredMedications.length > 0 ? (
                <div className="space-y-4">
                  {filteredMedications.map((medication) => (
                    <div key={medication.id} className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Pill className="h-5 w-5 text-elder-purple" />
                          <span className="font-medium text-lg">{medication.name}</span>
                          <span className="text-sm text-slate-500">{medication.dosage}</span>
                        </div>
                        <div className="text-sm text-slate-500">
                          {medication.schedule.filter((s) => s.taken).length}/{medication.schedule.length} doses
                        </div>
                      </div>

                      {medication.instructions && (
                        <p className="text-sm text-slate-500 mb-2">{medication.instructions}</p>
                      )}

                      <Progress
                        value={calculateProgress(medication)}
                        className="h-2 mb-4"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                        {medication.schedule.map((schedule, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${
                              schedule.taken
                                ? "bg-green-50 border-green-200"
                                : "bg-elder-light-purple/20 border-elder-light-purple"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{schedule.time}</p>
                                <p className="text-xs text-slate-500">
                                  {schedule.taken ? "Taken" : "Not taken"}
                                </p>
                              </div>
                              {!schedule.taken && (
                                <Button
                                  size="sm"
                                  onClick={() => handleTakeMedication(medication.id, index)}
                                >
                                  Take
                                </Button>
                              )}
                              {schedule.taken && (
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <Check className="h-4 w-4 text-green-600" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-500">No medications scheduled for {selectedDay}.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsAddMedicineOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Medication
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isAddMedicineOpen} onOpenChange={setIsAddMedicineOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
            <DialogDescription>
              Add details about your medication and schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Medication Name
              </Label>
              <Input
                id="name"
                value={newMedication.name}
                onChange={(e) =>
                  setNewMedication({ ...newMedication, name: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter medication name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dosage" className="text-right">
                Dosage
              </Label>
              <Input
                id="dosage"
                value={newMedication.dosage}
                onChange={(e) =>
                  setNewMedication({ ...newMedication, dosage: e.target.value })
                }
                className="col-span-3"
                placeholder="e.g. 10mg, 1 tablet, etc."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructions" className="text-right">
                Instructions
              </Label>
              <Input
                id="instructions"
                value={newMedication.instructions}
                onChange={(e) =>
                  setNewMedication({
                    ...newMedication,
                    instructions: e.target.value,
                  })
                }
                className="col-span-3"
                placeholder="e.g. Take with food, before bed, etc."
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <Label className="text-right pt-2">Schedule Times</Label>
              <div className="col-span-3 space-y-2">
                {newMedication.times.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className="flex-1"
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTimeField(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddTimeField}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Time
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <Label className="text-right pt-2">Days of Week</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={newMedication.daysOfWeek.includes(day) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDayToggle(day)}
                  >
                    {day.substring(0, 3)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMedicineOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMedication}>Add Medication</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Medicine;
