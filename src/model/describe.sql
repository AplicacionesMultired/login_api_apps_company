# TODO: Está es la descripción de la tabla de usuarios en la base de datos
+----------------------+--------------+------+-----+---------+-------+
| Field                | Type         | Null | Key | Default | Extra |
+----------------------+--------------+------+-----+---------+-------+
| id                   | char(36)     | NO   | PRI | NULL    |       |
| names                | varchar(255) | NO   |     | NULL    |       |
| lastNames            | varchar(255) | NO   |     | NULL    |       |
| document             | bigint       | NO   | UNI | NULL    |       |
| phone                | bigint       | NO   | UNI | NULL    |       |
| email                | varchar(255) | NO   | UNI | NULL    |       |
| username             | varchar(255) | NO   | UNI | NULL    |       |
| password             | varchar(255) | NO   |     | NULL    |       |
| password2            | varchar(255) | YES  |     | NULL    |       |
| state                | tinyint(1)   | NO   |     | 1       |       |
| company              | int          | NO   |     | NULL    |       |
| process              | int          | NO   |     | NULL    |       |
| sub_process          | varchar(255) | NO   |     | NULL    |       |
| resetPasswordToken   | varchar(255) | YES  |     | NULL    |       |
| resetPasswordExpires | datetime     | YES  |     | NULL    |       |
| createdAt            | datetime     | NO   |     | NULL    |       |
| updatedAt            | datetime     | NO   |     | NULL    |       |
+----------------------+--------------+------+-----+---------+-------+