<?php declare(strict_types=1);

namespace Tb\Tests\Unit\Subscriber;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityWriteResult;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityWrittenEvent;
use Tb\Core\Content\TbServiceTicket\TbServiceTicketDefinition;
use Tb\Subscriber\HighPriorityTicketSubscriber;

#[CoversClass(HighPriorityTicketSubscriber::class)]
final class HighPriorityTicketSubscriberTest extends TestCase
{
    private const string TICKET_ID = 'c7bca22753c84d08b6178a50052b4146';

    public function testSubscribesToServiceTicketWrittenEvent(): void
    {
        self::assertSame(
            ['tb_service_ticket.written' => 'onTicketWritten'],
            HighPriorityTicketSubscriber::getSubscribedEvents(),
        );
    }

    public function testLogsCreatedHighPriorityTicket(): void
    {
        $logger = $this->createMock(LoggerInterface::class);
        $logger
            ->expects(self::once())
            ->method('info')
            ->with(
                'A high-priority service ticket was created.',
                [
                    'ticketId' => self::TICKET_ID,
                    'title' => 'Payment failed',
                    'priority' => 'high',
                ],
            );

        new HighPriorityTicketSubscriber($logger)->onTicketWritten(
            $this->createEvent(EntityWriteResult::OPERATION_INSERT, ['title' => 'Payment failed', 'priority' => 'high']),
        );
    }

    public function testIgnoresCreatedTicketWithLowerPriority(): void
    {
        $logger = $this->createMock(LoggerInterface::class);
        $logger->expects(self::never())->method('info');

        new HighPriorityTicketSubscriber($logger)->onTicketWritten(
            $this->createEvent(EntityWriteResult::OPERATION_INSERT, ['title' => 'Question about delivery', 'priority' => 'medium']),
        );
    }

    public function testIgnoresUpdatedTicketEvenWithHighPriority(): void
    {
        $logger = $this->createMock(LoggerInterface::class);
        $logger->expects(self::never())->method('info');

        new HighPriorityTicketSubscriber($logger)->onTicketWritten(
            $this->createEvent(EntityWriteResult::OPERATION_UPDATE, ['priority' => 'high']),
        );
    }

    /**
     * @param array<string, string> $payload
     */
    private function createEvent(string $operation, array $payload): EntityWrittenEvent
    {
        $writeResult = new EntityWriteResult(
            self::TICKET_ID,
            ['id' => self::TICKET_ID, ...$payload],
            TbServiceTicketDefinition::ENTITY_NAME,
            $operation,
        );

        return new EntityWrittenEvent(TbServiceTicketDefinition::ENTITY_NAME, [$writeResult], Context::createCLIContext());
    }
}
