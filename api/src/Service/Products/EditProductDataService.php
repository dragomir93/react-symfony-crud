<?php

namespace App\Service\Products;

use App\Entity\Products;
use App\Repository\ProductsRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;

/**
 * Class EditProductDataService
 */
class EditProductDataService
{

    private $setProductData;
    private $productRepository;

    /**
     * @param SetProductData     $setProductData
     * @param ProductsRepository $productRepository
     */
    public function __construct(
        SetProductData  $setProductData,
        ProductsRepository $productRepository
    ) {
        $this->setProductData = $setProductData;
        $this->productRepository = $productRepository;
    }

     /**
     * @param array         $data
     * @param Products|null $product
     *
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function execute(array $data, ?Products $product = null): void
    {
        $product = $product ?? new Products();
        $product = $this->setProductData->execute($data, $product);
        $this->productRepository->persist($product);
        $this->productRepository->flush();
    }
}
