<?php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Serializer\Annotation\Groups;
use FOS\RestBundle\Controller\Annotations\View;
class StatusController extends Controller
{
    /**
     * @Rest\Get("/status")
     * @View(serializerGroups={"status_detail"})
     * @return array
     */
    public function getStatusAction()
    {
        $em = $this->getDoctrine()->getManager();
        return $em->getRepository('AppBundle:Status')->findAll();
    }

}