
--
-- Estructura de tabla para la tabla `user_personal_info`
--

CREATE TABLE `user_personal_info` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(150) NOT NULL,
    `lastname` varchar(150) NOT NULL,
    `mother_lastname` varchar(150) NOT NULL,
    `type_document` varchar(45), 
    `document_number` varchar(11) NOT NULL,
    `gender` varchar(45) NOT NULL,
    `phone` varchar(90) NOT NULL,
    `image` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL,
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `user_personal_info` (`id`, `name`, `lastname`, `mother_lastname`, `type_document`, `document_number`, `gender`, `phone`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'dimas daniel', 'robayo', 'madrid', 'run', '27129088-8', 'masculino', '+56956594791', NULL, '2023-07-13 20:01:55', '2023-07-13 20:01:55', '0000-00-00 00:00:00');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_health_information`
--
CREATE TABLE `user_health_information` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_personal_info_id` int(11) NOT NULL,
    `blood_type` varchar(100) NOT NULL,
    `allergy` varchar(100) NOT NULL,
    `observation` varchar(255) NULL,
    `created_ad` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(user_personal_info_id) REFERENCES user_personal_info(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_social_information`
--
CREATE TABLE `user_social_information` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_personal_info_id` int(11) NOT NULL,
    `email` varchar(100) NOT NULL,
    `phone` varchar(45) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(user_personal_info_id) REFERENCES user_personal_info(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_civilian_information`
--
CREATE TABLE `user_civilian_information` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_personal_info_id` int(11) NOT NULL,
    `birthdate` varchar(100) NOT NULL,
    `country_birth` varchar(45) NOT NULL,
    `nationality` varchar(45) NOT NULL,
    `observaciones` varchar(255) NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(user_personal_info_id) REFERENCES user_personal_info(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_addresses`
--

CREATE TABLE `user_addresses` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `address` varchar(255) NOT NULL,
    `codigo_postal` varchar(50) NOT NULL,
    `comuna_id` int(11) NOT NULL,
    `department_number` varchar(50) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_addresses_personal_info`
--
CREATE TABLE `user_addresses_personal_info` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `address_id` int(11) NOT NULL,
    `user_personal_info_id` int(11) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(user_personal_info_id) REFERENCES user_personal_info(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(address_id) REFERENCES user_addresses(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status_users`
--
CREATE TABLE `status_users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `description` varchar(50) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `status_users` (`id`, `description`, `created_at`, `updated_at`) VALUES
(1, 'ACTIVO', '2023-08-01 03:10:31', '2023-08-01 03:10:31'),
(2, 'INACTIVO', '2023-08-01 03:10:31', '2023-08-01 03:10:31');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--
CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP
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
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--
CREATE TABLE `users` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `status_user_id` INT NOT NULL,
    `user_personal_info_id` INT NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(90) NOT NULL,
    `email_verified_at` timestamp NULL,
    `my_color` varchar(10) NULL DEFAULT '#4daf4d',
    `grayscale` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` timestamp NULL DEFAULT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(status_user_id) REFERENCES status_users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(user_personal_info_id) REFERENCES user_personal_info(id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO `users` (`id`, `status_user_id`, `user_personal_info_id`, `email`, `password`, `email_verified_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 'drobayo@educando.com', '$2a$10$DhsC7zsvsJpHwpDQlIkmpOhup6lh9ifjB/wgA79ZcsNxym0YJspou', '0000-00-00 00:00:00', '2023-07-13 20:01:55', '2023-07-13 20:01:55', '0000-00-00 00:00:00');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_has_roles`
--
CREATE TABLE user_has_roles(
	users_id BIGINT NOT NULL,
    roles_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(users_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(roles_id) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(users_id, roles_id)
);

INSERT INTO `user_has_roles` (`users_id`, `roles_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2023-07-27 12:41:22', '2023-07-27 12:41:22');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_types_teachings`
--
CREATE TABLE `sys_types_teachings` (
  `id` int(11) NOT NULL,
  `codigo` VARCHAR(20)NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `status` enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO',
  `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
ALTER TABLE `sys_types_teachings` ADD PRIMARY KEY (`id`);
ALTER TABLE `sys_types_teachings` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_grades`
--
CREATE TABLE `sys_grades` (
  	`id` int(11) NOT NULL AUTO_INCREMENT,
  	`name` varchar(50) DEFAULT NULL,
  	`code_grade` varchar(20) DEFAULT NULL,
  	`sys_type_teaching_id` int(11) DEFAULT NULL,
  	`created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  	`updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  	`deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
	FOREIGN KEY(sys_type_teaching_id) REFERENCES sys_types_teachings(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_courses`
--
CREATE TABLE `sys_courses` (
  	`id` int(11) NOT NULL AUTO_INCREMENT,
  	`name` varchar(50) DEFAULT NULL,
  	`code_course` varchar(20) DEFAULT NULL,
  	`sys_grade_id` int(11) DEFAULT NULL,
  	`created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  	`updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  	`deleted_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
	FOREIGN KEY(sys_grade_id) REFERENCES sys_grades(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------