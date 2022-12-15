<?php

namespace App\Controller\Products;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\Products\GetProductsService;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductsController extends AbstractController
{
    private $products;

    /**
     * @param GetProductsService $products
     */
    public function __construct(GetProductsService $products){
    
        $this->products = $products;

    }

    /**
     * @Route("/api/products/", methods={"GET"})
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
       $productsAll = $this->products->execute();
    
       return new JsonResponse ([
        'products' => $productsAll,
        ]);
    }
}
