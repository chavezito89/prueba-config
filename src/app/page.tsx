
"use client";

import * as React from "react";
import type { ClinicInfo, Doctor } from "@/lib/types";
import { ClinicInfoForm } from "@/components/dental-config/ClinicInfoForm";
import { DoctorsSection } from "@/components/dental-config/DoctorsSection";
import { FutureSettings } from "@/components/dental-config/FutureSettings";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, UserCircle } from "lucide-react";

const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19.95,9.58C19.86,8.8,19.2,8.23,18.43,8.23H17.2V6.32C17.2,4.49,15.71,3,13.88,3H10.12C8.29,3,6.8,4.49,6.8,6.32V8.23H5.57C4.8,8.23,4.14,8.8,4.05,9.58L3,21H21L19.95,9.58ZM8.4,6.32C8.4,5.38,9.17,4.6,10.12,4.6H13.88C14.83,4.6,15.6,5.38,15.6,6.32V8.23H8.4V6.32Z" />
  </svg>
);


const initialClinicInfo: ClinicInfo = {
  logoUrl: "",
  name: "",
  address: "",
  phone: "",
  email: "",
};

const initialDoctors: Doctor[] = [];

export default function DentalConfigPage() {
  const [clinicInfo, setClinicInfo] =
    React.useState<ClinicInfo>(initialClinicInfo);
  const [doctors, setDoctors] = React.useState<Doctor[]>(initialDoctors);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ToothIcon className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">DentalFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificaciones</span>
          </Button>
          <Button variant="ghost" size="icon">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">Perfil</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="clinic" className="w-full">
          <TabsList className="mb-8 flex w-full max-w-lg mx-auto border-b border-border">
            <TabsTrigger value="clinic">
              Información de la Clínica
            </TabsTrigger>
            <TabsTrigger value="doctors">
              Gestión de Doctores
            </TabsTrigger>
            <TabsTrigger value="other">
              Otras Configuraciones
            </TabsTrigger>
          </TabsList>
          <div className="max-w-5xl mx-auto">
            <TabsContent value="clinic">
              <ClinicInfoForm info={clinicInfo} setInfo={setClinicInfo} />
            </TabsContent>
            <TabsContent value="doctors">
              <DoctorsSection doctors={doctors} setDoctors={setDoctors} />
            </TabsContent>
            <TabsContent value="other">
              <FutureSettings />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
