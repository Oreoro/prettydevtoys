<script setup lang="ts">
import type { Component } from 'vue';

const props = defineProps<{ icon: Component; title: string }>();
const { icon, title } = toRefs(props);
</script>

<template>
  <c-card class="colored-card">
    <n-icon class="icon" size="40" :component="icon" />
    <n-h3 class="title">
      <n-ellipsis>{{ title }}</n-ellipsis>
    </n-h3>

    <div class="description">
      <n-ellipsis :line-clamp="2" :tooltip="false">
        <slot />
      </n-ellipsis>
    </div>
  </c-card>
</template>

<style lang="less" scoped>
.colored-card {
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent) 0%, color-mix(in srgb, var(--neon) 12%, transparent) 100%), var(--surface-card);
  color: var(--color-ink);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-md);
  padding: 22px 20px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% -10%, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 55%);
    mix-blend-mode: screen;
  }

  .icon { opacity: 0.9; filter: drop-shadow(0 10px 20px rgba(0, 229, 255, 0.25)); }

  .title { color: inherit; margin: 0; font-size: 18px; font-weight: 700; }

  .description {
    opacity: 0.92;
    line-height: 1.65;
    font-size: 14px;

    ::v-deep(a) {
      color: inherit;
      text-decoration: underline;
      font-weight: 600;
      transition: color 0.2s var(--transition-snappy);

      &:hover { color: color-mix(in srgb, var(--accent) 30%, var(--color-ink)); }
    }
  }
}

.dark .colored-card { color: var(--color-ink); border-color: var(--surface-border); box-shadow: 0 20px 36px rgba(0, 0, 0, 0.3); }
</style>
