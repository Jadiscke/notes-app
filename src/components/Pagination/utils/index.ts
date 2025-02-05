export function getNextPages(totalPages: number, actualPage: number): number[] {
  const nextPages = [];
  for (let i = actualPage + 1; i <= totalPages && i <= actualPage + 3; i++) {
    if (i > actualPage) {
      nextPages.push(i);
    }
  }
  return nextPages;
}

export function getPreviousPages(actualPage: number): number[] {
  const previousPages = [];
  for (let i = actualPage; i >= actualPage - 3 && i > 0; i--) {
    if (i < actualPage) {
      previousPages.push(i);
    }
  }
  return previousPages.reverse();
}