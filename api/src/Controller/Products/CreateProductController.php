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
        SetProductService $setProductService
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
            $data = [];
            $file = $request->files->get('image');
            $data['name'] = trim((string) $request->request->get('name'));
            $data['description'] = trim((string) $request->request->get('description'));
            $data['price'] = (int) $request->request->get('price');
            $this->setProductService->execute($data, $file);

            return new JsonResponse([]);
        } catch (InvalidArgumentException $exception) {
            $this->logger->info($exception->getMessage());

            return new JsonResponse(
                \json_decode($exception->getMessage()),
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY
            );
        } catch (\Exception $exception) {
            return new JsonResponse([$exception->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
