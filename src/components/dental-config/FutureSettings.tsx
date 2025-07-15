"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const GearIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m4.93 19.07 1.41-1.41" />
    <path d="m17.66 6.34 1.41-1.41" />
  </svg>
);

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
          <GearIcon className="h-16 w-16 text-primary animate-spin [animation-duration:5s]" />
          <p className="mt-6 text-xl font-medium text-foreground">Próximamente</p>
          <p className="mt-2 text-base max-w-sm">
            Estamos trabajando en nuevas funcionalidades y ajustes que estarán disponibles aquí muy pronto.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
