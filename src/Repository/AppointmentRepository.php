<?php

namespace App\Repository;

use App\Entity\Appointment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Appointment>
 *
 * @method Appointment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Appointment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Appointment[]    findAll()
 * @method Appointment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AppointmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Appointment::class);
    }

    public function add(Appointment $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Appointment $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Appointment[] Returns an array of Appointment objects
//     */
    /*public function findAppointmentByDate($date)
    {
        $qb= $this->createQueryBuilder('a'); 
        $qb->select('a'); 
        $qb->where('a.dayappointment=:date')
             ->setParameter('date',$date);
             $query=$qb->getQuery()->getResult(); 
             return $query;
    } */

//    public function findOneBySomeField($value): ?Appointment
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
public function getNumberOfAppointmentByPathwayByFirstDate($pathway, $date)
    {   
        $qb= $this->createQueryBuilder('a')
            ->where('a.dayappointment >= :date')
            ->andWhere('a.pathway = :pathway')
            ->setParameter('date', $date)
            ->setParameter('pathway', $pathway);
        $query=$qb->getQuery()->getResult();
        return $query;
    }
}

