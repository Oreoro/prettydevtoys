<script lang="ts" setup>
import { computed } from 'vue';
import { NMessageProvider, NNotificationProvider } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { Menu2 } from '@vicons/tabler';
import { storeToRefs } from 'pinia';

import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';
import { useStyleStore } from '@/stores/style.store';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';

const styleStore = useStyleStore();
const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);
const { t } = useI18n();

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);

// Full list of tools for the top chip navigation
const compactTools = computed(() => toolStore.tools);

// Limit chips to reduce clutter, with toggle to expand
const showAllChips = ref(true);
const visibleChips = computed(() => (showAllChips.value ? compactTools.value : compactTools.value.slice(0, 24)));
</script>

<template>
  <MenuLayout>
    <template #sider>
      <div class="sidebar glass-surface">
        <div class="sidebar__inner">
          <RouterLink to="/" class="sidebar__brand">
            <span class="sidebar__brand-name">Pretty DevToys</span>
            <span class="sidebar__brand-sub">{{ $t('home.subtitle') }}</span>
          </RouterLink>

          <div class="sidebar__list pretty-scrollbar">
            <CollapsibleToolMenu :tools-by-category="tools" />
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="page">
        <nav class="topbar__tools pretty-scrollbar container card">
          <RouterLink
            v-for="tool in visibleChips"
            :key="tool.name"
            :to="tool.path"
            class="topbar__tool badge"
          >
            {{ tool.name }}
          </RouterLink>

          <button class="topbar__tool topbar__more btn-ghost" @click="showAllChips = !showAllChips">
            {{ showAllChips ? 'Show less' : 'Show more' }}
          </button>
        </nav>

        <main class="page__content pretty-scrollbar container">
          <slot />
        </main>
      </div>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.sidebar {
  height: 100%;
  padding: 18px 16px;
  background: var(--gradient-sidebar);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-lg);
}

.sidebar__inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar__brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--color-ink);
  text-decoration: none;
}

.sidebar__brand-name {
  font-weight: 700;
  font-size: 20px;
}

.sidebar__brand-sub {
  font-size: 13px;
  color: var(--color-ink-muted);
}

.dark .sidebar__brand {
  color: #f4f6ff;
}

.sidebar__list {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100%;
}

/* topbar (chips row) */
.topbar__tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  padding: 8px 12px;
  margin: 6px auto 12px;
  max-width: 1200px;
  align-content: flex-start;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 6px 18px rgba(0,0,0,0.24);
  overflow-x: auto;
}

.topbar__tool { display: inline-flex; align-items: center; white-space: nowrap; line-height: 1; }

/* Ensure consistent look for chips even if global shortcut changes */
.topbar__tool.badge {
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .02em;
  text-transform: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid var(--surface-border);
  color: var(--color-ink);
  backdrop-filter: saturate(1.1) blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.topbar__tool.badge:hover {
  background: color-mix(in srgb, var(--accent) 10%, rgba(255,255,255,0.35));
}

/* active route */
.topbar__tool.router-link-active {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border-color: color-mix(in srgb, var(--accent) 45%, var(--surface-border));
}

.topbar__more { background: transparent; cursor: pointer; }

.page__content { flex: 1; padding-bottom: 40px; }

@media (max-width: 900px) {
  .topbar__menu { display: inline-flex; }
  .topbar__right { justify-self: flex-end; }
}

@media (max-width: 600px) {
  .topbar { padding: 8px 12px; }
  .topbar__right { gap: 8px; }
  .topbar__locale { display: none; }
}
</style>
