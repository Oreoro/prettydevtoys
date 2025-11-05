<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
</script>

<template>
  <router-link :to="tool.path" class="tool-card" :aria-label="tool.name">
    <div class="tool-card__header">
      <div class="tool-card__icon">
        <n-icon size="22" :component="tool.icon" />
      </div>

      <div class="tool-card__actions">
        <FavoriteButton :tool="tool" />
      </div>
    </div>

    <h3>{{ tool.name }}</h3>
    <p>{{ tool.description }}</p>
  </router-link>
</template>

<style scoped lang="less">
.tool-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 22px;
  border-radius: 16px;
  position: relative;
  background: var(--surface-card);
  color: inherit;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, outline-color 0.18s ease;
  min-height: 240px;
  border: 1px solid var(--surface-border);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.24);
  border-color: color-mix(in srgb, var(--accent) 30%, var(--surface-border));
}

.tool-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-color: color-mix(in srgb, var(--accent) 40%, var(--surface-border));
}

.tool-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tool-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  display: grid;
  place-items: center;
  color: var(--color-ink);
  background: linear-gradient(135deg, color-mix(in srgb, var(--cyan) 12%, transparent), color-mix(in srgb, var(--neon) 8%, transparent));
}

.tool-card__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.75;
}

.tool-card:hover .tool-card__actions { opacity: 1; }

.tool-card__badge { display: none; }

.tool-card h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: var(--color-ink);
}

.tool-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-ink-muted);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-card__category { display: none; }

.dark .tool-card { background: var(--surface-card); }
.dark .tool-card__icon { color: var(--color-ink); }
.dark .tool-card__badge { color: var(--color-ink); }
.dark .tool-card__category { color: var(--color-ink-muted); }
</style>
