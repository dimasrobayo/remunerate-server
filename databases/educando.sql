CREATE TABLE users(
	id bigint primary key auto_increment,
    email varchar(100) not null unique,
    name varchar(90) not null,
    lastname varchar(90) not null,
    phone varchar(90) not null unique,
    image varchar(255) null,
    password varchar(90),
    create_at timestamp(0),
    update_at timestamp(0)
);

CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'DOCENTE',
    '/docente',
    '2023-03-27',
    '2023-03-27'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'APODERADO',
    '/apoderado',
    '2023-03-27',
    '2023-03-27'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'ESTUDIANTE',
    '/estudiante',
    '2023-03-27',
    '2023-03-27'
);

CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);