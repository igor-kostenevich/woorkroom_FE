export function useFormatters(locale: Intl.LocalesArgument = 'en-US') {
  const formatDate = (d: Date): string =>
    d.toLocaleDateString(locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return { formatDate };
}
