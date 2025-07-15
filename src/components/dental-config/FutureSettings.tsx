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
    <Card>
      <CardHeader>
        <CardTitle>Otras Configuraciones</CardTitle>
        <CardDescription>
          Esta sección está reservada para futuras opciones de configuración de
          la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-12 text-center text-muted-foreground">
          <Settings className="h-16 w-16" />
          <p className="mt-4 text-lg font-medium">Próximamente</p>
          <p className="mt-1 text-sm">
            Nuevas funcionalidades y ajustes estarán disponibles aquí.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
