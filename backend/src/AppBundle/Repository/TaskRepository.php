<?php
namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class TaskRepository extends EntityRepository
{
    public function findAllByUser($user)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT t FROM AppBundle:Task t WHERE t.user = :user')
            ->setParameter('user', $user)
            ->getResult();
    }
}
