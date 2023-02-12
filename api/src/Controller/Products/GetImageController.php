<?php

namespace App\Controller\Products;

use App\Entity\Products;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

class GetImageController extends AbstractController
{
    private $kernel;

    /**
     * @param KernelInterface      $kernel
     */
    public function __construct(
        KernelInterface $kernel,
    ) {
        $this->kernel = $kernel;
    }
    /**
     * @Route("/product/image/{id}", methods={"GET"})
     *
     * @param Products $product
     *
     * @return mixed
     */
    public function getOfficeImage(Products $product)
    {
        try {
            $imageName = $product->getImage();
            if (!$imageName) {
                $imageName =
                    $this->kernel->getProjectDir().
                    '/public/images/products/standard.jpg';

                return new BinaryFileResponse($imageName);
            }
            
            $filepath = $this->kernel->getProjectDir().'/public/images/products/'.$imageName;

            $response = new Response();
            $disposition = $response->headers->makeDisposition(ResponseHeaderBag::DISPOSITION_INLINE, $imageName);

            $response->headers->set('Content-Disposition', $disposition);
            $response->headers->set('Content-Type', 'image/png');
            $response->setContent(file_get_contents($filepath));

            return $response;
        } catch (\Exception $exception) {
            return new JsonResponse([$exception->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
