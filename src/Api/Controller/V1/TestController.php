<?php

namespace App\Api\Controller\V1;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    #[Route(path:"v1/test", name:"test_index", methods: ["GET"])]
    public function index(Request $request): JsonResponse
    {
        return new JsonResponse(['message' => 'Hello World!']);
    }
}