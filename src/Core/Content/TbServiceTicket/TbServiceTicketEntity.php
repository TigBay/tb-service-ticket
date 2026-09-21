<?php declare(strict_types=1);

namespace Tb\Core\Content\TbServiceTicket;

use Shopware\Core\Checkout\Customer\CustomerEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class TbServiceTicketEntity extends Entity
{
    use EntityIdTrait;

    protected string $title;
    protected string $status;
    protected string $priority;
    protected string $email;

    protected ?string $customerId = null;
    protected ?CustomerEntity $customer = null;

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): TbServiceTicketEntity
    {
        $this->title = $title;
        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): TbServiceTicketEntity
    {
        $this->status = $status;
        return $this;
    }

    public function getPriority(): string
    {
        return $this->priority;
    }

    public function setPriority(string $priority): TbServiceTicketEntity
    {
        $this->priority = $priority;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): TbServiceTicketEntity
    {
        $this->email = $email;
        return $this;
    }

    public function getCustomerId(): ?string
    {
        return $this->customerId;
    }

    public function setCustomerId(?string $customerId): TbServiceTicketEntity
    {
        $this->customerId = $customerId;
        return $this;
    }

    public function getCustomer(): ?CustomerEntity
    {
        return $this->customer;
    }

    public function setCustomer(?CustomerEntity $customer): TbServiceTicketEntity
    {
        $this->customer = $customer;
        return $this;
    }
}
