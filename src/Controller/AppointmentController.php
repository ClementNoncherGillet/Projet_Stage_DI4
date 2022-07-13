<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Repository\AppointmentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

class AppointmentController extends AbstractController
{
    public function appointmentGet(AppointmentRepository $appointmentRepository, ManagerRegistry $doctrine): Response
    {
        global $date;
        $date = date(('Y-m-d'));
        if (isset($_GET["date"])) {
            $date = $_GET["date"];
            $date = str_replace('T12:00:00', '', $date);
        }
        
        $currentDateTime = new \DateTime($date);
        //créer la page de gestion des rendez-vous en envoyant la liste de tous les rendez-vous, patients et parcours stockés en database
        return $this->render('appointment/index.html.twig', [
            'currentappointments' => $appointmentRepository->findBy(["dayappointment" => $currentDateTime]),
            'currentdate' => $date,
            'patients' => $doctrine->getManager()->getRepository("App\Entity\Patient")->findall(),
            'pathways' => $doctrine->getManager()->getRepository("App\Entity\Pathway")->findall()
        ]);
    }

    public function appointmentAdd(Request $request, AppointmentRepository $appointmentRepository, ManagerRegistry $doctrine): Response
    {
        // On recupere toutes les données de la requete
        $param = $request->request->all();

        // On vérifie que tous les champs sont remplis
        if(count($param) != 5)
        {
            return $this->redirectToRoute('Appointment', [], Response::HTTP_SEE_OTHER);
        }

        $patient = $doctrine->getManager()->getRepository("App\Entity\Patient")->findOneBy(['id' => $param['idpatient']]);
        $pathway = $doctrine->getManager()->getRepository("App\Entity\Pathway")->findOneBy(['id' => $param['idpathway']]);
        $dayappointment = \DateTime::createFromFormat('Y-m-d', $param['dayappointment']);
        $earliestappointmenttime = \DateTime::createFromFormat('H:i', $param['earliestappointmenttime']);
        $latestappointmenttime = \DateTime::createFromFormat('H:i', $param['latestappointmenttime']); 

        // Création du rendez-vous
        $appointment = new Appointment(); 
        $appointment->setPatient($patient);
        $appointment->setPathway($pathway);
        $appointment->setDayappointment($dayappointment);
        $appointment->setEarliestappointmenttime($earliestappointmenttime);
        $appointment->setLatestappointmenttime($latestappointmenttime);
        $appointment->setScheduled(false);

        // ajout dans la bdd
        $appointmentRepository->add($appointment, true);

        return $this->redirectToRoute('Appointment', [], Response::HTTP_SEE_OTHER);
    }

    public function appointmentEdit(Request $request, AppointmentRepository $appointmentRepository, ManagerRegistry $doctrine)
    {
        //on récupère les nouvelles informations sur le rendez-vous
        $param = $request->request->all();
        $appointment = $appointmentRepository->findOneBy(['id' => $param['idappointment']]);
        $patient = $doctrine->getManager()->getRepository("App\Entity\Patient")->findOneBy(['id' => $param['idpatient']]);
        $pathway = $doctrine->getManager()->getRepository("App\Entity\Pathway")->findOneBy(['id' => $param['idpathway']]);
        $dayappointment = \DateTime::createFromFormat('Y-m-d', $param['dayappointment']);
        $earliestappointmenttime = \DateTime::createFromFormat('H:i', $param['earliestappointmenttime']);
        $latestappointmenttime = \DateTime::createFromFormat('H:i', $param['latestappointmenttime']);

        //on modifie les données du rendez-vous
        $appointment->setPatient($patient);
        $appointment->setPathway($pathway);
        $appointment->setDayappointment($dayappointment);
        $appointment->setEarliestappointmenttime($earliestappointmenttime);
        $appointment->setLatestappointmenttime($latestappointmenttime);
        $appointment->setScheduled(false);

        //on met à jour le rendez-vous dans la bdd
        $appointmentRepository->add($appointment, true);

        return $this->redirectToRoute('Appointment', [], Response::HTTP_SEE_OTHER);
    }

    public function appointmentDelete(EntityManagerInterface $entityManager, Appointment $appointment, AppointmentRepository $appointmentRepository): Response
    {
        //on récupère toutes les activités programmées associées au rendez-vous
        $scheduledActivityRepository = $this->getDoctrine()->getManager()->getRepository("App\Entity\ScheduledActivity");
        $scheduledActivities = $scheduledActivityRepository->findBy(['appointment' => $appointment]);

        foreach($scheduledActivities as $scheduledActivity)
        {
            $date = $appointment->getDayappointment()->format('Y-m-d');

            //suppression des données associées au rendez-vous de la table MaterialResourceScheduled
            $materialResourceScheduledRepository = $this->getDoctrine()->getManager()->getRepository("App\Entity\MaterialResourceScheduled");
            $allMaterialResourceScheduled = $materialResourceScheduledRepository->findBy(['scheduledactivity' => $scheduledActivity]);

            foreach($allMaterialResourceScheduled as $materialResourceScheduled)
            {
                $unavailabilityRemove = $materialResourceScheduled->getUnavailability();
                $materialResourceScheduledRepository->remove($materialResourceScheduled, true);
                $entityManager->remove($unavailabilityRemove);
                $entityManager->flush();
            }


            //suppression des données associées au rendez-vous de la table HumanResourceScheduled
            $humanResourceScheduledRepository = $this->getDoctrine()->getManager()->getRepository("App\Entity\HumanResourceScheduled");
            $allHumanResourceScheduled = $humanResourceScheduledRepository->findBy(['scheduledactivity' => $scheduledActivity]);

            foreach($allHumanResourceScheduled as $humanResourceScheduled)
            {
                $unavailabilityRemove = $humanResourceScheduled->getUnavailability();
                $humanResourceScheduledRepository->remove($humanResourceScheduled, true);
                $entityManager->remove($unavailabilityRemove);
                $entityManager->flush();
            }


            //suppression des données associées au rendez-vous de la table ScheduledActivity
            $scheduledActivityRepository->remove($scheduledActivity, true);
        }

        //suppression du rendez-vous
        $appointmentRepository->remove($appointment, true);

        return $this->redirectToRoute('Appointment', [], Response::HTTP_SEE_OTHER);
    }
}