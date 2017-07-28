<?php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Serializer\Annotation\Groups;
use FOS\RestBundle\Controller\Annotations\View;
class TasksController extends Controller
{
    /**
     * @Rest\Get("/tasks")
     * @View(serializerGroups={"tasks"})
     * @param Request $request
     * @return array
     */
    public function getTasksAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        return $em->getRepository('AppBundle:Task')
            ->findAll();
    }
}