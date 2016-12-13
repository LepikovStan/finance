CREATE TABLE IF NOT EXISTS `migrations` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into users (id, createdAt, updatedAt) values (0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS `payments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL,
    `user_id` INT UNSIGNED NOT NULL REFERENCES users(id),
    `category_id` INT UNSIGNED NOT NULL DEFAULT 0 REFERENCES categories(id),
    `type` enum('income','outgo') NOT NULL DEFAULT 'income',
    `amount` FLOAT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL,
    `user_id` INT UNSIGNED NOT NULL REFERENCES users(id),
    `name` varchar(255) NOT NULL UNIQUE,
    `income` tinyint(1) NOT NULL DEFAULT '1',
    `outgo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into categories (id, createdAt, updatedAt, user_id, name, income, outgo) values (0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, 'Без категории', 1, 1);
CREATE TABLE IF NOT EXISTS `balance` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL,
    `user_id` INT UNSIGNED NOT NULL REFERENCES users(id),
    `date` DATETIME NOT NULL UNIQUE,
    `balance` INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
