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
  gap: 14px;
  padding: 24px;
  border-radius: 16px;
  position: relative;
  background: var(--color-surface);
  color: inherit;
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-standard);
  min-height: 240px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
  background: var(--color-surface-alt);
}

.tool-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.tool-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tool-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  padding: 2px;
  border: none;
  background:
    radial-gradient(circle at 0% 0%, var(--hex-rose-quartz), transparent 55%),
    radial-gradient(circle at 100% 100%, var(--hex-jade), transparent 55%),
    var(--gradient-primary);
  display: grid;
  place-items: center;
  color: var(--color-primary);
  transition: all var(--duration-fast) var(--ease-standard);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
}

.tool-card:hover .tool-card__icon {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24);
}

.tool-card__icon :deep(svg) {
  width: 22px;
  height: 22px;
  border-radius: 12px;
  padding: 6px;
  background: var(--color-surface);
  color: #000000;
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
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  transition: color var(--duration-fast) var(--ease-standard);
}

.tool-card:hover h3 {
  color: var(--color-primary);
}

.tool-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-card__category { display: none; }
</style>
