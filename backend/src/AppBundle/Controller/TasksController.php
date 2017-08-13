<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Task;
use AppBundle\Form\TaskType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Serializer\Annotation\Groups;
use FOS\RestBundle\Controller\Annotations\View;
class TasksController extends Controller
{
    /**
     * @Rest\Get("/tasks")
     * @View(serializerGroups={"task_detail"})
     * @param Request $request
     * @return array
     */
    public function getTasksAction(Request $request)
    {
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();
        return $em->getRepository('AppBundle:Task')
            ->findAllByUser($user);
    }

    /**
     * @Rest\Get("/tasks/{task}")
     * @View(serializerGroups={"task_detail"})
     * @param Task $task
     * @return Task
     * @internal param Request $request
     */
    public function getTaskAction(Task $task)
    {
        return $task;
    }

    /**
     * @Rest\Post("/tasks")
     * @View(serializerGroups={"task_detail"})
     * @param Request $request
     * @return Task|\Symfony\Component\Form\Form
     */
    public function postTasksAction(Request $request)
    {
        $task = new Task();
        $form = $this->createForm(TaskType::class, $task);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $user = $this->getUser();
            $task->setUser($user);
            $em->persist($task);
            $em->flush();
            return $task;
        }
        return $form;
    }

    /**
     * @Rest\Patch("/tasks/{task}")
     * @View(serializerGroups={"task_detail"})
     * @param Request $request
     * @param Task $task
     * @return Task|\Symfony\Component\Form\Form
     */
    public function patchTasksAction(Request $request, Task $task)
    {
        $form = $this->createForm(TaskType::class, $task, array("method" => 'PATCH'));
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($task);
            $em->flush();
            return $task;
        }
        return $form;
    }

    /**
     * @Rest\Delete("/tasks/{task}")
     * @View(serializerGroups={"task_detail"})
     * @param Task $task
     * @return Task|\Symfony\Component\Form\Form
     */
    public function deleteTasksAction(Task $task)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($task);
        $em->flush();
        return;
    }
}