-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 20-02-2024 a las 18:22:58
-- Versión del servidor: 10.3.39-MariaDB-0ubuntu0.20.04.2
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `educando_developer_2`
--

DELIMITER $$
--
-- Funciones
--
CREATE DEFINER=`admin`@`localhost` AGGREGATE FUNCTION `JSON_ARRAYAGG`(next_value TEXT) RETURNS text CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN  

 DECLARE json TEXT DEFAULT '[""]'$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(90) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `route` varchar(180) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `image`, `route`, `created_at`, `updated_at`) VALUES
(1, 'DOCENTE', NULL, '/docente', '2023-03-27 03:00:00', '2023-03-27 03:00:00'),
(2, 'APODERADO', NULL, '/apoderado', '2023-03-27 03:00:00', '2023-03-27 03:00:00'),
(3, 'ESTUDIANTE', NULL, '/estudiante', '2023-03-27 03:00:00', '2023-03-27 03:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status_users`
--

CREATE TABLE `status_users` (
  `id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `status_users`
--

INSERT INTO `status_users` (`id`, `description`, `created_at`, `updated_at`) VALUES
(1, 'ACTIVO', '2023-08-01 07:10:31', '2023-08-01 07:10:31'),
(2, 'INACTIVO', '2023-08-01 07:10:31', '2023-08-01 07:10:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_community`
--

CREATE TABLE `sys_community` (
  `id` int(11) NOT NULL,
  `comuna` varchar(64) NOT NULL,
  `provincia_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `sys_community`
--

INSERT INTO `sys_community` (`id`, `comuna`, `provincia_id`) VALUES
(1, 'Arica', 1),
(2, 'Camarones', 1),
(3, 'General Lagos', 2),
(4, 'Putre', 2),
(5, 'Alto Hospicio', 3),
(6, 'Iquique', 3),
(7, 'Camiña', 4),
(8, 'Colchane', 4),
(9, 'Huara', 4),
(10, 'Pica', 4),
(11, 'Pozo Almonte', 4),
(12, 'Tocopilla', 5),
(13, 'María Elena', 5),
(14, 'Calama', 6),
(15, 'Ollague', 6),
(16, 'San Pedro de Atacama', 6),
(17, 'Antofagasta', 7),
(18, 'Mejillones', 7),
(19, 'Sierra Gorda', 7),
(20, 'Taltal', 7),
(21, 'Chañaral', 8),
(22, 'Diego de Almagro', 8),
(23, 'Copiapó', 9),
(24, 'Caldera', 9),
(25, 'Tierra Amarilla', 9),
(26, 'Vallenar', 10),
(27, 'Alto del Carmen', 10),
(28, 'Freirina', 10),
(29, 'Huasco', 10),
(30, 'La Serena', 11),
(31, 'Coquimbo', 11),
(32, 'Andacollo', 11),
(33, 'La Higuera', 11),
(34, 'Paihuano', 11),
(35, 'Vicuña', 11),
(36, 'Ovalle', 12),
(37, 'Combarbalá', 12),
(38, 'Monte Patria', 12),
(39, 'Punitaqui', 12),
(40, 'Río Hurtado', 12),
(41, 'Illapel', 13),
(42, 'Canela', 13),
(43, 'Los Vilos', 13),
(44, 'Salamanca', 13),
(45, 'La Ligua', 14),
(46, 'Cabildo', 14),
(47, 'Zapallar', 14),
(48, 'Papudo', 14),
(49, 'Petorca', 14),
(50, 'Los Andes', 15),
(51, 'San Esteban', 15),
(52, 'Calle Larga', 15),
(53, 'Rinconada', 15),
(54, 'San Felipe', 16),
(55, 'Llaillay', 16),
(56, 'Putaendo', 16),
(57, 'Santa María', 16),
(58, 'Catemu', 16),
(59, 'Panquehue', 16),
(60, 'Quillota', 17),
(61, 'La Cruz', 17),
(62, 'La Calera', 17),
(63, 'Nogales', 17),
(64, 'Hijuelas', 17),
(65, 'Valparaíso', 18),
(66, 'Viña del Mar', 18),
(67, 'Concón', 18),
(68, 'Quintero', 18),
(69, 'Puchuncaví', 18),
(70, 'Casablanca', 18),
(71, 'Juan Fernández', 18),
(72, 'San Antonio', 19),
(73, 'Cartagena', 19),
(74, 'El Tabo', 19),
(75, 'El Quisco', 19),
(76, 'Algarrobo', 19),
(77, 'Santo Domingo', 19),
(78, 'Isla de Pascua', 20),
(79, 'Quilpué', 21),
(80, 'Limache', 21),
(81, 'Olmué', 21),
(82, 'Villa Alemana', 21),
(83, 'Colina', 22),
(84, 'Lampa', 22),
(85, 'Tiltil', 22),
(86, 'Santiago', 23),
(87, 'Vitacura', 23),
(88, 'San Ramón', 23),
(89, 'San Miguel', 23),
(90, 'San Joaquín', 23),
(91, 'Renca', 23),
(92, 'Recoleta', 23),
(93, 'Quinta Normal', 23),
(94, 'Quilicura', 23),
(95, 'Pudahuel', 23),
(96, 'Providencia', 23),
(97, 'Peñalolén', 23),
(98, 'Pedro Aguirre Cerda', 23),
(99, 'Ñuñoa', 23),
(100, 'Maipú', 23),
(101, 'Macul', 23),
(102, 'Lo Prado', 23),
(103, 'Lo Espejo', 23),
(104, 'Lo Barnechea', 23),
(105, 'Las Condes', 23),
(106, 'La Reina', 23),
(107, 'La Pintana', 23),
(108, 'La Granja', 23),
(109, 'La Florida', 23),
(110, 'La Cisterna', 23),
(111, 'Independencia', 23),
(112, 'Huechuraba', 23),
(113, 'Estación Central', 23),
(114, 'El Bosque', 23),
(115, 'Conchalí', 23),
(116, 'Cerro Navia', 23),
(117, 'Cerrillos', 23),
(118, 'Puente Alto', 24),
(119, 'San José de Maipo', 24),
(120, 'Pirque', 24),
(121, 'San Bernardo', 25),
(122, 'Buin', 25),
(123, 'Paine', 25),
(124, 'Calera de Tango', 25),
(125, 'Melipilla', 26),
(126, 'Alhué', 26),
(127, 'Curacaví', 26),
(128, 'María Pinto', 26),
(129, 'San Pedro', 26),
(130, 'Isla de Maipo', 27),
(131, 'El Monte', 27),
(132, 'Padre Hurtado', 27),
(133, 'Peñaflor', 27),
(134, 'Talagante', 27),
(135, 'Codegua', 28),
(136, 'Coínco', 28),
(137, 'Coltauco', 28),
(138, 'Doñihue', 28),
(139, 'Graneros', 28),
(140, 'Las Cabras', 28),
(141, 'Machalí', 28),
(142, 'Malloa', 28),
(143, 'Mostazal', 28),
(144, 'Olivar', 28),
(145, 'Peumo', 28),
(146, 'Pichidegua', 28),
(147, 'Quinta de Tilcoco', 28),
(148, 'Rancagua', 28),
(149, 'Rengo', 28),
(150, 'Requínoa', 28),
(151, 'San Vicente de Tagua Tagua', 28),
(152, 'Chépica', 29),
(153, 'Chimbarongo', 29),
(154, 'Lolol', 29),
(155, 'Nancagua', 29),
(156, 'Palmilla', 29),
(157, 'Peralillo', 29),
(158, 'Placilla', 29),
(159, 'Pumanque', 29),
(160, 'San Fernando', 29),
(161, 'Santa Cruz', 29),
(162, 'La Estrella', 30),
(163, 'Litueche', 30),
(164, 'Marchigüe', 30),
(165, 'Navidad', 30),
(166, 'Paredones', 30),
(167, 'Pichilemu', 30),
(168, 'Curicó', 31),
(169, 'Hualañé', 31),
(170, 'Licantén', 31),
(171, 'Molina', 31),
(172, 'Rauco', 31),
(173, 'Romeral', 31),
(174, 'Sagrada Familia', 31),
(175, 'Teno', 31),
(176, 'Vichuquén', 31),
(177, 'Talca', 32),
(178, 'San Clemente', 32),
(179, 'Pelarco', 32),
(180, 'Pencahue', 32),
(181, 'Maule', 32),
(182, 'San Rafael', 32),
(183, 'Curepto', 33),
(184, 'Constitución', 32),
(185, 'Empedrado', 32),
(186, 'Río Claro', 32),
(187, 'Linares', 33),
(188, 'San Javier', 33),
(189, 'Parral', 33),
(190, 'Villa Alegre', 33),
(191, 'Longaví', 33),
(192, 'Colbún', 33),
(193, 'Retiro', 33),
(194, 'Yerbas Buenas', 33),
(195, 'Cauquenes', 34),
(196, 'Chanco', 34),
(197, 'Pelluhue', 34),
(198, 'Bulnes', 35),
(199, 'Chillán', 35),
(200, 'Chillán Viejo', 35),
(201, 'El Carmen', 35),
(202, 'Pemuco', 35),
(203, 'Pinto', 35),
(204, 'Quillón', 35),
(205, 'San Ignacio', 35),
(206, 'Yungay', 35),
(207, 'Cobquecura', 36),
(208, 'Coelemu', 36),
(209, 'Ninhue', 36),
(210, 'Portezuelo', 36),
(211, 'Quirihue', 36),
(212, 'Ránquil', 36),
(213, 'Treguaco', 36),
(214, 'San Carlos', 37),
(215, 'Coihueco', 37),
(216, 'San Nicolás', 37),
(217, 'Ñiquén', 37),
(218, 'San Fabián', 37),
(219, 'Alto Biobío', 38),
(220, 'Antuco', 38),
(221, 'Cabrero', 38),
(222, 'Laja', 38),
(223, 'Los Ángeles', 38),
(224, 'Mulchén', 38),
(225, 'Nacimiento', 38),
(226, 'Negrete', 38),
(227, 'Quilaco', 38),
(228, 'Quilleco', 38),
(229, 'San Rosendo', 38),
(230, 'Santa Bárbara', 38),
(231, 'Tucapel', 38),
(232, 'Yumbel', 38),
(233, 'Concepción', 39),
(234, 'Coronel', 39),
(235, 'Chiguayante', 39),
(236, 'Florida', 39),
(237, 'Hualpén', 39),
(238, 'Hualqui', 39),
(239, 'Lota', 39),
(240, 'Penco', 39),
(241, 'San Pedro de La Paz', 39),
(242, 'Santa Juana', 39),
(243, 'Talcahuano', 39),
(244, 'Tomé', 39),
(245, 'Arauco', 40),
(246, 'Cañete', 40),
(247, 'Contulmo', 40),
(248, 'Curanilahue', 40),
(249, 'Lebu', 40),
(250, 'Los Álamos', 40),
(251, 'Tirúa', 40),
(252, 'Angol', 41),
(253, 'Collipulli', 41),
(254, 'Curacautín', 41),
(255, 'Ercilla', 41),
(256, 'Lonquimay', 41),
(257, 'Los Sauces', 41),
(258, 'Lumaco', 41),
(259, 'Purén', 41),
(260, 'Renaico', 41),
(261, 'Traiguén', 41),
(262, 'Victoria', 41),
(263, 'Temuco', 42),
(264, 'Carahue', 42),
(265, 'Cholchol', 42),
(266, 'Cunco', 42),
(267, 'Curarrehue', 42),
(268, 'Freire', 42),
(269, 'Galvarino', 42),
(270, 'Gorbea', 42),
(271, 'Lautaro', 42),
(272, 'Loncoche', 42),
(273, 'Melipeuco', 42),
(274, 'Nueva Imperial', 42),
(275, 'Padre Las Casas', 42),
(276, 'Perquenco', 42),
(277, 'Pitrufquén', 42),
(278, 'Pucón', 42),
(279, 'Saavedra', 42),
(280, 'Teodoro Schmidt', 42),
(281, 'Toltén', 42),
(282, 'Vilcún', 42),
(283, 'Villarrica', 42),
(284, 'Valdivia', 43),
(285, 'Corral', 43),
(286, 'Lanco', 43),
(287, 'Los Lagos', 43),
(288, 'Máfil', 43),
(289, 'Mariquina', 43),
(290, 'Paillaco', 43),
(291, 'Panguipulli', 43),
(292, 'La Unión', 44),
(293, 'Futrono', 44),
(294, 'Lago Ranco', 44),
(295, 'Río Bueno', 44),
(296, 'Osorno', 45),
(297, 'Puerto Octay', 45),
(298, 'Purranque', 45),
(299, 'Puyehue', 45),
(300, 'Río Negro', 45),
(301, 'San Juan de la Costa', 45),
(302, 'San Pablo', 45),
(303, 'Calbuco', 46),
(304, 'Cochamó', 46),
(305, 'Fresia', 46),
(306, 'Frutillar', 46),
(307, 'Llanquihue', 46),
(308, 'Los Muermos', 46),
(309, 'Maullín', 46),
(310, 'Puerto Montt', 46),
(311, 'Puerto Varas', 46),
(312, 'Ancud', 47),
(313, 'Castro', 47),
(314, 'Chonchi', 47),
(315, 'Curaco de Vélez', 47),
(316, 'Dalcahue', 47),
(317, 'Puqueldón', 47),
(318, 'Queilén', 47),
(319, 'Quellón', 47),
(320, 'Quemchi', 47),
(321, 'Quinchao', 47),
(322, 'Chaitén', 48),
(323, 'Futaleufú', 48),
(324, 'Hualaihué', 48),
(325, 'Palena', 48),
(326, 'Lago Verde', 49),
(327, 'Coihaique', 49),
(328, 'Aysén', 50),
(329, 'Cisnes', 50),
(330, 'Guaitecas', 50),
(331, 'Río Ibáñez', 51),
(332, 'Chile Chico', 51),
(333, 'Cochrane', 52),
(334, 'O\'Higgins', 52),
(335, 'Tortel', 52),
(336, 'Natales', 53),
(337, 'Torres del Paine', 53),
(338, 'Laguna Blanca', 54),
(339, 'Punta Arenas', 54),
(340, 'Río Verde', 54),
(341, 'San Gregorio', 54),
(342, 'Porvenir', 55),
(343, 'Primavera', 55),
(344, 'Timaukel', 55),
(345, 'Cabo de Hornos', 56),
(346, 'Antártica', 56);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_countries`
--

CREATE TABLE `sys_countries` (
  `id` int(11) NOT NULL,
  `iso` char(2) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `phone_code` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `sys_countries`
--

INSERT INTO `sys_countries` (`id`, `iso`, `name`, `phone_code`) VALUES
(1, 'AF', 'Afganistán', 93),
(2, 'AL', 'Albania', 355),
(3, 'DE', 'Alemania', 49),
(4, 'AD', 'Andorra', 376),
(5, 'AO', 'Angola', 244),
(7, 'AQ', 'Antártida', 672),
(9, 'SA', 'Arabia Saudita', 966),
(10, 'DZ', 'Argelia', 213),
(11, 'AR', 'Argentina', 54),
(12, 'AM', 'Armenia', 374),
(13, 'AW', 'Aruba', 297),
(14, 'AU', 'Australia', 61),
(15, 'AT', 'Austria', 43),
(16, 'AZ', 'Azerbaiyán', 994),
(17, 'BE', 'Bélgica', 32),
(19, 'BH', 'Bahrein', 973),
(20, 'BD', 'Bangladesh', 880),
(22, 'BZ', 'Belice', 501),
(23, 'BJ', 'Benín', 229),
(24, 'BT', 'Bhután', 975),
(25, 'BY', 'Bielorrusia', 375),
(26, 'MM', 'Birmania', 95),
(27, 'BO', 'Bolivia', 591),
(28, 'BA', 'Bosnia y Herzegovina', 387),
(29, 'BW', 'Botsuana', 267),
(30, 'BR', 'Brasil', 55),
(31, 'BN', 'Brunéi', 673),
(32, 'BG', 'Bulgaria', 359),
(33, 'BF', 'Burkina Faso', 226),
(34, 'BI', 'Burundi', 257),
(35, 'CV', 'Cabo Verde', 238),
(36, 'KH', 'Camboya', 855),
(37, 'CM', 'Camerún', 237),
(38, 'CA', 'Canadá', 1),
(39, 'TD', 'Chad', 235),
(40, 'CL', 'Chile', 56),
(41, 'CN', 'China', 86),
(42, 'CY', 'Chipre', 357),
(43, 'VA', 'Ciudad del Vaticano', 39),
(44, 'CO', 'Colombia', 57),
(45, 'KM', 'Comoras', 269),
(46, 'CG', 'República del Congo', 242),
(47, 'CD', 'República Democrática del Congo', 243),
(48, 'KP', 'Corea del Norte', 850),
(49, 'KR', 'Corea del Sur', 82),
(50, 'CI', 'Costa de Marfil', 225),
(51, 'CR', 'Costa Rica', 506),
(52, 'HR', 'Croacia', 385),
(53, 'CU', 'Cuba', 53),
(54, 'CW', 'Curazao', 5999),
(55, 'DK', 'Dinamarca', 45),
(57, 'EC', 'Ecuador', 593),
(58, 'EG', 'Egipto', 20),
(59, 'SV', 'El Salvador', 503),
(60, 'AE', 'Emiratos Árabes Unidos', 971),
(61, 'ER', 'Eritrea', 291),
(62, 'SK', 'Eslovaquia', 421),
(63, 'SI', 'Eslovenia', 386),
(64, 'ES', 'España', 34),
(65, 'US', 'Estados Unidos de América', 1),
(66, 'EE', 'Estonia', 372),
(67, 'ET', 'Etiopía', 251),
(68, 'PH', 'Filipinas', 63),
(69, 'FI', 'Finlandia', 358),
(70, 'FJ', 'Fiyi', 679),
(71, 'FR', 'Francia', 33),
(72, 'GA', 'Gabón', 241),
(73, 'GM', 'Gambia', 220),
(74, 'GE', 'Georgia', 995),
(75, 'GH', 'Ghana', 233),
(76, 'GI', 'Gibraltar', 350),
(78, 'GR', 'Grecia', 30),
(79, 'GL', 'Groenlandia', 299),
(80, 'GP', 'Guadalupe', 590),
(82, 'GT', 'Guatemala', 502),
(83, 'GF', 'Guayana Francesa', 594),
(84, 'GG', 'Guernsey', 44),
(85, 'GN', 'Guinea', 224),
(86, 'GQ', 'Guinea Ecuatorial', 240),
(87, 'GW', 'Guinea-Bissau', 245),
(88, 'GY', 'Guyana', 592),
(89, 'HT', 'Haití', 509),
(90, 'HN', 'Honduras', 504),
(91, 'HK', 'Hong kong', 852),
(92, 'HU', 'Hungría', 36),
(93, 'IN', 'India', 91),
(94, 'ID', 'Indonesia', 62),
(95, 'IR', 'Irán', 98),
(96, 'IQ', 'Irak', 964),
(97, 'IE', 'Irlanda', 353),
(99, 'IM', 'Isla de Man', 44),
(100, 'CX', 'Isla de Navidad', 61),
(101, 'NF', 'Isla Norfolk', 672),
(102, 'IS', 'Islandia', 354),
(105, 'CC', 'Islas Cocos (Keeling)', 61),
(106, 'CK', 'Islas Cook', 682),
(107, 'AX', 'Islas de Åland', 358),
(108, 'FO', 'Islas Feroe', 298),
(109, 'GS', 'Islas Georgias del Sur y Sandwich del Sur', 500),
(111, 'MV', 'Islas Maldivas', 960),
(112, 'FK', 'Islas Malvinas', 500),
(114, 'MH', 'Islas Marshall', 692),
(115, 'PN', 'Islas Pitcairn', 870),
(116, 'SB', 'Islas Salomón', 677),
(118, 'UM', 'Islas Ultramarinas Menores de Estados Unidos', 246),
(121, 'IL', 'Israel', 972),
(122, 'IT', 'Italia', 39),
(124, 'JP', 'Japón', 81),
(125, 'JE', 'Jersey', 44),
(126, 'JO', 'Jordania', 962),
(127, 'KZ', 'Kazajistán', 7),
(128, 'KE', 'Kenia', 254),
(129, 'KG', 'Kirguistán', 996),
(130, 'KI', 'Kiribati', 686),
(131, 'KW', 'Kuwait', 965),
(132, 'LB', 'Líbano', 961),
(133, 'LA', 'Laos', 856),
(134, 'LS', 'Lesoto', 266),
(135, 'LV', 'Letonia', 371),
(136, 'LR', 'Liberia', 231),
(137, 'LY', 'Libia', 218),
(138, 'LI', 'Liechtenstein', 423),
(139, 'LT', 'Lituania', 370),
(140, 'LU', 'Luxemburgo', 352),
(141, 'MX', 'México', 52),
(142, 'MC', 'Mónaco', 377),
(143, 'MO', 'Macao', 853),
(144, 'MK', 'Macedônia', 389),
(145, 'MG', 'Madagascar', 261),
(146, 'MY', 'Malasia', 60),
(147, 'MW', 'Malawi', 265),
(148, 'ML', 'Mali', 223),
(149, 'MT', 'Malta', 356),
(150, 'MA', 'Marruecos', 212),
(151, 'MQ', 'Martinica', 596),
(152, 'MU', 'Mauricio', 230),
(153, 'MR', 'Mauritania', 222),
(154, 'YT', 'Mayotte', 262),
(155, 'FM', 'Micronesia', 691),
(156, 'MD', 'Moldavia', 373),
(157, 'MN', 'Mongolia', 976),
(158, 'ME', 'Montenegro', 382),
(160, 'MZ', 'Mozambique', 258),
(161, 'NA', 'Namibia', 264),
(162, 'NR', 'Nauru', 674),
(163, 'NP', 'Nepal', 977),
(164, 'NI', 'Nicaragua', 505),
(165, 'NE', 'Niger', 227),
(166, 'NG', 'Nigeria', 234),
(167, 'NU', 'Niue', 683),
(168, 'NO', 'Noruega', 47),
(169, 'NC', 'Nueva Caledonia', 687),
(170, 'NZ', 'Nueva Zelanda', 64),
(171, 'OM', 'Omán', 968),
(172, 'NL', 'Países Bajos', 31),
(173, 'PK', 'Pakistán', 92),
(174, 'PW', 'Palau', 680),
(175, 'PS', 'Palestina', 970),
(176, 'PA', 'Panamá', 507),
(177, 'PG', 'Papúa Nueva Guinea', 675),
(178, 'PY', 'Paraguay', 595),
(179, 'PE', 'Perú', 51),
(180, 'PF', 'Polinesia Francesa', 689),
(181, 'PL', 'Polonia', 48),
(182, 'PT', 'Portugal', 351),
(183, 'PR', 'Puerto Rico', 1),
(184, 'QA', 'Qatar', 974),
(185, 'GB', 'Reino Unido', 44),
(186, 'CF', 'República Centroafricana', 236),
(187, 'CZ', 'República Checa', 420),
(189, 'SS', 'República de Sudán del Sur', 211),
(190, 'RE', 'Reunión', 262),
(191, 'RW', 'Ruanda', 250),
(192, 'RO', 'Rumanía', 40),
(193, 'RU', 'Rusia', 7),
(194, 'EH', 'Sahara Occidental', 212),
(195, 'WS', 'Samoa', 685),
(197, 'BL', 'San Bartolomé', 590),
(199, 'SM', 'San Marino', 378),
(201, 'PM', 'San Pedro y Miquelón', 508),
(203, 'SH', 'Santa Elena', 290),
(205, 'ST', 'Santo Tomé y Príncipe', 239),
(206, 'SN', 'Senegal', 221),
(207, 'RS', 'Serbia', 381),
(208, 'SC', 'Seychelles', 248),
(209, 'SL', 'Sierra Leona', 232),
(210, 'SG', 'Singapur', 65),
(212, 'SY', 'Siria', 963),
(213, 'SO', 'Somalia', 252),
(214, 'LK', 'Sri lanka', 94),
(215, 'ZA', 'Sudáfrica', 27),
(216, 'SD', 'Sudán', 249),
(217, 'SE', 'Suecia', 46),
(218, 'CH', 'Suiza', 41),
(219, 'SR', 'Surinám', 597),
(220, 'SJ', 'Svalbard y Jan Mayen', 47),
(221, 'SZ', 'Swazilandia', 268),
(222, 'TJ', 'Tayikistán', 992),
(223, 'TH', 'Tailandia', 66),
(224, 'TW', 'Taiwán', 886),
(225, 'TZ', 'Tanzania', 255),
(226, 'IO', 'Territorio Británico del Océano Índico', 246),
(228, 'TL', 'Timor Oriental', 670),
(229, 'TG', 'Togo', 228),
(230, 'TK', 'Tokelau', 690),
(231, 'TO', 'Tonga', 676),
(233, 'TN', 'Tunez', 216),
(234, 'TM', 'Turkmenistán', 993),
(235, 'TR', 'Turquía', 90),
(236, 'TV', 'Tuvalu', 688),
(237, 'UA', 'Ucrania', 380),
(238, 'UG', 'Uganda', 256),
(239, 'UY', 'Uruguay', 598),
(240, 'UZ', 'Uzbekistán', 998),
(241, 'VU', 'Vanuatu', 678),
(242, 'VE', 'Venezuela', 58),
(243, 'VN', 'Vietnam', 84),
(244, 'WF', 'Wallis y Futuna', 681),
(245, 'YE', 'Yemen', 967),
(246, 'DJ', 'Yibuti', 253),
(247, 'ZM', 'Zambia', 260),
(248, 'ZW', 'Zimbabue', 263);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_courses`
--

CREATE TABLE `sys_courses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `code_course` varchar(20) DEFAULT NULL,
  `sys_grade_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sys_courses`
--

INSERT INTO `sys_courses` (`id`, `name`, `code_course`, `sys_grade_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'PK-A', '001', 7, '2023-09-15 14:28:23', '2023-10-30 23:35:41', NULL),
(2, 'PK-B', '001', 7, '2023-09-15 14:36:56', '2023-09-15 14:36:56', '2023-09-15 17:40:15'),
(3, 'PK-B', '002', 7, '2023-09-15 18:49:24', '2023-10-30 23:48:16', NULL),
(4, 'PB-A', '003', 9, '2023-10-30 16:46:27', '2023-10-30 23:48:23', NULL),
(5, 'PB-B', '004', 9, '2023-10-30 20:33:29', '2023-12-06 19:51:09', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_courses_teachers`
--

CREATE TABLE `sys_courses_teachers` (
  `id` int(11) NOT NULL,
  `sys_teachers_id` int(11) DEFAULT NULL,
  `sys_courses_id` int(11) DEFAULT NULL,
  `isBoss` tinyint(1) DEFAULT NULL,
  `isInspector` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sys_courses_teachers`
--

INSERT INTO `sys_courses_teachers` (`id`, `sys_teachers_id`, `sys_courses_id`, `isBoss`, `isInspector`, `created_at`, `updated_at`, `deleted_at`) VALUES
(20, 56, 4, 1, 1, '2024-02-07 20:46:34', '2024-02-07 20:46:34', NULL),
(21, 56, 5, 1, 1, '2024-02-07 20:46:34', '2024-02-07 20:46:34', NULL),
(60, 1, 1, 1, 0, '2024-02-10 21:18:33', '2024-02-10 21:18:33', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_files`
--

CREATE TABLE `sys_files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `moduleName` varchar(255) NOT NULL,
  `upload_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sys_files`
--

INSERT INTO `sys_files` (`id`, `name`, `path`, `moduleName`, `upload_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1708016821863_2.csv', '/var/www/html/CBT-Development/node/uploads/educando_developer_2/tmp/2', 'teacher', 2, NULL, NULL, NULL),
(2, '1708427090216_2.csv', '/var/www/html/CBT-Development/node/uploads/educando_developer_2/tmp/2', 'teacher', 2, NULL, NULL, NULL),
(3, '1708428272528_2.csv', '/var/www/html/CBT-Development/node/uploads/educando_developer_2/tmp/2', 'teacher', 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_grades`
--

CREATE TABLE `sys_grades` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `code_grade` varchar(20) DEFAULT NULL,
  `sys_type_teaching_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sys_grades`
--

INSERT INTO `sys_grades` (`id`, `name`, `code_grade`, `sys_type_teaching_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(7, 'PRE-KINDER', '000', 1, '2023-09-14 19:53:41', '2023-09-15 00:33:24', NULL),
(8, 'KINDER', '001', 1, '2023-09-14 20:22:36', '2023-09-15 00:32:07', NULL),
(9, 'PRIMERO BÁSICO', '002', 1, '2023-09-14 20:43:41', '2023-10-30 23:27:18', NULL),
(10, 'SEGUNDO BÁSICO', '003', 1, '2023-09-14 20:46:02', '2023-10-30 23:27:10', NULL),
(11, 'TERCERO BÁSICO', '004', 1, '2023-10-30 15:56:27', '2023-10-30 23:26:36', NULL),
(12, 'CUARTO BÁSICO', '005', 1, '2023-10-30 20:28:11', '2023-10-30 20:28:11', NULL),
(13, 'Ciencias Naturalessssss', '078', 1, '2023-12-07 20:46:46', '2023-12-07 20:46:46', '2023-12-07 23:46:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_grades_subjects`
--

CREATE TABLE `sys_grades_subjects` (
  `id` int(11) NOT NULL,
  `sys_grade_id` int(11) DEFAULT NULL,
  `sys_subjects_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sys_grades_subjects`
--

INSERT INTO `sys_grades_subjects` (`id`, `sys_grade_id`, `sys_subjects_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 9, 1, '2023-11-07 17:16:21', '2023-11-07 17:16:21', NULL),
(2, 10, 1, '2023-11-07 17:16:21', '2023-11-07 17:16:21', NULL),
(3, 11, 1, '2023-11-07 17:16:21', '2023-11-07 17:16:21', NULL),
(4, 12, 1, '2023-11-07 17:16:21', '2023-11-07 17:16:21', NULL),
(5, 9, 2, '2023-11-07 17:16:21', '2023-11-07 17:16:21', NULL),
(6, 10, 2, '2023-11-07 17:16:21', '2023-11-07 17:16:21', NULL),
(7, 11, 2, '2023-11-07 17:16:21', '2023-11-07 17:16:21', NULL),
(8, 12, 2, '2023-11-07 17:16:21', '2023-11-07 17:16:21', NULL),
(17, 9, 3, '2023-11-08 18:16:34', '2023-11-08 18:16:34', NULL),
(18, 10, 3, '2023-11-08 18:16:34', '2023-11-08 18:16:34', NULL),
(19, 11, 3, '2023-11-08 18:16:34', '2023-11-08 18:16:34', NULL),
(20, 12, 3, '2023-11-08 18:16:34', '2023-11-08 18:16:34', NULL),
(21, 9, 4, '2023-11-08 18:16:34', '2023-11-08 18:16:34', NULL),
(22, 10, 4, '2023-11-08 18:16:34', '2023-11-08 18:16:34', NULL),
(23, 11, 4, '2023-11-08 18:16:34', '2023-11-08 18:16:34', NULL),
(24, 12, 4, '2023-11-08 18:16:34', '2023-11-08 18:16:34', NULL),
(25, 9, 5, '2023-11-08 21:14:12', '2023-11-08 21:14:12', NULL),
(26, 10, 5, '2023-11-08 21:14:12', '2023-11-08 21:14:12', NULL),
(27, 11, 5, '2023-11-08 21:14:12', '2023-11-08 21:14:12', NULL),
(28, 12, 5, '2023-11-08 21:14:12', '2023-11-08 21:14:12', NULL),
(45, 8, 12, '2023-12-05 19:12:23', '2023-12-05 19:12:23', NULL),
(62, 8, 19, '2023-12-13 16:04:32', '2023-12-13 16:04:32', NULL),
(63, 9, 20, '2024-01-23 14:38:38', '2024-01-23 14:38:38', NULL),
(64, 10, 20, '2024-01-23 14:38:38', '2024-01-23 14:38:38', NULL),
(65, 11, 20, '2024-01-23 14:38:38', '2024-01-23 14:38:38', NULL),
(66, 12, 20, '2024-01-23 14:38:38', '2024-01-23 14:38:38', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_provinces`
--

CREATE TABLE `sys_provinces` (
  `id` int(11) NOT NULL,
  `provincia` varchar(64) NOT NULL,
  `region_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `sys_provinces`
--

INSERT INTO `sys_provinces` (`id`, `provincia`, `region_id`) VALUES
(1, 'Arica', 1),
(2, 'Parinacota', 1),
(3, 'Iquique', 2),
(4, 'El Tamarugal', 2),
(5, 'Tocopilla', 3),
(6, 'El Loa', 3),
(7, 'Antofagasta', 3),
(8, 'Chañaral', 4),
(9, 'Copiapó', 4),
(10, 'Huasco', 4),
(11, 'Elqui', 5),
(12, 'Limarí', 5),
(13, 'Choapa', 5),
(14, 'Petorca', 6),
(15, 'Los Andes', 6),
(16, 'San Felipe de Aconcagua', 6),
(17, 'Quillota', 6),
(18, 'Valparaiso', 6),
(19, 'San Antonio', 6),
(20, 'Isla de Pascua', 6),
(21, 'Marga Marga', 6),
(22, 'Chacabuco', 7),
(23, 'Santiago', 7),
(24, 'Cordillera', 7),
(25, 'Maipo', 7),
(26, 'Melipilla', 7),
(27, 'Talagante', 7),
(28, 'Cachapoal', 8),
(29, 'Colchagua', 8),
(30, 'Cardenal Caro', 8),
(31, 'Curicó', 9),
(32, 'Talca', 9),
(33, 'Linares', 9),
(34, 'Cauquenes', 9),
(35, 'Diguillín', 10),
(36, 'Itata', 10),
(37, 'Punilla', 10),
(38, 'Bio Bío', 11),
(39, 'Concepción', 11),
(40, 'Arauco', 11),
(41, 'Malleco', 12),
(42, 'Cautín', 12),
(43, 'Valdivia', 13),
(44, 'Ranco', 13),
(45, 'Osorno', 14),
(46, 'Llanquihue', 14),
(47, 'Chiloé', 14),
(48, 'Palena', 14),
(49, 'Coyhaique', 15),
(50, 'Aysén', 15),
(51, 'General Carrera', 15),
(52, 'Capitán Prat', 15),
(53, 'Última Esperanza', 16),
(54, 'Magallanes', 16),
(55, 'Tierra del Fuego', 16),
(56, 'Antártica Chilena', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_regions`
--

CREATE TABLE `sys_regions` (
  `id` int(11) NOT NULL,
  `region` varchar(64) NOT NULL,
  `abreviatura` varchar(4) NOT NULL,
  `capital` varchar(64) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `sys_regions`
--

INSERT INTO `sys_regions` (`id`, `region`, `abreviatura`, `capital`) VALUES
(1, 'Arica y Parinacota', 'AP', 'Arica'),
(2, 'Tarapacá', 'TA', 'Iquique'),
(3, 'Antofagasta', 'AN', 'Antofagasta'),
(4, 'Atacama', 'AT', 'Copiapó'),
(5, 'Coquimbo', 'CO', 'La Serena'),
(6, 'Valparaiso', 'VA', 'valparaíso'),
(7, 'Metropolitana de Santiago', 'RM', 'Santiago'),
(8, 'Libertador General Bernardo O\'Higgins', 'OH', 'Rancagua'),
(9, 'Maule', 'MA', 'Talca'),
(10, 'Ñuble', 'NB', 'Chillán'),
(11, 'Biobío', 'BI', 'Concepción'),
(12, 'La Araucanía', 'IAR', 'Temuco'),
(13, 'Los Ríos', 'LR', 'Valdivia'),
(14, 'Los Lagos', 'LL', 'Puerto Montt'),
(15, 'Aysén del General Carlos Ibáñez del Campo', 'AI', 'Coyhaique'),
(16, 'Magallanes y de la Antártica Chilena', 'MG', 'Punta Arenas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_subjects`
--

CREATE TABLE `sys_subjects` (
  `id` int(11) NOT NULL,
  `sys_type_subjects_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `code_mineduc` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `hour` int(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sys_subjects`
--

INSERT INTO `sys_subjects` (`id`, `sys_type_subjects_id`, `name`, `code_mineduc`, `status`, `color`, `hour`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Matemáticas', 32, NULL, '#FF10A3', 10, '2023-11-07 17:16:21', '2023-11-08 21:06:45', NULL),
(2, 2, 'Matemáticas', 32, NULL, '#bd10e0', 10, '2023-11-07 17:16:21', '2023-12-12 00:20:58', NULL),
(3, 1, 'Lenguaje y Comunicación', 5, NULL, '#FF9838', 12, '2023-11-08 18:16:34', '2023-11-08 22:53:31', NULL),
(4, 2, 'Lenguaje y Comunicacion', 32, NULL, '#f5a623', 10, '2023-11-08 18:16:34', '2023-12-12 00:20:48', NULL),
(5, 1, 'Ciencias Ntaturales.', 5, NULL, '', 12, '2023-11-08 21:14:12', '2023-12-12 00:28:44', NULL),
(12, 2, 'Taller Matemáticas', 32, NULL, '#6e1919', 8, '2023-12-05 19:12:23', '2023-12-05 19:12:23', '2023-12-05 22:12:31'),
(19, 1, 'sssssss', 87, NULL, '#905353', 8, '2023-12-13 16:04:32', '2023-12-13 16:04:32', '2023-12-13 19:04:49'),
(20, 1, 'Historia, Geografía y Ciencias Sociales', 89, NULL, '#4A90E2', 10, '2024-01-23 14:38:38', '2024-01-23 14:38:38', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_subjects_teachers`
--

CREATE TABLE `sys_subjects_teachers` (
  `id` int(11) NOT NULL,
  `sys_teachers_id` int(11) DEFAULT NULL,
  `sys_grades_subjects_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_teachers`
--

CREATE TABLE `sys_teachers` (
  `id` int(11) NOT NULL,
  `user_personal_info_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_types_teachings`
--

CREATE TABLE `sys_types_teachings` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sys_types_teachings`
--

INSERT INTO `sys_types_teachings` (`id`, `codigo`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, '010', 'EDUCACIÓN BÁSICA', 'ACTIVO', '2023-09-14 15:56:12', '2023-12-06 19:50:33'),
(2, '310', 'EDUCACIÓN MEDIA', 'ACTIVO', '2023-09-14 15:56:21', '2023-10-30 18:55:48'),
(9, '020', 'EDUCACIÓN PARVULARIA', 'ACTIVO', '2023-11-13 13:39:53', '2023-11-13 16:40:04'),
(10, '320', 'EDUCACIÓN MEDIA TÉCNICO PROFESIONAL', 'ACTIVO', '2023-11-13 13:53:16', '2023-11-13 13:53:16'),
(11, '410', 'EDUCACIÓN SUPERIOR UNIVERSITARIA', 'ACTIVO', '2023-11-13 13:53:51', '2023-11-13 13:53:51'),
(12, '420', 'EDUCACIÓN SUPERIOR NO UNIVERSITARIA', 'ACTIVO', '2023-11-13 13:54:11', '2023-11-13 13:54:11'),
(13, '910', 'EDUCACIÓN ESPECIAL', 'ACTIVO', '2023-11-13 17:12:01', '2023-11-13 17:12:01'),
(14, '920', 'EDUCACIÓN DE ADULTOS', 'ACTIVO', '2023-11-13 17:12:28', '2023-11-13 17:12:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_type_subjects`
--

CREATE TABLE `sys_type_subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sys_type_subjects`
--

INSERT INTO `sys_type_subjects` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ASIGNATURAS', '2023-11-07 16:45:45', '2023-11-07 16:45:45', NULL),
(2, 'TALLERES', '2023-11-07 16:45:45', '2023-11-07 16:45:45', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `status_user_id` int(11) NOT NULL,
  `user_personal_info_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(90) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `my_color` varchar(10) NOT NULL DEFAULT '#4daf4d',
  `grayscale` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `status_user_id`, `user_personal_info_id`, `email`, `password`, `email_verified_at`, `my_color`, `grayscale`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 1, 1, 'dimasrobayo@gmail.com', '$2a$10$OhkNkSxivwd1agi2GomtZuSh4Pvkan8w5OJ4Z5yqLf1lvrzqvNyFy', NULL, '#4a90e2', 0, '2023-08-07 19:10:25', '2024-01-24 23:41:51', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `codigo_postal` varchar(50) DEFAULT NULL,
  `department_number` varchar(50) NOT NULL,
  `sys_community_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_addresses`
--

INSERT INTO `user_addresses` (`id`, `address`, `codigo_postal`, `department_number`, `sys_community_id`, `created_at`, `updated_at`) VALUES
(1, 'albarez de toledo 764', '7970007', '706-Sur', 89, '2023-08-30 20:25:37', '2024-02-07 23:46:34'),
(2, 'Pedro Leon Ugalde 864', NULL, '1017', 89, '2024-02-07 20:38:49', '2024-02-08 23:16:46'),
(14, 'Alvarez de toledo 764', NULL, '706-Sur', 89, '2024-02-08 18:56:56', '2024-02-11 00:20:11'),
(15, 'test', NULL, '1', 17, '2024-02-20 11:04:24', '2024-02-20 11:04:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_addresses_personal_info`
--

CREATE TABLE `user_addresses_personal_info` (
  `id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `user_personal_info_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_addresses_personal_info`
--

INSERT INTO `user_addresses_personal_info` (`id`, `address_id`, `user_personal_info_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2023-08-30 20:27:25', '2023-08-30 20:27:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_civilian_information`
--

CREATE TABLE `user_civilian_information` (
  `id` int(11) NOT NULL,
  `user_personal_info_id` int(11) NOT NULL,
  `birthdate` varchar(10) NOT NULL,
  `country_birth` varchar(50) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_civilian_information`
--

INSERT INTO `user_civilian_information` (`id`, `user_personal_info_id`, `birthdate`, `country_birth`, `nationality`, `observaciones`, `created_at`, `updated_at`) VALUES
(1, 1, '1984-09-04', '40', '242', NULL, '2023-08-17 19:56:18', '2024-01-23 19:55:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_has_roles`
--

CREATE TABLE `user_has_roles` (
  `users_id` bigint(20) NOT NULL,
  `roles_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_has_roles`
--

INSERT INTO `user_has_roles` (`users_id`, `roles_id`, `created_at`, `updated_at`) VALUES
(2, 1, '2023-08-07 19:10:25', '2023-08-07 19:10:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_health_information`
--

CREATE TABLE `user_health_information` (
  `id` int(11) NOT NULL,
  `user_personal_info_id` int(11) NOT NULL,
  `blood_type` varchar(100) NOT NULL,
  `allergy` varchar(100) NOT NULL,
  `observation` varchar(255) NOT NULL,
  `created_ad` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_health_information`
--

INSERT INTO `user_health_information` (`id`, `user_personal_info_id`, `blood_type`, `allergy`, `observation`, `created_ad`, `updated_at`) VALUES
(3, 1, 'OA+', 'Ninguna', 'En caso de emergencia contarcar a los padres.', '2023-09-09 00:07:26', '2024-01-23 19:55:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_personal_info`
--

CREATE TABLE `user_personal_info` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `lastname` varchar(150) NOT NULL,
  `mother_lastname` varchar(150) NOT NULL,
  `type_document` varchar(45) DEFAULT NULL,
  `document_number` varchar(11) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `phone` varchar(90) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_personal_info`
--

INSERT INTO `user_personal_info` (`id`, `name`, `lastname`, `mother_lastname`, `type_document`, `document_number`, `gender`, `phone`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Dimas Daniel', 'Robayo', 'Madrid', 'rut', '27129088-8', 'masculino', '+56956594792', NULL, '2023-07-14 00:01:55', '2023-07-14 00:01:55', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_social_information`
--

CREATE TABLE `user_social_information` (
  `id` int(11) NOT NULL,
  `user_personal_info_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_social_information`
--

INSERT INTO `user_social_information` (`id`, `user_personal_info_id`, `email`, `phone`, `created_at`, `updated_at`) VALUES
(4, 1, 'dimasrobayo@gmail.com', '+56956594792', '2023-09-09 00:21:49', '2024-01-23 19:55:45');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `status_users`
--
ALTER TABLE `status_users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sys_community`
--
ALTER TABLE `sys_community`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sys_countries`
--
ALTER TABLE `sys_countries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sys_courses`
--
ALTER TABLE `sys_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_grade_id` (`sys_grade_id`);

--
-- Indices de la tabla `sys_courses_teachers`
--
ALTER TABLE `sys_courses_teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sys_teachers_courses` (`sys_teachers_id`,`sys_courses_id`) USING BTREE,
  ADD KEY `sys_teachers_id` (`sys_teachers_id`) USING BTREE,
  ADD KEY `sys_courses_id` (`sys_courses_id`) USING BTREE;

--
-- Indices de la tabla `sys_files`
--
ALTER TABLE `sys_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_files_upload_by_foreign` (`upload_by`);

--
-- Indices de la tabla `sys_grades`
--
ALTER TABLE `sys_grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_type_teaching_id` (`sys_type_teaching_id`);

--
-- Indices de la tabla `sys_grades_subjects`
--
ALTER TABLE `sys_grades_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_grade_id` (`sys_grade_id`),
  ADD KEY `sys_subjects_id` (`sys_subjects_id`);

--
-- Indices de la tabla `sys_provinces`
--
ALTER TABLE `sys_provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sys_regions`
--
ALTER TABLE `sys_regions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sys_subjects`
--
ALTER TABLE `sys_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_type_subjects_id` (`sys_type_subjects_id`);

--
-- Indices de la tabla `sys_subjects_teachers`
--
ALTER TABLE `sys_subjects_teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_teachers_id` (`sys_teachers_id`),
  ADD KEY `sys_grades_subjects_id` (`sys_grades_subjects_id`);

--
-- Indices de la tabla `sys_teachers`
--
ALTER TABLE `sys_teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_personal_info_id` (`user_personal_info_id`);

--
-- Indices de la tabla `sys_types_teachings`
--
ALTER TABLE `sys_types_teachings`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sys_type_subjects`
--
ALTER TABLE `sys_type_subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_user_id` (`status_user_id`),
  ADD KEY `user_personal_info_id` (`user_personal_info_id`);

--
-- Indices de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sys_community_id` (`sys_community_id`);

--
-- Indices de la tabla `user_addresses_personal_info`
--
ALTER TABLE `user_addresses_personal_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_personal_info_id` (`user_personal_info_id`) USING BTREE,
  ADD KEY `address_id` (`address_id`);

--
-- Indices de la tabla `user_civilian_information`
--
ALTER TABLE `user_civilian_information`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_personal_info_id` (`user_personal_info_id`) USING BTREE;

--
-- Indices de la tabla `user_has_roles`
--
ALTER TABLE `user_has_roles`
  ADD PRIMARY KEY (`users_id`,`roles_id`),
  ADD KEY `roles_id` (`roles_id`);

--
-- Indices de la tabla `user_health_information`
--
ALTER TABLE `user_health_information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_personal_info_id` (`user_personal_info_id`);

--
-- Indices de la tabla `user_personal_info`
--
ALTER TABLE `user_personal_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document_number` (`document_number`);

--
-- Indices de la tabla `user_social_information`
--
ALTER TABLE `user_social_information`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_personal_info_id` (`user_personal_info_id`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `status_users`
--
ALTER TABLE `status_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sys_community`
--
ALTER TABLE `sys_community`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=347;

--
-- AUTO_INCREMENT de la tabla `sys_countries`
--
ALTER TABLE `sys_countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=249;

--
-- AUTO_INCREMENT de la tabla `sys_courses`
--
ALTER TABLE `sys_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sys_courses_teachers`
--
ALTER TABLE `sys_courses_teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `sys_files`
--
ALTER TABLE `sys_files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sys_grades`
--
ALTER TABLE `sys_grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `sys_grades_subjects`
--
ALTER TABLE `sys_grades_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `sys_provinces`
--
ALTER TABLE `sys_provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `sys_regions`
--
ALTER TABLE `sys_regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `sys_subjects`
--
ALTER TABLE `sys_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `sys_subjects_teachers`
--
ALTER TABLE `sys_subjects_teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sys_teachers`
--
ALTER TABLE `sys_teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT de la tabla `sys_types_teachings`
--
ALTER TABLE `sys_types_teachings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `sys_type_subjects`
--
ALTER TABLE `sys_type_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `user_addresses_personal_info`
--
ALTER TABLE `user_addresses_personal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `user_civilian_information`
--
ALTER TABLE `user_civilian_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT de la tabla `user_health_information`
--
ALTER TABLE `user_health_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user_personal_info`
--
ALTER TABLE `user_personal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT de la tabla `user_social_information`
--
ALTER TABLE `user_social_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sys_courses`
--
ALTER TABLE `sys_courses`
  ADD CONSTRAINT `sys_courses_ibfk_1` FOREIGN KEY (`sys_grade_id`) REFERENCES `sys_grades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sys_courses_teachers`
--
ALTER TABLE `sys_courses_teachers`
  ADD CONSTRAINT `sys_courses_teachers_ibfk_1` FOREIGN KEY (`sys_teachers_id`) REFERENCES `sys_teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sys_courses_teachers_ibfk_2` FOREIGN KEY (`sys_courses_id`) REFERENCES `sys_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sys_grades`
--
ALTER TABLE `sys_grades`
  ADD CONSTRAINT `sys_grades_ibfk_1` FOREIGN KEY (`sys_type_teaching_id`) REFERENCES `sys_types_teachings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sys_grades_subjects`
--
ALTER TABLE `sys_grades_subjects`
  ADD CONSTRAINT `sys_grades_subjects_ibfk_1` FOREIGN KEY (`sys_grade_id`) REFERENCES `sys_grades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sys_grades_subjects_ibfk_2` FOREIGN KEY (`sys_subjects_id`) REFERENCES `sys_subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sys_subjects`
--
ALTER TABLE `sys_subjects`
  ADD CONSTRAINT `sys_subjects_ibfk_1` FOREIGN KEY (`sys_type_subjects_id`) REFERENCES `sys_type_subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sys_subjects_teachers`
--
ALTER TABLE `sys_subjects_teachers`
  ADD CONSTRAINT `sys_subjects_teachers_ibfk_1` FOREIGN KEY (`sys_teachers_id`) REFERENCES `sys_teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sys_subjects_teachers_ibfk_2` FOREIGN KEY (`sys_grades_subjects_id`) REFERENCES `sys_grades_subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sys_teachers`
--
ALTER TABLE `sys_teachers`
  ADD CONSTRAINT `sys_teachers_ibfk_1` FOREIGN KEY (`user_personal_info_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`status_user_id`) REFERENCES `status_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`user_personal_info_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_addresses_personal_info`
--
ALTER TABLE `user_addresses_personal_info`
  ADD CONSTRAINT `user_addresses_personal_info_ibfk_1` FOREIGN KEY (`user_personal_info_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_addresses_personal_info_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `user_addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_civilian_information`
--
ALTER TABLE `user_civilian_information`
  ADD CONSTRAINT `user_civilian_information_ibfk_1` FOREIGN KEY (`user_personal_info_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_has_roles`
--
ALTER TABLE `user_has_roles`
  ADD CONSTRAINT `user_has_roles_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_has_roles_ibfk_2` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_health_information`
--
ALTER TABLE `user_health_information`
  ADD CONSTRAINT `user_health_information_ibfk_1` FOREIGN KEY (`user_personal_info_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_social_information`
--
ALTER TABLE `user_social_information`
  ADD CONSTRAINT `user_social_information_ibfk_1` FOREIGN KEY (`user_personal_info_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
