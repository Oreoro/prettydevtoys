<script lang="ts" setup>
import { useTheme } from './c-card.theme';

const props = defineProps<{
  title?: string
}>();

const { title } = toRefs(props);

const theme = useTheme();
</script>

<template>
  <div class="c-card">
    <div v-if="title" class="c-card-title">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style lang="less" scoped>
.c-card {
  background: v-bind('theme.backgroundColor');
  border: 1px solid v-bind('theme.borderColor');
  border-radius: var(--radius-md);
  padding: 20px 24px;
  box-shadow: var(--shadow-soft);

  &-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px dashed var(--surface-border);
    background-image: linear-gradient(90deg, rgba(255, 107, 214, 0.15), rgba(119, 179, 245, 0.15));
    -webkit-background-clip: text;
    -webkit-text-fill-color: currentColor;
  }
}
</style>
