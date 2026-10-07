<?php declare(strict_types=1);

namespace Tb\Core\Content\TbServiceTicket;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @extends EntityCollection<TbServiceTicketEntity>
 */
class TbServiceTicketCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return TbServiceTicketEntity::class;
    }
}
