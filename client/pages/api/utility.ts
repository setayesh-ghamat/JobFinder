// utility.ts

const DateFormatOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
export function formatDate(dateString: string): string | null {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null; 
  }
  return date.toLocaleDateString(undefined, DateFormatOptions);
}

export function formatMobility(mobility: number) {
  return mobility === 1 ? 'remote' : 'daily commute';
}