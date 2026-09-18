<?php declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

use function Symfony\Component\DependencyInjection\Loader\Configurator\service;

return static function (ContainerConfigurator $containerConfigurator): void {
    $services = $containerConfigurator->services();

    $services->set(\Tb\Subscriber\MySubscriber::class)
        ->tag('kernel.event_subscriber');

    $services->set(\Tb\Core\Content\TbServiceTicket\TbServiceTicketDefinition::class)
        ->tag('shopware.entity.definition', ['entity' => 'tb_service_ticket']);
};
