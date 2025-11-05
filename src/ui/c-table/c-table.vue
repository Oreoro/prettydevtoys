<script lang="ts" setup>
import _ from 'lodash';
import type { HeaderConfiguration } from './c-table.types';

const props = withDefaults(defineProps<{ data?: Record<string, unknown>[]; headers?: HeaderConfiguration ; hideHeaders?: boolean; description?: string }>(), { data: () => [], headers: undefined, hideHeaders: false, description: 'Data table' });
const { data, headers: rawHeaders, hideHeaders } = toRefs(props);

const headers = computed(() => {
  if (rawHeaders.value) {
    if (Array.isArray(rawHeaders.value)) {
      return rawHeaders.value.map((value) => {
        if (typeof value === 'string') {
          return { key: value, label: value };
        }

        const { key, label } = value;

        return {
          key,
          label: label ?? key,
        };
      });
    }

    return _.map(rawHeaders.value, (value, key) => ({
      key, label: value,
    }));
  }

  return _.chain(data.value)
    .map(row => Object.keys(row))
    .flatten()
    .uniq()
    .map(key => ({ key, label: key }))
    .value();
});
</script>

<template>
  <div class="relative overflow-x-auto rounded card">
    <table class="table-base" role="table" :aria-label="description">
      <thead v-if="!hideHeaders" class="table-head border-b border-#00e5ff1a">
        <tr>
          <th v-for="header in headers" :key="header.key" scope="col" class="table-cell text-xs">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in data" :key="i" class="table-row border-b border-#00e5ff12"
          :class="{ 'important:border-b-none': i === data.length - 1 }"
        >
          <td v-for="header in headers" :key="header.key" class="table-cell">
            <slot :name="header.key" :row="row" :headers="headers" :value="row[header.key]">
              {{ row[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
