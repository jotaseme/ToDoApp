<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Task;
use AppBundle\Filter\TaskFilterType;
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
        $form = $this->get('form.factory')->create(TaskFilterType::class);
        $em = $this->getDoctrine()->getManager();
        $query = $em->getRepository('AppBundle:Task')->findAllByUser($this->getUser());

        if ($request->query->has($form->getName())) {
            $form->submit($request->query->get($form->getName()));
            $this->get('lexik_form_filter.query_builder_updater')->addFilterConditions($form, $query);
        }
        $forms = $query->getQuery()->getResult();
        return $forms;
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