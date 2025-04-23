
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import ProfileInfo from "@/components/ProfileInfo";
import HealthChatbot from "@/components/HealthChatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <MainLayout>
      <div className="pb-6">
        <h1 className="text-2xl font-semibold text-slate-800">My Profile</h1>
        <p className="text-slate-500">Manage your profile and health information</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="chatbot">Health Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileInfo />
        </TabsContent>

        <TabsContent value="chatbot" className="space-y-6">
          <HealthChatbot />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Profile;
