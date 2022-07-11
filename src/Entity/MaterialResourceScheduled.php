<?php

namespace App\Entity;

use App\Repository\MaterialResourceScheduledRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MaterialResourceScheduledRepository::class)
 */
class MaterialResourceScheduled
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=ScheduledActivity::class)
     */
    private $scheduledactivity;

    /**
     * @ORM\ManyToOne(targetEntity=Unavailability::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $unavailability;

    /**
     * @ORM\ManyToOne(targetEntity=MaterialResource::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $materialresource;

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

    public function getUnavailability(): ?Unavailability
    {
        return $this->unavailability;
    }

    public function setUnavailability(?Unavailability $unavailability): self
    {
        $this->unavailability = $unavailability;

        return $this;
    }

    public function getMaterialresource(): ?MaterialResource
    {
        return $this->materialresource;
    }

    public function setMaterialresource(?MaterialResource $materialresource): self
    {
        $this->materialresource = $materialresource;

        return $this;
    }
}
