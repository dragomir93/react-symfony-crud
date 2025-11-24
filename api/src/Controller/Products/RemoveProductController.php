<?php

namespace App\Controller\Products;

use App\Entity\Products;
use App\Repository\ProductsRepository;
use Exception;
use Psr\Log\LoggerAwareTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class RemoveProductController
 */
class RemoveProductController extends AbstractController
{
    use LoggerAwareTrait;

    private $productsRepository;

    /**
     * @param ProductsRepository $productsRepository
     */
    public function __construct(
        ProductsRepository $productsRepository
    ) {
        $this->productsRepository = $productsRepository;
    }

    /**
     * @Route("/api/product/{id}", methods={"DELETE"})
     *
     * @param Products $productsEntity
     *
     * @return JsonResponse
     */
    public function index(Products $productsEntity): JsonResponse
    {

        try {
            $this->productsRepository->remove($productsEntity);
            $this->productsRepository->flush();

            return new JsonResponse([]);
        } catch (Exception $exception) {
            /** @phpstan-ignore-next-line */
            $this->logger->error((string) $exception);

            return new JsonResponse([], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
