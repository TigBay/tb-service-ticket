<?php declare(strict_types=1);

namespace Tb\Subscriber;

use Psr\Log\LoggerInterface;
use Shopware\Core\Framework\DataAbstractionLayer\EntityWriteResult;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityWrittenEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Tb\Core\Content\TbServiceTicket\TbServiceTicketDefinition;

readonly class HighPriorityTicketSubscriber implements EventSubscriberInterface
{
    public const string PRIORITY_HIGH = 'high';

    public function __construct(
        private LoggerInterface $logger,
    ) {}

    public static function getSubscribedEvents(): array
    {
        return [
            TbServiceTicketDefinition::ENTITY_NAME . '.written' => 'onTicketWritten',
        ];
    }

    public function onTicketWritten(EntityWrittenEvent $event): void
    {
        foreach ($event->getWriteResults() as $writeResult) {
            if ($writeResult->getOperation() !== EntityWriteResult::OPERATION_INSERT) {
                continue;
            }

            $payload = $writeResult->getPayload();

            if (($payload['priority'] ?? null) !== self::PRIORITY_HIGH) {
                continue;
            }

            $this->logger->info('A high-priority service ticket was created.', [
                'ticketId' => $writeResult->getPrimaryKey(),
                'title' => $payload['title'] ?? null,
                'priority' => self::PRIORITY_HIGH,
            ]);
        }
    }
}
