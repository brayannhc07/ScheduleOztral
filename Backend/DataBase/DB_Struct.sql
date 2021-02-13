-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema schedule_oztral
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema schedule_oztral
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `schedule_oztral` DEFAULT CHARACTER SET utf8 ;
USE `schedule_oztral` ;

-- -----------------------------------------------------
-- Table `schedule_oztral`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule_oztral`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login_name` VARCHAR(30) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `first_name` VARCHAR(25) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL DEFAULT '',
  `school_name` VARCHAR(35) NOT NULL DEFAULT '',
  `group` VARCHAR(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_name_UNIQUE` (`login_name` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule_oztral`.`topics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule_oztral`.`topics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `teacher` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL DEFAULT '',
  `phone_number` VARCHAR(20) NOT NULL DEFAULT '',
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_user_idx` (`id_user` ASC) ,
    FOREIGN KEY (`id_user`)
    REFERENCES `schedule_oztral`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule_oztral`.`user_fields`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule_oztral`.`user_fields` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_user_idx` (`id_user` ASC) ,
    FOREIGN KEY (`id_user`)
    REFERENCES `schedule_oztral`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule_oztral`.`topic_links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule_oztral`.`topic_links` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_topic` INT NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  `url` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_topic_idx` (`id_topic` ASC) ,
    FOREIGN KEY (`id_topic`)
    REFERENCES `schedule_oztral`.`topics` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule_oztral`.`topic_times`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule_oztral`.`topic_times` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_topic` INT NOT NULL,
  `id_link` INT NOT NULL,
  `day` SMALLINT NOT NULL,
  `start` TIME NOT NULL,
  `end` TIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_topic_idx` (`id_topic` ASC) ,
  INDEX `id_link_idx` (`id_link` ASC) ,
    FOREIGN KEY (`id_topic`)
    REFERENCES `schedule_oztral`.`topics` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`id_link`)
    REFERENCES `schedule_oztral`.`topic_links` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule_oztral`.`topic_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule_oztral`.`topic_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_topic` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_topic_idx` (`id_topic` ASC) ,
  INDEX `id_user_idx` (`id_user` ASC) ,
    FOREIGN KEY (`id_topic`)
    REFERENCES `schedule_oztral`.`topics` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`id_user`)
    REFERENCES `schedule_oztral`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule_oztral`.`topic_fields`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule_oztral`.`topic_fields` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_topic` INT NOT NULL,
  `name` VARCHAR(25) NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_topic_idx` (`id_topic` ASC) ,
    FOREIGN KEY (`id_topic`)
    REFERENCES `schedule_oztral`.`topics` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

