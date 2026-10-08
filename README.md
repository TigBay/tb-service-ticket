# TbServiceTicket

[![CI](https://github.com/TigBay/tb_service_ticket/actions/workflows/ci.yml/badge.svg)](https://github.com/TigBay/tb_service_ticket/actions/workflows/ci.yml)

Shopware 6 plugin that adds a **Service Tickets** module to the Administration. Tickets have a title, status, priority, an optional email address and can be linked to a customer.

## Features

- Own top-level menu entry **Service Tickets** between *Orders* and *Customers*
- Listing based on `sw-entity-listing` with search, sorting and paging; columns for title, status, priority (as badge) and creation date
- One detail page for creating and editing tickets
- Status (*Open*, *In progress*, *Closed*) and priority (*Low*, *Medium*, *High*) as fixed select options
- Optional customer assignment via a searchable customer select
- Validation in the Administration (required fields, email format) and on the server via the DAL (required fields, email format)
- ACL roles *viewer*, *editor*, *creator* and *deleter*, applied to menu, routes and actions
- Creating a ticket with priority *high* writes an info entry to the Shopware log
- All texts as snippets in German and English

## Requirements

- Shopware 6.7
- PHP 8.4 or 8.5

## Installation

Clone the repository into `custom/plugins/TbServiceTicket` and run in the shop root:

```bash
bin/console plugin:refresh
bin/console plugin:install --activate TbServiceTicket
bin/console cache:clear
```

The migrations create the table `tb_service_ticket` during installation. The built Administration assets are part of the repository. After changing files in `src/Resources/app/administration`, rebuild them with:

```bash
bin/build-administration.sh
```

Uninstalling without *keep user data* drops the table `tb_service_ticket`.

## Usage

1. Open **Service Tickets** in the main menu of the Administration.
2. Click **Add ticket**, fill in title, status and priority and save.
3. Open a ticket from the list to change it. Selected tickets can be deleted from the list.

Users without the admin role need the matching permissions under *Settings → Users & permissions → Roles → Service Tickets*.

## Technical structure

| Layer | Class / file | Responsibility |
|---|---|---|
| Entity | `Core/Content/TbServiceTicket/TbServiceTicketDefinition`, `…Entity`, `…Collection` | DAL definition of `tb_service_ticket` incl. required fields, email validation, search ranking and the customer association |
| Migrations | `Migration/Migration1789732986CreateTbServiceTicketTable`, `Migration/Migration1789983033AddCustomerRelationToServiceTicket` | Create the table and add `customer_id` (set to `NULL` when the customer is deleted) |
| Subscriber | `Subscriber/HighPriorityTicketSubscriber` | Listens to `tb_service_ticket.written` and logs newly created high-priority tickets |
| Administration | `Resources/app/administration/src/module/tb-service-ticket` | Module registration, ACL mapping, list and detail page, snippets |

## Tests and static analysis

The unit tests don't need a database. Run them from the shop root:

```bash
./vendor/bin/phpunit -c custom/plugins/TbServiceTicket/phpunit.xml
```

GitHub Actions runs `composer validate`, PHP-CS-Fixer (PER-CS 3.0), PHPStan (level `max`) and PHPUnit on PHP 8.4 and 8.5 for every push and pull request. In CI the plugin is checked standalone: `composer install` inside the plugin pulls Shopware as a dependency, and `tests/TestBootstrap.php` falls back to the plugin's own autoloader. To run the same checks locally:

```bash
cd custom/plugins/TbServiceTicket
composer install
vendor/bin/php-cs-fixer check
vendor/bin/phpstan analyse
vendor/bin/phpunit
```

## Notes

- Status and priority are stored as plain strings. The allowed values are only enforced by the select fields in the Administration.

## License

MIT, see [LICENSE](LICENSE).
