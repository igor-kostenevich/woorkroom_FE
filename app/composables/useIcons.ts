export interface ICacheIconEntity {
  svg: string;
  viewBox: string;
}
export type IconCacheType = Record<string, ICacheIconEntity>;
export type CachedIconsEntriesType = [string, ICacheIconEntity][];

interface IUseIconsReturn {
  cacheIcon: (i: string) => Promise<void>;
  iconCache: Ref<IconCacheType>;
  cachedIcons: ComputedRef<CachedIconsEntriesType>;
  cacheWhenVisible: (r: HTMLSpanElement, i: string) => void;
}

/**
 * Cached icon list
 */
const iconCache = ref<IconCacheType>({});

// Cached icons [iconName, iconEntity] list
const cachedIcons = computed<CachedIconsEntriesType>(() =>
  Object.entries(iconCache.value)
);

/**
 * Check if an icon is cached by its name
 * @param iconName
 */
const isIconCached = (iconName: string): boolean =>
  iconName in iconCache.value || `icon-${iconName}` in iconCache.value;

/**
 * Cache an icon by its name
 * @param iconName - Icon name
 */
const cacheIcon = async (iconName?: string): Promise<void> => {
  if (!iconName || isIconCached(iconName)) {
    return;
  }

  const defaultViewBox: string = '0 0 24 24';

  /**
   *  prevent multiple async requests for the same icon,
   * immediately at first request set in cache as existed(just put empty rect);
   */
  iconCache.value[`${iconName}`] = {
    svg: '',
    viewBox: defaultViewBox,
  };

  try {
    const iconUrl = new URL(
      location.origin + `/icons/${iconName}.svg`,
      import.meta.url
    );
    const iconModule = await fetch(iconUrl.href).then((res) => res.text());

    // extract viewBox value
    const viewBoxMatch: RegExpMatchArray | null =
      iconModule.match(/viewBox="([^"]*)"/i);
    const viewBox: string = viewBoxMatch ? viewBoxMatch[1]! : defaultViewBox!;

    /// remove <svg> tag wrapper from icon
    const match: RegExpMatchArray | null = iconModule.match(
      /<svg[^>]*>([\s\S]*?)<\/svg>/i
    );

    if (match && match?.[1]) {
      iconCache.value[`icon-${iconName}`] = {
        svg: match[1].trim(),
        viewBox,
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete iconCache.value[iconName];
      throw new Error(
        `Icon '${iconName}'have invalid structure. Be sure the <svg> root tag exists'`
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete iconCache.value[iconName];
    throw new Error(`Icon '${iconName}' doesn't exist in 'assets/icons'`);
  }
};

const observer: IntersectionObserver | null = import.meta.client
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            if (!(entry.target instanceof HTMLElement)) {
              return;
            }
            await cacheIcon(entry?.target?.dataset?.name);

            observer?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px',
      }
    )
  : null;

const cacheWhenVisible = (iconRef: HTMLSpanElement, iconName: string): void => {
  if (!import.meta.client || !iconRef || !iconName) {
    return;
  }

  iconRef.dataset.name = iconName;
  observer?.observe?.(iconRef);
};

/**
 * App icon cache composable.
 *
 * Stores cached icons in #sprite node and provides methods to access them
 */
const useIcons = (): IUseIconsReturn => {
  return { cacheIcon, iconCache, cachedIcons, cacheWhenVisible };
};

export default useIcons;
