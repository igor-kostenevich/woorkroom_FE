<template>
  <Combobox v-model="selectedOption" :by="byComparer">
    <div
      class="relative w-full"
      :class="{ 'pointer-events-none opacity-40': disabled }"
    >
      <!-- Top texts passthrough -->
      <slot name="topTextLeft" />
      <slot name="topTextRight" />

      <Input
        ref="inputRef"
        v-bind="$attrs"
        v-model="query"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :icon="icon"
        :hide-clear-btn="hideClearBtn"
        @focusin="onFocus"
        @focusout="onBlur"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.esc.prevent="closeDropdown"
        @on-clear="handleClear"
      />

      <!-- Dropdown -->
      <TransitionRoot
        :show="open"
        enter="transition ease-out duration-100"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <ComboboxOptions
          static
          class="absolute z-50 mt-1 max-h-80 w-full overflow-hidden rounded-[14px] border border-gray-200 bg-white shadow-lg focus:outline-none"
        >
          <li v-if="loading" class="px-3 py-2 text-sm text-gray">
            {{ $t('Loading') }}
          </li>
          <li v-else-if="error" class="px-3 py-2 text-sm text-red">
            {{ error }}
          </li>
          <li
            v-else-if="!filteredOptions.length"
            class="px-3 py-2 text-sm text-gray"
          >
            <slot name="noResults">{{ $t('noResults') }}</slot>
          </li>

          <!-- Options -->
          <template v-else>
            <ComboboxOption
              v-for="(opt, idx) in filteredOptions"
              :key="getKey(opt, idx)"
              v-slot="{ active, selected }"
              :value="opt"
              as="template"
            >
              <li
                class="flex cursor-pointer items-center px-3 py-2 text-sm"
                :class="{
                  'bg-gray-100 text-dark': active,
                  'text-gray': !active,
                }"
                @mouseenter="setActive(idx)"
                @mouseleave="setActive(-1)"
                @mousedown.prevent
                @click="selectOption(opt)"
              >
                <slot
                  name="option"
                  :option="opt"
                  :index="idx"
                  :active="active"
                  :selected="selected"
                  :query="query"
                >
                  <div class="flex w-full items-center justify-between gap-2">
                    <span
                      class="truncate"
                      v-html="highlight(labelOf(opt), query)"
                    />
                    <Icon v-if="selected" type="checked" :size="16" />
                  </div>
                </slot>
              </li>
            </ComboboxOption>
          </template>
        </ComboboxOptions>
      </TransitionRoot>

      <span
        v-if="$slots.errorMessage"
        class="ml-4 mt-1 block text-xs font-semibold leading-[18px] text-red"
      >
        <slot name="errorMessage" />
      </span>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { useDebounceFn } from '@vueuse/core';
import Input from '@/UIKit/Input.vue';
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

defineOptions({ inheritAttrs: false });

type TOption = Record<string, any> | string | number;

interface Props {
  /** v-model: selected value (object or primitive — see returnObject & getValue) */
  modelValue?: any;
  options?: TOption[];
  search?: (q: string) => Promise<TOption[]>;
  getLabel?: (o: TOption) => string;
  getValue?: (o: TOption) => any;
  by?: string | ((a: any, b: any) => boolean);
  returnObject?: boolean;

  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  icon?: string | null;
  hideClearBtn?: boolean;
  minChars?: number;
  debounce?: number;
  openOnFocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  getLabel: (o: TOption) =>
    typeof o === 'string' || typeof o === 'number'
      ? String(o)
      : (o?.label ?? ''),
  getValue: (o: TOption) =>
    typeof o === 'string' || typeof o === 'number' ? o : (o?.value ?? o),
  by: undefined,
  returnObject: false,
  disabled: false,
  readonly: false,
  icon: null,
  hideClearBtn: false,
  minChars: 0,
  debounce: 200,
  openOnFocus: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: any): void;
  (e: 'select', option: TOption): void;
  (e: 'open' | 'close'): void;
  (e: 'error', message: string): void;
}>();

// ----- Internal state -----
const inputRef = ref<{ handleFocus: () => void } | null>(null);
const query = ref('');
const open = ref(false);
const loading = ref(false);
const error = ref('');
const activeIndex = ref(-1);
const isCleared = ref(false);
let blurTimer: ReturnType<typeof setTimeout> | null = null;

const selectedOption = computed({
  get: () => {
    if (props.returnObject) return props.modelValue;
    const val = props.modelValue;
    const found = allOptions.value.find((o) => props.getValue(o) === val);
    return found ?? null;
  },
  set: (o: any) => {
    const out = props.returnObject ? o : o ? props.getValue(o) : null;
    emit('update:modelValue', out);
  },
});

const byComparer = computed(() => props.by || undefined);

// ----- Options source -----
const remoteOptions = ref<TOption[]>([]);
const allOptions = computed(() =>
  props.search ? remoteOptions.value : props.options
);

const filteredOptions = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q || props.search) return allOptions.value;
  return allOptions.value.filter((o) => labelOf(o).toLowerCase().includes(q));
});

const labelOf = (o: TOption) => props.getLabel(o);
const getKey = (o: TOption, idx: number) => {
  const v = props.getValue(o);
  return typeof v === 'object' ? idx : String(v);
};

// ----- Open/Close -----
function onFocus() {
  if (!props.openOnFocus) return;
  openDropdown();
}

function openDropdown() {
  if (props.disabled || props.readonly) return;
  if (blurTimer) {
    clearTimeout(blurTimer);
    blurTimer = null;
  }
  if (!open.value) {
    open.value = true;
    emit('open');
    if (!isCleared.value && !query.value && selectedOption.value) {
      query.value = labelOf(selectedOption.value);
    }
    isCleared.value = false;
    queueFetch();
  }
}

function closeDropdown() {
  if (open.value) {
    open.value = false;
    activeIndex.value = -1 as number;
    (debouncedSearch as any).cancel?.();
    emit('close');
  }
}

function onBlur() {
  if (blurTimer !== null) clearTimeout(blurTimer);
  blurTimer = setTimeout(() => {
    closeDropdown();
  }, 120);
}

// ----- Keyboard nav -----
function setActive(i: number) {
  activeIndex.value = i;
}
function onArrowDown() {
  if (!open.value) openDropdown();

  nextTick(() => {
    const max = filteredOptions.value.length - 1;
    activeIndex.value = activeIndex.value < max ? activeIndex.value + 1 : 0;
  });
}
function onArrowUp() {
  if (!open.value) openDropdown();

  nextTick(() => {
    const max = filteredOptions.value.length - 1;
    activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : max;
  });
}
function onEnter() {
  if (!open.value) return;
  const o = filteredOptions.value[activeIndex.value];
  if (o) selectOption(o);
}

// ----- Select -----
function selectOption(o: TOption) {
  selectedOption.value = o as any;
  query.value = labelOf(o);

  emit('select', o);
  closeDropdown();
}

function handleClear() {
  isCleared.value = true;
  query.value = '';
  selectedOption.value = null as any;
  remoteOptions.value = [];
  loading.value = false;
  error.value = '';
}

let reqId = 0;
const fetchOptions = async () => {
  if (!props.search) return;
  const q = query.value.trim();

  if (q.length < props.minChars) {
    remoteOptions.value = [];
    loading.value = false;
    return;
  }

  const my = ++reqId;
  loading.value = true;
  error.value = '';

  try {
    const res = await props.search!(q);
    if (my !== reqId) return;
    remoteOptions.value = Array.isArray(res) ? res : [];
    activeIndex.value = remoteOptions.value.length ? 0 : -1;
  } catch (e: any) {
    if (my !== reqId) return;
    error.value = e?.message;

    emit('error', error.value);
  } finally {
    if (my === reqId) loading.value = false;
  }
};

const debouncedSearch = useDebounceFn(fetchOptions, props.debounce);

function queueFetch() {
  if (!props.search) return;
  const q = query.value.trim();

  if (q.length < props.minChars) {
    (debouncedSearch as any).cancel?.();
    remoteOptions.value = [];
    loading.value = false;
    return;
  }

  debouncedSearch();
}

watch(query, () => {
  if (open.value) queueFetch();
});

// ----- Utils -----
function highlight(text: string, q: string) {
  if (!q) return escape(text);
  const escQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return escape(text).replace(new RegExp(`(${escQ})`, 'ig'), '<mark>$1</mark>');
}

function escape(s: string) {
  return s.replace(
    /[&<>"=]/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '=': '&#61;' })[
        c
      ] as string
  );
}

onBeforeUnmount(() => {
  if (blurTimer !== null) {
    clearTimeout(blurTimer);
  }
  (debouncedSearch as any).cancel?.();
});
</script>
