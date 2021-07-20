<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210720142556 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, subcategory LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comments (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, product_id INT NOT NULL, user_name VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL, INDEX IDX_5F9E962AA76ED395 (user_id), INDEX IDX_5F9E962A4584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE description (id INT AUTO_INCREMENT NOT NULL, product_id INT DEFAULT NULL, paragraph_number INT NOT NULL, content VARCHAR(255) NOT NULL, INDEX IDX_6DE440264584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_product (event_id INT NOT NULL, product_id INT NOT NULL, INDEX IDX_561DAD0271F7E88B (event_id), INDEX IDX_561DAD024584665A (product_id), PRIMARY KEY(event_id, product_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pictures (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, picture VARCHAR(255) DEFAULT NULL, INDEX IDX_8F7C2FC04584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_D34A04AD12469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE special (id INT AUTO_INCREMENT NOT NULL, product_id INT DEFAULT NULL, size VARCHAR(255) DEFAULT NULL, weight VARCHAR(255) DEFAULT NULL, color VARCHAR(255) DEFAULT NULL, quantity INT DEFAULT NULL, UNIQUE INDEX UNIQ_4C6B3FE34584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962AA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A4584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE description ADD CONSTRAINT FK_6DE440264584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE event_product ADD CONSTRAINT FK_561DAD0271F7E88B FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event_product ADD CONSTRAINT FK_561DAD024584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE pictures ADD CONSTRAINT FK_8F7C2FC04584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE special ADD CONSTRAINT FK_4C6B3FE34584665A FOREIGN KEY (product_id) REFERENCES product (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD12469DE2');
        $this->addSql('ALTER TABLE event_product DROP FOREIGN KEY FK_561DAD0271F7E88B');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A4584665A');
        $this->addSql('ALTER TABLE description DROP FOREIGN KEY FK_6DE440264584665A');
        $this->addSql('ALTER TABLE event_product DROP FOREIGN KEY FK_561DAD024584665A');
        $this->addSql('ALTER TABLE pictures DROP FOREIGN KEY FK_8F7C2FC04584665A');
        $this->addSql('ALTER TABLE special DROP FOREIGN KEY FK_4C6B3FE34584665A');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE comments');
        $this->addSql('DROP TABLE description');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE event_product');
        $this->addSql('DROP TABLE pictures');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE special');
    }
}
