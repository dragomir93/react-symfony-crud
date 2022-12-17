<?php

namespace App\Controller\Products;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\Products\GetProductService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class GetProductController extends AbstractController
{
    private $product;

    /**
     * @param GetProductService $product
     */
    public function __construct(GetProductService $product){
    
        $this->product = $product;

    }

    /**
     * @Route("/api/product/{id}", methods={"GET"})
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try{
            $id = $request->attributes->get('id');
            $productFinal = $this->product->execute($id);
         
            return new JsonResponse ($productFinal);
            
        } catch (\Exception $exception) {
            $this->logger->error($exception->getMessage());

            return new JsonResponse([], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
