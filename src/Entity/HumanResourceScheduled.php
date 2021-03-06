<?php

namespace App\Entity;

use App\Repository\HumanResourceScheduledRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=HumanResourceScheduledRepository::class)
 */
class HumanResourceScheduled
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=ScheduledActivity::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $scheduledactivity;

    /**
     * @ORM\ManyToOne(targetEntity=HumanResource::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $humanresource;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScheduledactivity(): ?ScheduledActivity
    {
        return $this->scheduledactivity;
    }

    public function setScheduledactivity(?ScheduledActivity $scheduledactivity): self
    {
        $this->scheduledactivity = $scheduledactivity;

        return $this;
    }

    public function getHumanresource(): ?HumanResource
    {
        return $this->humanresource;
    }

    public function setHumanresource(?HumanResource $humanresource): self
    {
        $this->humanresource = $humanresource;

        return $this;
    }
}
