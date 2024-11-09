import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true,
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform<T>(entities: T[] | null, entityType: string, searchTerm: string, searchFields: (keyof T)[]): T[] {
    if (!entities || !searchTerm) {
      return entities || [];
    }

    searchTerm = searchTerm.toLowerCase();

    return entities.filter(entity => {
      return searchFields.some(field => {
        const fieldValue = String(entity[field]).toLowerCase();
        return fieldValue.includes(searchTerm);
      });
    });
  }
}