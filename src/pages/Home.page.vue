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
  <div class="home home--minimal">
    <section class="home__hero glass-surface">
      <header class="home__hero-header">
        <h1>Pretty DevToys</h1>
        <p>{{ $t('home.subtitle') }}</p>
      </header>
      <div class="home__search">
        <n-input
          ref="searchRef"
          v-model:value="searchTerm"
          size="large"
          round
          :placeholder="$t('search.placeholder')"
          clearable
        />
      </div>
      <div v-if="normalizedSearch && filteredTools.length" class="home__results">
        <h2 class="home__results-title">
          {{ $t('search.results', { count: filteredTools.length }) }}
        </h2>
        <div class="home__results-grid">
          <ToolCard v-for="tool in filteredTools.slice(0, 9)" :key="tool.name" :tool="tool" />
        </div>
      </div>
      <p v-else class="home__hero-hint">
        Start typing to search tools, or pick one from the colorful bar above.
      </p>
    </section>
  </div>
</template>

<style scoped lang="less">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 12px;
}

.home__hero {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 24px 28px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.home__hero-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.home__hero-header h1 {
  margin: 0;
  font-size: clamp(30px, 4vw, 40px);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home__hero-header p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.home__hero-hint {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--color-text-muted);
}

.home__search {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.home__search :deep(.n-input) {
  max-width: 420px;
  width: 100%;
}

.home__search-hint {
  font-size: 12px;
  color: var(--color-text-muted);
}

.home__search-hint kbd {
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--color-border-light);
  font-size: 11px;
}

.home__results {
  margin-top: 24px;
  text-align: left;
}

.home__results-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-text);
}

.home__results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

@media (max-width: 640px) {
  .home__hero {
    padding: 20px 18px 24px;
  }
}


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
  gap: 24px;
  padding: 28px 28px 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: box-shadow var(--duration-normal) var(--ease-standard);
}

.home__section:hover {
  box-shadow: var(--shadow-md);
}

.home__section-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  border-right: 2px solid var(--color-text);
  border-bottom: 2px solid var(--color-text);
  transform: translateY(-50%) rotate(-45deg);
  transition: transform var(--duration-normal) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard);
}

details.home__group[open] > summary.home__group-header::before {
  transform: translateY(-50%) rotate(45deg);
  border-color: var(--color-primary);
}

.home__group-chip {
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--color-secondary);
  border: 1px solid var(--color-border);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  transition: all var(--duration-fast) var(--ease-standard);
}

details.home__group[open] > summary.home__group-header .home__group-chip {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.home__group-length {
  font-size: 12px;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* Category-specific colors - Hex Beautiful Jewel Tones */
.home__group-chip[data-category="Crypto"] {
  background: rgba(var(--hex-sugilite-rgb), 0.15);
  border-color: rgba(var(--hex-sugilite-rgb), 0.3);
  color: var(--hex-sugilite);
}

.home__group-chip[data-category="Text"] {
  background: rgba(var(--hex-amethyst-rgb), 0.15);
  border-color: rgba(var(--hex-amethyst-rgb), 0.3);
  color: var(--hex-amethyst);
}

.home__group-chip[data-category="Converters"] {
  background: rgba(var(--hex-jade-rgb), 0.15);
  border-color: rgba(var(--hex-jade-rgb), 0.3);
  color: var(--hex-jade);
}

.home__group-chip[data-category*="Generator"] {
  background: rgba(var(--hex-citrine-rgb), 0.15);
  border-color: rgba(var(--hex-citrine-rgb), 0.3);
  color: var(--hex-citrine);
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
  gap: 16px;
  align-items: flex-start;
  padding: 32px;
  border: 2px dashed var(--color-border);
  border-radius: 16px;
  color: var(--color-text-muted);
  background: var(--color-surface-alt);
  text-align: center;
  width: 100%;
  align-items: center;
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
