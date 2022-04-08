# Student Hata

Сервис позволяет студентам искать сожителей и квартиры, хозяева которых готовы сдать квартиру в аренду нескольким
студентам.

### Работу выполнил

Веденин Вадим

Группа: M33031

# Сущности

![Image alt](https://github.com/is-web-y23/student-hata/blob/lab3/schema.png)

- User - хранит данные для авторизации.
- Account - связан с User связью one-to-one, хранит данные о человеке (Имя, фамилия, контакты, пол)
- FlatPost - пост о квартире
- FlatPostPhoto - фотография квартиры
- NeighbourForm - анкета для поиска жильца. У одного человека может быть только одна анкета. Следовательно связь one-to-one с User
- Gender - гендеры, с Account связь one-to-one (у одного человека не может быть два гендера). С NeighbourForm связь many-to-many, так как в анкете человек указывает гендеры, с которыми готов жить.
- PreferredGendersOnNeighborForms - таблица для связи many-to-many между NeighbourForm и Gender

