<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { RouterLink, useRoute } from 'vue-router';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();

// Flatten all category components into one list
const flatTools = computed<{ name: string; path: string; isActive: boolean }[]>(() => {
  const tools: { name: string; path: string; isActive: boolean }[] = [];
  for (const category of toolsByCategory.value) {
    for (const t of category.components as unknown as Tool[]) {
      tools.push({ name: t.name, path: t.path, isActive: t.path === route.path });
    }
  }
  return tools.sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<template>
  <nav class="tool-menu">
    <ul class="tool-menu__list">
      <li v-for="tool in flatTools" :key="tool.path">
        <RouterLink :to="tool.path" class="tool-menu__link" :class="{ 'is-active': tool.isActive }">
          {{ tool.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="less">
.tool-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-muted);
}

.tool-menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tool-menu__link {
  display: block;
  padding: 10px 14px;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 12px;
  transition: all var(--duration-fast) var(--ease-standard);
  border: 1px solid transparent;
  background: transparent;
  font-weight: 500;
}

.tool-menu__link:hover { 
  color: var(--color-text); 
  background: var(--color-secondary-hover); 
  border-color: var(--color-border);
  transform: translateX(4px);
}

.tool-menu__link.is-active { 
  color: var(--color-primary); 
  font-weight: 600; 
  background: var(--color-primary-light); 
  border-color: var(--color-primary);
}

.tool-menu__link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: var(--focus-ring);
}
</style>
