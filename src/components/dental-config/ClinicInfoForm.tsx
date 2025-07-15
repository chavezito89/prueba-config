"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { ClinicInfo } from "@/lib/types";
import { Upload, CheckCircle } from "lucide-react";

interface ClinicInfoFormProps {
  info: ClinicInfo;
  setInfo: React.Dispatch<React.SetStateAction<ClinicInfo>>;
}

export function ClinicInfoForm({ info, setInfo }: ClinicInfoFormProps) {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = React.useState<string | null>(
    info.logoUrl || null
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setInfo((prev) => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving clinic info:", info);
    toast({
      title: "¡Éxito!",
      description: "La información de la clínica se ha guardado correctamente.",
      className: "bg-green-500 text-white",
    });
  };

  return (
    <Card className="shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Perfil de la Clínica</CardTitle>
          <CardDescription>
            Actualiza los detalles de tu clínica. Esta información será visible
            para tus pacientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 md:col-span-1 pt-2">
            <Label className="font-semibold">Logo de la Clínica</Label>
            <div
              className="relative w-40 h-40 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-primary transition-colors group bg-secondary/50"
              onClick={() => fileInputRef.current?.click()}
            >
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Clinic Logo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <Upload className="mx-auto h-10 w-10 mb-2 text-gray-400" />
                  <p className="mt-2 text-sm font-medium">Subir logo</p>
                   <p className="mt-1 text-xs">PNG, JPG, SVG</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
          <div className="grid gap-6 md:col-span-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del establecimiento</Label>
              <Input
                id="name"
                value={info.name}
                onChange={handleInputChange}
                placeholder="Ej: Clínica Dental Sonrisas"
                className="text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={info.address}
                onChange={handleInputChange}
                placeholder="Ej: Calle Falsa 123, Col. Centro"
                 className="text-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono de Contacto</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={info.phone}
                  onChange={handleInputChange}
                  placeholder="Ej: 55 1234 5678"
                   className="text-base"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email de Contacto</Label>
                <Input
                  id="email"
                  type="email"
                  value={info.email}
                  onChange={handleInputChange}
                  placeholder="Ej: contacto@clinica.com"
                   className="text-base"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 bg-secondary/30 flex justify-end">
          <Button type="submit" size="lg">
            <CheckCircle />
            Guardar Cambios
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
