<?php declare(strict_types=1);

namespace Tb;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;

class TbServiceTicket extends Plugin
{
    public function uninstall(UninstallContext $uninstallContext): void
    {
        parent::uninstall($uninstallContext);

        if ($uninstallContext->keepUserData()) {
            return;
        }

        $connection = $this->container?->get(Connection::class);
        \assert($connection instanceof Connection);

        $connection->executeStatement('DROP TABLE IF EXISTS `tb_service_ticket`');
    }
}
