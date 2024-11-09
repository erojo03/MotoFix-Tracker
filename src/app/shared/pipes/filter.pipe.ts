import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true,
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform<T>(
    entities: T[] | null,
    searchTerm: string,
    searchFields: string[]
  ): T[] {
    if (!entities || !searchTerm) {
      return entities || [];
    }

    searchTerm = searchTerm.toLowerCase();

    return entities.filter((entity) => {
      return searchFields.some((field) => {
        const fieldValue = this.getNestedPropertyValue(entity, field);
        return (
          fieldValue && String(fieldValue).toLowerCase().includes(searchTerm)
        );
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getNestedPropertyValue(obj: any, path: string) {
    return path
      .split('.')
      .reduce(
        (current, key) =>
          current && current[key] !== undefined ? current[key] : null,
        obj
      );
  }
}
