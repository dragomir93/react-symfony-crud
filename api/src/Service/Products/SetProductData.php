<?php

namespace App\Service\Products;

use App\Entity\Products;

/**
 * Class SetProductData
 */
class SetProductData
{

    /**
     * @param array    $data
     * @param Products $product
     *
     * @return Products
     */
    public function execute(array $data, Products $product): Products
    {
        $product->setName($data['name']);
        $product->setPrice($data['price']);
        $product->setDescription($data['description']);

        return $product;
    }
}
