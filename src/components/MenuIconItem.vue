<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool }>();
const { tool } = toRefs(props);

const theme = useThemeVars();
</script>

<template>
  <div class="menu-icon-item">
    <n-icon :component="tool.icon" />
    <div v-if="tool.isNew" class="badge" />
  </div>
</template>

<style lang="less" scoped>
.menu-icon-item {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(159, 246, 255, 0.12);
  color: var(--color-ink-muted);
  transition: transform 0.24s var(--transition-snappy);

  :deep(.n-icon) {
    font-size: 20px;
  }

  &:hover {
    transform: translateY(-2px);
  }

  .badge {
    position: absolute;
    background-color: v-bind('theme.primaryColor');
    border-radius: 10px;
    line-height: 1;
    top: 4px;
    right: 4px;
    font-size: 10px;
    height: 6px;
    width: 6px;
  }
}

.dark .menu-icon-item {
  background: rgba(189, 178, 255, 0.18);
  color: #e8ecff;
}
</style>
