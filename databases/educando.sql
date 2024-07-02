
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
    `country_birth` varchar(100) NOT NULL,
    `nationality` varchar(100) NOT NULL,
    `observaciones` varchar(255) NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
	FOREIGN KEY(country_birth) REFERENCES sys_countries(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(nationality) REFERENCES sys_countries(id) ON UPDATE CASCADE ON DELETE CASCADE,
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

-- Estructura de tabla para la tabla `sys_community`
--
DROP TABLE IF EXISTS `sys_community`;

CREATE TABLE `sys_community` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comuna` varchar(64) NOT NULL,
  `provincia_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=346 DEFAULT CHARSET=utf8;

INSERT INTO `sys_community` (`id`,`comuna`,`provincia_id`)
VALUES
	(1,'Arica',1),
	(2,'Camarones',1),
	(3,'General Lagos',2),
	(4,'Putre',2),
	(5,'Alto Hospicio',3),
	(6,'Iquique',3),
	(7,'Camiña',4),
	(8,'Colchane',4),
	(9,'Huara',4),
	(10,'Pica',4),
	(11,'Pozo Almonte',4),
  	(12,'Tocopilla',5),
  	(13,'María Elena',5),
	(14,'Calama',6),
	(15,'Ollague',6),
	(16,'San Pedro de Atacama',6),
  	(17,'Antofagasta',7),
	(18,'Mejillones',7),
	(19,'Sierra Gorda',7),
	(20,'Taltal',7),
	(21,'Chañaral',8),
	(22,'Diego de Almagro',8),
  	(23,'Copiapó',9),
	(24,'Caldera',9),
	(25,'Tierra Amarilla',9),
  	(26,'Vallenar',10),
	(27,'Alto del Carmen',10),
	(28,'Freirina',10),
	(29,'Huasco',10),
	(30,'La Serena',11),
  	(31,'Coquimbo',11),
  	(32,'Andacollo',11),
  	(33,'La Higuera',11),
  	(34,'Paihuano',11),
	(35,'Vicuña',11),
	(36,'Ovalle',12),
  	(37,'Combarbalá',12),
  	(38,'Monte Patria',12),
  	(39,'Punitaqui',12),
	(40,'Río Hurtado',12),
	(41,'Illapel',13),
	(42,'Canela',13),
	(43,'Los Vilos',13),
	(44,'Salamanca',13),
	(45,'La Ligua',14),
  	(46,'Cabildo',14),
	(47,'Zapallar',14),
  	(48,'Papudo',14),
	(49,'Petorca',14),
	(50,'Los Andes',15),
	(51,'San Esteban',15),
  	(52,'Calle Larga',15),
  	(53,'Rinconada',15),
	(54,'San Felipe',16),
  	(55,'Llaillay',16),
  	(56,'Putaendo',16),
	(57,'Santa María',16),
	(58,'Catemu',16),
	(59,'Panquehue',16),
  	(60,'Quillota',17),
  	(61,'La Cruz',17),
	(62,'La Calera',17),
	(63,'Nogales',17),
  	(64,'Hijuelas',17),
	(65,'Valparaíso',18),	
  	(66,'Viña del Mar',18),
	(67,'Concón',18),
 	(68,'Quintero',18),
  	(69,'Puchuncaví',18),
	(70,'Casablanca',18),
	(71,'Juan Fernández',18),
	(72,'San Antonio',19),
  	(73,'Cartagena',19),
	(74,'El Tabo',19),
	(75,'El Quisco',19),
	(76,'Algarrobo',19),
	(77,'Santo Domingo',19),
	(78,'Isla de Pascua',20),
	(79,'Quilpué',21),
	(80,'Limache',21),
	(81,'Olmué',21),
	(82,'Villa Alemana',21),
	(83,'Colina',22),
	(84,'Lampa',22),
	(85,'Tiltil',22),
	(86,'Santiago',23),
	(87,'Vitacura',23),
  	(88,'San Ramón',23),
	(89,'San Miguel',23),
	(90,'San Joaquín',23),
  	(91,'Renca',23),
	(92,'Recoleta',23),
  	(93,'Quinta Normal',23),
	(94,'Quilicura',23),
  	(95,'Pudahuel',23),
  	(96,'Providencia',23),
	(97,'Peñalolén',23),
  	(98,'Pedro Aguirre Cerda',23),
	(99,'Ñuñoa',23),
	(100,'Maipú',23),
	(101,'Macul',23),
	(102,'Lo Prado',23),
	(103,'Lo Espejo',23),
	(104,'Lo Barnechea',23),
	(105,'Las Condes',23),
	(106,'La Reina',23),
	(107,'La Pintana',23),
	(108,'La Granja',23),
	(109,'La Florida',23),
  	(110,'La Cisterna',23),
  	(111,'Independencia',23),
  	(112,'Huechuraba',23),
	(113,'Estación Central',23),
  	(114,'El Bosque',23),
  	(115,'Conchalí',23),
  	(116,'Cerro Navia',23),
  	(117,'Cerrillos',23),
	(118,'Puente Alto',24),
	(119,'San José de Maipo',24),
  	(120,'Pirque',24),
	(121,'San Bernardo',25),
	(122,'Buin',25),
  	(123,'Paine',25),
	(124,'Calera de Tango',25),
	(125,'Melipilla',26),
	(126,'Alhué',26),
	(127,'Curacaví',26),
	(128,'María Pinto',26),
	(129,'San Pedro',26),
	(130,'Isla de Maipo',27),
  	(131,'El Monte',27),
	(132,'Padre Hurtado',27),
	(133,'Peñaflor',27),
	(134,'Talagante',27),
	(135,'Codegua',28),
	(136,'Coínco',28),
	(137,'Coltauco',28),
	(138,'Doñihue',28),
	(139,'Graneros',28),
	(140,'Las Cabras',28),
	(141,'Machalí',28),
	(142,'Malloa',28),
	(143,'Mostazal',28),
	(144,'Olivar',28),
	(145,'Peumo',28),
	(146,'Pichidegua',28),
	(147,'Quinta de Tilcoco',28),
	(148,'Rancagua',28),
	(149,'Rengo',28),
	(150,'Requínoa',28),
	(151,'San Vicente de Tagua Tagua',28),
	(152,'Chépica',29),
	(153,'Chimbarongo',29),
	(154,'Lolol',29),
  	(155,'Nancagua',29),
  	(156,'Palmilla',29),
  	(157,'Peralillo',29),
	(158,'Placilla',29),
 	(159,'Pumanque',29),
	(160,'San Fernando',29),
	(161,'Santa Cruz',29),
	(162,'La Estrella',30),
	(163,'Litueche',30),
	(164,'Marchigüe',30),
	(165,'Navidad',30),
	(166,'Paredones',30),
	(167,'Pichilemu',30),
	(168,'Curicó',31),
	(169,'Hualañé',31),
	(170,'Licantén',31),
 	(171,'Molina',31),
	(172,'Rauco',31),
	(173,'Romeral',31),
	(174,'Sagrada Familia',31),
	(175,'Teno',31),
	(176,'Vichuquén',31),
	(177,'Talca',32),
	(178,'San Clemente',32),
	(179,'Pelarco',32),
	(180,'Pencahue',32),
	(181,'Maule',32),
	(182,'San Rafael',32),
	(183,'Curepto',33),
	(184,'Constitución',32),
	(185,'Empedrado',32),
	(186,'Río Claro',32),
  	(187,'Linares',33),
	(188,'San Javier',33),
	(189,'Parral',33),
	(190,'Villa Alegre',33),
	(191,'Longaví',33),
	(192,'Colbún',33),
	(193,'Retiro',33),
	(194,'Yerbas Buenas',33),
  	(195,'Cauquenes',34),
	(196,'Chanco',34),
	(197,'Pelluhue',34),
	(198,'Bulnes',35),
	(199,'Chillán',35),
	(200,'Chillán Viejo',35),
	(201,'El Carmen',35),
	(202,'Pemuco',35),
	(203,'Pinto',35),
	(204,'Quillón',35),
	(205,'San Ignacio',35),
	(206,'Yungay',35),
	(207,'Cobquecura',36),
	(208,'Coelemu',36),
	(209,'Ninhue',36),
	(210,'Portezuelo',36),
	(211,'Quirihue',36),
	(212,'Ránquil',36),
	(213,'Treguaco',36),
	(214,'San Carlos',37),
	(215,'Coihueco',37),
	(216,'San Nicolás',37),
	(217,'Ñiquén',37),
	(218,'San Fabián',37),
	(219,'Alto Biobío',38),
	(220,'Antuco',38),
	(221,'Cabrero',38),
	(222,'Laja',38),
	(223,'Los Ángeles',38),
	(224,'Mulchén',38),
	(225,'Nacimiento',38),
	(226,'Negrete',38),
	(227,'Quilaco',38),
	(228,'Quilleco',38),
	(229,'San Rosendo',38),
	(230,'Santa Bárbara',38),
	(231,'Tucapel',38),
	(232,'Yumbel',38),
	(233,'Concepción',39),
	(234,'Coronel',39),
	(235,'Chiguayante',39),
	(236,'Florida',39),
	(237,'Hualpén',39),
	(238,'Hualqui',39),
	(239,'Lota',39),
	(240,'Penco',39),
	(241,'San Pedro de La Paz',39),
	(242,'Santa Juana',39),
	(243,'Talcahuano',39),
	(244,'Tomé',39),
	(245,'Arauco',40),
	(246,'Cañete',40),
	(247,'Contulmo',40),
	(248,'Curanilahue',40),
	(249,'Lebu',40),
	(250,'Los Álamos',40),
	(251,'Tirúa',40),
	(252,'Angol',41),
	(253,'Collipulli',41),
	(254,'Curacautín',41),
	(255,'Ercilla',41),
	(256,'Lonquimay',41),
	(257,'Los Sauces',41),
	(258,'Lumaco',41),
	(259,'Purén',41),
	(260,'Renaico',41),
	(261,'Traiguén',41),
	(262,'Victoria',41),
	(263,'Temuco',42),
	(264,'Carahue',42),
	(265,'Cholchol',42),
	(266,'Cunco',42),
	(267,'Curarrehue',42),
	(268,'Freire',42),
	(269,'Galvarino',42),
	(270,'Gorbea',42),
	(271,'Lautaro',42),
	(272,'Loncoche',42),
	(273,'Melipeuco',42),
	(274,'Nueva Imperial',42),
	(275,'Padre Las Casas',42),
	(276,'Perquenco',42),
	(277,'Pitrufquén',42),
	(278,'Pucón',42),
	(279,'Saavedra',42),
	(280,'Teodoro Schmidt',42),
	(281,'Toltén',42),
	(282,'Vilcún',42),
	(283,'Villarrica',42),
	(284,'Valdivia',43),
	(285,'Corral',43),
	(286,'Lanco',43),
	(287,'Los Lagos',43),
	(288,'Máfil',43),
	(289,'Mariquina',43),
	(290,'Paillaco',43),
	(291,'Panguipulli',43),
	(292,'La Unión',44),
	(293,'Futrono',44),
	(294,'Lago Ranco',44),
	(295,'Río Bueno',44),
	(296,'Osorno',45),
	(297,'Puerto Octay',45),
	(298,'Purranque',45),
	(299,'Puyehue',45),
	(300,'Río Negro',45),
	(301,'San Juan de la Costa',45),
	(302,'San Pablo',45),
	(303,'Calbuco',46),
	(304,'Cochamó',46),
	(305,'Fresia',46),
	(306,'Frutillar',46),
	(307,'Llanquihue',46),
	(308,'Los Muermos',46),
	(309,'Maullín',46),
	(310,'Puerto Montt',46),
	(311,'Puerto Varas',46),
	(312,'Ancud',47),
	(313,'Castro',47),
	(314,'Chonchi',47),
	(315,'Curaco de Vélez',47),
	(316,'Dalcahue',47),
	(317,'Puqueldón',47),
	(318,'Queilén',47),
	(319,'Quellón',47),
	(320,'Quemchi',47),
	(321,'Quinchao',47),
	(322,'Chaitén',48),
	(323,'Futaleufú',48),
	(324,'Hualaihué',48),
	(325,'Palena',48),
	(326,'Lago Verde',49),
	(327,'Coihaique',49),
	(328,'Aysén',50),
	(329,'Cisnes',50),
	(330,'Guaitecas',50),
	(331,'Río Ibáñez',51),
	(332,'Chile Chico',51),
	(333,'Cochrane',52),
	(334,'O\'Higgins',52),
	(335,'Tortel',52),
	(336,'Natales',53),
	(337,'Torres del Paine',53),
	(338,'Laguna Blanca',54),
	(339,'Punta Arenas',54),
	(340,'Río Verde',54),
	(341,'San Gregorio',54),
	(342,'Porvenir',55),
	(343,'Primavera',55),
	(344,'Timaukel',55),
	(345,'Cabo de Hornos',56),
	(346,'Antártica',56);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `sys_provinces`
--	
DROP TABLE IF EXISTS `sys_provinces`;

CREATE TABLE `sys_provinces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provincia` varchar(64) NOT NULL,
  `region_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

INSERT INTO `sys_provinces` (`id`,`provincia`,`region_id`)
VALUES
	(1,'Arica',1),
	(2,'Parinacota',1),
	(3,'Iquique',2),
	(4,'El Tamarugal',2),
	(5,'Tocopilla',3),
	(6,'El Loa',3),
	(7,'Antofagasta',3),
	(8,'Chañaral',4),
	(9,'Copiapó',4),
	(10,'Huasco',4),
	(11,'Elqui',5),
	(12,'Limarí',5),
	(13,'Choapa',5),
 	(14,'Petorca',6),
	(15,'Los Andes',6),
 	(16,'San Felipe de Aconcagua',6),
 	(17,'Quillota',6),
	(18,'Valparaiso',6),
	(19,'San Antonio',6),
	(20,'Isla de Pascua',6),
	(21,'Marga Marga',6),
	(22,'Chacabuco',7),
	(23,'Santiago',7),
	(24,'Cordillera',7),
	(25,'Maipo',7),
	(26,'Melipilla',7),
	(27,'Talagante',7),
	(28,'Cachapoal',8),
	(29,'Colchagua',8),
	(30,'Cardenal Caro',8),
	(31,'Curicó',9),
	(32,'Talca',9),
 	(33,'Linares',9),
	(34,'Cauquenes',9),
	(35,'Diguillín',10),
	(36,'Itata',10),
	(37,'Punilla',10),
	(38,'Bio Bío',11),
	(39,'Concepción',11),
	(40,'Arauco',11),
	(41,'Malleco',12),
	(42,'Cautín',12),
	(43,'Valdivia',13),
	(44,'Ranco',13),
	(45,'Osorno',14),
	(46,'Llanquihue',14),
	(47,'Chiloé',14),
	(48,'Palena',14),
	(49,'Coyhaique',15),
	(50,'Aysén',15),
	(51,'General Carrera',15),
	(52,'Capitán Prat',15),
	(53,'Última Esperanza',16),
	(54,'Magallanes',16),
	(55,'Tierra del Fuego',16),
	(56,'Antártica Chilena',16);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `sys_regions`
--	
DROP TABLE IF EXISTS `sys_regions`;

CREATE TABLE `sys_regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `region` varchar(64) NOT NULL,
  `abreviatura` varchar(4) NOT NULL,
  `capital` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

INSERT INTO `sys_regions` (`id`,`region`,`abreviatura`,`capital`)
VALUES
	(1,'Arica y Parinacota','AP','Arica'),
	(2,'Tarapacá','TA','Iquique'),
	(3,'Antofagasta','AN','Antofagasta'),
	(4,'Atacama','AT','Copiapó'),
	(5,'Coquimbo','CO','La Serena'),
	(6,'Valparaiso','VA','valparaíso'),
	(7,'Metropolitana de Santiago','RM','Santiago'),
	(8,'Libertador General Bernardo O\'Higgins','OH','Rancagua'),
	(9,'Maule','MA','Talca'),
	(10,'Ñuble','NB','Chillán'),
	(11,'Biobío','BI','Concepción'),
	(12,'La Araucanía','IAR','Temuco'),
	(13,'Los Ríos','LR','Valdivia'),
	(14,'Los Lagos','LL','Puerto Montt'),
	(15,'Aysén del General Carlos Ibáñez del Campo','AI','Coyhaique'),
	(16,'Magallanes y de la Antártica Chilena','MG','Punta Arenas');

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `sys_countries`
--	
CREATE TABLE `sys_countries` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`iso` char(2) DEFAULT NULL,
`nombre` varchar(80) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
 
INSERT INTO `sys_countries` VALUES(1, 'AF', 'Afganistán');
INSERT INTO `sys_countries` VALUES(2, 'AX', 'Islas Gland');
INSERT INTO `sys_countries` VALUES(3, 'AL', 'Albania');
INSERT INTO `sys_countries` VALUES(4, 'DE', 'Alemania');
INSERT INTO `sys_countries` VALUES(5, 'AD', 'Andorra');
INSERT INTO `sys_countries` VALUES(6, 'AO', 'Angola');
INSERT INTO `sys_countries` VALUES(7, 'AI', 'Anguilla');
INSERT INTO `sys_countries` VALUES(8, 'AQ', 'Antártida');
INSERT INTO `sys_countries` VALUES(9, 'AG', 'Antigua y Barbuda');
INSERT INTO `sys_countries` VALUES(10, 'AN', 'Antillas Holandesas');
INSERT INTO `sys_countries` VALUES(11, 'SA', 'Arabia Saudí');
INSERT INTO `sys_countries` VALUES(12, 'DZ', 'Argelia');
INSERT INTO `sys_countries` VALUES(13, 'AR', 'Argentina');
INSERT INTO `sys_countries` VALUES(14, 'AM', 'Armenia');
INSERT INTO `sys_countries` VALUES(15, 'AW', 'Aruba');
INSERT INTO `sys_countries` VALUES(16, 'AU', 'Australia');
INSERT INTO `sys_countries` VALUES(17, 'AT', 'Austria');
INSERT INTO `sys_countries` VALUES(18, 'AZ', 'Azerbaiyán');
INSERT INTO `sys_countries` VALUES(19, 'BS', 'Bahamas');
INSERT INTO `sys_countries` VALUES(20, 'BH', 'Bahréin');
INSERT INTO `sys_countries` VALUES(21, 'BD', 'Bangladesh');
INSERT INTO `sys_countries` VALUES(22, 'BB', 'Barbados');
INSERT INTO `sys_countries` VALUES(23, 'BY', 'Bielorrusia');
INSERT INTO `sys_countries` VALUES(24, 'BE', 'Bélgica');
INSERT INTO `sys_countries` VALUES(25, 'BZ', 'Belice');
INSERT INTO `sys_countries` VALUES(26, 'BJ', 'Benin');
INSERT INTO `sys_countries` VALUES(27, 'BM', 'Bermudas');
INSERT INTO `sys_countries` VALUES(28, 'BT', 'Bhután');
INSERT INTO `sys_countries` VALUES(29, 'BO', 'Bolivia');
INSERT INTO `sys_countries` VALUES(30, 'BA', 'Bosnia y Herzegovina');
INSERT INTO `sys_countries` VALUES(31, 'BW', 'Botsuana');
INSERT INTO `sys_countries` VALUES(32, 'BV', 'Isla Bouvet');
INSERT INTO `sys_countries` VALUES(33, 'BR', 'Brasil');
INSERT INTO `sys_countries` VALUES(34, 'BN', 'Brunéi');
INSERT INTO `sys_countries` VALUES(35, 'BG', 'Bulgaria');
INSERT INTO `sys_countries` VALUES(36, 'BF', 'Burkina Faso');
INSERT INTO `sys_countries` VALUES(37, 'BI', 'Burundi');
INSERT INTO `sys_countries` VALUES(38, 'CV', 'Cabo Verde');
INSERT INTO `sys_countries` VALUES(39, 'KY', 'Islas Caimán');
INSERT INTO `sys_countries` VALUES(40, 'KH', 'Camboya');
INSERT INTO `sys_countries` VALUES(41, 'CM', 'Camerún');
INSERT INTO `sys_countries` VALUES(42, 'CA', 'Canadá');
INSERT INTO `sys_countries` VALUES(43, 'CF', 'República Centroafricana');
INSERT INTO `sys_countries` VALUES(44, 'TD', 'Chad');
INSERT INTO `sys_countries` VALUES(45, 'CZ', 'República Checa');
INSERT INTO `sys_countries` VALUES(46, 'CL', 'Chile');
INSERT INTO `sys_countries` VALUES(47, 'CN', 'China');
INSERT INTO `sys_countries` VALUES(48, 'CY', 'Chipre');
INSERT INTO `sys_countries` VALUES(49, 'CX', 'Isla de Navidad');
INSERT INTO `sys_countries` VALUES(50, 'VA', 'Ciudad del Vaticano');
INSERT INTO `sys_countries` VALUES(51, 'CC', 'Islas Cocos');
INSERT INTO `sys_countries` VALUES(52, 'CO', 'Colombia');
INSERT INTO `sys_countries` VALUES(53, 'KM', 'Comoras');
INSERT INTO `sys_countries` VALUES(54, 'CD', 'República Democrática del Congo');
INSERT INTO `sys_countries` VALUES(55, 'CG', 'Congo');
INSERT INTO `sys_countries` VALUES(56, 'CK', 'Islas Cook');
INSERT INTO `sys_countries` VALUES(57, 'KP', 'Corea del Norte');
INSERT INTO `sys_countries` VALUES(58, 'KR', 'Corea del Sur');
INSERT INTO `sys_countries` VALUES(59, 'CI', 'Costa de Marfil');
INSERT INTO `sys_countries` VALUES(60, 'CR', 'Costa Rica');
INSERT INTO `sys_countries` VALUES(61, 'HR', 'Croacia');
INSERT INTO `sys_countries` VALUES(62, 'CU', 'Cuba');
INSERT INTO `sys_countries` VALUES(63, 'DK', 'Dinamarca');
INSERT INTO `sys_countries` VALUES(64, 'DM', 'Dominica');
INSERT INTO `sys_countries` VALUES(65, 'DO', 'República Dominicana');
INSERT INTO `sys_countries` VALUES(66, 'EC', 'Ecuador');
INSERT INTO `sys_countries` VALUES(67, 'EG', 'Egipto');
INSERT INTO `sys_countries` VALUES(68, 'SV', 'El Salvador');
INSERT INTO `sys_countries` VALUES(69, 'AE', 'Emiratos Árabes Unidos');
INSERT INTO `sys_countries` VALUES(70, 'ER', 'Eritrea');
INSERT INTO `sys_countries` VALUES(71, 'SK', 'Eslovaquia');
INSERT INTO `sys_countries` VALUES(72, 'SI', 'Eslovenia');
INSERT INTO `sys_countries` VALUES(73, 'ES', 'España');
INSERT INTO `sys_countries` VALUES(74, 'UM', 'Islas ultramarinas de Estados Unidos');
INSERT INTO `sys_countries` VALUES(75, 'US', 'Estados Unidos');
INSERT INTO `sys_countries` VALUES(76, 'EE', 'Estonia');
INSERT INTO `sys_countries` VALUES(77, 'ET', 'Etiopía');
INSERT INTO `sys_countries` VALUES(78, 'FO', 'Islas Feroe');
INSERT INTO `sys_countries` VALUES(79, 'PH', 'Filipinas');
INSERT INTO `sys_countries` VALUES(80, 'FI', 'Finlandia');
INSERT INTO `sys_countries` VALUES(81, 'FJ', 'Fiyi');
INSERT INTO `sys_countries` VALUES(82, 'FR', 'Francia');
INSERT INTO `sys_countries` VALUES(83, 'GA', 'Gabón');
INSERT INTO `sys_countries` VALUES(84, 'GM', 'Gambia');
INSERT INTO `sys_countries` VALUES(85, 'GE', 'Georgia');
INSERT INTO `sys_countries` VALUES(86, 'GS', 'Islas Georgias del Sur y Sandwich del Sur');
INSERT INTO `sys_countries` VALUES(87, 'GH', 'Ghana');
INSERT INTO `sys_countries` VALUES(88, 'GI', 'Gibraltar');
INSERT INTO `sys_countries` VALUES(89, 'GD', 'Granada');
INSERT INTO `sys_countries` VALUES(90, 'GR', 'Grecia');
INSERT INTO `sys_countries` VALUES(91, 'GL', 'Groenlandia');
INSERT INTO `sys_countries` VALUES(92, 'GP', 'Guadalupe');
INSERT INTO `sys_countries` VALUES(93, 'GU', 'Guam');
INSERT INTO `sys_countries` VALUES(94, 'GT', 'Guatemala');
INSERT INTO `sys_countries` VALUES(95, 'GF', 'Guayana Francesa');
INSERT INTO `sys_countries` VALUES(96, 'GN', 'Guinea');
INSERT INTO `sys_countries` VALUES(97, 'GQ', 'Guinea Ecuatorial');
INSERT INTO `sys_countries` VALUES(98, 'GW', 'Guinea-Bissau');
INSERT INTO `sys_countries` VALUES(99, 'GY', 'Guyana');
INSERT INTO `sys_countries` VALUES(100, 'HT', 'Haití');
INSERT INTO `sys_countries` VALUES(101, 'HM', 'Islas Heard y McDonald');
INSERT INTO `sys_countries` VALUES(102, 'HN', 'Honduras');
INSERT INTO `sys_countries` VALUES(103, 'HK', 'Hong Kong');
INSERT INTO `sys_countries` VALUES(104, 'HU', 'Hungría');
INSERT INTO `sys_countries` VALUES(105, 'IN', 'India');
INSERT INTO `sys_countries` VALUES(106, 'ID', 'Indonesia');
INSERT INTO `sys_countries` VALUES(107, 'IR', 'Irán');
INSERT INTO `sys_countries` VALUES(108, 'IQ', 'Iraq');
INSERT INTO `sys_countries` VALUES(109, 'IE', 'Irlanda');
INSERT INTO `sys_countries` VALUES(110, 'IS', 'Islandia');
INSERT INTO `sys_countries` VALUES(111, 'IL', 'Israel');
INSERT INTO `sys_countries` VALUES(112, 'IT', 'Italia');
INSERT INTO `sys_countries` VALUES(113, 'JM', 'Jamaica');
INSERT INTO `sys_countries` VALUES(114, 'JP', 'Japón');
INSERT INTO `sys_countries` VALUES(115, 'JO', 'Jordania');
INSERT INTO `sys_countries` VALUES(116, 'KZ', 'Kazajstán');
INSERT INTO `sys_countries` VALUES(117, 'KE', 'Kenia');
INSERT INTO `sys_countries` VALUES(118, 'KG', 'Kirguistán');
INSERT INTO `sys_countries` VALUES(119, 'KI', 'Kiribati');
INSERT INTO `sys_countries` VALUES(120, 'KW', 'Kuwait');
INSERT INTO `sys_countries` VALUES(121, 'LA', 'Laos');
INSERT INTO `sys_countries` VALUES(122, 'LS', 'Lesotho');
INSERT INTO `sys_countries` VALUES(123, 'LV', 'Letonia');
INSERT INTO `sys_countries` VALUES(124, 'LB', 'Líbano');
INSERT INTO `sys_countries` VALUES(125, 'LR', 'Liberia');
INSERT INTO `sys_countries` VALUES(126, 'LY', 'Libia');
INSERT INTO `sys_countries` VALUES(127, 'LI', 'Liechtenstein');
INSERT INTO `sys_countries` VALUES(128, 'LT', 'Lituania');
INSERT INTO `sys_countries` VALUES(129, 'LU', 'Luxemburgo');
INSERT INTO `sys_countries` VALUES(130, 'MO', 'Macao');
INSERT INTO `sys_countries` VALUES(131, 'MK', 'ARY Macedonia');
INSERT INTO `sys_countries` VALUES(132, 'MG', 'Madagascar');
INSERT INTO `sys_countries` VALUES(133, 'MY', 'Malasia');
INSERT INTO `sys_countries` VALUES(134, 'MW', 'Malawi');
INSERT INTO `sys_countries` VALUES(135, 'MV', 'Maldivas');
INSERT INTO `sys_countries` VALUES(136, 'ML', 'Malí');
INSERT INTO `sys_countries` VALUES(137, 'MT', 'Malta');
INSERT INTO `sys_countries` VALUES(138, 'FK', 'Islas Malvinas');
INSERT INTO `sys_countries` VALUES(139, 'MP', 'Islas Marianas del Norte');
INSERT INTO `sys_countries` VALUES(140, 'MA', 'Marruecos');
INSERT INTO `sys_countries` VALUES(141, 'MH', 'Islas Marshall');
INSERT INTO `sys_countries` VALUES(142, 'MQ', 'Martinica');
INSERT INTO `sys_countries` VALUES(143, 'MU', 'Mauricio');
INSERT INTO `sys_countries` VALUES(144, 'MR', 'Mauritania');
INSERT INTO `sys_countries` VALUES(145, 'YT', 'Mayotte');
INSERT INTO `sys_countries` VALUES(146, 'MX', 'México');
INSERT INTO `sys_countries` VALUES(147, 'FM', 'Micronesia');
INSERT INTO `sys_countries` VALUES(148, 'MD', 'Moldavia');
INSERT INTO `sys_countries` VALUES(149, 'MC', 'Mónaco');
INSERT INTO `sys_countries` VALUES(150, 'MN', 'Mongolia');
INSERT INTO `sys_countries` VALUES(151, 'MS', 'Montserrat');
INSERT INTO `sys_countries` VALUES(152, 'MZ', 'Mozambique');
INSERT INTO `sys_countries` VALUES(153, 'MM', 'Myanmar');
INSERT INTO `sys_countries` VALUES(154, 'NA', 'Namibia');
INSERT INTO `sys_countries` VALUES(155, 'NR', 'Nauru');
INSERT INTO `sys_countries` VALUES(156, 'NP', 'Nepal');
INSERT INTO `sys_countries` VALUES(157, 'NI', 'Nicaragua');
INSERT INTO `sys_countries` VALUES(158, 'NE', 'Níger');
INSERT INTO `sys_countries` VALUES(159, 'NG', 'Nigeria');
INSERT INTO `sys_countries` VALUES(160, 'NU', 'Niue');
INSERT INTO `sys_countries` VALUES(161, 'NF', 'Isla Norfolk');
INSERT INTO `sys_countries` VALUES(162, 'NO', 'Noruega');
INSERT INTO `sys_countries` VALUES(163, 'NC', 'Nueva Caledonia');
INSERT INTO `sys_countries` VALUES(164, 'NZ', 'Nueva Zelanda');
INSERT INTO `sys_countries` VALUES(165, 'OM', 'Omán');
INSERT INTO `sys_countries` VALUES(166, 'NL', 'Países Bajos');
INSERT INTO `sys_countries` VALUES(167, 'PK', 'Pakistán');
INSERT INTO `sys_countries` VALUES(168, 'PW', 'Palau');
INSERT INTO `sys_countries` VALUES(169, 'PS', 'Palestina');
INSERT INTO `sys_countries` VALUES(170, 'PA', 'Panamá');
INSERT INTO `sys_countries` VALUES(171, 'PG', 'Papúa Nueva Guinea');
INSERT INTO `sys_countries` VALUES(172, 'PY', 'Paraguay');
INSERT INTO `sys_countries` VALUES(173, 'PE', 'Perú');
INSERT INTO `sys_countries` VALUES(174, 'PN', 'Islas Pitcairn');
INSERT INTO `sys_countries` VALUES(175, 'PF', 'Polinesia Francesa');
INSERT INTO `sys_countries` VALUES(176, 'PL', 'Polonia');
INSERT INTO `sys_countries` VALUES(177, 'PT', 'Portugal');
INSERT INTO `sys_countries` VALUES(178, 'PR', 'Puerto Rico');
INSERT INTO `sys_countries` VALUES(179, 'QA', 'Qatar');
INSERT INTO `sys_countries` VALUES(180, 'GB', 'Reino Unido');
INSERT INTO `sys_countries` VALUES(181, 'RE', 'Reunión');
INSERT INTO `sys_countries` VALUES(182, 'RW', 'Ruanda');
INSERT INTO `sys_countries` VALUES(183, 'RO', 'Rumania');
INSERT INTO `sys_countries` VALUES(184, 'RU', 'Rusia');
INSERT INTO `sys_countries` VALUES(185, 'EH', 'Sahara Occidental');
INSERT INTO `sys_countries` VALUES(186, 'SB', 'Islas Salomón');
INSERT INTO `sys_countries` VALUES(187, 'WS', 'Samoa');
INSERT INTO `sys_countries` VALUES(188, 'AS', 'Samoa Americana');
INSERT INTO `sys_countries` VALUES(189, 'KN', 'San Cristóbal y Nevis');
INSERT INTO `sys_countries` VALUES(190, 'SM', 'San Marino');
INSERT INTO `sys_countries` VALUES(191, 'PM', 'San Pedro y Miquelón');
INSERT INTO `sys_countries` VALUES(192, 'VC', 'San Vicente y las Granadinas');
INSERT INTO `sys_countries` VALUES(193, 'SH', 'Santa Helena');
INSERT INTO `sys_countries` VALUES(194, 'LC', 'Santa Lucía');
INSERT INTO `sys_countries` VALUES(195, 'ST', 'Santo Tomé y Príncipe');
INSERT INTO `sys_countries` VALUES(196, 'SN', 'Senegal');
INSERT INTO `sys_countries` VALUES(197, 'CS', 'Serbia y Montenegro');
INSERT INTO `sys_countries` VALUES(198, 'SC', 'Seychelles');
INSERT INTO `sys_countries` VALUES(199, 'SL', 'Sierra Leona');
INSERT INTO `sys_countries` VALUES(200, 'SG', 'Singapur');
INSERT INTO `sys_countries` VALUES(201, 'SY', 'Siria');
INSERT INTO `sys_countries` VALUES(202, 'SO', 'Somalia');
INSERT INTO `sys_countries` VALUES(203, 'LK', 'Sri Lanka');
INSERT INTO `sys_countries` VALUES(204, 'SZ', 'Suazilandia');
INSERT INTO `sys_countries` VALUES(205, 'ZA', 'Sudáfrica');
INSERT INTO `sys_countries` VALUES(206, 'SD', 'Sudán');
INSERT INTO `sys_countries` VALUES(207, 'SE', 'Suecia');
INSERT INTO `sys_countries` VALUES(208, 'CH', 'Suiza');
INSERT INTO `sys_countries` VALUES(209, 'SR', 'Surinam');
INSERT INTO `sys_countries` VALUES(210, 'SJ', 'Svalbard y Jan Mayen');
INSERT INTO `sys_countries` VALUES(211, 'TH', 'Tailandia');
INSERT INTO `sys_countries` VALUES(212, 'TW', 'Taiwán');
INSERT INTO `sys_countries` VALUES(213, 'TZ', 'Tanzania');
INSERT INTO `sys_countries` VALUES(214, 'TJ', 'Tayikistán');
INSERT INTO `sys_countries` VALUES(215, 'IO', 'Territorio Británico del Océano Índico');
INSERT INTO `sys_countries` VALUES(216, 'TF', 'Territorios Australes Franceses');
INSERT INTO `sys_countries` VALUES(217, 'TL', 'Timor Oriental');
INSERT INTO `sys_countries` VALUES(218, 'TG', 'Togo');
INSERT INTO `sys_countries` VALUES(219, 'TK', 'Tokelau');
INSERT INTO `sys_countries` VALUES(220, 'TO', 'Tonga');
INSERT INTO `sys_countries` VALUES(221, 'TT', 'Trinidad y Tobago');
INSERT INTO `sys_countries` VALUES(222, 'TN', 'Túnez');
INSERT INTO `sys_countries` VALUES(223, 'TC', 'Islas Turcas y Caicos');
INSERT INTO `sys_countries` VALUES(224, 'TM', 'Turkmenistán');
INSERT INTO `sys_countries` VALUES(225, 'TR', 'Turquía');
INSERT INTO `sys_countries` VALUES(226, 'TV', 'Tuvalu');
INSERT INTO `sys_countries` VALUES(227, 'UA', 'Ucrania');
INSERT INTO `sys_countries` VALUES(228, 'UG', 'Uganda');
INSERT INTO `sys_countries` VALUES(229, 'UY', 'Uruguay');
INSERT INTO `sys_countries` VALUES(230, 'UZ', 'Uzbekistán');
INSERT INTO `sys_countries` VALUES(231, 'VU', 'Vanuatu');
INSERT INTO `sys_countries` VALUES(232, 'VE', 'Venezuela');
INSERT INTO `sys_countries` VALUES(233, 'VN', 'Vietnam');
INSERT INTO `sys_countries` VALUES(234, 'VG', 'Islas Vírgenes Británicas');
INSERT INTO `sys_countries` VALUES(235, 'VI', 'Islas Vírgenes de los Estados Unidos');
INSERT INTO `sys_countries` VALUES(236, 'WF', 'Wallis y Futuna');
INSERT INTO `sys_countries` VALUES(237, 'YE', 'Yemen');
INSERT INTO `sys_countries` VALUES(238, 'DJ', 'Yibuti');
INSERT INTO `sys_countries` VALUES(239, 'ZM', 'Zambia');
INSERT INTO `sys_countries` VALUES(240, 'ZW', 'Zimbabue');

