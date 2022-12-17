<?php

namespace App\Controller\Products;

use App\Service\Products\SetProductService;
use InvalidArgumentException;
use Psr\Log\LoggerAwareTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class CreateProductController
 */
class CreateProductController extends AbstractController
{
    use LoggerAwareTrait;

    private $setProductService;
  
    /**
     * @param SetProductService $setProductService
     */
    public function __construct(
        SetProductService $setProductService,
    ) {
        $this->setProductService = $setProductService;
    }

    /**
     * @Route("/api/product", methods={"POST"})
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request) : JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $this->setProductService->execute($data);

            return new JsonResponse([]);
        } catch (InvalidArgumentException $exception) {
            $this->logger->info($exception->getMessage());

            return new JsonResponse(
                \json_decode($exception->getMessage()),
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $exception) {
            $this->logger->error($exception->getMessage());

            return new JsonResponse([], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
