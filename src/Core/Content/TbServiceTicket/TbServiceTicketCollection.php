<?php declare(strict_types=1);

namespace Tb\Core\Content\TbServiceTicket;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void add(TbServiceTicketEntity $entity)
 * @method void set(string $key, TbServiceTicketEntity $entity)
 * @method TbServiceTicketEntity[] getIterator()
 * @method TbServiceTicketEntity[] getElements()
 * @method TbServiceTicketEntity|null get(string $key)
 * @method TbServiceTicketEntity|null first()
 * @method TbServiceTicketEntity|null last()
 */
class TbServiceTicketCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return TbServiceTicketEntity::class;
    }
}
