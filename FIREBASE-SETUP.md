# Configurar Firebase (login con Google + guardado en la nube)

La app funciona sin Firebase en **modo local** (sin login, sin guardar). Para
activar el inicio de sesión con Google y que cada usuario tenga su libro de
saldos guardado en la nube, sigue estos pasos. Toma ~5 minutos.

## 1. Crear el proyecto

1. Entra a <https://console.firebase.google.com> con tu cuenta de Google.
2. **Agregar proyecto** → ponle un nombre (ej. `pagos-vendedores`) → Continuar.
3. Puedes desactivar Google Analytics (no es necesario) → Crear proyecto.

## 2. Registrar la app web y copiar credenciales

1. En la pantalla del proyecto, haz clic en el icono **Web** `</>`.
2. Dale un apodo (ej. `web`) y **Registrar app**.
3. Te mostrará un objeto `firebaseConfig`. Copia esos valores.
4. Pégalos en **`firebase-config.js`** de este proyecto, reemplazando los
   `TU_...`:

   ```js
   window.firebaseConfig = {
     apiKey:            "AIza...",
     authDomain:        "pagos-vendedores.firebaseapp.com",
     projectId:         "pagos-vendedores",
     storageBucket:     "pagos-vendedores.appspot.com",
     messagingSenderId: "1234567890",
     appId:             "1:1234567890:web:abc123",
   };
   ```

> Estas credenciales son **públicas por diseño** (van en el navegador). La
> seguridad real se aplica con las reglas de Firestore del paso 4.

## 3. Activar el inicio de sesión con Google

1. Menú lateral → **Compilación → Authentication** → **Comenzar**.
2. Pestaña **Sign-in method** → habilita **Google** → activa el interruptor,
   elige un correo de soporte → **Guardar**.
3. En **Authentication → Settings → Dominios autorizados**, agrega el dominio
   donde publicarás la app (ej. `localhost` ya viene incluido; agrega tu
   dominio de hosting si usas uno).

## 4. Crear la base de datos Firestore + reglas de seguridad

1. Menú lateral → **Compilación → Firestore Database** → **Crear base de datos**.
2. Elige una ubicación y empieza en **modo de producción**.
3. Pestaña **Reglas** → pega lo siguiente y **Publicar**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Cada usuario solo puede leer/escribir su propio libro de saldos.
       match /ledgers/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```

   Esto garantiza que cada persona solo accede a su propio documento
   (`ledgers/{su-uid}`).

## 5. Probar

Abre `Balance Comercial.html`. Debe aparecer la pantalla de inicio de sesión
con el botón **Continuar con Google**. Al entrar, tus movimientos se guardan
automáticamente y reaparecen al recargar o entrar desde otro dispositivo.

> **Nota:** por las políticas de seguridad del navegador, el login con Google
> (popup) y Firestore requieren servir el archivo por **http(s)**, no abrirlo
> con `file://`. Para probar localmente:
>
> ```bash
> npx serve .
> # o
> python3 -m http.server
> ```
>
> y abre la URL `http://localhost:...` que te indique.

## ¿Cómo se guardan los datos?

- Un documento por usuario en la colección `ledgers`, con id = `uid`.
- Campos: `items` (movimientos), `names` (nombres de las partes) y `updatedAt`.
- Se guarda con *debounce* (~0,6 s) tras cada cambio.
