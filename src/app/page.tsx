
"use client";

import * as React from "react";
import type { ClinicInfo, Doctor } from "@/lib/types";
import { ClinicInfoForm } from "@/components/dental-config/ClinicInfoForm";
import { DoctorsSection } from "@/components/dental-config/DoctorsSection";
import { FutureSettings } from "@/components/dental-config/FutureSettings";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, UserCircle } from "lucide-react";

const GearIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12,8a4,4,0,0,0-4,4,4,4,0,0,0,4,4,4,4,0,0,0,4-4A4,4,0,0,0,12,8Zm0,6a2,2,0,0,1-2-2,2,2,0,0,1,2-2,2,2,0,0,1,2,2A2,2,0,0,1,12,14Zm6.7-3.13.54-1.35a.5.5,0,0,0-.23-.65l-1.54-1a.5.5,0,0,0-.65.23l-.54,1.35a5,5,0,0,0-1.8.76l-1.1-1.1a.5.5,0,0,0-.71,0l-1.1,1.1a.5.5,0,0,0,0,.71l1.1,1.1a5,5,0,0,0-.76,1.8l-1.35.54a.5.5,0,0,0-.23.65l1,1.54a.5.5,0,0,0,.65.23l1.35-.54a5,5,0,0,0,1.8.76l1.1,1.1a.5.5,0,0,0,.71,0l1.1-1.1a.5.5,0,0,0,0-.71l-1.1-1.1a5,5,0,0,0,.76-1.8Zm-2.33,2a3.47,3.47,0,0,1-4.74,0,3.47,3.47,0,0,1,0-4.74,3.47,3.47,0,0,1,4.74,0A3.47,3.47,0,0,1,16.37,12.87Z" />
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
            <GearIcon className="h-5 w-5" />
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
