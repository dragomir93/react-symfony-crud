<?php

namespace App\Service\Products;

use App\Repository\ProductsRepository;

class GetProductsService {
    private $productRepository;

    /**
     * @param ProductsRepository $productRepository
     */
    public function __construct(
     ProductsRepository $productRepository,
     ){
        $this->productRepository = $productRepository;

    }
    /**
     *  @return array
     */
    public function execute() {
        $products = $this->productRepository->findAll();
        
        $response = [];
        foreach ($products as $product) {
            $response [] = 
            [
                'productId'     => $product->getId(),
                'name'          => $product->getName(),
                'price'         => $product->getPrice(),
                'description'   => $product->getDescription(),
            ];
        }
        return $response;
    }
}