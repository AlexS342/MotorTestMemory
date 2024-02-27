# memory

Memory - это игра на тренировку памяти.

На игровом столе раскладываются карты. С одной стороны они имеют изображение, с другой “рубашку”.

Каждая карта имеет пару, поэтому общее число карт чётное.

В начале игры все карты открыты, чтобы можно было запомнить их расположение. Далее они переворачиваются “рубашкой” вверх, так что становятся одинаковыми на вид.

Игрок открывает любые 2 карты за один ход.
+ Если открыты одинаковые карты, то они пропадают со стола, а игроку начисляются баллы.
+ Если открыты разные карты, то они переворачиваются обратно “рубашкой” вверх, а количество баллов уменьшается.

### Что сделано:
Внешний вид максимально приближен к макету, реализован адаптив под разные размеры мониторов за счет медиа-запросов
Полностью реализован функционал в соответствии с условиями задания
Добавлена анимация появления карт на игровом поле и эффект наведения курсора на карту.

P.S. вероятней всего, я не совсем правильно понял задание и зря разделил карты на два игровых поля, о том, что две одинаковых карты могут быть рядом, я узнал только тогда, когда дал поиграть в эту игру другому пользователю

### состав приложения

memory@0.0.0 .../Motor/Game/memory  
├── @vitejs/plugin-vue@5.0.4  
├── @vue/test-utils@2.4.4  
├── eslint-plugin-vue@9.22.0  
├── eslint@8.57.0  
├── jsdom@24.0.0  
├── vite@5.1.4  
├── vitest@1.3.1  
├── vue-router@4.3.0  
└── vue@3.4.19  

### Запуск проекта локально:

1. Необходимо скопировать проект к себе на компьютер
2. В терминале перейти в корень проекта
3. Выполнить команду  npm install
4. Выполнить команду  npm run dev
   + проект будет запущен на локальном сервере
   + в терминале будет доступна ссылка для просмотра в браузере
   + обычно это Local: http://localhost:5173/
5. Для остановки локального сервера необходимо нажать  Ctrl + C
