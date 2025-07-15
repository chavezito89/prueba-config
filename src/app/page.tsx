
"use client";

import * as React from "react";
import type { ClinicInfo, Doctor } from "@/lib/types";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Building, Settings, Users } from "lucide-react";
import { ClinicInfoForm } from "@/components/dental-config/ClinicInfoForm";
import { DoctorsSection } from "@/components/dental-config/DoctorsSection";
import { FutureSettings } from "@/components/dental-config/FutureSettings";
import { Button } from "@/components/ui/button";
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
  const [activeView, setActiveView] = React.useState("clinic");
  const [clinicInfo, setClinicInfo] = React.useState<ClinicInfo>(initialClinicInfo);
  const [doctors, setDoctors] = React.useState<Doctor[]>(initialDoctors);
  const [pageTitle, setPageTitle] = React.useState("Información de la Clínica");

  React.useEffect(() => {
    switch (activeView) {
      case "clinic":
        setPageTitle("Información de la Clínica");
        break;
      case "doctors":
        setPageTitle("Gestión de Doctores");
        break;
      case "other":
        setPageTitle("Otras Configuraciones");
        break;
      default:
        setPageTitle("Información de la Clínica");
        break;
    }
  }, [activeView]);


  const renderContent = () => {
    switch (activeView) {
      case "clinic":
        return <ClinicInfoForm info={clinicInfo} setInfo={setClinicInfo} />;
      case "doctors":
        return <DoctorsSection doctors={doctors} setDoctors={setDoctors} />;
      case "other":
        return <FutureSettings />;
      default:
        return <ClinicInfoForm info={clinicInfo} setInfo={setClinicInfo} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                <ToothIcon className="h-6 w-6" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h2 className="text-lg font-semibold text-foreground">DentalFlow</h2>
                <p className="text-sm text-muted-foreground">Panel de Control</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "clinic"}
                  onClick={() => setActiveView("clinic")}
                  tooltip="Información de la Clínica"
                >
                  <Building />
                  <span>Información de la Clínica</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "doctors"}
                  onClick={() => setActiveView("doctors")}
                  tooltip="Doctores"
                >
                  <Users />
                  <span>Doctores</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "other"}
                  onClick={() => setActiveView("other")}
                  tooltip="Otras Configuraciones"
                >
                  <Settings />
                  <span>Otras Configuraciones</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center justify-between p-4 border-b h-16 bg-card">
            <div className="flex items-center gap-4">
               <SidebarTrigger className="md:hidden" />
               <h1 className="text-xl font-semibold text-foreground">
                {pageTitle}
               </h1>
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
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            <div className="max-w-5xl mx-auto">{renderContent()}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
