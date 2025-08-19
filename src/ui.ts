import type { AppState, Results } from './types';
import { filterUsers, formatNumber, getStatsSummary } from './logic';
import { exportNotFollowingBack, exportMutuals, exportFans, copyToClipboard } from './export';

/**
 * Gestiona el estado de la aplicación
 */
export class UIManager {
  private state: AppState = {
    isLoading: false,
    data: null,
    results: null,
    error: null,
    searchTerm: '',
    currentTab: 'notFollowingBack'
  };

  private elements = {
    loadingIndicator: document.getElementById('loading') as HTMLElement,
    errorContainer: document.getElementById('error') as HTMLElement,
    resultsContainer: document.getElementById('results') as HTMLElement,
    searchInput: document.getElementById('search') as HTMLInputElement,
    statsContainer: document.getElementById('stats') as HTMLElement,
    tabButtons: document.querySelectorAll('.tab-button') as NodeListOf<HTMLButtonElement>,
    usersList: document.getElementById('users-list') as HTMLElement,
    exportButton: document.getElementById('export-current') as HTMLButtonElement,
    copyButton: document.getElementById('copy-current') as HTMLButtonElement,
  };

  constructor() {
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    // Búsqueda
    this.elements.searchInput?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.state.searchTerm = target.value;
      this.renderCurrentList();
    });

    // Tabs
    this.elements.tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.dataset.tab as AppState['currentTab'];
        if (tab) {
          this.switchTab(tab);
        }
      });
    });

    // Botones de exportar y copiar
    this.elements.exportButton?.addEventListener('click', () => {
      this.exportCurrentList();
    });

    this.elements.copyButton?.addEventListener('click', () => {
      this.copyCurrentList();
    });
  }

  public setLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
    this.renderLoadingState();
  }

  public setError(error: string | null): void {
    this.state.error = error;
    this.renderError();
  }

  public setData(data: any, results: Results): void {
    this.state.data = data;
    this.state.results = results;
    this.state.error = null;
    this.renderResults();
  }

  private renderLoadingState(): void {
    if (!this.elements.loadingIndicator) return;
    
    if (this.state.isLoading) {
      this.elements.loadingIndicator.style.display = 'block';
      this.elements.resultsContainer.style.display = 'none';
      this.elements.errorContainer.style.display = 'none';
    } else {
      this.elements.loadingIndicator.style.display = 'none';
    }
  }

  private renderError(): void {
    if (!this.elements.errorContainer) return;

    if (this.state.error) {
      this.elements.errorContainer.textContent = this.state.error;
      this.elements.errorContainer.style.display = 'block';
      this.elements.resultsContainer.style.display = 'none';
    } else {
      this.elements.errorContainer.style.display = 'none';
    }
  }

  private renderResults(): void {
    if (!this.state.data || !this.state.results) return;

    // Ocultar welcome y mostrar resultados
    const welcomeContainer = document.getElementById('welcome');
    if (welcomeContainer) {
      welcomeContainer.style.display = 'none';
    }
    
    this.elements.resultsContainer.style.display = 'block';
    this.renderStats();
    this.renderCurrentList();
    this.updateTabButtons();
  }

  private renderStats(): void {
    if (!this.elements.statsContainer || !this.state.data || !this.state.results) return;

    const stats = getStatsSummary(this.state.data, this.state.results);
    
    this.elements.statsContainer.innerHTML = `
      <div class=\"stats-grid\">
        <div class=\"stat-card\">
          <div class=\"stat-number\">${formatNumber(stats.totalFollowing)}</div>
          <div class=\"stat-label\">Sigues</div>
        </div>
        <div class=\"stat-card\">
          <div class=\"stat-number\">${formatNumber(stats.totalFollowers)}</div>
          <div class=\"stat-label\">Te siguen</div>
        </div>
        <div class=\"stat-card highlight\">
          <div class=\"stat-number\">${formatNumber(stats.notFollowingBack)}</div>
          <div class=\"stat-label\">No te siguen</div>
        </div>
        <div class=\"stat-card\">
          <div class=\"stat-number\">${formatNumber(stats.mutuals)}</div>
          <div class=\"stat-label\">Mutuos</div>
        </div>
        <div class=\"stat-card\">
          <div class=\"stat-number\">${formatNumber(stats.fans)}</div>
          <div class=\"stat-label\">Fans</div>
        </div>
      </div>
    `;
  }

  private renderCurrentList(): void {
    if (!this.state.results || !this.elements.usersList) return;

    const currentList = this.getCurrentList();
    const filteredUsers = filterUsers(currentList, this.state.searchTerm);

    if (filteredUsers.length === 0) {
      this.elements.usersList.innerHTML = `
        <div class=\"empty-state\">
          ${this.state.searchTerm 
            ? `No se encontraron usuarios que coincidan con \"${this.state.searchTerm}\"` 
            : 'No hay usuarios en esta categoría'}
        </div>
      `;
      return;
    }

    const usersHTML = filteredUsers
      .slice(0, 1000) // Limitar a 1000 para rendimiento
      .map(username => `
        <div class=\"user-item\">
          <span class=\"username\">@${username}</span>
          <a href=\"https://instagram.com/${username}\" 
             target=\"_blank\" 
             rel=\"noopener noreferrer\" 
             class=\"profile-link\"
             title=\"Ver perfil de ${username}\">
            🔗
          </a>
        </div>
      `).join('');

    const showingText = filteredUsers.length > 1000 
      ? `Mostrando los primeros 1,000 de ${formatNumber(filteredUsers.length)} usuarios`
      : `${formatNumber(filteredUsers.length)} usuario${filteredUsers.length !== 1 ? 's' : ''}`;

    this.elements.usersList.innerHTML = `
      <div class=\"list-header\">
        <div class=\"list-count\">${showingText}</div>
      </div>
      <div class=\"users-grid\">${usersHTML}</div>
    `;
  }

  private getCurrentList(): string[] {
    if (!this.state.results) return [];
    
    switch (this.state.currentTab) {
      case 'notFollowingBack':
        return this.state.results.notFollowingBack;
      case 'mutuals':
        return this.state.results.mutuals;
      case 'fans':
        return this.state.results.fans;
      default:
        return [];
    }
  }

  private switchTab(tab: AppState['currentTab']): void {
    this.state.currentTab = tab;
    this.state.searchTerm = '';
    if (this.elements.searchInput) {
      this.elements.searchInput.value = '';
    }
    this.updateTabButtons();
    this.renderCurrentList();
  }

  private updateTabButtons(): void {
    if (!this.state.results) return;

    this.elements.tabButtons.forEach(button => {
      const tab = button.dataset.tab;
      const isActive = tab === this.state.currentTab;
      
      button.classList.toggle('active', isActive);
      
      // Actualizar conteos en los botones
      if (tab === 'notFollowingBack') {
        const count = this.state.results!.notFollowingBack.length;
        button.innerHTML = `No me siguen <span class=\"tab-count\">${formatNumber(count)}</span>`;
      } else if (tab === 'mutuals') {
        const count = this.state.results!.mutuals.length;
        button.innerHTML = `Mutuos <span class=\"tab-count\">${formatNumber(count)}</span>`;
      } else if (tab === 'fans') {
        const count = this.state.results!.fans.length;
        button.innerHTML = `Fans <span class=\"tab-count\">${formatNumber(count)}</span>`;
      }
    });
  }

  private exportCurrentList(): void {
    if (!this.state.results) return;

    switch (this.state.currentTab) {
      case 'notFollowingBack':
        exportNotFollowingBack(this.state.results);
        break;
      case 'mutuals':
        exportMutuals(this.state.results);
        break;
      case 'fans':
        exportFans(this.state.results);
        break;
    }
  }

  private copyCurrentList(): void {
    const currentList = this.getCurrentList();
    const filteredUsers = filterUsers(currentList, this.state.searchTerm);
    copyToClipboard(filteredUsers);
  }

  public reset(): void {
    this.state = {
      isLoading: false,
      data: null,
      results: null,
      error: null,
      searchTerm: '',
      currentTab: 'notFollowingBack'
    };
    
    if (this.elements.searchInput) {
      this.elements.searchInput.value = '';
    }
    
    // Mostrar welcome y ocultar resultados
    const welcomeContainer = document.getElementById('welcome');
    if (welcomeContainer) {
      welcomeContainer.style.display = 'block';
    }
    
    this.elements.loadingIndicator.style.display = 'none';
    this.elements.errorContainer.style.display = 'none';
    this.elements.resultsContainer.style.display = 'none';
  }
}
