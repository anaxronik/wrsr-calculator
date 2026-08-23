/**
 * Production buildings for the profit calculator.
 * rates are per worker per day (scale = workers × building count);
 * buildings with workers=0 have fixed output scaled by building count only.
 * Data from the user's obsidian note (Early Start 1920 campaign).
 */
export interface Building {
  id: string
  name: string
  /** workers per building (0 = no workers, fixed output) */
  workers: number
  /** produced tons/day per worker (or per building when workers=0) */
  prod: Record<string, number>
  /** consumed tons/day per worker (or per building when workers=0) */
  cons: Record<string, number>
  note?: string
}

export const BUILDINGS: Building[] = [
  { id: 'h_woodpost', name: 'Лесозаготовительная база (5 раб, гужевая)', workers: 5, prod: { wood: 6.25, waste_other: 0.00043 }, cons: {} },
  { id: 'woodpost', name: 'Лесозаготовительная база (10 раб)', workers: 10, prod: { wood: 6.25, waste_other: 0.00043 }, cons: {} },
  { id: 'sawmill', name: 'Лесопилка', workers: 20, prod: { boards: 7, waste_other: 0.104 }, cons: { wood: 9, eletric: 0.08 } },
  { id: 'food_old', name: 'Пищевой завод (150 раб)', workers: 150, prod: { food: 0.1, usagewater: 0.24 }, cons: { plants: 0.25, water: 0.05 } },
  { id: 'food_base', name: 'Пищевой завод (170 раб)', workers: 170, prod: { food: 0.12, usagewater: 0.24 }, cons: { plants: 0.25, water: 0.05 } },
  { id: 'food_small', name: 'Пищевой завод (30 раб)', workers: 30, prod: { food: 0.09, usagewater: 0.24 }, cons: { plants: 0.25, water: 0.05 } },
  { id: 'dist_base', name: 'Ликеро-водочный завод (100 раб)', workers: 100, prod: { alcohol: 0.06 }, cons: { plants: 0.3, water: 0.135 } },
  { id: 'dist_old', name: 'Ликеро-водочный завод старый (100 раб)', workers: 100, prod: { alcohol: 0.06 }, cons: { plants: 0.3, water: 0.135 } },
  { id: 'dist_small', name: 'Ликеро-водочный завод (35 раб)', workers: 35, prod: { alcohol: 0.06 }, cons: { plants: 0.3, water: 0.135 } },
  { id: 'animal_base', name: 'Мясной совхоз (50 раб)', workers: 50, prod: { livestock: 0.2 }, cons: { plants: 0.4, water: 0.25 } },
  { id: 'animal_dlc', name: 'Мясной совхоз (35 раб)', workers: 35, prod: { livestock: 0.2 }, cons: { plants: 0.4, water: 0.25 } },
  { id: 'slaughter_base', name: 'Мясокомбинат (50 раб)', workers: 50, prod: { meat: 1.2 }, cons: { livestock: 3 } },
  { id: 'slaughter_dlc', name: 'Мясокомбинат (35 раб)', workers: 35, prod: { meat: 1.2 }, cons: { livestock: 3 } },
  { id: 'fabric_base', name: 'Ткацкая фабрика', workers: 100, prod: { fabric: 0.05, usagewater: 0.65 }, cons: { plants: 0.2, chemicals: 0.005, water: 0.11 } },
  { id: 'clothes_base', name: 'Швейная фабрика (80 раб)', workers: 80, prod: { clothes: 0.015 }, cons: { fabric: 0.03 } },
  { id: 'clothes_dlc', name: 'Швейная фабрика DLC (80 раб)', workers: 80, prod: { clothes: 0.0135 }, cons: { fabric: 0.027 } },
  { id: 'gravelmine_40', name: 'Гравийный карьер (40 раб)', workers: 40, prod: { rawgravel: 3.5 }, cons: {} },
  { id: 'gravelmine_100', name: 'Гравийный карьер (100 раб)', workers: 100, prod: { rawgravel: 3.5 }, cons: {} },
  { id: 'gravelp_15', name: 'Гравийно-сортировочный завод (15 раб)', workers: 15, prod: { gravel: 5.5 }, cons: { rawgravel: 8.0 } },
  { id: 'gravelp_5', name: 'Гравийно-сортировочный завод (5 раб)', workers: 5, prod: { gravel: 5.5 }, cons: { rawgravel: 8.0 } },
  { id: 'cement_30', name: 'Цементный завод (30 раб)', workers: 30, prod: { cement: 2.7 }, cons: { coal: 0.75, gravel: 7 } },
  { id: 'cement_20', name: 'Цементный завод (20 раб)', workers: 20, prod: { cement: 1.95 }, cons: { coal: 0.5625, gravel: 5.25 } },
  { id: 'oil_mine', name: 'Нефтяная скважина', workers: 0, prod: { oil: 7 }, cons: { eletric: 0.065 }, note: 'без рабочих — качает сама' },
  { id: 'refinery', name: 'Нефтеперерабатывающий завод (500 раб)', workers: 500, prod: { fuel: 0.25, bitumen: 0.15 }, cons: { oil: 0.5 }, note: 'требует исследование' },
  { id: 'coalmine_220', name: 'Угольная шахта (220 раб)', workers: 220, prod: { rawcoal: 4.2 }, cons: {} },
  { id: 'coalmine_100', name: 'Угольная шахта (100 раб)', workers: 100, prod: { rawcoal: 4.2 }, cons: {} },
  { id: 'coalp_30', name: 'Угольный комбинат (30 раб)', workers: 30, prod: { coal: 8 }, cons: { rawcoal: 14 } },
  { id: 'coalp_20', name: 'Угольный комбинат (20 раб)', workers: 20, prod: { coal: 8 }, cons: { rawcoal: 14 } },
  { id: 'power_coal', name: 'Тепловая электростанция угольная (20 раб)', workers: 20, prod: { eletric: 70 }, cons: { coal: 1.2 }, note: '1400 МВт·ч/сут, 24 т угля/сут' },
  { id: 'power_coal_v2', name: 'Тепловая электростанция угольная v2 (20 раб)', workers: 20, prod: { eletric: 70 }, cons: { coal: 1.2 }, note: 'та же экономика, другой корпус' },
  { id: 'power_coal_dlc', name: 'Тепловая электростанция угольная DLC (10 раб)', workers: 10, prod: { eletric: 60 }, cons: { coal: 1.2 }, note: '600 МВт·ч/сут, 12 т угля/сут' },
  { id: 'city_100', name: '🏙 Город: 100 жителей — потребление в сутки', workers: 0, prod: { usagewater: 6.5 }, cons: { food: 0.04, meat: 0.008, clothes: 0.0013, eletronics: 0.003, alcohol: 0.005, water: 6.5 }, note: 'на жителя/день: еда 0.4 кг, мясо 0.08 кг, одежда 0.013 кг, электроника 0.03 кг, алкоголь 0.05 кг, вода 65 л, стоки = воде; 100 рабочих мест × 3 смены = 300 жителей → qty=3; тепло только зимой' },
  { id: 'chem_60', name: 'Химический завод (60 раб)', workers: 60, prod: { chemicals: 0.0135, usagewater: 0.78 }, cons: { gravel: 0.012, wood: 0.014, plants: 0.013, oil: 0.02, water: 0.17 }, note: 'требует исследование' },
  { id: 'chem_200', name: 'Химический завод (200 раб)', workers: 200, prod: { chemicals: 0.0135, usagewater: 0.78 }, cons: { gravel: 0.012, wood: 0.014, plants: 0.013, oil: 0.02, water: 0.17 }, note: 'требует исследование' },
  { id: 'plastics_60', name: 'Завод пластмасс (60 раб)', workers: 60, prod: { plastics: 0.11 }, cons: { chemicals: 0.05, oil: 0.45 }, note: 'требует исследование' },
  { id: 'ironmine_250', name: 'Железный рудник (250 раб)', workers: 250, prod: { rawiron: 4 }, cons: {} },
  { id: 'ironmine_125', name: 'Железный рудник (125 раб)', workers: 125, prod: { rawiron: 4 }, cons: {} },
  { id: 'ironproc_15', name: 'Железорудный комбинат (15 раб)', workers: 15, prod: { iron: 7 }, cons: { rawiron: 15 } },
  { id: 'ironproc_8', name: 'Железорудный комбинат (8 раб)', workers: 8, prod: { iron: 7 }, cons: { rawiron: 15 } },
  { id: 'steelmill', name: 'Сталелитейный завод (500 раб)', workers: 500, prod: { steel: 0.086 }, cons: { coal: 0.75, iron: 0.4 }, note: 'за годовым исследованием 1922+' },
  { id: 'bauxmine_45', name: 'Бокситовый рудник (45 раб)', workers: 45, prod: { rawbauxite: 0.5 }, cons: {}, note: 'требует исследование' },
  { id: 'bauxproc_25', name: 'Бокситообогатительный комбинат (25 раб)', workers: 25, prod: { bauxite: 3.0 }, cons: { rawbauxite: 5.0 }, note: 'требует исследование' },
  { id: 'alumina_370', name: 'Глинозёмный завод (370 раб)', workers: 370, prod: { alumina: 0.09, usagewater: 0.71 }, cons: { bauxite: 0.21, coal: 0.08, chemicals: 0.007, water: 0.08 }, note: 'требует исследование' },
  { id: 'aluplant_350', name: 'Алюминиевый завод (350 раб)', workers: 350, prod: { aluminium: 0.087 }, cons: { alumina: 0.15, chemicals: 0.0072 }, note: 'требует исследование' },
  { id: 'studfarm_50', name: 'Конезавод (50 раб)', workers: 50, prod: { vehicles: 1.0 }, cons: { plants: 1.0 }, note: 'гужевой транспорт, Early Start' },
  { id: 'carpenter_20', name: 'Мастерская плотника (20 раб)', workers: 20, prod: { vehicles: 1.0 }, cons: { boards: 1.0, fabric: 1.0, steel: 1.0 }, note: 'гужевой транспорт, Early Start' },
  { id: 'explosives_75', name: 'Завод взрывчатых веществ (75 раб)', workers: 75, prod: { explosives: 0.015 }, cons: { chemicals: 0.01, gravel: 0.03, wood: 0.02 } },
  { id: 'brick_75', name: 'Кирпичный завод (75 раб)', workers: 75, prod: { bricks: 0.68 }, cons: { coal: 0.45 } },
  { id: 'brick_30', name: 'Кирпичный завод (30 раб)', workers: 30, prod: { bricks: 0.5 }, cons: { coal: 0.35 } },
  { id: 'pp_coal_20', name: 'Электростанция угольная (20 раб)', workers: 20, prod: { eletric: 70 }, cons: { coal: 1.2 } },
  { id: 'pp_coal_10', name: 'Электростанция угольная DLC (10 раб)', workers: 10, prod: { eletric: 60 }, cons: { coal: 1.2 } },
  { id: 'pp_gas_15', name: 'Электростанция газовая (15 раб)', workers: 15, prod: { eletric: 70 }, cons: { oil: 0.59 }, note: 'требует исследование' },
  { id: 'pp_solar_8', name: 'Электростанция солнечная (8 раб)', workers: 8, prod: { eletric: 70 }, cons: {}, note: 'зависит от солнца, требует исследование' },
  { id: 'pp_wind1_0', name: 'Ветрогенератор малый (0 раб)', workers: 0, prod: { eletric: 15 }, cons: {}, note: 'зависит от ветра, требует исследование' },
  { id: 'pp_wind2_0', name: 'Ветрогенератор большой (0 раб)', workers: 0, prod: { eletric: 35 }, cons: {}, note: 'зависит от ветра, требует исследование' },
  { id: 'pp_nuc_40', name: 'АЭС одноконтурная (40 раб)', workers: 40, prod: { eletric: 117 }, cons: { nuclearfuel: 0.001, water: 0.17 }, note: 'требует исследование; цена ядерного топлива неизвестна' },
  { id: 'pp_nuc_80', name: 'АЭС двухконтурная (80 раб)', workers: 80, prod: { eletric: 117 }, cons: { nuclearfuel: 0.001, water: 0.17 }, note: 'требует исследование; цена ядерного топлива неизвестна' },
  { id: 'pp_nuc_dlc', name: 'АЭС одноконтурная DLC (40 раб)', workers: 40, prod: { eletric: 58 }, cons: { nuclearfuel: 0.0005, water: 0.085 }, note: 'требует исследование; цена ядерного топлива неизвестна' },
  { id: 'pp_inc_20', name: 'Мусоросжигательная ТЭЦ (20 раб)', workers: 20, prod: { eletric: 33 }, cons: { waste_other: 3.0 }, note: 'сжигает отходы: экономит вывоз' },
]

/** extra resources used by buildings but missing from the market table */
export const EXTRA_RES_NAMES: Record<string, string> = {
  vehicles: 'Транспорт (шт)',
}
