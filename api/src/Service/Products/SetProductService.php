<?php

namespace App\Service\Products;

use App\Entity\Products;
use App\Repository\ProductsRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;

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
     *
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function execute(array $data): void
    {
        $product = new Products();
        $product = $this->setProductData->execute($data, $product);

        $this->productsRepository->persist($product);
        $this->productsRepository->flush();
    }
}
