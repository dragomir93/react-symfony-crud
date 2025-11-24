<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class LogoController
 */
class LogoController
{
    private $kernel;
    private $whitelabel;

    /**
     * @param KernelInterface $kernel
     * @param string          $whitelabel
     */
    public function __construct(KernelInterface $kernel, string $whitelabel)
    {
        $this->kernel = $kernel;
        $this->whitelabel = $whitelabel;
    }

    /**
     * @Route("/logo.svg", methods={"GET"})
     *
     * @return BinaryFileResponse
     */
    public function __invoke(): BinaryFileResponse
    {
        $logoPath = $this->kernel->getProjectDir().'/public/images/logo/'.$this->whitelabel.'_logo.svg';
        if (!file_exists($logoPath)) {
            $logoPath = $this->kernel->getProjectDir().'/public/images/logo/logo.svg';
        }

        $response = new BinaryFileResponse($logoPath);
        $response->headers->set('Content-Type', 'image/svg+xml');

        return $response;
    }
}
