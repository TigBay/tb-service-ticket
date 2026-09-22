# Service Ticket Plugin

A Shopware 6 plugin for managing customer support tickets directly from the admin panel.

## Features

- **Ticket Management**: Create, read, and update service tickets with title, status, priority, and email fields
- **Status Tracking**: Support for three ticket statuses – Open, In Progress, and Closed
- **Priority Levels**: Assign low, medium, or high priority to tickets
- **Admin UI**: Dedicated admin module with list and detail views, full search and sorting support
- **High Priority Alerts**: Automatic event notification system for high-priority tickets
- **Role-based Access**: Full ACL privilege system with viewer, editor, creator, and deleter roles
- **Multilingual**: Snippets available in German and English

## Installation

1. Drop the plugin into `custom/plugins/TbServiceTicket/`
2. Run plugin discovery and activation:
   ```bash
   bin/console plugin:refresh
   bin/console plugin:install --activate TbServiceTicket
   ```
3. Build the admin assets (first time or after changes):
   ```bash
   composer build:js:admin
   ```

## Admin Module

The "Service Tickets" module appears in the main admin navigation between Orders and Customers. Users can:
- View all tickets in a sortable, searchable list
- Create new tickets with required fields
- Edit existing tickets and update their status
- Delete tickets (requires deleter privilege)

## Architecture

- **Backend**: Entity definition, database migrations, DAL integration
- **Admin UI**: Vue 3 components with listing (sw-entity-listing) and detail forms
- **ACL**: Privilege mapping for role-based access control
- **Events**: High-priority ticket subscriber for notifications

## Requirements

- Shopware 6.7 or later

## License

MIT
