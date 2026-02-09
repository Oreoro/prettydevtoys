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
  padding: 20px 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
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
  gap: 6px;
  color: var(--color-text);
  text-decoration: none;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border-light);
  transition: color var(--duration-fast) var(--ease-standard);
}

.sidebar__brand:hover {
  color: var(--color-primary);
}

.sidebar__brand-name {
  font-weight: 700;
  font-size: 22px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar__brand-sub {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 500;
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
  gap: 10px 12px;
  padding: 12px 16px;
  margin: 8px auto 16px;
  max-width: 1200px;
  align-content: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow-x: auto;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.topbar__tool { display: inline-flex; align-items: center; white-space: nowrap; line-height: 1; }

/* Ensure consistent look for chips even if global shortcut changes */
.topbar__tool.badge {
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .01em;
  text-transform: none;
  border-radius: 999px;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: all var(--duration-fast) var(--ease-standard);
  cursor: pointer;
}

.topbar__tool.badge:hover {
  background: var(--color-secondary-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-1px);
}

/* active route */
.topbar__tool.router-link-active {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
  font-weight: 700;
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
