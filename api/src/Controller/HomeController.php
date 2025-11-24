<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class HomeController
 */
class HomeController extends AbstractController
{
    /**
     * @return Response|JsonResponse
     */
    public function __invoke()
    {
        return new Response(
            $this->renderView('index.html.twig')
        );
    }
}
