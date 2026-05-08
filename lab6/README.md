# Лабораторна робота №6

## Задоєнко Роман ІПЗ-24-3

## Опис проекту
Цей застосунок демонструє інтеграцію **Firebase Authentication** та **Cloud Firestore** у мобільний додаток на базі **React Native** . Основна мета — реалізація надійного механізму автентифікації користувачів та захищеного сховища їхніх персональних даних.

## Реалізований функціонал
У межах лабораторної роботи було впроваджено наступні можливості:

1.  **Авторизація користувача:**
    * Реєстрація нового акаунта за допомогою Email та пароля.
    * Вхід у систему для існуючих користувачів.
    * Вихід із системи (Sign Out).
2.  **Збереження персональних даних:**
    * Після входу користувач може заповнити або оновити профіль: **ім'я, вік, місто**.
    * Дані синхронізуються з **Firebase Firestore** у колекції `users`.
    * ID документа відповідає унікальному `uid` користувача.
3.  **Захист доступу:**
    * Навігація розділена на групи `(auth)` та `(app)` за допомогою **Expo Router**.
    * Використано **AuthContext** для централізованого керування станом авторизації.
    * Налаштовано **Firestore Security Rules** для перевірки `uid`, що забороняє доступ до чужих даних.
4.  **Керування обліковим записом:**
    * Редагування полів профілю через форму.
    * **Видалення акаунта** з обов’язковою повторною автентифікацією для безпеки.
5.  **Відновлення паролю:**
    * Можливість зміни або скидання пароля через email за допомогою Firebase API.

## Інструкція запуску

* Встановлення залежностей: npm install
* Запуск застосунку: npx expo start

## Скріншоти роботи застосунку

## <img width="591" height="1280" alt="photo_11_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/dadae025-39cc-4466-8025-c2ef4399ed70" />
## <img width="591" height="1280" alt="photo_1_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/70c8b6e2-5776-4d0c-82c2-1f18dd796a3d" />
## <img width="591" height="1280" alt="photo_2_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/acc93ea3-64d7-424e-9f6e-5e54ac0ccc99" />
## <img width="591" height="1280" alt="photo_3_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/507ac6e5-e365-4197-9015-31216963af69" />
## <img width="591" height="1280" alt="photo_4_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/9a88f892-1176-44ba-b142-d3e3069c8a34" />
## <img width="591" height="1280" alt="photo_5_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/88148f96-e3fc-44f5-9647-bea6af0c03c5" />
## <img width="591" height="1280" alt="photo_6_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/19487a66-3cc4-4661-ac13-80f2d7220f40" />
## <img width="591" height="1280" alt="photo_7_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/5f7c1946-189f-494b-a31d-f98c8c97155f" />
## <img width="591" height="1280" alt="photo_8_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/bd21db8a-abe9-4975-af61-c8ce841aaaed" />
## <img width="591" height="1280" alt="photo_9_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/efcfdc17-4881-49c6-a483-1e8bdb82e397" />
## <img width="591" height="1280" alt="photo_10_2026-05-08_00-27-02" src="https://github.com/user-attachments/assets/fbc4d3be-6bc1-4f11-abe9-947f9065ef17" />
## <img width="1529" height="359" alt="Снимок экрана 2026-05-08 000822" src="https://github.com/user-attachments/assets/3d79d699-f9b4-4b06-8617-48929d0590f8" />

## Висновки   
Під час виконання лабораторної роботи №6 я набув практичного досвіду роботи з хмарними сервісами Google Firebase. 
Зокрема:
* Навчився реалізовувати повний цикл авторизації користувача.
* Опанував роботу з NoSQL базою даних Firestore для зберігання профілів.
* Реалізував захищену навігацію та серверні правила безпеки для захисту приватних даних.
