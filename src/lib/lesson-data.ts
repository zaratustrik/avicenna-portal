export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  current?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseDetail {
  id: string;
  title: string;
  tag: string;
  level: string;
  instructor: string;
  instructorTitle: string;
  nmo: number;
  totalModules: number;
  totalMinutes: number;
  progress: number;
  modules: Module[];
}

export const courseDetail: CourseDetail = {
  id: "lap-01",
  title: "Лапароскопическая холецистэктомия: базовый курс",
  tag: "Лапароскопия",
  level: "Базовый",
  instructor: "Петров Александр Викторович",
  instructorTitle: "Профессор, д.м.н., заведующий кафедрой хирургии РУДН",
  nmo: 6,
  totalModules: 8,
  totalMinutes: 95,
  progress: 65,
  modules: [
    {
      id: "m1",
      title: "Анатомия желчевыводящих путей",
      lessons: [
        { id: "l1-1", title: "Хирургическая анатомия желчного пузыря",     duration: "9:20",  completed: true  },
        { id: "l1-2", title: "Треугольник Кало: анатомия и вариации",       duration: "7:45",  completed: true  },
        { id: "l1-3", title: "Типичные аномалии желчных протоков",          duration: "6:10",  completed: true  },
      ],
    },
    {
      id: "m2",
      title: "Показания и предоперационная подготовка",
      lessons: [
        { id: "l2-1", title: "Показания и противопоказания",                duration: "8:30",  completed: true  },
        { id: "l2-2", title: "Предоперационное обследование",               duration: "5:50",  completed: true  },
      ],
    },
    {
      id: "m3",
      title: "Техника операции",
      lessons: [
        { id: "l3-1", title: "Установка троакаров и создание пневмоперитонеума", duration: "11:15", completed: true  },
        { id: "l3-2", title: "Диссекция в треугольнике Кало",              duration: "14:40", completed: false, current: true },
        { id: "l3-3", title: "Клипирование и пересечение пузырного протока", duration: "8:20",  completed: false },
        { id: "l3-4", title: "Отделение желчного пузыря от печени",        duration: "7:05",  completed: false },
        { id: "l3-5", title: "Извлечение препарата и ревизия",             duration: "4:30",  completed: false },
      ],
    },
    {
      id: "m4",
      title: "Осложнения и их профилактика",
      lessons: [
        { id: "l4-1", title: "Повреждение желчных протоков: распознавание", duration: "10:45", completed: false },
        { id: "l4-2", title: "Интраоперационное кровотечение: тактика",    duration: "9:00",  completed: false },
        { id: "l4-3", title: "Конверсия: показания и техника",             duration: "6:20",  completed: false },
      ],
    },
  ],
};

export const currentLesson = {
  id: "l3-2",
  title: "Диссекция в треугольнике Кало",
  moduleTitle: "Модуль 3: Техника операции",
  duration: "14:40",
  currentTime: "05:22",
  synopsis: `
Диссекция в треугольнике Кало — ключевой этап лапароскопической холецистэктомии,
определяющий безопасность операции. Цель этапа — достижение критического взгляда безопасности
(Critical View of Safety, CVS) по Strasberg.

**Критический взгляд безопасности (CVS):**
- Треугольник Кало очищен от жировой и фиброзной ткани
- Нижняя часть желчного пузыря отделена от печёночного ложа на треть
- В треугольнике Кало видны только две структуры, входящие в желчный пузырь

**Техника диссекции:**
1. Тракция желчного пузыря в латеральном направлении — за карман Гартмана
2. Рассечение брюшины по передней поверхности треугольника Кало
3. Тупая и острая диссекция с выделением пузырного протока и пузырной артерии
4. Обязательная верификация CVS перед клипированием

**Типичные ошибки:**
— Торопливость при недостаточном обзоре → риск травмы ОЖП
— Диссекция вдоль желчного пузыря, а не в треугольнике
— Клипирование без достижения CVS
  `,
  materials: [
    { type: "pdf",  title: "Чек-лист CVS — критерии безопасности",      size: "1.2 МБ" },
    { type: "pdf",  title: "Атлас анатомии: треугольник Кало",           size: "4.8 МБ" },
    { type: "ppt",  title: "Слайды лекции — Диссекция",                  size: "3.1 МБ" },
  ],
  pubmed: [
    {
      title: "Strasberg SM. Avoidance of biliary injury during laparoscopic cholecystectomy",
      journal: "J Hepatobiliary Pancreat Surg. 2002",
      pmid: "12483260",
    },
    {
      title: "Critical view of safety during laparoscopic cholecystectomy — meta-analysis",
      journal: "Surg Endosc. 2019",
      pmid: "30386921",
    },
    {
      title: "Bile duct injury during cholecystectomy: mechanism and prevention",
      journal: "Ann Surg. 2020",
      pmid: "31356269",
    },
  ],
};
