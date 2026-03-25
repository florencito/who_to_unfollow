export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Header
    appTitle: "Who to Unfollow",
    appSubtitle: "Analyze your Instagram followers privately",
    appDescription: "Find who doesn't follow back, discover mutual followers, and identify your fans. 100% client-side processing - your data never leaves your browser.",
    privacyBadge: "100% Private",
    exportBadge: "Easy Export",
    speedBadge: "Lightning Fast",
    dataBadge: "Instagram Data",
    backToHub: "Back to florenApps",
    uploadPrompt: "Upload your Instagram data export to get started",
    
    // Main UI
    loadingAnalyzer: "Loading Instagram Analyzer...",
    uploadDataTitle: "Upload your Instagram data",
    uploadDataDesc: "Drop your Instagram ZIP file here or select JSON files individually",
    loadZip: "📦 Load Instagram ZIP",
    loadJson: "📄 Load JSON files",
    howToGet: "📚 How to get your Instagram data?",
    howToSteps: `
      <ol class="space-y-3 text-gray-700">
        <li><strong>Open Instagram</strong> (app or web)</li>
        <li>Go to <strong>Settings → Accounts Center</strong></li>
        <li>Select <strong>"Your information and permissions"</strong></li>
        <li>Tap <strong>"Download your information"</strong></li>
        <li>Choose <strong>"Request a download"</strong></li>
        <li>Select <strong>"Download to device"</strong></li>
        <li>In <strong>"Select information"</strong>:
          <ul class="ml-4 mt-2 space-y-1">
            <li>• Uncheck everything</li>
            <li>• Only check <strong>"Followers and following"</strong> ✓</li>
          </ul>
        </li>
        <li>In <strong>"Date range"</strong>: Select <strong>"All time"</strong></li>
        <li>In <strong>"Format"</strong>: Select <strong>JSON</strong></li>
        <li>Tap <strong>"Submit request"</strong></li>
        <li><strong>Wait</strong> for the email (can take hours)</li>
        <li>Download the ZIP from the email link</li>
        <li>Drag the ZIP here and analyze! 🎉</li>
      </ol>
    `,
    proTip: "Pro tip:",
    proTipDesc: "The process can take between 15 minutes and 48 hours depending on your data size. Be patient!",
    processingData: "Processing your data...",
    takeMoments: "This may take a few moments",
    
    // Results & Controls
    searchPlaceholder: "Search user...",
    exportBtn: "Export",
    copyBtn: "Copy",
    exportAllBtn: "Export All",
    resetBtn: "Reset",
    tabNotFollowingBack: "Don't follow back",
    tabMutuals: "Mutual followers",
    tabFans: "Your fans",
    statsFollowing: "Following",
    statsFollowers: "Followers",
    statsNotFollowing: "Don't follow back",
    statsMutuals: "Mutual",
    statsFans: "Your fans",

    // Status / Errors
    noUsersFound: "No users found",
    noUsersMatch: "No users match",
    noUsersCategory: "No users in this category",
    showingFirst: "Showing first 1,000 of",
    users: "users",
    user: "user",

    // Footer
    footerTitle: "Instagram Follower Analyzer",
    footerDesc: "Analyze your Instagram followers privately and securely. Part of the florenApps ecosystem - privacy-friendly mini apps that solve boring tasks fast.",
    footerPrivacyTitle: "100% Private",
    footerPrivacyDesc: "All processing in your browser",
    footerDetailedTitle: "Detailed Analysis",
    footerDetailedDesc: "Followers, mutuals, and fans",
    footerExportTitle: "Easy Export",
    footerExportDesc: "CSV downloads and clipboard",
    hubLink: "🏠 florenApps Hub",
    qrLink: "📱 QR Generator",
    drinkMasterLink: "🍻 DrinkMaster",
    suggestLink: "💡 Suggest Feature",
    privacyNoticeTitle: "Privacy Guaranteed",
    privacyNoticeDesc: "Your Instagram data is processed entirely in your browser. No data is sent to any server. Your privacy is our top priority.",
    clientSideOnly: "Client-Side Only",
    openSource: "Open Source",
  },
  es: {
    // Header
    appTitle: "A quién dejar de seguir",
    appSubtitle: "Analiza tus seguidores de Instagram en privado",
    appDescription: "Descubre quién no te sigue, encuentra seguidores mutuos e identifica a tus fans. Procesamiento 100% en el cliente: tus datos nunca salen de tu navegador.",
    privacyBadge: "100% Privado",
    exportBadge: "Fácil Exportación",
    speedBadge: "Súper Rápido",
    dataBadge: "Datos de Instagram",
    backToHub: "Volver a florenApps",
    uploadPrompt: "Sube tu exportación de datos de Instagram para empezar",
    
    // Main UI
    loadingAnalyzer: "Cargando analizador...",
    uploadDataTitle: "Sube tus datos de Instagram",
    uploadDataDesc: "Arrastra tu archivo ZIP de Instagram aquí o selecciona archivos JSON individuales",
    loadZip: "📦 Cargar ZIP de Instagram",
    loadJson: "📄 Cargar archivos JSON",
    howToGet: "📚 ¿Cómo obtener tus datos de Instagram?",
    howToSteps: `
      <ol class="space-y-3 text-gray-700">
        <li><strong>Abre Instagram</strong> (app o web)</li>
        <li>Ve a <strong>Configuración → Centro de cuentas</strong></li>
        <li>Selecciona <strong>"Tu información y permisos"</strong></li>
        <li>Toca en <strong>"Descargar tu información"</strong></li>
        <li>Elige <strong>"Solicitar una descarga"</strong></li>
        <li>Selecciona <strong>"Descargar al dispositivo"</strong></li>
        <li>En <strong>"Seleccionar información"</strong>:
          <ul class="ml-4 mt-2 space-y-1">
            <li>• Desmarca todo</li>
            <li>• Solo marca <strong>"Seguidores y seguidos"</strong> ✓</li>
          </ul>
        </li>
        <li>En <strong>"Intervalo de fechas"</strong>: Selecciona <strong>"Desde el principio"</strong></li>
        <li>En <strong>"Formato"</strong>: Selecciona <strong>JSON</strong></li>
        <li>Toca en <strong>"Enviar solicitud"</strong></li>
        <li><strong>Espera</strong> el correo (puede tardar horas)</li>
        <li>Descarga el ZIP desde el enlace del correo</li>
        <li>¡Arrastra el ZIP aquí y analiza! 🎉</li>
      </ol>
    `,
    proTip: "Tip:",
    proTipDesc: "El proceso puede tardar entre 15 minutos y 48 horas dependiendo de la cantidad de datos. ¡Sé paciente!",
    processingData: "Procesando tus datos...",
    takeMoments: "Esto puede tomar unos momentos",
    
    // Results & Controls
    searchPlaceholder: "Buscar usuario...",
    exportBtn: "Exportar",
    copyBtn: "Copiar",
    exportAllBtn: "Exportar Todos",
    resetBtn: "Reiniciar",
    tabNotFollowingBack: "No me siguen",
    tabMutuals: "Mutuos",
    tabFans: "Mis fans",
    statsFollowing: "Seguidos",
    statsFollowers: "Seguidores",
    statsNotFollowing: "No me siguen",
    statsMutuals: "Mutuos",
    statsFans: "Mis fans",

    // Status / Errors
    noUsersFound: "Usuarios no encontrados",
    noUsersMatch: "No hay usuarios que coincidan con",
    noUsersCategory: "No hay usuarios en esta categoría",
    showingFirst: "Mostrando los primeros 1,000 de",
    users: "usuarios",
    user: "usuario",

    // Footer
    footerTitle: "Analizador de Seguidores de Instagram",
    footerDesc: "Analiza tus seguidores de Instagram de forma privada y segura. Parte del ecosistema florenApps - mini aplicaciones amigables con la privacidad.",
    footerPrivacyTitle: "100% Privado",
    footerPrivacyDesc: "Todo el procesamiento en tu navegador",
    footerDetailedTitle: "Análisis Detallado",
    footerDetailedDesc: "Seguidores, mutuos y fans",
    footerExportTitle: "Exportación Fácil",
    footerExportDesc: "Descargas CSV y portapapeles",
    hubLink: "🏠 florenApps Hub",
    qrLink: "📱 Generador QR",
    drinkMasterLink: "🍻 DrinkMaster",
    suggestLink: "💡 Sugerir Función",
    privacyNoticeTitle: "Privacidad Garantizada",
    privacyNoticeDesc: "Tus datos de Instagram se procesan completamente en tu navegador. No se envía ningún dato a ningún servidor.",
    clientSideOnly: "Solo Cliente",
    openSource: "Código Abierto",
  }
};

export let currentLanguage: Language = 'en';

// Helper for translation
export function t(key: keyof typeof translations.en): string {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  localStorage.setItem('florenapps-lang', lang);
  updateDOMTranslations();
}

export function initLanguage() {
  const saved = localStorage.getItem('florenapps-lang');
  if (saved && (saved === 'en' || saved === 'es')) {
    currentLanguage = saved;
  } else {
    // Detect browser language
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang && browserLang.toLowerCase().startsWith('es')) {
      currentLanguage = 'es';
    } else {
      currentLanguage = 'en';
    }
  }
  updateDOMTranslations();
}

export function updateDOMTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n') as keyof typeof translations.en;
    if (key && translations[currentLanguage][key]) {
      // Check if it's an input placeholder
      if (el instanceof HTMLInputElement && el.hasAttribute('placeholder')) {
        el.placeholder = translations[currentLanguage][key];
      } else {
        el.innerHTML = translations[currentLanguage][key];
      }
    }
  });

  // Update page title
  document.title = translations[currentLanguage].appTitle + " — Instagram follower analyzer";

  // Specifically update the language toggle classes
  const esBtn = document.getElementById('lang-es');
  const enBtn = document.getElementById('lang-en');
  if (esBtn && enBtn) {
    if (currentLanguage === 'es') {
      esBtn.classList.add('bg-pink-100', 'text-pink-800', 'font-bold');
      esBtn.classList.remove('text-gray-500', 'hover:bg-gray-100');
      enBtn.classList.remove('bg-pink-100', 'text-pink-800', 'font-bold');
      enBtn.classList.add('text-gray-500', 'hover:bg-gray-100');
    } else {
      enBtn.classList.add('bg-pink-100', 'text-pink-800', 'font-bold');
      enBtn.classList.remove('text-gray-500', 'hover:bg-gray-100');
      esBtn.classList.remove('bg-pink-100', 'text-pink-800', 'font-bold');
      esBtn.classList.add('text-gray-500', 'hover:bg-gray-100');
    }
  }
}
