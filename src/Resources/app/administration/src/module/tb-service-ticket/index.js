// <plugin root>/src/Resources/app/administration/src/module/tb-service-ticket/index.js

Shopware.Module.register('tb-service-ticket', {
    type: 'plugin',
    name: 'Example',
    title: 'tb-service-ticket.general.mainMenuItemGeneral',
    description: 'sw-property.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',

    routes: {
        list: {
            component: 'tb-service-ticket-list',
            path: 'list'
        },
        detail: {
            component: 'tb-service-ticket-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'tb.service.ticket.list'
            }
        },
        create: {
            component: 'tb-service-ticket-create',
            path: 'create',
            meta: {
                parentPath: 'tb.service.ticket.list'
            }
        }
    },

    navigation: [{
        label: 'tb-service-ticket.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'tb.service.ticket.list',
        icon: 'default-shopping-paper-bag-product',
        position: 100
    }]
});
