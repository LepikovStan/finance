CREATE TABLE IF NOT EXISTS `migrations` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL,
    `s` varchar(255) NOT NULL,
    `p` text NOT NULL,
    `l` varchar(255) NOT NULL UNIQUE,
    `sid` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into users (id, createdAt, updatedAt) values (0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS `payments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL,
    `user_id` INT UNSIGNED NOT NULL REFERENCES users(id),
    `category_id` INT UNSIGNED DEFAULT 0,
    `type` enum('income','outgo') NOT NULL DEFAULT 'income',
    `amount` FLOAT NOT NULL DEFAULT 0,
    `date` datetime NOT NULL,
    foreign key (category_id) REFERENCES categories(id)
        on update cascade
        on delete set null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL,
    `user_id` INT UNSIGNED NOT NULL REFERENCES users(id),
    `name` varchar(255) NOT NULL,
    `income` tinyint(1) NOT NULL DEFAULT '1',
    `outgo` tinyint(1) NOT NULL DEFAULT '1',
    CONSTRAINT name_uid UNIQUE (name, user_id)
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

CREATE TABLE IF NOT EXISTS `currency` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NOT NULL,
    `sign` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'P', 'Российский рубль');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '$', 'Доллар США');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '€', 'Евро');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '£', 'Фунт стерлингов');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '₴', 'Украинская гривна');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'MDL', 'Молдавский лей');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'BYR', 'Белорусский рубль');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'AZN', 'Азербайджанский манат');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'AMD', 'Армянский драм');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'т', 'Казахстанский тенге');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'KGS', 'Киргизский сом');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'TJS', 'Таджикский сомони');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'UZS', 'Узбекский сум');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Ls', 'Латвийский лат');
insert into currency (createdAt, updatedAt, `sign`, name) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lt', 'Литовский лит');
