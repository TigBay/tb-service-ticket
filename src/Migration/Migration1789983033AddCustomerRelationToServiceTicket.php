<?php declare(strict_types=1);

namespace Tb\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

/**
 * @internal
 */
class Migration1789983033AddCustomerRelationToServiceTicket extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1789983033;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
        ALTER TABLE `tb_service_ticket`
            ADD COLUMN `customer_id` BINARY(16) NULL AFTER `email`,
            ADD CONSTRAINT `fk.tb_service_ticket.customer_id`
                FOREIGN KEY (`customer_id`)
                REFERENCES `customer` (`id`)
                ON DELETE SET NULL
                ON UPDATE CASCADE
    ');
    }
}
