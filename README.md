# Proyecto tareas

## Preparación del entorno

Lo primero que debemos de hacer para asegurar que nuestro proyecto va a correr de forma normal es contar con las siguientes caracteristicas:

*postgreSQL

*node


## Comando para postgreSQL

```sql
CREATE DATABASE tasks;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deleted_at TIMESTAMP
);

CREATE TABLE categories (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
description TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
description TEXT,
user_id INTEGER NOT NULL,
category_id INTEGER NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE tasks_tags (
id SERIAL PRIMARY KEY,
task_id INTEGER NOT NULL,
tag_id INTEGER NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (task_id) REFERENCES tasks(id),
FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```