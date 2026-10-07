import template from './tb-service-ticket-detail.html.twig';

const { Mixin } = Shopware;
const { mapPropertyErrors } = Shopware.Component.getComponentHelper();
const { Criteria } = Shopware.Data;

const REQUIRED_FIELDS = ['title', 'status', 'priority'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('notification'),
    ],

    props: {
        serviceTicketId: {
            type: String,
            required: false,
            default: null,
        },
    },

    data() {
        return {
            serviceTicket: null,
            isLoading: false,
            validationErrors: {},
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

        statusOptions() {
            return [
                { value: 'open', label: this.$t('tb-service-ticket.detail.statusOptions.open') },
                { value: 'inProgress', label: this.$t('tb-service-ticket.detail.statusOptions.inProgress') },
                { value: 'closed', label: this.$t('tb-service-ticket.detail.statusOptions.closed') },
            ];
        },

        priorityOptions() {
            return [
                { value: 'low', label: this.$t('tb-service-ticket.detail.priorityOptions.low') },
                { value: 'medium', label: this.$t('tb-service-ticket.detail.priorityOptions.medium') },
                { value: 'high', label: this.$t('tb-service-ticket.detail.priorityOptions.high') },
            ];
        },

        customerCriteria() {
            const criteria = new Criteria(1, 25);
            criteria.addSorting(Criteria.sort('lastName', 'ASC'));

            return criteria;
        },

        ...mapPropertyErrors('serviceTicket', ['title', 'status', 'priority', 'email']),
    },

    watch: {
        serviceTicketId() {
            this.createdComponent();
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.validationErrors = {};

            if (this.serviceTicketId) {
                this.loadEntity();
                return;
            }

            this.serviceTicket = this.serviceTicketRepository.create();
        },

        loadEntity() {
            this.isLoading = true;

            return this.serviceTicketRepository.get(this.serviceTicketId, Shopware.Context.api)
                .then((entity) => {
                    this.serviceTicket = entity;
                })
                .catch(() => {
                    this.createNotificationError({
                        message: this.$t('tb-service-ticket.detail.messageLoadError'),
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        validate() {
            const errors = {};

            REQUIRED_FIELDS.forEach((field) => {
                if (!String(this.serviceTicket[field] ?? '').trim()) {
                    errors[field] = { detail: this.$t('tb-service-ticket.detail.errorRequired') };
                }
            });

            if (this.serviceTicket.email && !EMAIL_PATTERN.test(this.serviceTicket.email)) {
                errors.email = { detail: this.$t('tb-service-ticket.detail.errorEmailInvalid') };
            }

            this.validationErrors = errors;

            return Object.keys(errors).length === 0;
        },

        onSave() {
            if (!this.validate()) {
                this.createNotificationError({
                    message: this.$t('tb-service-ticket.detail.messageSaveError'),
                });

                return Promise.resolve();
            }

            this.isLoading = true;

            return this.serviceTicketRepository.save(this.serviceTicket, Shopware.Context.api)
                .then(() => {
                    this.createNotificationSuccess({
                        message: this.$t('tb-service-ticket.detail.messageSaveSuccess'),
                    });

                    if (!this.serviceTicketId) {
                        this.$router.push({ name: 'tb.service.ticket.detail', params: { id: this.serviceTicket.id } });
                        return;
                    }

                    this.loadEntity();
                })
                .catch(() => {
                    this.createNotificationError({
                        message: this.$t('tb-service-ticket.detail.messageSaveError'),
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        onCancel() {
            this.$router.push({ name: 'tb.service.ticket.list' });
        },
    },
};
