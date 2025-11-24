<?php

namespace App\Service\Products;

use App\Repository\ProductsRepository;

/**
 * Class GetProductService
 */
class GetProductService
{
    private $productRepository;

    /**
     * @param ProductsRepository $productRepository
     */
    public function __construct(
        ProductsRepository $productRepository
    ) {
        $this->productRepository = $productRepository;
    }

    /**
     * @param int|null $id
     *
     *  @return array
     */
    public function execute($id)
    {
        $products = $this->productRepository->findBy(['id' => $id]);

        $response = [];
        foreach ($products as $product) {
            $response = [
                'productId'     => $product->getId(),
                'name'          => $product->getName(),
                'price'         => $product->getPrice(),
                'description'   => $product->getDescription(),
                'image'         => $product->getImage(),
            ];
        }

        return $response;
    }
}
