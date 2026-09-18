<?php declare(strict_types=1);

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Tb\Core\Content\TbServiceTicket\TbServiceTicketDefinition;

return static function (ContainerConfigurator $containerConfigurator): void {
    $services = $containerConfigurator->services();

    $services
        ->defaults()
        ->autowire()
        ->autoconfigure();

    $services
        ->load('Tb\\', '../../')
        ->exclude('../../{Resources,Migration,*.php}');

    $services->set(TbServiceTicketDefinition::class)
        ->tag('shopware.entity.definition', ['entity' => 'tb_service_ticket']);
};
