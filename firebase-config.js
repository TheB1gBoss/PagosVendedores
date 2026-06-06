// ============================================================================
//  CONFIGURACIÓN DE FIREBASE
// ----------------------------------------------------------------------------
//  Pega aquí las credenciales de TU proyecto de Firebase.
//
//  ¿Dónde las consigo?  (ver pasos detallados en FIREBASE-SETUP.md)
//    1. https://console.firebase.google.com  →  Agregar proyecto
//    2. Dentro del proyecto:  ⚙️ Configuración del proyecto  →  pestaña "General"
//    3. Sección "Tus apps"  →  icono Web  </>  →  registra la app
//    4. Copia el objeto `firebaseConfig` y reemplaza los valores de abajo.
//
//  Mientras esté sin configurar (con los valores "TU_..."), la app funciona
//  en MODO LOCAL: sin login y sin guardar en la nube (los datos viven solo
//  en memoria). Apenas pegues tus credenciales reales, se activa el login
//  con Google y el guardado en Firestore automáticamente.
// ============================================================================

window.firebaseConfig = {
  apiKey:            "AIzaSyAHOCXTPy-Gn-2lP8bWKac85hVaw8JraeE",
  authDomain:        "pagosvendedores.firebaseapp.com",
  projectId:         "pagosvendedores",
  storageBucket:     "pagosvendedores.firebasestorage.app",
  messagingSenderId: "706059648538",
  appId:             "1:706059648538:web:9964a061528fbd1039dba3",
  measurementId:     "G-0XYNXD3RH1",
};
