"use client";

import * as React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { Doctor } from "@/lib/types";
import { PlusCircle, Trash2, User, UserPlus, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DoctorsSectionProps {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
}

const emptyDoctor: Omit<Doctor, "id" | "avatarUrl"> = {
  name: "",
  university: "",
  professionalId: "",
  specialty: "",
  specialtyId: "",
  phone: "",
  email: "",
  signatureUrl: "",
  type: "in-house",
};

export function DoctorsSection({ doctors, setDoctors }: DoctorsSectionProps) {
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [newDoctor, setNewDoctor] = React.useState(emptyDoctor);

  const inHouseDoctors = doctors.filter((d) => d.type === "in-house");
  const externalDoctors = doctors.filter((d) => d.type === "external");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (value: 'in-house' | 'external') => {
    setNewDoctor(prev => ({ ...prev, type: value }));
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (doctors.length + 1).toString();
    const newAvatar = `https://i.pravatar.cc/150?u=${newId}`;
    const doctorToAdd: Doctor = { ...newDoctor, id: newId, avatarUrl: newAvatar };
    
    setDoctors((prev) => [...prev, doctorToAdd]);
    toast({
      title: "Doctor Agregado",
      description: `El/La Dr(a). ${newDoctor.name} ha sido añadido exitosamente.`,
    });
    setNewDoctor(emptyDoctor);
    setIsSheetOpen(false);
  };

  const handleDeleteDoctor = (id: string) => {
    const doctorName = doctors.find(d => d.id === id)?.name;
    setDoctors(prev => prev.filter(d => d.id !== id));
    toast({
      title: "Doctor Eliminado",
      description: `El/La Dr(a). ${doctorName} ha sido eliminado.`,
      variant: "destructive",
    })
  }

  const DoctorList = ({ list }: { list: Doctor[] }) => (
    list.length > 0 ? (
      <Accordion type="single" collapsible className="w-full">
        {list.map((doctor) => (
          <AccordionItem value={doctor.id} key={doctor.id}>
            <AccordionTrigger className="hover:bg-accent/50 px-4 rounded-md">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-left">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground text-left">
                    {doctor.specialty || "General"}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-muted/30 rounded-b-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <p><strong>Universidad:</strong> {doctor.university}</p>
                <p><strong>Cédula Profesional:</strong> {doctor.professionalId}</p>
                {doctor.specialty && <p><strong>Especialidad:</strong> {doctor.specialty}</p>}
                {doctor.specialtyId && <p><strong>Cédula Especialidad:</strong> {doctor.specialtyId}</p>}
                <p><strong>Teléfono:</strong> {doctor.phone}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <div className="sm:col-span-2 flex justify-end">
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteDoctor(doctor.id)}><Trash2 className="mr-2 h-4 w-4"/>Eliminar</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ) : (
      <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
        <Users className="mx-auto h-12 w-12" />
        <p className="mt-4">No hay doctores en esta categoría.</p>
      </div>
    )
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Doctores</CardTitle>
          <CardDescription>
            Gestiona los perfiles de los doctores de tu clínica.
          </CardDescription>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button><UserPlus className="mr-2 h-4 w-4" /> Agregar Doctor</Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg w-full">
            <form onSubmit={handleAddDoctor}>
              <SheetHeader>
                <SheetTitle>Agregar Nuevo Doctor</SheetTitle>
                <SheetDescription>
                  Completa los datos para registrar un nuevo profesional.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4 max-h-[80vh] overflow-y-auto pr-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" value={newDoctor.name} onChange={handleInputChange} required />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="type">Tipo de Doctor</Label>
                   <RadioGroup defaultValue={newDoctor.type} onValueChange={handleRadioChange} className="flex gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-house" id="in-house" />
                      <Label htmlFor="in-house">De Planta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="external" id="external" />
                      <Label htmlFor="external">De Fuera</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="university">Universidad</Label>
                    <Input id="university" value={newDoctor.university} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="professionalId">Cédula Profesional</Label>
                    <Input id="professionalId" value={newDoctor.professionalId} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="specialty">Especialidad (opcional)</Label>
                    <Input id="specialty" value={newDoctor.specialty || ""} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="specialtyId">Cédula Especialidad</Label>
                    <Input id="specialtyId" value={newDoctor.specialtyId || ""} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" value={newDoctor.phone} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={newDoctor.email} onChange={handleInputChange} required />
                  </div>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="signatureUrl">Firma del Doctor (URL)</Label>
                    <Input id="signatureUrl" placeholder="https://..." value={newDoctor.signatureUrl || ""} onChange={handleInputChange} />
                    <p className="text-xs text-muted-foreground">Por ahora, ingrese una URL. La carga de archivos se habilitará más adelante.</p>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </SheetClose>
                <Button type="submit">Guardar Doctor</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="in-house" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="in-house">De Planta</TabsTrigger>
            <TabsTrigger value="external">De Fuera</TabsTrigger>
          </TabsList>
          <TabsContent value="in-house" className="mt-4">
            <DoctorList list={inHouseDoctors} />
          </TabsContent>
          <TabsContent value="external" className="mt-4">
            <DoctorList list={externalDoctors} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
