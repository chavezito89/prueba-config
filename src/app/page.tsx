
"use client";

import * as React from "react";
import type { ClinicInfo, Doctor } from "@/lib/types";
import { ClinicInfoForm } from "@/components/dental-config/ClinicInfoForm";
import { DoctorsSection } from "@/components/dental-config/DoctorsSection";
import { FutureSettings } from "@/components/dental-config/FutureSettings";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, UserCircle } from "lucide-react";

const ToothGearIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M19.46,7.57a1,1,0,0,0-1.34-.34L16.4,8.3A7,7,0,0,0,8,4.89V4a1,1,0,0,0-2,0V4.89a7,7,0,0,0-4.08,8.28l-1.08.43a1,1,0,0,0-.34,1.34l1.3,3.18a1,1,0,0,0,1.34.34L4.8,17.7a7,7,0,0,0,11.8-3.18l1.72,1.72a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l1.41-1.41a1,1,0,0,0,0-1.42L19.2,11.6a7.12,7.12,0,0,0,.26-4.03Zm-7.5,8.3a5,5,0,0,1-3.32-8.45,5,5,0,0,1,8.45,3.32,5,5,0,0,1-5.13,5.13Z" />
      <path d="M13,11a1,1,0,1,0,1,1A1,1,0,0,0,13,11Z" />
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
            <ToothGearIcon className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Configuración</h1>
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
