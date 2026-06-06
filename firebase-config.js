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
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROYECTO.firebaseapp.com",
  projectId:         "TU_PROYECTO",
  storageBucket:     "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId:             "TU_APP_ID",
};
