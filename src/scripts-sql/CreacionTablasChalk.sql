-- MySQL Script generated by MySQL Workbench
-- Wed Jan  4 17:31:46 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CHALKANDBOOKS
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema CHALKANDBOOKS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CHALKANDBOOKS` DEFAULT CHARACTER SET utf8 ;
USE `CHALKANDBOOKS` ;

-- -----------------------------------------------------
-- Table `CHALKANDBOOKS`.`autors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CHALKANDBOOKS`.`autors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CHALKANDBOOKS`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CHALKANDBOOKS`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CHALKANDBOOKS`.`books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CHALKANDBOOKS`.`books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45),
  `autors_id` INT NOT NULL,
  `description` VARCHAR(750),
  `price` INT NOT NULL,
  `stock` INT NOT NULL,
  `genres_id` INT NOT NULL,
  `editorial` VARCHAR(100),
  `published` INT UNSIGNED,
  `portada` VARCHAR(101),
  PRIMARY KEY (`id`),
    FOREIGN KEY (`autors_id`)
    REFERENCES `CHALKANDBOOKS`.`autors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`genres_id`)
    REFERENCES `CHALKANDBOOKS`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `CHALKANDBOOKS`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CHALKANDBOOKS`.`rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CHALKANDBOOKS`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CHALKANDBOOKS`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `rol_id` INT NOT NULL,
  `avatar` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`rol_id`)
    REFERENCES `CHALKANDBOOKS`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;