import './acl';

Shopware.Component.register('tb-service-ticket-list', () => import('./page/tb-service-ticket-list'));
Shopware.Component.register('tb-service-ticket-detail', () => import('./page/tb-service-ticket-detail'));

Shopware.Module.register('tb-service-ticket', {
    // Top-level navigation entries are only rendered for modules of type "core".
    type: 'core',
    name: 'ServiceTicket',
    title: 'tb-service-ticket.general.mainMenuItemGeneral',
    description: 'tb-service-ticket.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'regular-file',
    entity: 'tb_service_ticket',

    routes: {
        list: {
            component: 'tb-service-ticket-list',
            path: 'list',
            meta: {
                privilege: 'tb_service_ticket.viewer',
            },
        },
        create: {
            component: 'tb-service-ticket-detail',
            path: 'create',
            meta: {
                parentPath: 'tb.service.ticket.list',
                privilege: 'tb_service_ticket.creator',
            },
        },
        detail: {
            component: 'tb-service-ticket-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'tb.service.ticket.list',
                privilege: 'tb_service_ticket.viewer',
            },
            props: {
                default(route) {
                    return { serviceTicketId: route.params.id };
                },
            },
        },
    },

    navigation: [
        {
            id: 'tb-service-ticket',
            label: 'tb-service-ticket.general.mainMenuItemGeneral',
            color: '#ff3d58',
            icon: 'regular-file',
            // Orders use position 30, customers 40.
            position: 35,
            privilege: 'tb_service_ticket.viewer',
        },
        {
            path: 'tb.service.ticket.list',
            label: 'tb-service-ticket.general.mainMenuItemGeneral',
            parent: 'tb-service-ticket',
            privilege: 'tb_service_ticket.viewer',
        },
    ],
});
