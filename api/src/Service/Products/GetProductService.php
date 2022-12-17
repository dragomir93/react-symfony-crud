<?php

namespace App\Service\Products;

use App\Entity\Products;
use App\Repository\ProductsRepository;

class GetProductService {
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
    public function execute($id) {
        $products = $this->productRepository->findBy(['id'=> $id]);
        
        $response = [];
        foreach ($products as $product) {
            $response = [
                'productId'     => $product->getId(),
                'name'          => $product->getName(),
                'price'         => $product->getPrice(),
                'description'   => $product->getDescription(),
            ];
        }
        return $response;
    }
}