<template>
  <div class="md:overflow-x-auto">
    <table
      class="w-full table-auto border-separate border-spacing-y-4 md:min-w-[1400px]"
    >
      <tbody class="flex flex-col gap-5 md:table-row-group">
        <tr
          v-for="(card, index) in cardsData"
          :key="index"
          class="relative flex flex-wrap gap-6 rounded-3xl bg-white p-5 shadow-sm md:table-row"
        >
          <td
            v-for="(element, ind) in card"
            :key="ind"
            class="bg-white first:w-full first:rounded-l-3xl last:rounded-r-3xl md:table-cell md:px-7 md:py-5 md:first:w-auto"
            :style="{ '--firstElementWidth': firstColumnWidth + 'px' }"
          >
            <div
              :class="[
                {
                  'w-full border-b border-b-gray-accent pb-6 md:w-auto md:min-w-[var(--firstElementWidth)] md:border-0 md:pb-0':
                    ind === 0,
                  'pr-16 md:pr-0': showActionButton && ind === 0,
                },
              ]"
            >
              <component :is="element.componentName" v-bind="element.data" />
            </div>
          </td>
          <td v-if="showActionButton" class="rounded-r-3xl md:px-7 md:py-5">
            <div class="absolute right-6 top-6 flex justify-end md:static">
              <Button color="neutral" size="md" icon-before="more" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { IEntityCardTable } from '~/types/components/entity-card-table';
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

withDefaults(defineProps<IEntityCardTable>(), {
  firstColumnWidth: 100,
  showActionButton: false,
});
</script>
