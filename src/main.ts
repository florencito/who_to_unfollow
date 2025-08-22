import { UIManager } from './ui';
import { parseFilesFromFiles, parseFilesFromZip } from './parse';
import { computeResults } from './logic';
import { validateFiles } from './validate';
import { exportAllToZip } from './export';
import { inject } from '@vercel/analytics';
import { createHeader, initHeaderAnimations } from './components/header';
import { createFooter, initFooterFunctions } from './components/footer';
import './styles.css';

// Initialize Vercel Analytics
inject();

/**
 * Main Instagram Analyzer Application with florenApps design system
 */
class InstagramAnalyzer {
  private ui: UIManager;

  constructor() {
    this.ui = new UIManager();
    this.init();
  }

  private async init(): Promise<void> {
    // Show loading state
    this.showGlobalLoading();

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.render());
    } else {
      this.render();
    }
  }

  private showGlobalLoading(): void {
    const loading = document.getElementById('global-loading');
    if (loading) {
      loading.style.display = 'flex';
    }
  }

  private hideGlobalLoading(): void {
    const loading = document.getElementById('global-loading');
    if (loading) {
      loading.style.opacity = '0';
      setTimeout(() => {
        loading.style.display = 'none';
      }, 300);
    }
  }

  private async render(): Promise<void> {
    try {
      // Initialize component functions
      initFooterFunctions();
      
      // Render components
      this.renderHeader();
      this.renderFooter();

      // Initialize original functionality
      this.initializeEventListeners();
      this.showWelcome();

      // Initialize animations and interactions
      setTimeout(() => {
        this.initAnimations();
        this.hideGlobalLoading();
        this.showContent();
      }, 500);

      // Track page view
      this.trackPageView();

    } catch (error) {
      console.error('Error rendering app:', error);
      this.showError('Failed to load the application. Please refresh the page.');
    }
  }

  private renderHeader(): void {
    const headerElement = document.getElementById('header');
    if (headerElement) {
      headerElement.innerHTML = createHeader();
    }
  }

  private renderFooter(): void {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.innerHTML = createFooter();
    }
  }

  private showContent(): void {
    const elements = ['header', 'main', 'footer'];
    elements.forEach((id, index) => {
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.style.opacity = '1';
          element.classList.add('animate-fade-in');
        }, index * 200);
      }
    });
  }

  private initAnimations(): void {
    // Initialize header animations
    initHeaderAnimations();

    // Add scroll-based animations
    this.initScrollAnimations();
  }

  private initScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.card, .stats-card').forEach(el => {
      observer.observe(el);
    });
  }

  private trackPageView(): void {
    // Track page view with Vercel Analytics
    if ((window as any).va) {
      (window as any).va('track', 'Page View', { page: 'Instagram Analyzer' });
    }
  }

  private initializeEventListeners(): void {
    // Botón para cargar ZIP
    const zipButton = document.getElementById('load-zip') as HTMLButtonElement;
    const zipInput = document.getElementById('zip-input') as HTMLInputElement;
    
    zipButton?.addEventListener('click', () => {
      zipInput?.click();
    });

    zipInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.handleZipFile(files[0]);
      }
    });

    // Botón para cargar JSONs individuales
    const jsonButton = document.getElementById('load-json') as HTMLButtonElement;
    const jsonInput = document.getElementById('json-input') as HTMLInputElement;
    
    jsonButton?.addEventListener('click', () => {
      jsonInput?.click();
    });

    jsonInput?.addEventListener('change', (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.handleJsonFiles(files);
      }
    });

    // Botón de reiniciar
    const resetButton = document.getElementById('reset') as HTMLButtonElement;
    resetButton?.addEventListener('click', () => {
      this.reset();
    });

    // Botón exportar todo
    const exportAllButton = document.getElementById('export-all') as HTMLButtonElement;
    exportAllButton?.addEventListener('click', () => {
      this.exportAll();
    });

    // Drag & Drop
    this.setupDragAndDrop();
  }

  private setupDragAndDrop(): void {
    const dropZone = document.getElementById('upload-area');
    if (!dropZone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, this.preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('drag-over');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        // Si es un solo archivo ZIP
        if (files.length === 1 && files[0].name.endsWith('.zip')) {
          this.handleZipFile(files[0]);
        } else {
          // Múltiples archivos JSON
          this.handleJsonFiles(files);
        }
      }
    });
  }

  private preventDefaults(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  private async handleZipFile(file: File): Promise<void> {
    try {
      this.ui.setLoading(true);
      
      console.log(`Procesando archivo ZIP: ${file.name} (${file.size} bytes)`);
      
      const data = await parseFilesFromZip(file);
      const results = computeResults(data);
      
      console.log('Datos procesados:', {
        followers: data.followers.size,
        following: data.following.size,
        notFollowingBack: results.notFollowingBack.length,
        mutuals: results.mutuals.length,
        fans: results.fans.length
      });
      
      this.ui.setData(data, results);
      
    } catch (error) {
      console.error('Error procesando ZIP:', error);
      this.ui.setError(`Error procesando ZIP: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      this.ui.setLoading(false);
    }
  }

  private async handleJsonFiles(files: FileList): Promise<void> {
    try {
      this.ui.setLoading(true);
      
      console.log(`Procesando ${files.length} archivos JSON`);
      
      const validation = validateFiles(files);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }
      
      if (!validation.files) {
        throw new Error('Error de validación');
      }
      
      const data = await parseFilesFromFiles(
        validation.files.following!, 
        validation.files.followers
      );
      
      const results = computeResults(data);
      
      console.log('Datos procesados:', {
        followers: data.followers.size,
        following: data.following.size,
        notFollowingBack: results.notFollowingBack.length,
        mutuals: results.mutuals.length,
        fans: results.fans.length
      });
      
      this.ui.setData(data, results);
      
    } catch (error) {
      console.error('Error procesando archivos JSON:', error);
      this.ui.setError(`Error procesando archivos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      this.ui.setLoading(false);
    }
  }

  private exportAll(): void {
    const results = (this.ui as any).state?.results;
    if (results) {
      exportAllToZip(results);
    }
  }

  private reset(): void {
    // Limpiar inputs
    const zipInput = document.getElementById('zip-input') as HTMLInputElement;
    const jsonInput = document.getElementById('json-input') as HTMLInputElement;
    
    if (zipInput) zipInput.value = '';
    if (jsonInput) jsonInput.value = '';
    
    // Resetear UI
    this.ui.reset();
    this.showWelcome();
  }

  private showWelcome(): void {
    const welcomeContainer = document.getElementById('welcome');
    if (welcomeContainer) {
      welcomeContainer.style.display = 'block';
    }
    
    const hideOnLoad = document.querySelectorAll('.hide-on-load');
    hideOnLoad.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
  }

  private showError(message: string): void {
    this.ui.setError(message);
    this.hideGlobalLoading();
  }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Instagram Analyzer iniciado');
  new InstagramAnalyzer();
});

// Mostrar información de debug en development
if (import.meta.env.DEV) {
  console.log('🔧 Modo desarrollo activo');
}
