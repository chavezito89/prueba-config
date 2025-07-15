
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
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.36,4.25a2.1,2.1,0,0,1,2.1-2.1h1.08a2.1,2.1,0,0,1,2.1,2.1V5.59a.5.5,0,0,1-.5.5h-4.3A.5.5,0,0,1,9.36,5.59Z" />
    <path d="M9.36,19.25a.5.5,0,0,0,.5.5h4.3a.5.5,0,0,0,.5-.5v-6.2a1,1,0,0,1,1-1h1.25a2.1,2.1,0,0,0,2.1-2.1V7.36a2.1,2.1,0,0,0-2.1-2.1H7.11a2.1,2.1,0,0,0-2.1,2.1v2.1a2.1,2.1,0,0,0,2.1,2.1H8.36a1,1,0,0,1,1,1Z" />
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
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
          <TabsList className="grid w-full grid-cols-3 md:max-w-md mx-auto h-12 mb-8">
            <TabsTrigger value="clinic" className="text-base">
              Información de la Clínica
            </TabsTrigger>
            <TabsTrigger value="doctors" className="text-base">
              Gestión de Doctores
            </TabsTrigger>
            <TabsTrigger value="other" className="text-base">
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
