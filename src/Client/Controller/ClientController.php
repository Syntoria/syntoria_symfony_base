<?php

namespace App\Client\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class ClientController extends AbstractController
{
    #[Route(path:"/{path}", name:"client_index", requirements: ["path" => ".+?"], defaults: ["path" => ""], priority: -1)]
    public function indexAction()
    {
        return $this->render('base.html.twig');
    }
}