<?php

namespace App\Entity;

use App\Repository\SettingsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SettingsRepository::class)
 */
class Settings
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $alertmodificationtimer;

    /**
     * @ORM\Column(type="integer")
     */
    private $multiplicatorzoom;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAlertmodificationtimer(): ?int
    {
        return $this->alertmodificationtimer;
    }

    public function setAlertmodificationtimer(int $alertmodificationtimer): self
    {
        $this->alertmodificationtimer = $alertmodificationtimer;

        return $this;
    }

    public function getMultiplicatorzoom(): ?int
    {
        return $this->multiplicatorzoom;
    }

    public function setMultiplicatorzoom(int $multiplicatorzoom): self
    {
        $this->multiplicatorzoom = $multiplicatorzoom;

        return $this;
    }
}
