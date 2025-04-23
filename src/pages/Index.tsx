import { useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import TaskWidget from "@/components/TaskWidget";
import MedicineWidget from "@/components/MedicineWidget";
import VolunteerWidget from "@/components/VolunteerWidget";
import QuickActionsWidget from "@/components/QuickActionsWidget";
import HealthSummaryWidget from "@/components/HealthSummaryWidget";
import { toast } from "sonner";

const Index = () => {
  useEffect(() => {
    // Show welcome message on first load
    toast.success("Welcome back!", {
      description: "You have 3 tasks scheduled for today.",
    });
  }, []);

  return (
    <MainLayout>
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-slate-800">Good morning, Robert!</h1>
        <p className="text-slate-500">Here's what you need to know today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActionsWidget />
          <TaskWidget />
          <VolunteerWidget />
        </div>
        
        <div className="space-y-6">
          <MedicineWidget />
          <HealthSummaryWidget />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
