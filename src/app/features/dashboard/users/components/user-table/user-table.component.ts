import { Component, input } from '@angular/core';
import { UserList } from '../../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [],
  template: `
    <table class="w-full text-left text-sm text-gray-500">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th class="px-4 py-3 text-center">#</th>
          <th scope="col" class="px-4 py-3">Nombre</th>
          <th scope="col" class="px-4 py-3">Apellido</th>
          <th scope="col" class="px-4 py-3">Celular</th>
          <th scope="col" class="px-4 py-3">Rol</th>
          <th scope="col" class="max-w-40 px-4 py-3 text-center">Estado</th>
          <th scope="col" class="px-4 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Cambiar por los datos de la bd -->
        @for (user of users(); track user.id) {
          <tr class="border-b">
            <td class="px-4 py-3 text-center">
              {{ $index + 1 }}
            </td>
            <td class="px-4 py-3">{{ user.firstName }}</td>
            <td class="px-4 py-3">{{ user.lastName }}</td>
            <td class="px-4 py-3">{{ user.phone }}</td>
            <td class="px-4 py-3">{{ user.role }}</td>
            <td class="px-4 py-3 text-center">
              <select class="rounded-lg p-2">
                <option value="" disabled selected>Asistencia</option>
                <option value="present">Presente</option>
                <option value="absent">Ausente</option>
              </select>
            </td>
            <td class="flex justify-center gap-4 px-4 py-3">
              <button class="group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="size-6">
                  <path
                    class="fill-blue-600 group-hover:fill-blue-800"
                    d="M383.99 448H63.998V128H220.125L284.125 64H63.998C28.654 64 0 92.652 0 128V448C0 483.346 28.654 512 63.998 512H383.99C419.334 512 447.988 483.346 447.988 448V227.896L383.99 291.891V448ZM497.941 42.193L469.809 14.059C451.062 -4.687 420.672 -4.687 401.928 14.059L363.307 52.691L459.318 148.705L497.937 110.078C516.686 91.334 516.688 60.939 497.941 42.193ZM147.279 274.418L128.236 369.641C126.559 378.037 133.961 385.437 142.355 383.76L237.582 364.713C242.229 363.783 246.494 361.5 249.844 358.15L436.691 171.328L340.68 75.314L153.842 262.152C150.492 265.504 148.209 269.771 147.279 274.418Z" />
                </svg>
              </button>
              <button class="group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="size-6">
                  <path
                    class="fill-red-600 group-hover:fill-red-800"
                    d="M53.188 467C54.75 491.844 76.219 512 101.094 512H346.906C371.781 512 393.25 491.844 394.812 467L416 128H32L53.188 467ZM432 32H320L308.422 8.844C305.713 3.424 300.172 0 294.111 0H153.889C147.828 0 142.289 3.424 139.578 8.844L128 32H16C7.164 32 0 39.162 0 48V80C0 88.836 7.164 96 16 96H432C440.838 96 448 88.836 448 80V48C448 39.162 440.838 32 432 32Z" />
                </svg>
              </button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class UserTableComponent {
  users = input.required<UserList[] | null>();
}
