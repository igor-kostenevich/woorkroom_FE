/**
 * Source - https://github.com/jongmin4943/vue3-directive-number/blob/master/index.ts
 */

interface DirectiveBinding {
  value: { min: number; max: number; allowStartZero: boolean };
  modifiers: { minus: boolean; point: boolean };
}

export interface DirectiveNumber {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => void;
  beforeUnmount: (el: HTMLElement) => void;
}

type EventTypes = 'key' | 'input' | 'blur';
const listeners = new Map<HTMLElement, Record<EventTypes, EventListener>>();
const selections = new Map<HTMLElement, number>();
const prevCommaCount = new Map<HTMLElement, number>();

const DirectiveNumber: DirectiveNumber = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    validBinding(binding);

    const keyListener = (e: Event) => keyEvent(e, binding);
    const inputListener = (e: Event) => inputEvent(e, binding);
    const blurListener = (e: Event) => blurEvent(e, binding);

    listeners.set(el, {
      key: keyListener,
      input: inputListener,
      blur: blurListener,
    });

    prevCommaCount.set(el, 0);

    el.addEventListener('keydown', keyListener);
    el.addEventListener('input', inputListener);

    if (['INPUT', 'TEXTAREA'].includes(el.tagName)) {
      el.addEventListener('blur', blurListener);
    } else {
      const inputElement = el.getElementsByTagName('input').item(0);
      const textAreaElement = el.getElementsByTagName('textarea').item(0);
      if (inputElement) {
        inputElement.addEventListener('blur', blurListener);
      } else if (textAreaElement) {
        textAreaElement.addEventListener('blur', blurListener);
      } else {
        throw 'v-number must apply to input type of tag';
      }
    }
  },

  beforeUnmount: (el: HTMLElement) => {
    const addedListeners = listeners.get(el);

    if (addedListeners) {
      el.removeEventListener('keydown', addedListeners.key);
      el.removeEventListener('input', addedListeners.input);

      if (['INPUT', 'TEXTAREA'].includes(el.tagName)) {
        el.removeEventListener('blur', addedListeners.blur);
      } else {
        const inputElement = el.getElementsByTagName('input').item(0);
        const textAreaElement = el.getElementsByTagName('textarea').item(0);

        inputElement?.removeEventListener('blur', addedListeners.blur);
        textAreaElement?.removeEventListener('blur', addedListeners.blur);
      }
    }
  },
};

const validBinding = (binding: DirectiveBinding) => {
  if (binding.value?.min && isNaN(Number(binding.value.min))) {
    throw 'v-number min value must be number';
  }
  if (binding.value?.max && isNaN(Number(binding.value.max))) {
    throw 'v-number max value must be number';
  }
  if (
    binding.value?.allowStartZero &&
    typeof binding.value.allowStartZero !== 'boolean'
  ) {
    throw 'v-number allowStartZero must be boolean';
  }
};

const notNumber = /(?!^-)[^0-9]/g;
const notDecimal = /(?!^-)[^0-9.,]/g;
const systemKey = [
  'Delete',
  'Backspace',
  'Tab',
  'Esc',
  'Escape',
  'Enter',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'Del',
  'Delete',
  'Left',
  'ArrowLeft',
  'Right',
  'ArrowRight',
  'Insert',
  'Up',
  'ArrowUp',
  'Down',
  'ArrowDown',
];
const keyWithCtrl = ['a', 'A', 'c', 'C', 'x', 'X', 'v', 'V'];
const MAXIMUM_DECIMAL_LENGTH = 8;
const DEFAULT_MIN_NUMBER = -10000000000000000000;
const DEFAULT_MAX_NUMBER = 10000000000000000000;
const DECIMAL_SEPARATORS = ['.', ','];
const DEFAULT_ALLOW_START_ZERO = false;

const keyEvent = (e: Event, binding: DirectiveBinding) => {
  const { key, ctrlKey, metaKey } = e as KeyboardEvent;
  const target = e.target as HTMLInputElement;
  const selectionStart = target.selectionStart || 0;
  if (systemKey.includes(key)) {
    return;
  }
  if ((ctrlKey || metaKey) && keyWithCtrl.includes(key)) {
    return;
  }
  if (target && selectionStart === 0 && target.value.includes('-')) {
    e.preventDefault();
    return;
  }
  if (key >= '0' && key <= '9') {
    return;
  }
  if (
    key === '-' &&
    binding.modifiers.minus &&
    target &&
    selectionStart === 0 &&
    !target.value.includes('-')
  ) {
    return;
  }

  if (
    DECIMAL_SEPARATORS.includes(key) &&
    binding.modifiers.point &&
    target &&
    !target.value.includes(key)
  ) {
    if (target.value.includes('-') && selectionStart <= 1) {
      e.preventDefault();
    }
    return;
  }
  e.preventDefault();
};

const inputEvent = (e: Event, binding: DirectiveBinding) => {
  const el = e.target as HTMLInputElement;
  process(el, binding);
  el.dispatchEvent(
    new Event('change', {
      bubbles: true,
      cancelable: false,
      composed: true,
    })
  );
};

const process = (el: HTMLInputElement, binding: DirectiveBinding) => {
  selections.set(el, el.selectionStart || 0);
  processPoint(el, binding.modifiers.point);
  processMinus(el, binding.modifiers.minus);
  processMinMax(el, binding.value);
  prevCommaCount.set(el, (el.value.match(/,/g) || []).length);
};

const processPoint = (el: HTMLInputElement, point: boolean) => {
  if (point) {
    el.value = el.value
      .replace(notDecimal, '')
      .replace(/^(-?\d*[.,]?)|(\d*)[.,]?/g, '$1$2');

    DECIMAL_SEPARATORS.forEach((sep) => {
      if (el.value.indexOf(sep) === 0) {
        el.value = '0' + el.value;
        el.setSelectionRange(
          getSelectionStart(el) + 1,
          getSelectionStart(el) + 1
        );
      }

      if (
        el.value.includes(sep) &&
        el.value.substring(el.value.indexOf(sep)).length >
          MAXIMUM_DECIMAL_LENGTH
      ) {
        el.value = el.value.substring(
          0,
          el.value.indexOf(sep) + MAXIMUM_DECIMAL_LENGTH
        );
        el.setSelectionRange(getSelectionStart(el), getSelectionStart(el));
      }
    });
  } else {
    el.value = el.value.replace(notNumber, '');
  }
};

const processMinus = (el: HTMLInputElement, minus: boolean) => {
  if (minus) {
    const hasMinus = el.value.indexOf('-') === 0;
    el.value = el.value.replace(/-/g, '');

    if (hasMinus) {
      el.value = '-' + el.value;
      el.setSelectionRange(getSelectionStart(el), getSelectionStart(el));
    }
  } else {
    el.value = el.value.replace(/-/g, '');
  }
};

const processMinMax = (el: HTMLInputElement, bindingValue: any) => {
  let min: number = bindingValue?.min ?? DEFAULT_MIN_NUMBER;
  let max: number = bindingValue?.max ?? DEFAULT_MAX_NUMBER;

  if (min < DEFAULT_MIN_NUMBER) {
    min = DEFAULT_MIN_NUMBER;
  }
  if (max > DEFAULT_MAX_NUMBER) {
    max = DEFAULT_MAX_NUMBER;
  }

  const val = Number(el.value);

  if (val < min) {
    el.value = String(min);
  }
  if (val > max) {
    el.value = String(max);
  }
};

const adjustZeroPrefix = (el: HTMLInputElement, binding: DirectiveBinding) => {
  const allowStartZero: boolean =
    binding.value?.allowStartZero ?? DEFAULT_ALLOW_START_ZERO;

  if (!allowStartZero) {
    deleteFirstZero(el);
  }
};

const blurEvent = (e: Event, binding: DirectiveBinding) => {
  const el = e.target as HTMLInputElement;
  adjustZeroPrefix(el, binding);
  deleteFirstSeparator(el);
  deleteLastZeroForDecimal(el);
  deleteLastDecimalPoint(el);
  deleteOnlyMinus(el);
  setDefaultValue(el, binding);
  process(el, binding);

  el.dispatchEvent(
    new Event('input', {
      bubbles: true,
      cancelable: false,
      composed: true,
    })
  );
};

const deleteFirstSeparator = (el: HTMLInputElement) => {
  DECIMAL_SEPARATORS.forEach((sep) => {
    while (el.value.startsWith(sep)) {
      el.value = el.value.substring(1);
    }
    while (el.value.startsWith('-' + sep)) {
      el.value = el.value.slice(0, 1) + el.value.slice(2);
    }
  });
};

const deleteFirstZero = (el: HTMLInputElement) => {
  while (
    el.value.startsWith('-0') &&
    !el.value.startsWith('-0.') &&
    !el.value.startsWith('-0,')
  ) {
    el.value = el.value.slice(0, 1) + el.value.slice(2);
    deleteFirstSeparator(el);
  }
  while (
    el.value.startsWith('0') &&
    !el.value.startsWith('0.') &&
    !el.value.startsWith('0,')
  ) {
    el.value = el.value.substring(1);
    deleteFirstSeparator(el);
  }
};

const deleteLastZeroForDecimal = (el: HTMLInputElement) => {
  DECIMAL_SEPARATORS.forEach((sep) => {
    if (el.value.includes(sep)) {
      while (el.value.endsWith('0')) {
        el.value = el.value.slice(0, -1);
      }
    }
  });
};

const deleteLastDecimalPoint = (el: HTMLInputElement) => {
  DECIMAL_SEPARATORS.forEach((sep) => {
    if (el.value.endsWith(sep)) {
      el.value = el.value.slice(0, -1);
    }
  });
};

const deleteOnlyMinus = (el: HTMLInputElement) => {
  if (el.value === '-') {
    el.value = '';
  }
};

const setDefaultValue = (el: HTMLInputElement, binding: DirectiveBinding) => {
  if (!el.value.trim()) {
    const min: number = binding.value?.min || 0;
    el.value = min > 0 ? String(min) : '0';
  }
};

const getSelectionStart = (el: HTMLInputElement): number =>
  selections.get(el) || 0;

export default DirectiveNumber;
