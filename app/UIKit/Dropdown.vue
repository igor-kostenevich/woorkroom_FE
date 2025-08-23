<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isDropdownOpened && !hideMask"
      role="button"
      class="fixed inset-0 z-[500] bg-black/40"
      @click="hideDropdown"
    />
  </Transition>

  <!-- Root -->
  <div
    ref="dropdown"
    :class="[
      'relative inline-block w-auto',
      fullwidth && 'block w-full',
      disabled && 'pointer-events-none opacity-40',
      isDropdownOpened && 'z-[501]',
    ]"
    @click="onDropdownClick"
  >
    <!-- Label -->
    <div
      v-if="$slots.label"
      class="mb-1.5 text-sm font-bold leading-6 text-gray"
      @click.stop
    >
      <slot name="label" />
    </div>

    <!-- Trigger -->
    <slot name="trigger">
      <div class="w-full cursor-pointer">
        <slot name="trigger-content">
          <div
            class="flex w-full items-center gap-2 bg-white px-4"
            :class="[
              sizeClasses.trigger,
              isDropdownOpened
                ? [
                    'border border-gray-accent',
                    isMobile
                      ? 'rounded-[14px]'
                      : opensDown
                        ? 'rounded-tl-[14px] rounded-tr-[14px]'
                        : 'rounded-bl-[14px] rounded-br-[14px]',
                  ]
                : 'rounded-[14px]',
            ]"
          >
            <Icon v-if="icon" :type="icon" :size="20" />
            <div
              v-if="triggerImg"
              class="relative h-[30px] w-[30px] min-w-[30px] overflow-hidden rounded-full"
            >
              <img
                class="absolute h-full w-full"
                :src="triggerImg"
                alt="image"
              />
            </div>
            <div
              class="relative flex-1 truncate text-left"
              :class="isSelected ? 'font-bold text-dark' : 'text-gray'"
            >
              <span :style="{ opacity: search.length ? 0 : 1 }">{{
                triggerText
              }}</span>
              <input
                v-if="searchField && !isMobile"
                ref="searchInput"
                v-model="search"
                type="text"
                class="absolute inset-0 w-full bg-transparent outline-none"
              />
            </div>

            <button
              v-if="!hideClearBtn && isSelected"
              type="button"
              class="-mr-1 grid h-10 w-10 place-items-center text-gray-500 transition-colors hover:text-black"
              @click.stop="onSelectOption()"
            >
              <Icon type="close" :size="20" />
            </button>

            <ClientOnly>
              <Icon
                class="transition-transform duration-200"
                :class="isDropdownOpened ? 'rotate-180' : ''"
                type="chevron-down"
              />
            </ClientOnly>
          </div>
        </slot>
      </div>
    </slot>
    <client-only>
      <Teleport to="#teleports">
        <Transition
          appear
          :enter-active-class="
            isMobile ? 'transition duration-300' : 'transition duration-0'
          "
          :enter-from-class="
            isMobile ? 'opacity-0 translate-y-2' : 'opacity-0 scale-95'
          "
          :enter-to-class="
            isMobile ? 'opacity-100 translate-y-0' : 'opacity-100 scale-100'
          "
          :leave-active-class="
            isMobile ? 'transition duration-300' : 'transition duration-0'
          "
          :leave-from-class="
            isMobile ? 'opacity-100 translate-y-0' : 'opacity-100 scale-100'
          "
          :leave-to-class="
            isMobile ? 'opacity-0 translate-y-2' : 'opacity-0 scale-95'
          "
        >
          <div
            v-if="isDropdownOpened"
            ref="dropdownContent"
            :class="[
              'z-[600] flex flex-col bg-white',
              isMobile ? 'fixed inset-x-0 bottom-0' : '',
              sizeClasses.panel,
              hideDropdownContentStyles && 'bg-transparent p-0 shadow-none',
            ]"
            :style="{
              maxHeight: isMobile ? 'calc(100vh - 60px)' : maxHeight + 'px',
              minWidth: minWidth + 'px',
            }"
          >
            <div class="flex-1 overflow-y-auto">
              <slot name="content" :close="hideDropdown">
                <div :class="['flex flex-col gap-1', sizeClasses.menu]">
                  <div
                    v-if="search.length && !filteredOptions.length"
                    class="flex flex-col items-center gap-2 py-20 text-center text-dark"
                  >
                    <Icon name="search" :size="32" />
                    <span class="text-sm text-dark">{{
                      $t('Nothing found')
                    }}</span>
                    <span class="text-xs text-dark">{{
                      $t('Make sure its typed correctly')
                    }}</span>
                  </div>

                  <button
                    v-for="(option, index) in filteredOptions"
                    :key="index"
                    type="button"
                    class="flex w-full items-center gap-2 rounded-xl text-left transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    :class="[
                      sizeClasses.item,
                      {
                        'bg-primary-opacity': value === options.indexOf(option),
                        'hover:bg-light-secondary': !option.disabled,
                      },
                    ]"
                    :disabled="option.disabled"
                    @click="onSelectOption(option)"
                  >
                    <slot name="option" :option="option" :index="index">
                      <Icon v-if="option.icon" :type="option.icon" :size="16" />
                      <div
                        v-if="option.image"
                        class="relative h-6 w-6 overflow-hidden rounded-full"
                      >
                        <img
                          class="absolute h-full w-full"
                          :src="option.image"
                          alt="image"
                        />
                      </div>
                      <span
                        class="flex-1 truncate"
                        :class="
                          value === options.indexOf(option)
                            ? 'font-bold text-dark'
                            : 'text-gray'
                        "
                      >
                        {{ option[labelField] }}
                      </span>
                      <!-- <Icon
                        v-if="value === options.indexOf(option)"
                        class="shrink-0"
                        name="checked"
                      /> -->
                    </slot>
                  </button>
                </div>
              </slot>
            </div>

            <Input
              v-if="searchField && isMobile"
              ref="searchInput"
              v-model="search"
              placeholder="Search"
              icon="search"
              type="text"
              class="border-t"
            />
          </div>
        </Transition>
      </Teleport>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useElementSize, useScrollLock } from '@vueuse/core';
import useApp from '@/composables/useApp';
import type {
  autoUpdate as AutoUpdate,
  type Placement,
} from '@floating-ui/dom';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));

defineOptions({ name: 'DropDown', inheritAttrs: false });

const emit = defineEmits(['update:modelValue', 'on-select', 'on-close']);

type TDropdownOption = {
  label: string;
  [key: string]: any;
};

type TDropDownListProps = {
  options?: TDropdownOption[];
  modelValue?: number | null;
  size?: 'lg' | 'md';
  placement?:
    | 'top'
    | 'bottom'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';
  icon?: string;
  hideClearBtn?: boolean;
  minHeight?: number;
  maxHeight?: number;
  fullwidth?: boolean;
  labelField?: string;
  valueField?: string;
  searchField?: string;
  placeholder?: string;
  disabled?: boolean;
  dontShowMask?: boolean;
  hideMask?: boolean;
  hideDropdownContentStyles?: boolean;
  minWidth?: number;
};

const props = withDefaults(defineProps<TDropDownListProps>(), {
  options: () => [],
  placement: 'bottom',
  hideClearBtn: false,
  size: 'md',
  fullwidth: false,
  minHeight: 100,
  maxHeight: 254,
  labelField: 'label',
  valueField: 'value',
  placeholder: 'placeholder',
  disabled: false,
  dontShowMask: false,
  hideMask: false,
  hideDropdownContentStyles: false,
  minWidth: 0,
});

const { isAppFullyLoaded, isMobile } = useApp();
const slots = useSlots();

const value = defineModel<number | null>();
const observer = ref<IntersectionObserver | null>(null);
const dropdown = useTemplateRef<HTMLElement>('dropdown');
const dropdownContent = useTemplateRef<HTMLElement>('dropdownContent');
const searchInput = useTemplateRef<HTMLInputElement>('searchInput');
const isDropdownOpened = ref(false);
const isLocked = useScrollLock(document);
const search = ref<string>('');

const resolvedPlacement = ref<Placement>(props.placement);
const placementBase = computed(
  () => (resolvedPlacement.value || 'bottom').split('-')[0]
);
const opensUp = computed(() => placementBase.value === 'top');
const opensDown = computed(() => placementBase.value === 'bottom');

const isSelected = computed(
  () => Number.isInteger(value.value) && value.value! in props.options
);

const triggerText = computed(() => {
  if (isSelected.value)
    return props.options?.[value.value!]?.[
      props.labelField as keyof TDropdownOption
    ] as any;
  return props.placeholder;
});

const triggerImg = computed(() => {
  if (isSelected.value) return props.options?.[value.value!]?.image as any;
  return null;
});

const filteredOptions = computed(() => {
  const searchString = search.value.trim();
  if (searchString && props.searchField) {
    return props.options.filter((item) =>
      String(item[props.searchField!])
        .toLowerCase()
        .includes(searchString.toLowerCase())
    );
  }
  return props.options;
});

const { width: dropdownWidth } = useElementSize(dropdown);

function roundByDPR(n: number) {
  const dpr = window?.devicePixelRatio || 1;
  return Math.round(n * dpr) / dpr;
}

let cleanupAutoUpdateFn: ReturnType<typeof AutoUpdate> | undefined;
let updatePositionFn: (() => void) | null = null;
let autoUpdateFn: typeof import('@floating-ui/vue').autoUpdate | null = null;

onMounted(async () => {
  if (!isMobile.value) {
    while (!isAppFullyLoaded.value) {
      await new Promise((r) => setTimeout(r, 250));
    }

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initFloatingUi();
          if (dropdown.value) observer.value?.unobserve(dropdown.value);
        }
      });
    });

    if (dropdown.value) observer.value.observe(dropdown.value);
  }
});

onBeforeUnmount(() => {
  cleanupAutoUpdateFn?.();
  stopClickOutsideFn?.();
  if (dropdown.value) observer.value?.unobserve(dropdown.value);
});

async function initFloatingUi() {
  const { computePosition, autoUpdate, offset, flip, hide, size } =
    await import('@floating-ui/vue');

  const SCREEN_PADDING = 8; // Padding around the screen edges
  const DISTANCE_TO_TRIGGER = 0; // Initialize with a default value

  autoUpdateFn = autoUpdate;

  updatePositionFn = () => {
    computePosition(dropdown.value!, dropdownContent.value!, {
      placement: props.placement,
      middleware: [
        flip({ fallbackStrategy: 'initialPlacement' }),
        offset(({ placement }) => {
          const opensUp = placement.startsWith('top');
          const hasLabel = !!slots.label;
          return opensUp && hasLabel
            ? DISTANCE_TO_TRIGGER - 30
            : DISTANCE_TO_TRIGGER;
        }),
        size({
          padding: SCREEN_PADDING,
          apply({ availableWidth, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${Math.max(0, availableWidth)}px`,
              maxHeight: `${Math.max(props.minHeight, Math.min(props.maxHeight, availableHeight))}px`,
            });
          },
        }),
        hide({
          strategy: 'referenceHidden',
          padding: 0,
        }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      resolvedPlacement.value = placement;

      Object.assign(dropdownContent.value!.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
        width: ['top', 'bottom'].includes(props.placement)
          ? dropdownWidth.value + 'px'
          : 'auto',
        visibility: middlewareData?.hide?.referenceHidden
          ? 'hidden'
          : 'visible',
      });
    });
  };
}

let stopClickOutsideFn: (() => void) | null = null;

function onDropdownClick() {
  if (isDropdownOpened.value) hideDropdown();
  else openDropdown();
}

function openDropdown() {
  isDropdownOpened.value = true;

  if (props.searchField) {
    nextTick(() => searchInput.value?.focus());
  }

  nextTick(() => {
    if (isMobile.value) {
      isLocked.value = true;
    } else if (
      autoUpdateFn &&
      dropdown.value &&
      dropdownContent.value &&
      updatePositionFn
    ) {
      cleanupAutoUpdateFn = autoUpdateFn(
        dropdown.value,
        dropdownContent.value,
        updatePositionFn
      );
    }

    const stop = onClickOutside(dropdown, () => hideDropdown(), {
      ignore: [dropdown, dropdownContent],
    });
    stopClickOutsideFn = stop;
  });
}

function hideDropdown() {
  if (cleanupAutoUpdateFn) (cleanupAutoUpdateFn as any)();
  stopClickOutsideFn?.();
  stopClickOutsideFn = null;

  search.value = '';

  if (isMobile.value) isLocked.value = false;

  nextTick(() => {
    isDropdownOpened.value = false;
    emit('on-close');
  });
}

function onSelectOption(option?: TDropdownOption) {
  let index: number | null = null;
  if (option) {
    index = props.options.findIndex(
      (item) =>
        String(item[props.labelField]).trim() ===
        String(option[props.labelField]).trim()
    );
  }
  emit('update:modelValue', index);
  emit('on-select', index);
  hideDropdown();
}

const sizeClasses = computed(() => {
  return {
    trigger: 'h-[48px] py-1.5',
    panel: isDropdownOpened.value
      ? isMobile.value
        ? 'rounded-tr-[14px] rounded-tl-[14px]'
        : opensUp.value
          ? 'rounded-tr-[14px] rounded-tl-[14px]'
          : 'rounded-br-[14px] rounded-bl-[14px] shadow-xl'
      : 'rounded-[14px]',
    menu: 'p-2',
    item: 'p-3',
  };
});
</script>
