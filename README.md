# Отчет о выполненной работе

## Обзор проекта

В рамках данного задания был реализован дашборд для управления A/B тестами. Проект представляет собой веб-приложение, которое позволяет просматривать список тестов, фильтровать их по названию, сортировать по различным параметрам и выполнять действия в зависимости от статуса теста.

## Технический стек

- **Frontend**: React, TypeScript, SCSS
- **Маршрутизация**: React Router
- **Сборка**: Vite
- **API**: REST API (локальный сервер) 

## Реализованные функции

### Дашборд тестов

1. **Отображение списка тестов**
   - Каждый тест представлен в виде строки таблицы с информацией о названии, типе, статусе и сайте
   - Для каждого теста генерируется уникальный цвет для визуального различия

2. **Фильтрация тестов**
   - Реализован поиск по названию теста
   - Отображение количества найденных тестов
   - Возможность сбросить поиск при отсутствии результатов

3. **Сортировка тестов**
   - Возможность сортировать по имени, типу, статусу и сайту
   - Переключение между возрастающей и убывающей сортировкой
   - Специальная логика сортировки для статусов (ONLINE, PAUSED, STOPPED, DRAFT)

4. **Управление тестами**
   - Для тестов со статусом DRAFT доступна кнопка "Finalize"
   - Для остальных тестов доступна кнопка "Results"
   - Реализована навигация на соответствующие страницы

### Интеграция с API

- Получение данных о тестах через API-запросы
- Получение данных о сайтах и связывание их с тестами
- Обработка ошибок при загрузке данных

## Структура проекта

- **components/Dashboard** - компонент дашборда с логикой отображения и управления тестами
- **services/api** - сервисы для работы с API
- **types** - типы данных (Test, Site, Status, Type)
- **App** - основной компонент с настройкой маршрутизации

## Запуск проекта

### Запуск API-сервера

```bash
cd frontend-interview-task-api
npm install
npm start
```

### Запуск фронтенд-приложения

```bash
cd frontend-interview-task/frontend-app
npm install
npm run dev
```

## Особенности реализации

1. **Обработка URL сайтов**
   - Из URL сайтов удаляются протоколы (http://, https://) и префикс www для более компактного отображения

2. **Визуальное оформление статусов**
   - Каждый статус имеет свой стиль отображения для быстрой визуальной идентификации

3. **Адаптивная логика действий**
   - Кнопки действий меняются в зависимости от статуса теста

4. **Оптимизация производительности**
   - Использование useMemo для кэширования цветов карточек
   - Эффективная фильтрация и сортировка данных

## Заключение

Реализованный дашборд предоставляет удобный интерфейс для управления A/B тестами с возможностью фильтрации, сортировки и выполнения действий над тестами. Проект демонстрирует навыки работы с React, TypeScript, управлением состоянием и интеграцией с API.