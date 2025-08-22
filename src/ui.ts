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
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 animate-slide-up">
        <div class="stats-card">
          <div class="stats-number text-blue-600">${formatNumber(stats.totalFollowing)}</div>
          <div class="stats-label">Following</div>
        </div>
        <div class="stats-card">
          <div class="stats-number text-green-600">${formatNumber(stats.totalFollowers)}</div>
          <div class="stats-label">Followers</div>
        </div>
        <div class="stats-card border-pink-200 bg-pink-50">
          <div class="stats-number text-pink-600">${formatNumber(stats.notFollowingBack)}</div>
          <div class="stats-label">Don't follow back</div>
        </div>
        <div class="stats-card">
          <div class="stats-number text-purple-600">${formatNumber(stats.mutuals)}</div>
          <div class="stats-label">Mutual</div>
        </div>
        <div class="stats-card">
          <div class="stats-number text-indigo-600">${formatNumber(stats.fans)}</div>
          <div class="stats-label">Your fans</div>
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
        <div class="flex flex-col items-center justify-center py-16 text-center">
          <div class="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p class="text-gray-500">
            ${this.state.searchTerm 
              ? `No users match \"${this.state.searchTerm}\"` 
              : 'No users in this category'}
          </p>
        </div>
      `;
      return;
    }

    const usersHTML = filteredUsers
      .slice(0, 1000) // Limit to 1000 for performance
      .map(username => `
        <div class="user-item group">
          <div class="flex items-center space-x-3">
            <div class="user-avatar">
              ${username.charAt(0).toUpperCase()}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 truncate">@${username}</p>
            </div>
          </div>
          <a href="https://instagram.com/${username}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
             title="View ${username}'s profile">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      `).join('');

    const showingText = filteredUsers.length > 1000 
      ? `Showing first 1,000 of ${formatNumber(filteredUsers.length)} users`
      : `${formatNumber(filteredUsers.length)} user${filteredUsers.length !== 1 ? 's' : ''}`;

    this.elements.usersList.innerHTML = `
      <div class="mb-4 px-2">
        <p class="text-sm font-medium text-gray-600">${showingText}</p>
      </div>
      <div class="space-y-2 max-h-96 overflow-y-auto">${usersHTML}</div>
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
      
      // Update button counts
      if (tab === 'notFollowingBack') {
        const count = this.state.results!.notFollowingBack.length;
        button.innerHTML = `Don't follow back <span class=\"tab-count\">${formatNumber(count)}</span>`;
      } else if (tab === 'mutuals') {
        const count = this.state.results!.mutuals.length;
        button.innerHTML = `Mutual followers <span class=\"tab-count\">${formatNumber(count)}</span>`;
      } else if (tab === 'fans') {
        const count = this.state.results!.fans.length;
        button.innerHTML = `Your fans <span class=\"tab-count\">${formatNumber(count)}</span>`;
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
