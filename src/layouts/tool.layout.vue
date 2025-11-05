<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const route = useRoute();

const head = computed<HeadObject>(() => ({
  title: `${route.meta.name} - Pretty DevToys`,
  meta: [
    {
      name: 'description',
      content: route.meta?.description as string,
    },
    {
      name: 'keywords',
      content: ((route.meta.keywords ?? []) as string[]).join(','),
    },
  ],
}));
useHead(head);
const { t } = useI18n();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));
const toolCategory = computed(() => route.meta?.category as string | undefined);
</script>

<template>
  <BaseLayout>
    <div class="tool-shell">
      <header class="tool-header">
        <div class="tool-header__left">
          <span v-if="toolCategory" class="tool-header__badge">
            {{ toolCategory }}
          </span>

          <h1>{{ toolTitle }}</h1>
          <p>{{ toolDescription }}</p>
        </div>

        <FavoriteButton class="tool-header__favorite" :tool="{ name: route.meta.name, path: route.path } as Tool" />
      </header>

      <section class="tool-content">
        <slot />
      </section>
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-shell {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--neon) 12%, transparent)), var(--surface-card);
  border: 1px solid var(--surface-border);
}

.dark .tool-header {
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--neon) 10%, transparent)), var(--surface-card);
  border-color: var(--surface-border);
}

.tool-header__left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tool-header__badge {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-ink);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--surface-border);
}

.dark .tool-header__badge {
  color: var(--color-ink);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.tool-header__left h1 {
  margin: 0;
  font-size: clamp(28px, 3.4vw, 40px);
  font-weight: 600;
  color: var(--color-ink);
}

.tool-header__left p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-ink-muted);
  max-width: 60ch;
}

.tool-header__favorite {
  flex-shrink: 0;
}

.tool-content {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.tool-content :deep(> *) {
  border-radius: 18px;
  border: 1px solid var(--surface-border);
  padding: 20px;
  background: var(--surface-card);
  box-shadow: 0 16px 32px rgba(0, 229, 255, 0.12);
}

.dark .tool-content :deep(> *) {
  background: var(--surface-card);
  border-color: var(--surface-border);
  box-shadow: 0 20px 36px rgba(0, 255, 136, 0.14);
}

@media (max-width: 640px) {
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .tool-header__favorite {
    align-self: flex-end;
  }
}
</style>
