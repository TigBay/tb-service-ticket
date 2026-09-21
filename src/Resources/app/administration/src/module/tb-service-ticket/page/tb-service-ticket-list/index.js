import template from './tb-service-ticket-list.html.twig';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

export default {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('listing'),
        Mixin.getByName('placeholder'),
    ],

    data() {
        return {
            isLoading: false,
            limit: 25,
            serviceTickets: null,
            sortBy: 'createdAt',
            sortDirection: 'DESC',
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        serviceTicketRepository() {
            return this.repositoryFactory.create('tb_service_ticket');
        },

        columns() {
            return [
                {
                    property: 'title',
                    label: 'tb-service-ticket.list.columnTitle',
                    routerLink: 'tb.service.ticket.detail',
                    primary: true,
                },
                {
                    property: 'status',
                    label: 'tb-service-ticket.list.columnStatus',
                },
                {
                    property: 'priority',
                    label: 'tb-service-ticket.list.columnPriority',
                },
                {
                    property: 'createdAt',
                    label: 'tb-service-ticket.list.columnCreatedAt',
                },
            ];
        },
    },

    created() {
        this.getList();
    },

    methods: {
        getList() {
            this.isLoading = true;

            const criteria = new Criteria(this.page, this.limit);
            criteria.setTerm(this.term);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection));

            return this.serviceTicketRepository.search(criteria).then((result) => {
                this.total = result.total;
                this.serviceTickets = result;
                this.isLoading = false;
            });
        },
        getPriorityBadgeVariant(priority) {
            const variants = {
                low: 'info',
                medium: 'attention',
                high: 'critical',
            };

            return variants[priority] ?? 'neutral';
        }
    },
};
