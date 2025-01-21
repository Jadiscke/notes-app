export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the previous timeout
    }

    timeoutId = setTimeout(() => {
      func(...args); // Call the function after the delay
    }, delay);
  };
}
