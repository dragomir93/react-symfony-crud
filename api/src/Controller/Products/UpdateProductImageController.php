<?php

namespace App\Controller\Products;

use App\Repository\ProductsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class UpdateProductImageController
 */
class UpdateProductImageController extends AbstractController
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
     * @Route("/product-image/update", methods={"POST"})
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            $file = $request->files->get('image');
            $productId = $request->request->getInt('id');
            $product = $this->productRepository->findOneBy(['id' => $productId]);

            if (!$product) {
                return new JsonResponse(
                    "Not Found option!",
                    JsonResponse::HTTP_UNPROCESSABLE_ENTITY
                );
            }
            $product->setImageFile($file);

            if (!$file) {
                $product->setImageFile(null);
            }

            $this->productRepository->persist($product);
            $this->productRepository->flush();

            return new JsonResponse();
        } catch (\Exception $exception) {
            return new JsonResponse([$exception->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
