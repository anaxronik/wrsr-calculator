/**
 * World market prices sampled from the in-game Economy & Trade window
 * (screenshot 22.08.2026, page 1/2). Values: ₽/$ per ton, sell = what the
 * border pays you, buy = what buying at the border costs you.
 * Names follow the game's Russian localization.
 */
export interface MarketPrice {
  id: string
  name: string
  rubSell: number
  rubBuy: number
  usdSell: number
  usdBuy: number
  /** true = not tradable in that direction, show as dash */
  noSell?: boolean
  /** unit label shown next to the name (default: per ton) */
  unit?: string
}

export const marketPrices: MarketPrice[] = [
  { id: 'alcohol', name: 'Алкоголь', rubSell: 85.38, rubBuy: 94.37, usdSell: 112.85, usdBuy: 124.73 },
  { id: 'waste_aluminium', name: 'Алюминиевый лом', rubSell: 107.73, rubBuy: 119.07, usdSell: 140.36, usdBuy: 155.13 },
  { id: 'aluminium', name: 'Алюминий', rubSell: 221.58, rubBuy: 244.91, usdSell: 288.87, usdBuy: 319.28 },
  { id: 'asphalt', name: 'Асфальт', rubSell: 11.37, rubBuy: 12.56, usdSell: 12.87, usdBuy: 14.22 },
  { id: 'concrete', name: 'Бетон', rubSell: 4.99, rubBuy: 5.51, usdSell: 6.36, usdBuy: 7.03 },
  { id: 'waste_bio', name: 'Биологические отходы', rubSell: 0.45, rubBuy: 0.5, usdSell: 0.4, usdBuy: 0.44 },
  { id: 'bitumen', name: 'Битум', rubSell: 69.21, rubBuy: 76.49, usdSell: 76.77, usdBuy: 84.85 },
  { id: 'bauxite', name: 'Бокситы', rubSell: 13.46, rubBuy: 14.88, usdSell: 17.14, usdBuy: 18.94 },
  { id: 'rawbauxite', name: 'Бокситы-сырцы', rubSell: 7.46, rubBuy: 8.24, usdSell: 9.46, usdBuy: 10.45 },
  { id: 'explosives', name: 'Взрывчатка', rubSell: 410.28, rubBuy: 453.46, usdSell: 539.12, usdBuy: 595.87 },
  { id: 'water', name: 'Вода', rubSell: 3.06, rubBuy: 3.38, usdSell: 4.09, usdBuy: 4.52 },
  { id: 'alumina', name: 'Глинозем', rubSell: 94.39, rubBuy: 104.32, usdSell: 122.45, usdBuy: 135.34 },
  { id: 'waste_burnable', name: 'Горючие отходы', rubSell: -0.99, rubBuy: -0.89, usdSell: -1.32, usdBuy: -1.19 },
  { id: 'gravel', name: 'Гравий', rubSell: 2.43, rubBuy: 2.69, usdSell: 3.04, usdBuy: 3.36 },
  { id: 'boards', name: 'Доски', rubSell: 4.39, rubBuy: 4.85, usdSell: 4.74, usdBuy: 5.24 },
  { id: 'wood', name: 'Древесина', rubSell: 3.07, rubBuy: 3.39, usdSell: 3.23, usdBuy: 3.57 },
  { id: 'rawiron', name: 'Железная руда', rubSell: 2.25, rubBuy: 2.48, usdSell: 2.5, usdBuy: 2.76 },
  { id: 'waste_steel', name: 'Железный лом', rubSell: 51.1, rubBuy: 56.48, usdSell: 60.83, usdBuy: 67.23 },
  { id: 'iron', name: 'Железо', rubSell: 5.36, rubBuy: 5.92, usdSell: 6.06, usdBuy: 6.7 },
  { id: 'plants', name: 'Зерно', rubSell: 5.68, rubBuy: 6.28, usdSell: 7.38, usdBuy: 8.16 },
  { id: 'waste_ash', name: 'Зола', rubSell: -1.98, rubBuy: -1.79, usdSell: -2.64, usdBuy: -2.39 },
  { id: 'rawgravel', name: 'Камень', rubSell: 1.26, rubBuy: 1.4, usdSell: 1.55, usdBuy: 1.71 },
  { id: 'bricks', name: 'Кирпичи', rubSell: 7.44, rubBuy: 8.22, usdSell: 9.27, usdBuy: 10.25 },
  { id: 'mcomponents', name: 'Механ. детали', rubSell: 178.47, rubBuy: 197.26, usdSell: 217.71, usdBuy: 240.62 },
  { id: 'meat', name: 'Мясо', rubSell: 78.21, rubBuy: 86.44, usdSell: 103.29, usdBuy: 114.17 },
  { id: 'oil', name: 'Нефть', rubSell: 14.74, rubBuy: 16.29, usdSell: 15.01, usdBuy: 16.59 },
  { id: 'clothes', name: 'Одежда', rubSell: 438.23, rubBuy: 484.36, usdSell: 580.98, usdBuy: 642.13 },
  { id: 'yellowcake', name: 'Оксид урана', rubSell: 287.3, rubBuy: 317.54, usdSell: 379.9, usdBuy: 419.9 },
  { id: 'waste_toxic', name: 'Опасные отходы', rubSell: -277.82, rubBuy: -251.36, usdSell: -370.43, usdBuy: -335.15 },
  { id: 'fertiliser', name: 'Органические удобрения', rubSell: 0.76, rubBuy: 0.84, usdSell: 0.9, usdBuy: 0.99 },
  { id: 'prefabpanels', name: 'Панели', rubSell: 6.15, rubBuy: 6.8, usdSell: 7.9, usdBuy: 8.74 },
  { id: 'food', name: 'Пища', rubSell: 38.03, rubBuy: 42.03, usdSell: 50.31, usdBuy: 55.61 },
  { id: 'plastics', name: 'Пластик', rubSell: 218.78, rubBuy: 241.81, usdSell: 269.9, usdBuy: 298.31 },
  { id: 'waste_plastic', name: 'Пластиковые отходы', rubSell: 36.82, rubBuy: 40.7, usdSell: 44.81, usdBuy: 49.52 },
  { id: 'waste_other', name: 'Прочие отходы', rubSell: -2.31, rubBuy: -2.09, usdSell: -3.08, usdBuy: -2.79 },
  { id: 'fertiliser_liquid', name: 'Синтетические удобрения', rubSell: 12.23, rubBuy: 13.52, usdSell: 16.17, usdBuy: 17.87 },
  { id: 'livestock', name: 'Скот', rubSell: 30.21, rubBuy: 33.39, usdSell: 39.91, usdBuy: 44.11 },
  { id: 'steel', name: 'Сталь', rubSell: 101.04, rubBuy: 111.67, usdSell: 120.69, usdBuy: 133.39 },
  { id: 'usagewater', name: 'Сточные воды', rubSell: -3.3, rubBuy: -2.99, usdSell: -4.4, usdBuy: -3.98 },
  { id: 'waste_gravel', name: 'Строительный мусор', rubSell: 1.12, rubBuy: 1.23, usdSell: 1.35, usdBuy: 1.5 },
  { id: 'fabric', name: 'Ткань', rubSell: 118.87, rubBuy: 131.38, usdSell: 156.94, usdBuy: 173.46 },
  { id: 'fuel', name: 'Топливо', rubSell: 40.27, rubBuy: 44.51, usdSell: 44.8, usdBuy: 49.52 },
  { id: 'coal', name: 'Уголь', rubSell: 4.65, rubBuy: 5.14, usdSell: 5.19, usdBuy: 5.74 },
  { id: 'rawcoal', name: 'Уголь-сырец', rubSell: 2.42, rubBuy: 2.68, usdSell: 2.66, usdBuy: 2.94 },
  { id: 'uranium', name: 'Урановая руда', rubSell: 5.46, rubBuy: 6.03, usdSell: 7.14, usdBuy: 7.89 },
  { id: 'uf6', name: 'Фторид урана', rubSell: 1612.91, rubBuy: 1782.69, usdSell: 2087.38, usdBuy: 2307.1 },
  { id: 'chemicals', name: 'Химикаты', rubSell: 294.87, rubBuy: 325.91, usdSell: 385.17, usdBuy: 425.72 },
  { id: 'cement', name: 'Цемент', rubSell: 8.84, rubBuy: 9.77, usdSell: 10.96, usdBuy: 12.12 },
  { id: 'eletric', name: 'Электричество', rubSell: 0.13, rubBuy: 0.14, usdSell: 0.15, usdBuy: 0.17 },
  { id: 'ecomponents', name: 'Электродетали', rubSell: 236.33, rubBuy: 261.21, usdSell: 306.24, usdBuy: 338.47 },
  { id: 'eletronics', name: 'Электроника', rubSell: 247.5, rubBuy: 273.55, usdSell: 317.58, usdBuy: 351.01 },
  { id: 'nuclearfuel', name: 'Ядерное топливо', rubSell: 38799.14, rubBuy: 42883.26, usdSell: 48233.0, usdBuy: 53310.16 },
  { id: 'nuclearfuelburned', name: 'Ядерные отходы', rubSell: -420.05, rubBuy: -380.04, usdSell: -560.06, usdBuy: -506.72 },
  { id: 'workers', name: 'Рабочая сила', rubSell: 0, rubBuy: 3.15, usdSell: 0, usdBuy: 4.2, noSell: true },
  { id: 'immigrants', name: 'Иммигранты', rubSell: 0, rubBuy: 140.0, usdSell: 0, usdBuy: 35.0, noSell: true },
]
