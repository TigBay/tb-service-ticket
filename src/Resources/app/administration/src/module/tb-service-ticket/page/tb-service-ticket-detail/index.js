import template from './tb-service-ticket-detail.html.twig';

const { Mixin } = Shopware;
const { mapPropertyErrors } = Shopware.Component.getComponentHelper();

export default {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder'),
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
            isSaveSuccessful: false,
            emailFormatError: null,
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

        ...mapPropertyErrors('serviceTicket', ['title', 'status', 'priority']),
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            if (this.serviceTicketId) {
                this.loadEntity();
                return;
            }

            this.serviceTicket = this.serviceTicketRepository.create();
        },

        loadEntity() {
            this.isLoading = true;

            this.serviceTicketRepository.get(this.serviceTicketId, Shopware.Context.api).then((entity) => {
                this.serviceTicket = entity;
                this.isLoading = false;
            });
        },

        isEmailValid() {
            if (!this.serviceTicket.email) {
                return true;
            }
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.serviceTicket.email);
        },

        onSave() {
            this.emailFormatError = null;

            if (!this.isEmailValid()) {
                this.emailFormatError = { detail: this.$t('tb-service-ticket.detail.errorEmailInvalid') };
                return Promise.resolve();
            }

            this.isLoading = true;

            return this.serviceTicketRepository.save(this.serviceTicket, Shopware.Context.api)
                .then(() => {
                    const id = this.serviceTicket.id;

                    return this.serviceTicketRepository.get(id, Shopware.Context.api).then((entity) => {
                        this.serviceTicket = entity;
                        this.isLoading = false;
                        this.isSaveSuccessful = true;

                        if (!this.serviceTicketId) {
                            this.$router.push({ name: 'tb.service.ticket.detail', params: { id } });
                        }

                        this.createNotificationSuccess({
                            message: this.$t('tb-service-ticket.detail.messageSaveSuccess'),
                        });
                    });
                })
                .catch(() => {
                    this.isLoading = false;
                    this.createNotificationError({
                        message: this.$t('tb-service-ticket.detail.messageSaveError'),
                    });
                });
        },

        onCancel() {
            this.$router.push({ name: 'tb.service.ticket.list' });
        },
    },
};
