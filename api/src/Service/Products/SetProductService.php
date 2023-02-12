<?php

namespace App\Service\Products;

use App\Entity\Products;
use App\Repository\ProductsRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class SetProductService
 */
class SetProductService
{
    private $setProductData;
    private $productsRepository;

    /**
     * @param SetProductData     setProductData
     * @param ProductsRepository $productsRepository
     */
    public function __construct(
        SetProductData    $setProductData,
        ProductsRepository $productsRepository
    ) {
        $this->setProductData = $setProductData;
        $this->productsRepository = $productsRepository;
    }

    /**
     * @param array $data
     * @param UploadedFile|null $file
     *
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function execute(array $data, ?UploadedFile $file): void
    {
        $product = new Products();
        $product = $this->setProductData->execute($data, $product);
        $product->setImageFile($file);
        if (!$file) {
            $product->setImageFile(null);
        }

        $this->productsRepository->persist($product);
        $this->productsRepository->flush();
    }
}
