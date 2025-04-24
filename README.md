<<<<<<< HEAD
# Estructura del Proyecto Angular

## Estructura Actual Mejorada

```
src/
├── app/
│   ├── core/                    # Funcionalidad central de la aplicación
│   │   ├── guards/             # Guards de autenticación y autorización
│   │   ├── interceptors/       # Interceptores HTTP
│   │   ├── services/           # Servicios principales
│   │   └── models/             # Modelos e interfaces
│   │
│   ├── shared/                 # Componentes y funcionalidad compartida
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pipes/             # Pipes personalizados
│   │   ├── directives/        # Directivas personalizadas
│   │   └── utils/             # Utilidades compartidas
│   │
│   ├── features/              # Módulos de características
│   │   ├── players/          # Módulo de jugadores
│   │   │   ├── components/   # Componentes específicos de jugadores
│   │   │   ├── services/     # Servicios de jugadores
│   │   │   └── models/       # Modelos de jugadores
│   │   │
│   │   └── podium-form/      # Módulo de formulario de podio
│   │       ├── components/   # Componentes del formulario
│   │       ├── services/     # Servicios del formulario
│   │       └── models/       # Modelos del formulario
│   │
│   ├── environments/         # Configuraciones de entorno
│   │   ├── environment.ts    # Desarrollo
│   │   └── environment.prod.ts # Producción
│   │
│   ├── assets/              # Recursos estáticos
│   │   ├── images/         # Imágenes
│   │   ├── styles/         # Estilos globales
│   │   └── i18n/           # Archivos de internacionalización
│   │
│   ├── app.routes.ts       # Rutas principales
│   ├── app.config.ts       # Configuración de la aplicación
│   └── app.component.*     # Componente raíz
│
├── index.html
├── main.ts
└── styles.css
```

## Diagrama de Estructura

```
┌─────────────────────────────────────────────────────────────────┐
│                            src/                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │    core/    │  │   shared/   │  │       features/         │  │
│  ├─────────────┤  ├─────────────┤  ├─────────────────────────┤  │
│  │  guards     │  │ components  │  │  players/               │  │
│  │  services   │  │ pipes       │  │  podium-form/           │  │
│  │  models     │  │ directives  │  │  ...                    │  │
│  │  interceptors│  │ utils      │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                              │
│  │environments/│  │   assets/   │                              │
│  ├─────────────┤  ├─────────────┤                              │
│  │  dev        │  │  images     │                              │
│  │  prod       │  │  styles     │                              │
│  └─────────────┘  │  i18n       │                              │
│                   └─────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

## Explicación de la Estructura

1. **Core**: Contiene la funcionalidad central de la aplicación
   - Guards para protección de rutas
   - Interceptores para manejo de peticiones HTTP
   - Servicios principales
   - Modelos e interfaces base

2. **Shared**: Componentes y funcionalidad reutilizable
   - Componentes comunes
   - Pipes y directivas
   - Utilidades compartidas

3. **Features**: Módulos de características específicas
   - Cada feature tiene su propia estructura completa
   - Separación clara de responsabilidades
   - Fácil mantenimiento y escalabilidad

4. **Environments**: Configuraciones por entorno
   - Desarrollo
   - Producción

5. **Assets**: Recursos estáticos
   - Imágenes
   - Estilos globales
   - Internacionalización

## Beneficios de esta Estructura

- **Modularidad**: Cada feature es independiente y autocontenido
- **Escalabilidad**: Fácil de extender con nuevas características
- **Mantenibilidad**: Código bien organizado y fácil de encontrar
- **Reutilización**: Componentes compartidos centralizados
- **Separación de Responsabilidades**: Cada carpeta tiene un propósito claro
=======
Project: League of Legends Podium Tracker
This is a web project developed with Angular (frontend) that connects to the Riot Games API to search for players, add them to a custom list, and generate a dynamic ranking based on their daily, weekly, or monthly performance. The Node.js/NestJS backend is planned and still in development.

The motivation behind the project came from spending so many hours playing League of Legends with my friends. We always joked about who was the best (or the worst 😅), so I decided to create this app to visualize that in a fun way.

In addition to being a project to pass the time, I'm also using it to improve my technical skills, practice consuming external APIs, and learn more about web application architecture.

The entire system is designed with a sense of humor, so that friends can compete in a healthy way and have even more fun. I hope you like it as much as we enjoy using it! 

![image](https://github.com/user-attachments/assets/03770650-bf63-4a12-9e40-f346940f57b0)

Here's a better representation of what I want to do and the processes for how this project would work. One thing I'd like to add, but I'm still hesitant about, is creating a form so you can create nicknames for players you get in the search, so you can use the nicknames we all have with friends and such.

![image](https://github.com/user-attachments/assets/ef3c4c12-b658-4d70-8113-9f084d4e321f)
>>>>>>> ec5a0270219b9efca27ffb5d015860204c960a6b
