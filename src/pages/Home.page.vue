<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useHead } from '@vueuse/head';
import { storeToRefs } from 'pinia';

import ToolCard from '../components/ToolCard.vue';
import type { Tool } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';

const { t } = useI18n();

useHead({ title: 'Pretty DevToys - Handy online tools for developers' });

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const searchTerm = ref('');
const searchRef = ref<HTMLInputElement | null>(null);
const normalizedSearch = computed(() => searchTerm.value.trim().toLowerCase());

const filteredTools = computed<Tool[]>(() => {
  const term = normalizedSearch.value;
  const pool = toolStore.tools;
  if (!term) return pool;

  return pool.filter(tool => {
    const content = [
      tool.name,
      tool.description,
      tool.category,
      ...(tool.keywords ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return content.includes(term);
  });
});

const groupedTools = computed(() => {
  if (!normalizedSearch.value) {
    return toolsByCategory.value.map(category => ({
      name: category.name,
      items: category.components,
    }));
  }

  const matches = new Set(filteredTools.value.map(tool => tool.path));

  return toolsByCategory.value
    .map(category => ({
      name: category.name,
      items: category.components.filter(tool => matches.has(tool.path)),
    }))
    .filter(category => category.items.length > 0);
});

const resultSummary = computed(() => t('search.results', { count: filteredTools.value.length }));
const hasResults = computed(() => filteredTools.value.length > 0);
const showFavorites = computed(() => !normalizedSearch.value && favoriteTools.value.length > 0);

// Compact mode: categories collapsed and cards condensed by default
const compact = ref(false);

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const el = searchRef.value as unknown as HTMLInputElement | undefined;
      if (el) {
        e.preventDefault();
        // n-input renders an internal input; focus the underlying input if available
        // @ts-ignore - access overlayed input element
        const inputEl = (el?.$el?.querySelector?.('input')) as HTMLInputElement | null;
        (inputEl ?? (el as unknown as HTMLElement))?.focus();
      }
    }
  };
  window.addEventListener('keydown', onKey);
  // store disposer on instance
  // @ts-ignore
  window.__homeOnKey = onKey;
});

onBeforeUnmount(() => {
  // @ts-ignore
  const onKey = window.__homeOnKey as ((e: KeyboardEvent) => void) | undefined;
  if (onKey) window.removeEventListener('keydown', onKey);
});
</script>

<template>
  <div class="home">
    <div class="home__controls">
      <c-button size="small" @click="compact = !compact">{{ compact ? 'Expand all' : 'Compact all' }}</c-button>
    </div>

    <section v-if="showFavorites" class="home__section glass-surface">
      <header class="home__section-header">
        <h2>{{ $t('home.categories.favoriteTools') }}</h2>
      </header>

      <div class="tool-grid">
        <ToolCard v-for="tool in favoriteTools" :key="tool.name" :tool="tool" />
      </div>
    </section>

    <section class="home__section glass-surface">
      <header class="home__section-header">
        <h2>
          {{ normalizedSearch ? $t('search.label') : $t('home.categories.allTools') }}
        </h2>
      </header>

      <template v-if="hasResults">
        <details v-for="{ name, items } in groupedTools" :key="name" class="home__group" :open="!compact">
          <summary class="home__group-header">
            <span class="home__group-chip" :data-category="name">{{ name }}</span>
            <span class="home__group-length">{{ items.length }}</span>
          </summary>
          <div class="tool-grid" :class="{ compact }">
            <ToolCard v-for="tool in items" :key="tool.name" :tool="tool" />
          </div>
        </details>
      </template>

      <div v-else class="home__empty">
        <p>{{ $t('search.noResults', { term: searchTerm }) }}</p>
        <c-button variant="text" @click="searchTerm = ''">
          {{ $t('search.clear') }}
        </c-button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.home { display: flex; flex-direction: column; gap: 24px; }

.home__controls { display: flex; justify-content: flex-end; }


/* hero removed */

.home__intro {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home__intro h1 {
  margin: 0;
  font-size: clamp(30px, 4.6vw, 40px);
  font-weight: 700;
  color: var(--color-ink);
}

.home__intro p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-ink-muted);
  max-width: 56ch;
}

.home__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 107, 214, 0.25), rgba(107, 214, 255, 0.25));
  color: var(--color-ink);
  font-size: 13px;
  font-weight: 600;
}

.dark .home__chip { color: var(--color-ink); }

.home__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.home__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
  padding: 10px 12px;
  border-radius: 14px;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
}

.home__stat-value {
  font-weight: 700;
  font-size: 22px;
  color: var(--color-ink);
}

.home__stat-label {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

.dark .home__stat {
  background: rgba(13, 18, 18, 0.6);
}

.home__search-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--surface-border);
  box-shadow: none;
  background: var(--surface-card);
}

.home__search-card header,
.home__search-card footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-ink-muted);
}
.home__shortcuts {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dark .home__search-card { border-color: var(--surface-border); }

.home__search-card :deep(.n-input) {
  border-radius: 14px;
}

.home__search-count {
  font-weight: 600;
}

.home__kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 24px;
  padding: 0 6px;
  border-radius: 6px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  font-size: 12px;
  font-weight: 600;
}

.dark .home__kbd {
  border-color: rgba(232, 236, 255, 0.2);
  color: #f4f6ff;
}

.home__section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 24px 28px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  box-shadow: var(--shadow-soft);
}

.dark .home__section { background: var(--surface-card); }

.home__section-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-ink);
}

.home__group {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.home__group-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Show custom arrows for category disclosure */
details.home__group > summary.home__group-header {
  list-style: none; /* hide default marker */
  cursor: pointer;
  position: relative;
  padding-left: 18px;
}
details.home__group > summary.home__group-header::-webkit-details-marker { display: none; }
details.home__group > summary.home__group-header::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--color-ink);
  border-bottom: 2px solid var(--color-ink);
  transform: translateY(-50%) rotate(-45deg);
  transition: transform 0.18s var(--transition-snappy);
}
details.home__group[open] > summary.home__group-header::before {
  transform: translateY(-50%) rotate(45deg);
}

.home__group-chip {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--chip-bg);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.home__group-length {
  font-size: 12px;
  color: var(--color-ink-muted);
}

.dark .home__group-chip { color: var(--color-ink); }

/* Crypto category color */
.home__group-chip[data-category="Crypto"] {
  background: linear-gradient(90deg, rgba(19, 80, 88, 0.35), rgba(119, 179, 245, 0.35));
  border: 1px solid rgba(19, 80, 88, 0.45);
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 1200px) {
  .tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .tool-grid {
    grid-template-columns: 1fr;
  }
}

.tool-grid.compact { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
@media (max-width: 1400px) { .tool-grid.compact { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 900px) { .tool-grid.compact { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .tool-grid.compact { grid-template-columns: 1fr; } }

.tool-grid.compact :deep(.tool-card) { min-height: 140px; padding: 16px; }
.tool-grid.compact :deep(.tool-card p) { display: none; }

.home__empty {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  padding: 24px;
  border: 1px dashed rgba(31, 36, 50, 0.16);
  border-radius: 16px;
  color: var(--color-ink-muted);
}

.dark .home__empty {
  border-color: rgba(232, 236, 255, 0.16);
}

@media (max-width: 640px) {
  .home {
    gap: 24px;
  }

  .home__hero {
    padding: 24px;
  }
}
</style>
