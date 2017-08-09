<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Form\UserType;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

class UsersController extends Controller
{
    /**
     * @Rest\Post("/users")
     * @View(serializerGroups={"user_detail"})
     * @param Request $request
     * @return User|\Symfony\Component\Form\Form
     */
    public function postUsersAction(Request $request)
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $encoder = $this->container->get('security.encoder_factory')->getEncoder($user);
            $user->setSalt(md5(time()));
            $password = $encoder->encodePassword($user->getPassword(), $user->getSalt());
            $user->setPassword($password);
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return $user;
        }
        return $form;
    }

    /**
     * @Rest\Patch("/users/{user}", requirements={"recipe": "\d+"}))
     * @View(serializerGroups={"user_detail"})
     * @param Request $request
     * @param User $user
     * @return User|\Symfony\Component\Form\Form
     */
    public function patchUsersAction(Request $request, User $user){
        $form = $this->createForm(UserType::class, $user, array("method" => 'PATCH'));
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return $user;
        }
        return $form;
    }

    /**
     * @Rest\Get("/user/authenticated"))
     * @View(serializerGroups={"user_detail"})
     * @return User
     */
    public function getUserAuthenticatedAction(){
        $user = $this->getUser();
        return $user;
    }
}
