# W&RSR Калькулятор

Калькуляторы и справочники для игры [Workers & Resources: Soviet Republic](https://store.steampowered.com/app/784150/Workers__Resources_Soviet_Republic_).

**Готовый сайт: https://anaxronik.github.io/wrsr-calculator/**

## Возможности

- **Цены на ресурсы** — таблица цен мирового рынка (54 позиции, данные из игрового окна «Экономика и торговля»): продажа/покупка в рублях и долларах. Все цены редактируемые, изменения сохраняются в браузере (localStorage).
- **Калькулятор прибыли** *(в разработке)* — рентабельность производственных цепочек.
- **Справочник зданий** *(в разработке)*.

## Технологии

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) (React Compiler) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [zustand](https://zustand.docs.pmnd.rs/) для стейта
- Oxlint для линтинга

Дизайн повторяет внутриигровые окна: состаренная бумага, красно-коричневые заголовки, оригинальные иконки ресурсов.

## Разработка

```bash
npm install
npm run dev
```

Сборка: `npm run build`, линт: `npm run lint`.

## Деплой

При каждом пуше в `main` GitHub Actions собирает проект и публикует на GitHub Pages.
