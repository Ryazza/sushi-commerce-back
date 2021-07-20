<?php

namespace App\Entity\Product;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Product;
use App\Repository\Product\DescriptionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DescriptionRepository::class)
 */
#[ApiResource]
class Description
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
    private $paragraph_number;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="descriptions")
     */
    private $product;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getParagraphNumber(): ?int
    {
        return $this->paragraph_number;
    }

    public function setParagraphNumber(int $paragraph_number): self
    {
        $this->paragraph_number = $paragraph_number;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }
}
