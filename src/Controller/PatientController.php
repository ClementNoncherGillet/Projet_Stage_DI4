<?php

namespace App\Controller;

use App\Entity\Patient;
use App\Repository\PatientRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\UnavailabilityMaterialResourceRepository;
use App\Repository\UnavailabilityHumanResourceRepository;

class PatientController extends AbstractController
{
    public function patientGet(PatientRepository $patientRepository, ManagerRegistry $doctrine): Response
    {
        //créer la page de gestion des patients en envoyant la liste de tous les patients stockés en database
        return $this->render('patient/index.html.twig', [
            'patients' => $patientRepository->findBy(array(),
                                                     array('lastname' => 'ASC')),
        ]);
    }
    
    public function patientAdd(Request $request, PatientRepository $patientRepository): Response
    {
        // On recupere toutes les données de la requête
        $param = $request->request->all();

        $lastname = $param['lastname'];       // le nom
        $firstname = $param['firstname'];     // le prenom

        // Création du patient
        $patient = new Patient(); 
        $patient->setLastname($lastname);
        $patient->setFirstname($firstname);
            
        // ajout dans la bdd
        $patientRepository->add($patient, true);

        return $this->redirectToRoute('Patients', [], Response::HTTP_SEE_OTHER);
    }

    public function patientEdit(Request $request, PatientRepository $patientRepository, EntityManagerInterface $entityManager): Response
    {
        //on récupère les nouvelles informations sur le patient
        $idpatient = $request->request->get("idpatient");
        $lastname = $request->request->get("lastname");
        $firstname = $request->request->get("firstname");

        //on récupère le patient grâce à son id
        $patient = $patientRepository->findOneBy(['id' => $idpatient]);

        //on modifie les données du patient
        $patient->setLastname($lastname);
        $patient->setFirstname($firstname);

        //on met à jour le patient dans la bdd
        $entityManager->persist($patient);
        $entityManager->flush();

        return $this->redirectToRoute('Patients', [], Response::HTTP_SEE_OTHER);
    }

    public function patientDelete(Patient $patient, EntityManagerInterface $entityManager, PatientRepository $patientRepository): Response
    {
        //suppression des données associées au patient de la table Appointment
        $appointmentRepository = $this->getDoctrine()->getManager()->getRepository("App\Entity\Appointment");
        $appointments = $appointmentRepository->findBy(['patient' => $patient]);

        foreach($appointments as $appointment)
        {
            $date = $appointment->getDayappointment()->format('Y-m-d');

            //suppression des données associées au patient dans les tables ScheduledActivity, MaterialResourceScheduled et HumanResourceScheduled 
            $scheduledActivityRepository = $this->getDoctrine()->getManager()->getRepository("App\Entity\ScheduledActivity");
            $scheduledActivities = $scheduledActivityRepository->findBy(['appointment' => $appointment]);

            foreach($scheduledActivities as $scheduledActivity)
            {
                //suppression des données associées au patient de la table MaterialResourceScheduled
                $materialResourceScheduledRepository = $this->getDoctrine()->getManager()->getRepository("App\Entity\MaterialResourceScheduled");
                $allMaterialResourceScheduled = $materialResourceScheduledRepository->findBy(['scheduledactivity' => $scheduledActivity]);

                foreach($allMaterialResourceScheduled as $materialResourceScheduled)
                {
                    $materialResourceScheduledRepository->remove($materialResourceScheduled, true);
                }


                //suppression des données associées au patient de la table HumanResourceScheduled
                $humanResourceScheduledRepository = $this->getDoctrine()->getManager()->getRepository("App\Entity\HumanResourceScheduled");
                $allHumanResourceScheduled = $humanResourceScheduledRepository->findBy(['scheduledactivity' => $scheduledActivity]);

                foreach($allHumanResourceScheduled as $humanResourceScheduled)
                {
                    $humanResourceScheduledRepository->remove($humanResourceScheduled, true);
                }


                //suppression des données associées au patient de la table ScheduledActivity
                $scheduledActivityRepository->remove($scheduledActivity, true);
            }
            $appointmentRepository->remove($appointment, true);
        }

        //suppression du patient dans la table Patient
        $patientRepository->remove($patient, true);

        return $this->redirectToRoute('Patients', [], Response::HTTP_SEE_OTHER);
    }

    public function getDataPatient(ManagerRegistry $doctrine)
    {
        $appointments = $this->getAppointmentByPatientId($_POST["idPatient"], $doctrine);
        return new JsonResponse($appointments);
    }

    public function getAppointmentByPatientId($id, ManagerRegistry $doctrine)
    {
        $patient = $doctrine->getManager()->getRepository("App\Entity\Patient")->findOneBy(["id"=>$id]);
        $appointments = $doctrine->getManager()->getRepository("App\Entity\Appointment")->findBy(["patient"=>$patient]);
        $appointmentArray=[];
        foreach ($appointments as $appointment) {
            $date = $appointment->getDayappointment()->format('d-m-Y');
            if($date >= date('d-m-Y')){
                $appointmentArray[] = [
                    'pathwayname' => $appointment->getPathway()->getPathwayname(),
                    'date' => $appointment->getDayappointment()->format('d-m-Y'),
                ];
            }
        }

        return $appointmentArray;
    }
}
