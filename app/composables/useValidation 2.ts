import {
  useVuelidate,
  type ValidationArgs,
  type GlobalConfig,
  type BaseValidation,
} from '@vuelidate/core';
import { useCloned } from '@vueuse/core';
import * as AllVuelidateValidators from '@vuelidate/validators';
import { helpers as ValidatorProvidedHelpers } from '@vuelidate/validators';

/**
 * A comprehensive collection of all validators from `@vuelidate/validators`.
 *
 * Some of the most commonly used validators include:
 * - `required`: Checks if a value is present.
 * - `email`: Checks for a valid email format.
 * - `minLength(min)`: Checks for a minimum length (for strings or arrays).
 * - `maxLength(max)`: Checks for a maximum length.
 * - `sameAs(otherField)`: Checks if the value is the same as another field's value.
 * - `numeric`: Checks if a value is numeric.
 * - `integer`: Checks if a value is an integer.
 *
 * For the full list of available validators and their detailed descriptions,
 * please refer to the official Vuelidate documentation:
 * {@link https://vuelidate-next.netlify.app/validators.html#included-validators}
 *
 * @example
 * import { validators, helpers } from '~/composables/useValidation';
 * const rules = {
 *   email: {
 *     required: helpers.withMessage("Field is required", validators.required),
 *     email: helpers.withMessage("Must be a valid email", validators.email)
 *   },
 *   password: {
 *     minLength: helpers.withMessage("Minimum 6 characters", validators.minLength(6))
 *   }
 * };
 */
export const validators: typeof AllVuelidateValidators = AllVuelidateValidators;

/**
 * Vuelidate helpers (e.g., withMessage, withParams).
 * Imported from `@vuelidate/validators`.
 * @example
 * import { helpers } from '~/composables/useValidation';
 */
export const helpers: typeof ValidatorProvidedHelpers =
  ValidatorProvidedHelpers;

export interface FieldErrorState {
  hasError: boolean;
  message?: string | undefined;
  touch: () => void;
  errors: Array<{ $message: string; [key: string]: any }>;
  $model: any;
  instance?: BaseValidation;
}

export interface UseValidationOptions {
  /**
   * If true, Vuelidate will automatically set a field to `$dirty` when its model value changes.
   * This corresponds to Vuelidate's `$autoDirty` global config.
   * If not specified, Vuelidate's internal default (typically `false`) will apply.
   */
  autoDirty?: boolean;

  /**
   * If true, validations won't run on model changes until the field is marked as `$dirty`
   * (e.g., by `touch()` or if `autoDirty` is on) or the form is validated via `validateForm()`.
   * This corresponds to Vuelidate's `$lazy` global config.
   * @default false
   */
  lazy?: boolean;

  /**
   * When `autoDirty` is true, and a field was invalid but then becomes valid due to a model change,
   * `rewardEarly: true` will immediately clear the field's error state.
   * This corresponds to Vuelidate's `$rewardEarly` global config.
   * Vuelidate's default for `$rewardEarly` is typically `false`.
   * @default false
   */
  rewardEarly?: boolean;

  /**
   * If `true`, a field's `$dirty` state is automatically reset whenever its value changes.
   * This provides a user-friendly experience by immediately hiding a validation error
   * as soon as the user starts correcting the field (e.g., after a failed form submission).
   * To disable this default behavior, explicitly pass `false`.
   * @default true
   */
  autoClearErrors?: boolean;
}

/**
 * @module useValidation
 * It simplifies interaction with Vuelidate and provides a reactive error state
 * for easy template binding and encapsulated validation logic.
 *
 * @template T - The type of the form state object. Must extend `Record<PropertyKey, any>`.
 * @template R - The type of the Vuelidate rules object, extending `ValidationArgs<T>`.
 *
 * @param {T | Ref<T>} formState - The reactive object (or a Ref to it) containing the form data to be validated.
 * @param {R} rules - The Vuelidate rules object. Can be a plain object, a Ref, or a ComputedRef.
 * Define rules using validators from the exported `validators` object and `helpers`.
 * @param {UseValidationOptions} [options] - Optional configuration, including Vuelidate global settings.
 *
 * @returns {object} An object containing:
 * - `validationErrors`: A `ComputedRef<Record<keyof T, FieldErrorState>>`. Provides detailed reactive validation state for each field, including `hasError`, `message`, `touch()` method, raw `errors` array, `$model` value, and the Vuelidate field `instance`.
 * - `validateForm`: An async function `() => Promise<boolean>`. Validates the entire form and touches all fields. Returns `true` if valid, `false` otherwise.
 * - `resetFormValidation`: A function `() => void`. Resets Vuelidate's internal state for all fields (e.g., `$dirty`, `$errors`). Does not reset form data.
 * - `validateField`: An async function `(fieldName: keyof T & string) => Promise<boolean>`. Validates a specific field by its name. Returns `true` if valid or not found/validatable, `false` otherwise.
 * - `isFormInvalid`: A `ComputedRef<boolean>`. True if the overall form is invalid (based on `v$.$invalid`). Best checked after `validateForm()`.
 * - `isFormDirty`: A `ComputedRef<boolean>`. True if any field in the form has been interacted with (based on `v$.$dirty`).
 * - `isFormTouchedAndInvalid`: A `ComputedRef<boolean>`. True if the form has been interacted with AND is invalid (based on `v$.$dirty && v$.$invalid`). Ideal for submit button `:disabled` state.
 * - `isFormPending`: A `ComputedRef<boolean>`. True if any async validation in the form is currently running (based on `v$.$pending`).
 */
export default function useValidation<
  T extends Record<PropertyKey, any>,
  R extends Partial<ValidationArgs<T>>,
>(formState: T | Ref<T>, rules: R, options?: UseValidationOptions) {
  const vuelidateGlobalConfig: GlobalConfig = {};
  if (options?.autoDirty !== undefined) {
    vuelidateGlobalConfig.$autoDirty = options.autoDirty;
  }
  if (options?.lazy !== undefined) {
    vuelidateGlobalConfig.$lazy = options.lazy;
  }
  if (options?.rewardEarly !== undefined) {
    vuelidateGlobalConfig.$rewardEarly = options.rewardEarly;
  }

  const completeRules = computed(() => {
    const state = toValue(formState);
    const userRules = toValue(rules);

    if (!state || typeof state !== 'object') {
      return {};
    }

    const baseRules = Object.fromEntries(
      Object.keys(state).map((key) => [key, {}])
    );

    return { ...baseRules, ...userRules };
  });

  const v$ = useVuelidate(completeRules, formState, vuelidateGlobalConfig);

  if (options?.autoClearErrors !== false) {
    const { cloned: oldStateSnapshot, sync: syncSnapshot } = useCloned(
      toValue(formState)
    );

    watch(
      () => toValue(formState),
      (newState) => {
        for (const key of Object.keys(toValue(rules))) {
          const newVal = (newState as T)[key];
          const oldVal = (toValue(oldStateSnapshot) as T)[key];
          if (newVal !== oldVal && v$.value[key]) {
            if (v$.value[key]) {
              v$.value[key].$dirty = false;
            }
          }
        }

        syncSnapshot();
      },
      { deep: true }
    );
  }

  const validationErrors = computed(() => {
    const errorsMap = {} as Record<keyof T, FieldErrorState>;
    for (const key in v$.value) {
      if (key.startsWith('$')) continue;

      const fieldName = key as keyof T & string;
      const field = v$.value[fieldName] as BaseValidation | undefined;

      if (field) {
        const showError = field.$dirty && field.$invalid;

        errorsMap[fieldName] = {
          hasError: showError,
          message: showError
            ? (unref(field.$errors[0]?.$message) ?? undefined)
            : undefined,
          touch: () => {
            field.$touch();
          },
          errors: field.$errors.map((err) => ({
            ...err,
            $message: unref(err.$message),
          })),
          $model: field.$model,
          instance: field,
        };
      }
    }
    return errorsMap;
  });

  const isFormInvalid = computed(() => v$.value.$invalid);
  const isFormDirty = computed(() => v$.value.$dirty);
  const isFormTouchedAndInvalid = computed(
    () => v$.value.$dirty && v$.value.$invalid
  );
  const isFormPending = computed(() => v$.value.$pending);
  const allValidationErrors = computed(() => {
    if (Array.isArray(v$.value.$errors)) {
      return v$.value.$errors.map((err) => ({
        ...err,
        $message: unref(err.$message),
      }));
    }
    return [];
  });

  const validateForm = async (): Promise<boolean> => {
    return await v$.value.$validate();
  };

  const resetFormValidation = (): void => {
    v$.value.$reset();
  };

  const validateField = async (
    fieldName: keyof T & string
  ): Promise<boolean> => {
    const field = v$.value[fieldName as string] as BaseValidation | undefined;
    if (field && typeof field.$validate === 'function') {
      return await field.$validate();
    }
    return true;
  };

  return {
    validationErrors,
    validateForm,
    resetFormValidation,
    validateField,
    isFormInvalid,
    isFormDirty,
    isFormTouchedAndInvalid,
    allValidationErrors,
    isFormPending,
  };
}
