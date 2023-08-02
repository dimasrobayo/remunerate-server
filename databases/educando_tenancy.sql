-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-08-2023 a las 14:44:17
-- Versión del servidor: 10.10.5-MariaDB-1:10.10.5+maria~ubu2004
-- Versión de PHP: 8.1.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `educando_tenancy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tenants`
--

CREATE TABLE `tenants` (
  `id` int(11) NOT NULL,
  `tenant` varchar(50) NOT NULL,
  `database_name` varchar(50) NOT NULL,
  `domain` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tenants`
--

INSERT INTO `tenants` (`id`, `tenant`, `database_name`, `domain`) VALUES
(1, 'user1', 'educando_production', '192.168.50.62:4000'),
(2, 'user2', 'educando_developer', 'localhost:3000'),
(3, 'user3', 'educando_production', 'localhost:4000');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tenants`
--
ALTER TABLE `tenants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`tenant`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tenants`
--
ALTER TABLE `tenants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;