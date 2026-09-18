Shopware.Component.register('tb-service-ticket-list', () => import('./page/tb-service-ticket-list'));
Shopware.Component.register('tb-service-ticket-detail', () => import('./page/tb-service-ticket-detail'));

Shopware.Module.register('tb-service-ticket', {
    type: 'core',
    name: 'ServiceTicket',
    title: 'tb-service-ticket.general.mainMenuItemGeneral',
    description: 'tb-service-ticket.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',
    entity: 'tb_service_ticket',

    routes: {
        list: {
            component: 'tb-service-ticket-list',
            path: 'list',
        },
        create: {
            component: 'tb-service-ticket-detail',
            path: 'create',
            meta: {
                parentPath: 'tb.service.ticket.list',
            },
        },
        detail: {
            component: 'tb-service-ticket-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'tb.service.ticket.list',
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
            icon: 'default-shopping-paper-bag-product',
            position: 35, // between Orders (position: 30) and Customers (position: 40)
        },
        {
            path: 'tb.service.ticket.list',
            label: 'tb-service-ticket.general.mainMenuItemGeneral',
            parent: 'tb-service-ticket',
        },
    ],
});
