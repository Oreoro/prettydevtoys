<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

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
  <div class="tool-layout">
    <div class="tool-shell">
      <header class="tool-header">
        <div class="tool-header__left">
          <span v-if="toolCategory" class="tool-header__badge">
            {{ toolCategory }}
          </span>

          <h1>{{ toolTitle }}</h1>
          <p>{{ toolDescription }}</p>
        </div>
      </header>

      <section class="tool-content">
        <slot />
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tool-layout {
  min-height: 100vh;
  padding: 32px clamp(24px, 6vw, 64px) 80px;
  background: var(--color-background);
  background-image: var(--gradient-surface);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.tool-shell {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 960px;
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px;
  border-radius: var(--radius-lg);
  background: var(--gradient-primary), var(--surface-card);
  border: 1px solid var(--color-card-border);
}

.dark .tool-header {
  background: var(--gradient-primary), var(--surface-card);
  border-color: var(--color-card-border);
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
  color: var(--color-text);
  background: rgba(var(--hex-opal-rgb), 0.6);
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--color-border-light);
}

.dark .tool-header__badge {
  color: var(--color-text);
  background: rgba(var(--hex-opal-rgb), 0.12);
}

.tool-header__left h1 {
  margin: 0;
  font-size: clamp(28px, 3.4vw, 40px);
  font-weight: 600;
  /* Force strong black headline for tools */
  color: #000000;
}

.tool-header__left p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  /* Force strong black subheadline/description for tools */
  color: #000000;
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
  border: 1px solid var(--color-card-border-inner);
  padding: 20px;
  background: var(--surface-card);
  box-shadow: var(--shadow-sm);
}

.dark .tool-content :deep(> *) {
  background: var(--surface-card);
  border-color: var(--color-card-border-inner);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 640px) {
  .tool-layout {
    padding: 20px 14px 64px;
  }

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
