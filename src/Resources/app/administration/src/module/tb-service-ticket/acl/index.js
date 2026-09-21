Shopware.Service('privileges').addPrivilegeMappingEntry({
    category: 'permissions',
    parent: null,
    key: 'tb_service_ticket',
    roles: {
        viewer: {
            privileges: ['tb_service_ticket:read'],
            dependencies: [],
        },
        editor: {
            privileges: ['tb_service_ticket:update'],
            dependencies: ['tb_service_ticket.viewer'],
        },
        creator: {
            privileges: ['tb_service_ticket:create'],
            dependencies: ['tb_service_ticket.viewer', 'tb_service_ticket.editor'],
        },
        deleter: {
            privileges: ['tb_service_ticket:delete'],
            dependencies: ['tb_service_ticket.viewer'],
        },
    },
});
