<p>Работа выполнена студентом:</p>
<p>Веденин Вадим</p>
<p>Группа: M33031</p>

# Сущности

<ul>
<li>User - хранит данные для авторизации.</li>
<li>Account - связан с User связью one-to-one, хранит данные о человеке (Имя, фамилия, контакты, пол)</li>
<li>FlatPost - пост о квартире</li>
<li>FlatPostPhoto - фотография квартиры</li>
<li>NeighbourForm - анкета для поиска жильца. У одного человека может быть только одна анкета. Следовательно связь one-to-one с User</li>
<li>Gender - гендеры, с Account связь one-to-one (у одного человека не может быть два гендера). С NeighbourForm связь many-to-many, так как в анкете человек указывает гендеры, с которыми готов жить.
<li>PreferredGendersOnNeighborForms - таблица для связи many-to-many между NeighbourForm и Gender</li>
</ul>
