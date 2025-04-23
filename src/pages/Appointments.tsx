
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, Plus, X, MapPin, User, Phone } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  location: string;
  phone: string;
  availableDates: string[];
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage?: string;
  location: string;
  date: Date;
  time: string;
  notes?: string;
  status: "upcoming" | "completed" | "canceled";
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Emily Johnson",
    specialty: "Primary Care Physician",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format",
    location: "123 Health St, Medical Center",
    phone: "(555) 123-4567",
    availableDates: ["2025-04-20", "2025-04-21", "2025-04-22", "2025-04-24", "2025-04-25"],
  },
  {
    id: "2",
    name: "Dr. Mark Williams",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format",
    location: "456 Heart Ave, Cardiology Center",
    phone: "(555) 234-5678",
    availableDates: ["2025-04-19", "2025-04-23", "2025-04-26", "2025-04-29", "2025-05-02"],
  },
  {
    id: "3",
    name: "Dr. Lisa Patel",
    specialty: "Nutritionist",
    location: "789 Wellness Blvd, Nutrition Clinic",
    phone: "(555) 345-6789",
    availableDates: ["2025-04-20", "2025-04-21", "2025-04-27", "2025-04-28", "2025-05-01"],
  },
  {
    id: "4",
    name: "Dr. Robert Chen",
    specialty: "Ophthalmologist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format",
    location: "333 Vision St, Eye Care Center",
    phone: "(555) 456-7890",
    availableDates: ["2025-04-22", "2025-04-25", "2025-04-26", "2025-04-30", "2025-05-03"],
  },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorId: "1",
      doctorName: "Dr. Emily Johnson",
      doctorSpecialty: "Primary Care Physician",
      doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format",
      location: "123 Health St, Medical Center",
      date: new Date(2025, 3, 22), // April 22, 2025
      time: "10:30",
      notes: "Annual physical exam",
      status: "upcoming",
    },
    {
      id: "2",
      doctorId: "2",
      doctorName: "Dr. Mark Williams",
      doctorSpecialty: "Cardiologist",
      doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format",
      location: "456 Heart Ave, Cardiology Center",
      date: new Date(2025, 3, 29), // April 29, 2025
      time: "14:00",
      notes: "Follow up on heart health",
      status: "upcoming",
    },
    {
      id: "3",
      doctorId: "3",
      doctorName: "Dr. Lisa Patel",
      doctorSpecialty: "Nutritionist",
      location: "789 Wellness Blvd, Nutrition Clinic",
      date: new Date(2025, 3, 15), // April 15, 2025 (past date)
      time: "09:00",
      notes: "Discuss diet adjustments",
      status: "completed",
    },
  ]);

  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentNotes, setAppointmentNotes] = useState<string>("");

  const handleAddAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error("Please select a doctor, date, and time");
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      doctorImage: selectedDoctor.image,
      location: selectedDoctor.location,
      date: selectedDate,
      time: selectedTime,
      notes: appointmentNotes,
      status: "upcoming",
    };

    setAppointments([...appointments, newAppointment]);
    resetAppointmentForm();
    setIsAddAppointmentOpen(false);
    toast.success("Appointment scheduled successfully");
  };

  const resetAppointmentForm = () => {
    setSelectedDoctor(null);
    setSelectedDate(undefined);
    setSelectedTime("");
    setAppointmentNotes("");
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "canceled" } : apt
      )
    );
    toast.success("Appointment canceled successfully");
  };

  const isDoctorAvailable = (date: Date) => {
    if (!selectedDoctor) return false;
    
    const dateString = format(date, "yyyy-MM-dd");
    return selectedDoctor.availableDates.includes(dateString);
  };

  const availableTimeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming" && new Date(apt.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastAppointments = appointments.filter(
    (apt) => apt.status === "completed" || apt.status === "canceled" || new Date(apt.date) < new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <MainLayout>
      <div className="pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Appointments</h1>
          <p className="text-slate-500">Schedule and manage your doctor appointments</p>
        </div>
        <Button onClick={() => setIsAddAppointmentOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> New Appointment
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              {upcomingAppointments.length} upcoming appointments scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 bg-white rounded-lg border border-slate-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-elder-light-purple flex items-center justify-center">
                          {appointment.doctorImage ? (
                            <img
                              src={appointment.doctorImage}
                              alt={appointment.doctorName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-6 w-6 text-elder-purple" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.doctorName}</h3>
                          <p className="text-sm text-slate-500">
                            {appointment.doctorSpecialty}
                          </p>
                          <div className="flex items-center text-sm text-slate-500 mt-1">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            <span>{format(new Date(appointment.date), "MMMM d, yyyy")}</span>
                            <Clock className="h-3 w-3 ml-3 mr-1" />
                            <span>
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end space-y-2">
                        <div className="flex items-center text-sm text-slate-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{appointment.location}</span>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-slate-600">
                            {appointment.notes}
                          </p>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-elder-red border-elder-red hover:bg-red-50"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel Appointment
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500">No upcoming appointments.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsAddAppointmentOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Schedule New Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {pastAppointments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
              <CardDescription>
                {pastAppointments.length} previous appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-4 rounded-lg border ${
                      appointment.status === "canceled"
                        ? "bg-slate-50 border-slate-200"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-elder-light-purple flex items-center justify-center opacity-60">
                          {appointment.doctorImage ? (
                            <img
                              src={appointment.doctorImage}
                              alt={appointment.doctorName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-6 w-6 text-elder-purple" />
                          )}
                        </div>
                        <div>
                          <h3
                            className={`font-medium ${
                              appointment.status === "canceled" && "text-slate-500"
                            }`}
                          >
                            {appointment.doctorName}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {appointment.doctorSpecialty}
                          </p>
                          <div className="flex items-center text-sm text-slate-500 mt-1">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            <span>{format(new Date(appointment.date), "MMMM d, yyyy")}</span>
                            <Clock className="h-3 w-3 ml-3 mr-1" />
                            <span>
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <div className="flex items-center text-sm text-slate-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{appointment.location}</span>
                        </div>
                        <span
                          className={`text-sm px-2 py-0.5 rounded mt-2 ${
                            appointment.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {appointment.status === "completed"
                            ? "Completed"
                            : "Canceled"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Schedule an appointment with a doctor or specialist.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor
              </Label>
              <select
                id="doctor"
                onChange={(e) => {
                  const doctorId = e.target.value;
                  const doctor = doctors.find((d) => d.id === doctorId) || null;
                  setSelectedDoctor(doctor);
                  setSelectedDate(undefined);
                }}
                value={selectedDoctor?.id || ""}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            {selectedDoctor && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Date</Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          return (
                            date < new Date() ||
                            !isDoctorAvailable(date)
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-slate-500 mt-1">
                    Only dates when the doctor is available are selectable
                  </p>
                </div>
              </div>
            )}

            {selectedDate && (
              <div className="grid grid-cols-4 gap-4">
                <Label className="text-right pt-2">Time</Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  {availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                value={appointmentNotes}
                onChange={(e) => setAppointmentNotes(e.target.value)}
                className="col-span-3"
                placeholder="Add any important notes or reason for visit"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetAppointmentForm();
              setIsAddAppointmentOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddAppointment}>Schedule Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Appointments;
