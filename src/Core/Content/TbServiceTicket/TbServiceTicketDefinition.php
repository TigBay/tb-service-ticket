<?php declare(strict_types=1);

namespace Tb\Core\Content\TbServiceTicket;

use Shopware\Core\Checkout\Customer\CustomerDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\EmailField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\SearchRanking;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class TbServiceTicketDefinition extends EntityDefinition
{
    public const string ENTITY_NAME = 'tb_service_ticket';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return TbServiceTicketEntity::class;
    }

    public function getCollectionClass(): string
    {
        return TbServiceTicketCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            new IdField('id', 'id')->addFlags(new Required(), new PrimaryKey()),
            new StringField('title', 'title')->addFlags(new Required(), new SearchRanking(SearchRanking::HIGH_SEARCH_RANKING)),
            new StringField('status', 'status')->addFlags(new Required()),
            new StringField('priority', 'priority')->addFlags(new Required()),
            new EmailField('email', 'email')->addFlags(new SearchRanking(SearchRanking::MIDDLE_SEARCH_RANKING)),
            new FkField('customer_id', 'customerId', CustomerDefinition::class),
            new ManyToOneAssociationField('customer', 'customer_id', CustomerDefinition::class, 'id'),
        ]);
    }
}
