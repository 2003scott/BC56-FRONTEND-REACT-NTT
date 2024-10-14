# Proyecto de Mini Market REACT + TYPESCRIPT

## Descripción
Semana 

## Estructura de Carpetas

La estructura de carpetas del proyecto es la siguiente:

```
├─ public
├─ src
│  ├─ components
│  │  └─ core
│  │  └─ custom
│  │  └─ ui
│  ├─ context
│  ├─ hooks
│  ├─ interface
│  ├─ layout
│  ├─ lib
│  ├─ pages
│  └─ style
│  └─ app.tsx
│  └─ index.css
│  └─ main.tsx
├─ .editorconfig
├─ .env
├─ .gitignore
├─ .prettierrc.json
├─ package.json
└─ style.css
```

src: Contiene codigo fuente.</br>
- Components : Componentes reutilizables</br>
-- core : Contiene codigo que no se a modifcar mucho y algo compartido
-- custom : Contiene componenetes personalizados
-- ui : Componentes de interfaz de usuario
- hooks : Hooks personalizados para ahorrar codigo repetitivo con logica personalizada
- interface : definiciones de interfaces de typescript
- pages : Contenido de paginas
- styles : Contiene contenido responsivo de products
- App.tsx : Componente principal de la aplicaicon
- index.css : stylos globales para la app
- main.tsx : punto de entrada de la aplicacion


## Instalación
Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```sh
npm install
```

## USO
Para iniciar la aplicación, utiliza el siguiente comando

```sh
npm run dev
```

## BUILD
Para hacer el build de la app, hacer un js , css y html, se creara un carpeta dist

```sh
npm run build
```
