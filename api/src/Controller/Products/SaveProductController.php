<?php

namespace App\Controller\Products;

use App\Entity\Products;
use App\Service\Products\EditProductDataService;
use Psr\Log\LoggerAwareTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class SaveProductController extends AbstractController
{
    use LoggerAwareTrait;
    
    private $editProductDataService;

    /**
     * @param EditProductDataService $editProductDataService
     */
    public function __construct(EditProductDataService $editProductDataService){
    
        $this->editProductDataService = $editProductDataService;

    }

    /**
     * @Route("/api/product/{id}", methods={"POST"})
     * 
     * @param Products  $product
     * @param Request   $request
     *
     * @return JsonResponse
     */
    public function index(Request $request, Products $product): JsonResponse
    {
        try{
            $data = (new JsonEncoder())->decode($request->getContent(), JsonEncoder::FORMAT);
            $this->editProductDataService->execute($data, $product);

            return new JsonResponse([]);
        } catch (\Exception $exception) {
            $this->logger->error($exception->getMessage());

            return new JsonResponse([], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
