<?php

namespace App\Api\Controller\V1;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{

    function __construct(#[Autowire('%admin_email%')] private string $adminEmail){}

    #[Route(path:"v1/test", name:"test_index", methods: ["GET"])]
    public function index(Request $request): JsonResponse
    {
        return new JsonResponse(['message' => 'Hello World!']);
    }

    #[Route(path:"v1/test/mail", name:"test_show", methods: ["GET"])]
    public function mail(Request $request, MailerInterface $mailer): JsonResponse
    {
        $email = (new Email())
        ->from($this->adminEmail)
        ->to($this->adminEmail)
        ->subject('Test email')
        ->html('<p>Test email</p>');

        try {
            $mailer->send($email);
            return new JsonResponse(["message"=> 'Email sent!']);
        } catch (TransportExceptionInterface $e) {
            return new JsonResponse(["message"=> $e->getMessage()]);
        }
    }
}