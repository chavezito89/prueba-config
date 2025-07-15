"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings } from "lucide-react";

export function FutureSettings() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Configuraciones Adicionales</CardTitle>
        <CardDescription>
          Esta sección está reservada para futuras opciones de configuración de
          la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-80 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-secondary/30 p-12 text-center text-muted-foreground">
          <Settings className="h-16 w-16 text-primary animate-spin [animation-duration:5s]" />
          <p className="mt-6 text-xl font-medium text-foreground">Próximamente</p>
          <p className="mt-2 text-base max-w-sm">
            Estamos trabajando en nuevas funcionalidades y ajustes que estarán disponibles aquí muy pronto.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
