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
import { Upload } from "lucide-react";

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
        // In a real app, you'd upload this file and save the URL
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
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Información de la Clínica</CardTitle>
          <CardDescription>
            Actualiza los detalles de tu clínica. Esta información será visible
            para tus pacientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 md:col-span-1">
            <Label>Logo del Establecimiento</Label>
            <div
              className="relative w-40 h-40 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-primary transition-colors group"
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
                <div className="text-center text-muted-foreground">
                  <Upload className="mx-auto h-8 w-8" />
                  <p className="mt-2 text-sm">Subir logo</p>
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
            <p className="text-xs text-muted-foreground text-center">
              Click para cambiar. Recomendado: 200x200px.
            </p>
          </div>
          <div className="grid gap-4 md:col-span-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del establecimiento</Label>
              <Input
                id="name"
                value={info.name}
                onChange={handleInputChange}
                placeholder="Ej: Clínica Dental Sonrisas"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={info.address}
                onChange={handleInputChange}
                placeholder="Ej: Calle Falsa 123, Col. Centro"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={info.phone}
                  onChange={handleInputChange}
                  placeholder="Ej: 55 1234 5678"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={info.email}
                  onChange={handleInputChange}
                  placeholder="Ej: contacto@clinica.com"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit">Guardar Cambios</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
