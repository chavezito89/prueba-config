
"use client";

import * as React from "react";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
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
import { Trash2, UserPlus, Users, CheckCircle, Briefcase, Phone, Mail, Eraser, Upload } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DoctorsSectionProps {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
}

const emptyDoctor: Omit<Doctor, "id"> = {
  name: "",
  university: "",
  professionalId: "",
  specialty: "",
  specialtyId: "",
  phone: "",
  email: "",
  signatureUrl: "",
  avatarUrl: "",
  type: "in-house",
};

export function DoctorsSection({ doctors, setDoctors }: DoctorsSectionProps) {
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [newDoctor, setNewDoctor] = React.useState(emptyDoctor);
  const sigCanvas = React.useRef<SignatureCanvas>(null);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  const inHouseDoctors = doctors.filter((d) => d.type === "in-house");
  const externalDoctors = doctors.filter((d) => d.type === "external");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDoctor((prev) => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setNewDoctor(prev => ({ ...prev, signatureUrl: "" }));
  }

  const handleSaveSignature = () => {
    if (sigCanvas.current) {
      const signatureDataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      setNewDoctor(prev => ({ ...prev, signatureUrl: signatureDataUrl }));
    }
  }

  const resetForm = () => {
    setNewDoctor(emptyDoctor);
    sigCanvas.current?.clear();
  }

  const handleRadioChange = (value: 'in-house' | 'external') => {
    setNewDoctor(prev => ({ ...prev, type: value }));
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    let doctorToAdd: Doctor = { ...newDoctor, id: (doctors.length + 1).toString() };

     if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const signatureDataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      doctorToAdd.signatureUrl = signatureDataUrl;
    }
      
    setDoctors((prev) => [...prev, doctorToAdd]);
    toast({
      title: "Doctor Agregado",
      description: `El/La Dr(a). ${newDoctor.name} ha sido añadido exitosamente.`,
      className: "bg-green-500 text-white",
    });
    resetForm();
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
      <Accordion type="single" collapsible className="w-full space-y-2">
        {list.map((doctor) => (
          <AccordionItem value={doctor.id} key={doctor.id} className="border rounded-lg bg-card shadow-sm">
            <AccordionTrigger className="hover:no-underline hover:bg-secondary/50 px-4 py-2 rounded-t-lg text-left">
              <div className="flex items-center gap-4 w-full">
                <Avatar className="h-12 w-12 border">
                  {doctor.avatarUrl && <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />}
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-base text-foreground">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground underline">
                    {doctor.specialty || "General"}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 bg-secondary/20 rounded-b-lg border-t">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <p className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /><strong>Cédula Prof:</strong> {doctor.professionalId}</p>
                {doctor.specialtyId && <p className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /><strong>Cédula Esp:</strong> {doctor.specialtyId}</p>}
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><strong>Teléfono:</strong> {doctor.phone}</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /><strong>Email:</strong> {doctor.email}</p>
                 {doctor.signatureUrl && (
                  <div className="sm:col-span-2">
                    <p className="font-semibold mb-2">Firma:</p>
                    <div className="bg-white border rounded-md p-2 flex justify-center">
                       <Image src={doctor.signatureUrl} alt={`Firma de ${doctor.name}`} width={200} height={100} objectFit="contain" />
                    </div>
                  </div>
                )}
                <div className="sm:col-span-2 flex justify-end pt-4">
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteDoctor(doctor.id)}><Trash2 className="mr-2 h-4 w-4"/>Eliminar Doctor</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ) : (
      <div className="text-center text-muted-foreground p-12 border-2 border-dashed rounded-lg bg-secondary/30">
        <Users className="mx-auto h-16 w-16 text-gray-400" />
        <p className="mt-4 font-medium">No hay doctores en esta categoría.</p>
        <p className="text-sm mt-1">Agrega un doctor para empezar a gestionar perfiles.</p>
      </div>
    )
  );

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <div>
          <CardTitle>Plantilla de Doctores</CardTitle>
          <CardDescription>
            Gestiona los perfiles de los profesionales de tu clínica.
          </CardDescription>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="lg"><UserPlus /> Agregar Doctor</Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg w-full">
            <form onSubmit={handleAddDoctor}>
              <SheetHeader>
                <SheetTitle>Agregar Nuevo Profesional</SheetTitle>
                <SheetDescription>
                  Completa los datos para registrar un nuevo doctor en el sistema.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-4 max-h-[80vh] overflow-y-auto pr-4">
                <div className="flex flex-col items-center gap-4 py-4">
                  <Label className="font-semibold">Foto de Perfil</Label>
                  <Avatar
                    className="w-24 h-24 border-2 border-dashed cursor-pointer hover:border-primary transition-colors group"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    {newDoctor.avatarUrl ? (
                       <AvatarImage src={newDoctor.avatarUrl} alt="Avatar Preview" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/50">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-xs mt-1">Subir foto</span>
                      </div>
                    )}
                    <AvatarFallback>{newDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" value={newDoctor.name} onChange={handleInputChange} required />
                </div>
                 <div className="grid gap-2">
                  <Label>Tipo de Doctor</Label>
                   <RadioGroup defaultValue={newDoctor.type} onValueChange={handleRadioChange} className="flex gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-house" id="in-house" />
                      <Label htmlFor="in-house">De Planta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="external" id="external" />
                      <Label htmlFor="external">Externo</Label>
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
                    <Label>Firma del Doctor</Label>
                     <div className="relative w-full h-40 rounded-md border bg-background">
                       <SignatureCanvas
                          ref={sigCanvas}
                          penColor='black'
                          canvasProps={{ className: 'w-full h-full rounded-md' }}
                          onEnd={handleSaveSignature}
                        />
                     </div>
                      <Button type="button" variant="outline" size="sm" onClick={clearSignature} className="self-start">
                        <Eraser className="mr-2 h-4 w-4" />
                        Limpiar Firma
                      </Button>
                </div>
              </div>
              <SheetFooter className="pt-4">
                <SheetClose asChild>
                  <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
                </SheetClose>
                <Button type="submit"><CheckCircle /> Guardar Doctor</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="in-house" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none h-12">
            <TabsTrigger value="in-house" className="rounded-none text-base">Doctores de Planta ({inHouseDoctors.length})</TabsTrigger>
            <TabsTrigger value="external" className="rounded-none text-base">Doctores Externos ({externalDoctors.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="in-house" className="mt-6 p-4 md:p-6">
            <DoctorList list={inHouseDoctors} />
          </TabsContent>
          <TabsContent value="external" className="mt-6 p-4 md:p-6">
            <DoctorList list={externalDoctors} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
