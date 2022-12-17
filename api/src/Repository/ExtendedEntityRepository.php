<?php

namespace App\Infrastructure\Persistence\Doctrine\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\Mapping\MappingException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;

/**
 * Class ExtendedEntityRepository
 * @SuppressWarnings(PHPMD.NumberOfChildren)
 */
class ExtendedEntityRepository extends ServiceEntityRepository
{
    /**
     * @param object $object
     *
     * @throws ORMException
     */
    public function persist($object): void
    {
        $this->_em->persist($object);
    }

    /**
     * @param object $object
     *
     * @throws ORMException
     */
    public function remove($object): void
    {
        $this->_em->remove($object);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function flush(): void
    {
        $this->_em->flush();
    }

    /**
     * Clear entity manager
     * @throws MappingException
     *
     * @return void
     */
    public function clear()
    {
        $this->_em->clear();
    }

    /**
     * @param object $object
     *
     * @throws ORMException
     *
     * @return void
     */
    public function refresh($object)
    {
        $this->_em->refresh($object);
    }

    /**
     * @param string $entityName
     * @param mixed  $id
     *
     * @return object|null
     *
     * @throws ORMException
     */
    public function getReference(string $entityName, $id)
    {
        return $this->_em->getReference($entityName, $id);
    }

    /**
     */
    public function disableSoftDeleteFilter(): void
    {
        $this->_em->getFilters()->disable('softdeleteable');
    }

    /**
     */
    public function enableSoftDeleteFilter(): void
    {
        $this->_em->getFilters()->enable('softdeleteable');
    }
}
