<?php

namespace App\Controller;

use App\Entity\Pathway;
use App\Entity\Activity;
use App\Entity\Successor;
use App\Entity\Target;
use App\Entity\ActivityHumanResource;
use App\Entity\ActivityMaterialResource;
use App\Repository\PathwayRepository;
use App\Repository\ActivityRepository;
use App\Repository\HumanResourceCategoryRepository;
use App\Repository\ActivityHumanResourceRepository;
use App\Repository\ActivityMaterialResourceRepository;
use App\Repository\MaterialResourceCategoryRepository;
use App\Repository\AppointmentRepository;
use App\Repository\MaterialResourceRepository;
use App\Repository\SuccessorRepository;
use App\Repository\TargetRepository;
use App\Repository\UnavailabilityMaterialResourceRepository;
use App\Repository\UnavailabilityHumanResourceRepository;
use App\Form\PathwayType;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Expr\BinaryOp\Concat;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Knp\Component\Pager\PaginatorInterface;

use Symfony\Component\Validator\Constraints\Length;

use function Symfony\Component\DependencyInjection\Loader\Configurator\param;

/**
 * @Route("/circuit")
 */
class PathwayController extends AbstractController
{


    /*
     * Permet de créer un objet json a partir d'une liste de categorie de ressource humaine
     */
    public function listHumanResourcesJSON(ManagerRegistry $doctrine)
    {
        $humanResourceCategoryRepo = $doctrine->getRepository("App\Entity\HumanResourceCategory");
        $humanResourceCategories = $humanResourceCategoryRepo->findBy(array(), array('categoryname' => 'ASC'));
        $humanResourceCategoriesArray = array();

        if ($humanResourceCategories != null) {
            foreach ($humanResourceCategories as $humanResourceCategory) {
                $humanResourceCategoriesArray[] = array(
                    'id' => strval($humanResourceCategory->getId()),
                    'categoryname' => $humanResourceCategory->getCategoryname(),
                );
            }
        }
        //Conversion des données ressources en json
        $humanResourceCategoriesArrayJson = new JsonResponse($humanResourceCategoriesArray);
        return $humanResourceCategoriesArrayJson;    
    }

    /*
     * Permet de créer un objet json a partir d'une liste de categorie de ressource materielle
     */
    public function listMaterialResourcesJSON(ManagerRegistry $doctrine)
    {
        $materialResourceCategoryRepo = $doctrine->getRepository("App\Entity\MaterialResourceCategory");
        $materialResourceCategories = $materialResourceCategoryRepo->findBy(array(), array('categoryname' => 'ASC'));
        $materialResourceCategoriesArray = array();

        if ($materialResourceCategories != null) {
            foreach ($materialResourceCategories as $materialResourceCategory) {
                $materialResourceCategoriesArray[] = array(
                    'id' => strval($materialResourceCategory->getId()),
                    'categoryname' => $materialResourceCategory->getCategoryname(),
                );
            }
        }
        //Conversion des données ressources en json
        $materialResourceCategoriesArrayJson = new JsonResponse($materialResourceCategoriesArray);
        return $materialResourceCategoriesArrayJson;    
    }



    /*
     * Permet de créer un objet json a partir d'une entité de type pathway
     */
    public function pathwayJSON(Pathway $pathway, ManagerRegistry $doctrine)
    {
        $activityRepo = $doctrine->getRepository("App\Entity\Activity");
        $activitiesOfPathway = $activityRepo->findBy(['pathway' => $pathway]);
        
        //$pathwayArray = array();
        $pathwayArray = array(
            'id' => $pathway->getId(),
            'pathwayname' => $pathway->getPathwayname()
        );
        
        $activityHumanResourceRepo = $doctrine->getRepository("App\Entity\ActivityHumanResource");
        $activityMaterialResourceRepo = $doctrine->getRepository("App\Entity\ActivityMaterialResource");

        $activitiesArray = array();
        $successorsArray = array();
        foreach ($activitiesOfPathway as $activity) {

            $humanResources = $activityHumanResourceRepo->findBy(['activity' => $activity]);
            $hrArray = array();
            foreach ($humanResources as $hr) {

                $hrobject = array(
                    'id' => $hr->getHumanresourcecategory()->getId(),
                    'name' => $hr->getHumanresourcecategory()->getCategoryname(),
                    'nb' => $hr->getQuantity()
                );
                array_push($hrArray, $hrobject);     
            }

            $materialResources = $activityMaterialResourceRepo->findBy(['activity' => $activity]);
            $mrArray = array();

            foreach ($materialResources as $mr) {

                $mrobject = array(
                    'id' => $mr->getMaterialresourcecategory()->getId(),
                    'name' => $mr->getMaterialresourcecategory()->getCategoryname(),
                    'nb' => $mr->getQuantity()
                );
                array_push($mrArray, $mrobject);

            }
            $activitiesArray[] = array(
                'id' => $activity->getId(),
                'activityname' => $activity->getActivityname(),
                'activityduration' => $activity->getDuration(),
                'humanResourceCategories' => $hrArray,
                'materialResourceCategories' =>$mrArray
            );

            $successorRepo = $doctrine->getRepository("App\Entity\Successor");
            $successors = $successorRepo->findBy(["activitya"=>$activity]);
            foreach($successors as $successor){
                $nameActivityA = $activityRepo->findOneBy(['id' => $successor->getActivitya()])->getActivityname();
                $nameActivityB = $activityRepo->findOneBy(['id' => $successor->getActivityb()])->getActivityname();
                $successorsArray[] = array(
                    'idActivityA' => $successor->getActivitya()->getId(),
                    'idActivityB' => $successor->getActivityb()->getId(),
                    'nameActivityA' => $nameActivityA,
                    'nameActivityB' => $nameActivityB,
                    'delayMin' => $successor->getDelaymin(),
                    'delayMax' =>$successor->getDelaymax()
                );
            }
        }
        
        $pathwayArray += [ 'activities' => $activitiesArray ];
        $pathwayArray += [ 'successors' => $successorsArray ];
        /*
        $activityHumanResourceRepo = new ActivityHumanResourceRepository($this->getDoctrine());

        $materialResourceCategoryRepo = new MaterialResourceCategoryRepository($this->getDoctrine());
        $materialResourceCategories = $materialResourceCategoryRepo->findAll();
        $materialResourceCategoriesArray = array();

        if ($materialResourceCategories != null) {
            foreach ($materialResourceCategories as $materialResourceCategory) {
                $materialResourceCategoriesArray[] = array(
                    'id' => strval($materialResourceCategory->getId()),
                    'categoryname' => $materialResourceCategory->getCategoryname(),
                );
            }
        }*/

        //Conversion des données ressources en json
        $pathwayJson = new JsonResponse($pathwayArray);
        return $pathwayJson;    
    }

    /*
     * Permet de créer un objet json contenant les targets d'un pathway
     */
    public function listTargetsJSON($pathway, ManagerRegistry $doctrine)
    {
        $targetRepository = $doctrine->getRepository("App\Entity\Target");

        $targets = $targetRepository->findBy(["pathway" => $pathway]);

        $targetsArrayJson = new JsonResponse([]);

        if ($targets != null) {
            foreach ($targets as $target) {
                $targetsArray[] = array(
                    'id' => strval($target->getId()),
                    'target' => $target->getTarget(),
                    'dayweek' => $target->getDayweek(),
                );
            }
            $targetsArrayJson = new JsonResponse($targetsArray);

        }

        //Conversion des données ressources en json
        return $targetsArrayJson;    
    }

    /*
     * Redirige vers la page qui liste les utilisateurs 
     * route : "/pathways"
     */
    public function pathwayGet(PathwayRepository $pathwayRepository, ManagerRegistry $doctrine, Request $request, PaginatorInterface $paginator): Response
    {

        $activityRepository = $doctrine->getManager()->getRepository("App\Entity\Activity");

        //$humanResourceRepo = new HumanResourceRepository($this->getDoctrine());
        //$humanResources = $humanResourceRepo->findAll();
        // dd($humanResources);
        $humanResourceCategoriesJson = $this->listHumanResourcesJSON($doctrine);
        $materialResourceCategoriesJson = $this->listMaterialResourcesJSON($doctrine);
        //$materialResourceRepo = new MaterialResourceRepository($this->getDoctrine());
        //$materialResources = $materialResourceRepo->findAll();

        $pathways=$paginator->paginate(
            $pathwayRepository->findAllPathway(), 
            $request->query->getInt('page',1),
            10
        ); 
        $nbPathway = count($pathways);

        $activitiesByPathways = array();

        for ($i = 0; $i < $nbPathway; $i++) {
            array_push($activitiesByPathways, $activityRepository->findBy(['pathway' => $pathways[$i]]));
        }

        return $this->render('pathway/index.html.twig', [
            'pathways' => $pathways,
            'activitiesByPathways' => $activitiesByPathways,
            'humanResourceCategories' => $humanResourceCategoriesJson,
            'materialResourceCategories' => $materialResourceCategoriesJson,
        ]);
    }


    /*
     * Redirige vers la page d'édition d'un parcours
     * route : "/pathway/edit/{id}"
     */
    public function pathwayEditPage(Request $request, PathwayRepository $pathwayRepository, ManagerRegistry $doctrine, int $id): Response
    {

        // Méthode GET pour aller vers la page d'ajout d'un parcours 
        if ($request->getMethod() === 'GET' ) {

            $activityRepository = $doctrine->getRepository("App\Entity\Activity");

            $humanResourceCategoriesJson = $this->listHumanResourcesJSON($doctrine);
            $materialResourceCategoriesJson = $this->listMaterialResourcesJSON($doctrine);

            $pathway = $pathwayRepository->findBy(['id' => $id]);
            $pathwayJson = $this->pathwayJSON($pathway[0], $doctrine);
            //dd($pathwayJson);

            $activitiesByPathways = $activityRepository->findBy(['pathway' => $pathway]);

            $targetsJson = $this->listTargetsJSON($pathway, $doctrine);            

            return $this->render('pathway/edit.html.twig', [
                'pathway' => $pathway,
                'pathwayJson' => $pathwayJson,
                'activitiesByPathways' => $activitiesByPathways,
                'humanResourceCategories' => $humanResourceCategoriesJson,
                'materialResourceCategories' => $materialResourceCategoriesJson,
                'targets' => $targetsJson,
            ]);
        }
            
    }

    /*
     * Redirige vers la page d'ajout d'un parcours
     * route : "/pathway/add"
     */
    public function pathwayAddPage(Request $request, PathwayRepository $pathwayRepository, ManagerRegistry $doctrine): Response
    {

        // Méthode GET pour aller vers la page d'ajout d'un parcours 
        if ($request->getMethod() === 'GET' ) {

            $activityRepository = $doctrine->getRepository("App\Entity\Activity");

            //$humanResourceRepo = new HumanResourceRepository($this->getDoctrine());
            //$humanResources = $humanResourceRepo->findAll();
            // dd($humanResources);
            $humanResourceCategoriesJson = $this->listHumanResourcesJSON($doctrine);
            $materialResourceCategoriesJson = $this->listMaterialResourcesJSON($doctrine);
            //$materialResourceRepo = new MaterialResourceRepository($this->getDoctrine());
            //$materialResources = $materialResourceRepo->findAll();
    
            $pathways = $pathwayRepository->findAll();
            $nbPathway = count($pathways);
    
            $activitiesByPathways = array();
    
            for ($i = 0; $i < $nbPathway; $i++) {
                array_push($activitiesByPathways, $activityRepository->findBy(['pathway' => $pathways[$i]]));
            }

            return $this->render('pathway/add.html.twig', [
                'pathways' => $pathways,
                'activitiesByPathways' => $activitiesByPathways,
                'humanResourceCategories' => $humanResourceCategoriesJson,
                'materialResourceCategories' => $materialResourceCategoriesJson,
            ]);
        }
            
    }

    
    /*
     * Ajoute dans la base de données :
     * Ajoute un parcours  
     * Ajoute les activités liées a ce parcours
     * Ajoute les successors liés aux activités
     * Ajoute les ressources humaines et materielles liées aux activités 
     * 
     * route : "/pathway/add"
     */
    public function pathwayAdd(Request $request, PathwayRepository $pathwayRepository, ManagerRegistry $doctrine): Response
    {

        // POST method to add a pathway 
        if ($request->getMethod() === 'POST' ) {
            
            // Create all the repository 
            $activityRepository = $doctrine->getRepository("App\Entity\Activity");
            $successorRepository = $doctrine->getRepository("App\Entity\Successor");
            $AHRRepository = $doctrine->getRepository("App\Entity\ActivityHumanResource");
            $AMRRepository = $doctrine->getRepository("App\Entity\ActivityMaterialResource");
            $HRCRepository = $doctrine->getRepository("App\Entity\HumanResourceCategory");
            $MRCRepository = $doctrine->getRepository("App\Entity\MaterialResourceCategory");
            $targetRepository = $doctrine->getRepository("App\Entity\Target");


            // We get all the datas from the request
            $param = $request->request->all();

            // On get the json which contains the list of the resources by activities and successors
            // et we convert it into a PHP Array
            $resourcesByActivities = json_decode($param['json-resources-by-activities']);
            $successors= json_decode($param['json-successors']);
            // First we add the pathway to the db :
            
            // We create the pathway object
            $pathway = new Pathway();
            $pathway->setPathwayname($param['pathwayname']);

            // We add the pathway to the db
            $pathwayRepository->add($pathway, true);

            // First we create the targets
            for ($i = 0; $i < 7; $i++) {
                $target = new Target();
                $target->setTarget(intval($param['target-'.$i]));
                $target->setDayWeek($i);
                $target->setPathway($pathway);
                $targetRepository->add($target, true);
            }

            // We handle the link between pathway and activities 

            // We get the number of activities and successors
            $nbActivity = count($resourcesByActivities);
            $nbSuccessor = count($successors);

            // We create an array to store the activies id in the database after we added them
            // So we don't have to use the name (which can be the same for different activities)
            $activitiesIdArray = array();

            if ($nbActivity != 0) {
                for ($indexActivity = 0; $indexActivity < $nbActivity; $indexActivity++) {
                    if ($resourcesByActivities[$indexActivity]->available) {
                        // Création of the activity
                        $activity = new Activity();
                        $activity->setActivityname($resourcesByActivities[$indexActivity]->activityname);
                        $activity->setDuration(intval($resourcesByActivities[$indexActivity]->activityduration));
                        $activity->setPathway($pathway);
                        $activityRepository->add($activity, true);
        
                        // Get the last inserted row, i.e the activity we just added
                        $activity =  $activityRepository->findOneBy(array(),array('id'=>'DESC'),1,0);
                        array_push($activitiesIdArray, $activity->getId());

                        // Add the link between activity - human resources
                        
                        $nbHRC = count($resourcesByActivities[$indexActivity]->humanResourceCategories);
                    
                        if ($nbHRC != 0) {
                            for ($indexHRC = 0; $indexHRC < $nbHRC; $indexHRC++) {

                                if ($resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->available) {
                                    // First we get the category in the db
                                    $HRC = $HRCRepository->findOneBy(['id' => $resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->id]);
                                                                                            
                                    // The we create the object ActivityMaterialResource
                                    $activityHumanResource = new ActivityHumanResource();
                                    $activityHumanResource->setActivity($activity);
                                    $activityHumanResource->setHumanresourcecategory($HRC);
                                    $activityHumanResource->setQuantity(intval($resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->nb));
                                                                    
                                    // We add it to the db
                                    $AHRRepository->add($activityHumanResource , true);
                                }
                            }
                        }
                    

                        // Add the link between activity - material resources
                        
                        $nbMRC = count($resourcesByActivities[$indexActivity]->materialResourceCategories);
                    
                        if ($nbMRC != 0) {
                            for ($indexMRC = 0; $indexMRC < $nbMRC; $indexMRC++) {

                                if ($resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->available) {

                                    // first we get the category of the db
                                    $MRC = $MRCRepository->findOneBy(['id' => $resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->id]);
                                    
                                    // We create the object ActivityMaterialResource
                                    $activityMaterialResource = new ActivityMaterialResource();
                                    $activityMaterialResource->setActivity($activity);
                                    $activityMaterialResource->setMaterialresourcecategory($MRC);
                                    $activityMaterialResource->setQuantity(intval($resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->nb));
                                    
                                    // then we add it to the db
                                    $AMRRepository->add($activityMaterialResource , true);
                                }
                            }
                        }
                    }
                }
                for($indexSuccessor = 0; $indexSuccessor < $nbSuccessor; $indexSuccessor++){
                    // Creation of the successor between the 2 activities
                    $successor = new Successor();
                    
                    $idA = intval(explode("activity", $successors[$indexSuccessor]->idActivityA)[1]);
                    $idB = intval(explode("activity", $successors[$indexSuccessor]->idActivityB)[1]);
                    
                    $activitya = $activityRepository->findOneBy(['id' => $activitiesIdArray[$idA-1]]);
                    $activityb = $activityRepository->findOneBy(['id' => $activitiesIdArray[$idB-1]]);
                    $successor->setActivitya($activitya);
                    $successor->setActivityb($activityb);
                    
                    $successor->setDelaymin($successors[$indexSuccessor]->delayMin);
                    $successor->setDelaymax($successors[$indexSuccessor]->delayMax);
                    
                    $successorRepository->add($successor, true);
                }
            
            }                
            return $this->redirectToRoute('Pathways', [], Response::HTTP_SEE_OTHER);
        }
    }


    /**
     * @Route("/{id}", name="app_circuit_show", methods={"GET"})
     */
    public function show(Pathway $pathway): Response
    {
        return $this->render('pathway/show.html.twig', [
            'pathway' => $pathway,
        ]);
    }


    /*
     * Editing pathway method
     */
    public function pathwayEdit(Request $request, ManagerRegistry $doctrine): Response
    {
        
        // POST method to edit a pathway
        if ($request->getMethod() === 'POST' ) {
            
            $em= $doctrine->getManager();

            // Create all the repository 
            $pathwayRepository = $doctrine->getRepository("App\Entity\Pathway");
            $activityRepository = $doctrine->getRepository("App\Entity\Activity");
            $successorRepository = $doctrine->getRepository("App\Entity\Successor");
            $AHRRepository = $doctrine->getRepository("App\Entity\ActivityHumanResource");
            $AMRRepository = $doctrine->getRepository("App\Entity\ActivityMaterialResource");
            $HRCRepository = $doctrine->getRepository("App\Entity\HumanResourceCategory");
            $MRCRepository = $doctrine->getRepository("App\Entity\MaterialResourceCategory");
            $targetRepository = $doctrine->getRepository("App\Entity\Target");

            // We get all the data from the request
            $param = $request->request->all();

            //We get the json which contains the list of the resources by activities
            // then we transform it into a PHP Array
            $resourcesByActivities = json_decode($param['json-resources-by-activities']);
            $successors= json_decode($param['json-successors']);
            
            // First we want to add the pathway to the db :
            
            // We create the pathway object
            $pathway = $pathwayRepository->findBy(["id"=>$param['pathwayid']])[0];
            $pathway->setPathwayname($param['pathwayname']);

            // We add the pathway to the db
            $em->flush();

            // We update the targets
            $targets = $targetRepository->findBy(["pathway" => $pathway]);
            for ($i = 0 ; $i < 7 ; $i++) {
                if ( count($targetRepository->findBy(["pathway" => $pathway, "dayweek" => $i])) != 0) {
                    $targetRepository->findBy(["pathway" => $pathway, "dayweek" => $i])[0]->setTarget(intval($param['target-'.$i]));
                }
                else 
                {
                    $target = new Target();
                    $target->setTarget(intval($param['target-'.$i]));
                    $target->setDayWeek($i);
                    $target->setPathway($pathway);
                    $targetRepository->add($target, true);
                }
            }
            


            // UNCHEDULE APPOINTMENTS     
            if ($param["are-appointments-deleted"]) {
                // deletion of the appointements
                $appointmentRepository = $doctrine->getRepository("App\Entity\Appointment");
                $appointmentsScheduled = $appointmentRepository->findBy(['pathway' => $pathway, "scheduled" => true]);

                foreach ($appointmentsScheduled as $appointment) {

                    // We get all the activities associated with the appointment
                    $scheduledActivityRepository = $doctrine->getManager()->getRepository("App\Entity\ScheduledActivity");
                    $scheduledActivities = $scheduledActivityRepository->findBy(['appointment' => $appointment]);

                    foreach ($scheduledActivities as $scheduledActivity) {
                        $date = $appointment->getDayappointment()->format('Y-m-d');

                        // Deletion of the data associated with the appointment in the table MaterialResourceScheduled
                        $materialResourceScheduledRepository = $doctrine->getManager()->getRepository("App\Entity\MaterialResourceScheduled");
                        $allMaterialResourceScheduled = $materialResourceScheduledRepository->findBy(['scheduledactivity' => $scheduledActivity]);

                        foreach ($allMaterialResourceScheduled as $materialResourceScheduled) {
                            $materialResourceScheduledRepository->remove($materialResourceScheduled, true);
                        }


                        //suppression des données associées au rendez-vous de la table HumanResourceScheduled
                        $humanResourceScheduledRepository = $doctrine->getManager()->getRepository("App\Entity\HumanResourceScheduled");
                        $allHumanResourceScheduled = $humanResourceScheduledRepository->findBy(['scheduledactivity' => $scheduledActivity]);

                        foreach ($allHumanResourceScheduled as $humanResourceScheduled) {
                            $humanResourceScheduledRepository->remove($humanResourceScheduled, true);
                        }

                        $commentsScheduledActivityRepository = $doctrine->getManager()->getRepository("App\Entity\CommentScheduledActivity");
                        $commentsScheduledActivity = $commentsScheduledActivityRepository->findBy(['scheduledactivity' => $scheduledActivity]);

                        foreach ($commentsScheduledActivity as $commentScheduledActivity) {
                            $commentsScheduledActivityRepository->remove($commentScheduledActivity, true);
                        }

                        //suppression des données associées au rendez-vous de la table ScheduledActivity
                        $scheduledActivityRepository->remove($scheduledActivity, true);
                        
                    }

                    // unschedule appointment
                    $appointment->setScheduled(false);

                }
            }

            // We handle the links between pathway and ativities

            // We get the number of activities
            $nbActivity = count($resourcesByActivities);
            $nbSuccessor = count($successors);

            $pathwaySuccessors = array();

            // We create an array to store the activies id in the database after we added them
            // So we don't have to use the name (which can be the same for different activities)
            $activitiesIdArray = array();

            if ($nbActivity != 0) {
                
                $firstActivityAvailableFound = false;
                for ($indexActivity = 0; $indexActivity < $nbActivity; $indexActivity++) {
                    $activitySuccessors = $successorRepository->findBy(['activitya' => $resourcesByActivities[$indexActivity]->id]);
                    for($i = 0; $i < count($activitySuccessors); $i++){
                        $pathwaySuccessors[] = $activitySuccessors[$i];
                    }
                    if ($resourcesByActivities[$indexActivity]->available) {
                        
                        $activity = new Activity();

                        // We verify if the activity already exists (if its id if equal to -1)
                        if ($resourcesByActivities[$indexActivity]->id == -1) {
                            //If the activity doesnt exists :

                            // Création de l'activité
                            $activity->setActivityname($resourcesByActivities[$indexActivity]->activityname);
                            $activity->setDuration(intval($resourcesByActivities[$indexActivity]->activityduration));
                            $activity->setPathway($pathway);

                            $activityRepository->add($activity, true);
                            // Get the last inserted row, i.e the activity we just added
                            $activity =  $activityRepository->findOneBy(array(),array('id'=>'DESC'),1,0);
                            array_push($activitiesIdArray, $activity->getId());
                        }
                        else {
                            // if the activity already exists :

                            $activity =  $activityRepository->findBy(['id' => $resourcesByActivities[$indexActivity]->id])[0];

                            // Set the activity
                            $activity->setActivityname($resourcesByActivities[$indexActivity]->activityname);
                            $activity->setDuration(intval($resourcesByActivities[$indexActivity]->activityduration));
                            $em->flush();

                            array_push($activitiesIdArray, $activity->getId());
                        }

                        
                        // Add the links activity - human resources 
                        
                        $nbMRC = count($resourcesByActivities[$indexActivity]->materialResourceCategories);
                    
                        if ($nbMRC != 0) {
                            for ($indexMRC = 0; $indexMRC < $nbMRC; $indexMRC++) {

                                // First we get the category in the db
                                $MRC = $MRCRepository->findOneBy(['id' => $resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->id]);
                                

                                // We check if it hasn't been deleted by the user 
                                if ($resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->available) {
                                    if (!($resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->already)) {
                                        // If the resources is available but wasnt in the bd before the edition : We need to add it in the db
                                        
                                        // We create the object ActivityMaterialResource
                                        $activityMaterialResource = new ActivityMaterialResource();
                                        $activityMaterialResource->setActivity($activity);
                                        $activityMaterialResource->setMaterialresourcecategory($MRC);
                                        $activityMaterialResource->setQuantity(intval($resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->nb));
                                        
                                        // Then we add it to the db
                                        $AMRRepository->add($activityMaterialResource , true);
                                    } else {
                                        $activityMaterialResource = $AMRRepository->findBy(["activity" => $activity, "materialresourcecategory" => $MRC]);
                                        $activityMaterialResource[0]->setQuantity(intval($resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->nb));
                                    }
                                } else {
                                    // If it has been removed, we verify if it was in the db before edition
                                    if ($resourcesByActivities[$indexActivity]->materialResourceCategories[$indexMRC]->already) {
                                        // We need to find it in the db and delete it 
                                        $linkAMR = $AMRRepository->findBy(["activity" => $activity, "materialresourcecategory" => $MRC]);
                                        
                                        $em->remove($linkAMR[0]);
                                        $em->flush();
                                    }
                                }
                            }
                        }


                        $nbHRC = count($resourcesByActivities[$indexActivity]->humanResourceCategories);
                    
                        if ($nbHRC != 0) {
                            for ($indexHRC = 0; $indexHRC < $nbHRC; $indexHRC++) {

                                // First we get the category in the db
                                $HRC = $HRCRepository->findOneBy(['id' => $resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->id]);
                                
                                // We check if it hasn't been deleted by the user 
                                if ($resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->available) {
                                    if (!($resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->already)) {
                                        // If the resources is available but wasnt in the bd before the edition : We need to add it in the db
                                        
                                        // We create the object ActivityHumanResource
                                        $activityHumanResource = new ActivityHumanResource();
                                        $activityHumanResource->setActivity($activity);
                                        $activityHumanResource->setHumanresourcecategory($HRC);
                                        $activityHumanResource->setQuantity(intval($resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->nb));
                                        
                                        // Then we add it to the db
                                        $AHRRepository->add($activityHumanResource , true);
                                    } else {
                                        $activityHumanResource = $AHRRepository->findBy(["activity" => $activity, "humanresourcecategory" => $HRC]);
                                        $activityHumanResource[0]->setQuantity(intval($resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->nb));
                                    }
                                } else {
                                    // If it has been removed, we verify if it was in the db before edition
                                    if ($resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->already) {
                                        // We need to find it in the db and delete it 
                                        $linkAHR = $AHRRepository->findBy(["activity" => $activity, "humanresourcecategory" => $HRC, "quantity" => $resourcesByActivities[$indexActivity]->humanResourceCategories[$indexHRC]->nb]);
                                        
                                        $em->remove($linkAHR[0]);
                                        $em->flush();
                                    }
                                }
                            }
                        }

                    } else {
                        // if the activity is available = false, it has been deleted but we need to know if it was in the pathway before the editing
                        // so we verify if it is in the db
                        if ($resourcesByActivities[$indexActivity]->id != -1) {

                            // We get the activity
                            $activity = $activityRepository->findOneBy(['id' => $resourcesByActivities[$indexActivity]->id]);
                            array_push($activitiesIdArray, $activity->getId());

                            // We get all the links between the activity we want to delete and its resources
                            $activityHumanResources = $AHRRepository->findBy(["activity" => $activity]);
                            $activityMaterialResources = $AMRRepository->findBy(["activity" => $activity]);

                            foreach ($activityHumanResources as $activityHumanResource) {
                                $AHRRepository->remove($activityHumanResource, true);
                            }

                            foreach ($activityMaterialResources as $activityMaterialResource) {
                                $AMRRepository->remove($activityMaterialResource, true);
                            }

                        
                            //$scheduledActivity = new ScheduledActivity($this->getDotrine());
                            
                            //We delete the successors 
                           
                            $successorsa = $successorRepository->findBy(['activitya' => $activity]);
                            for ($indexSuccessora = 0; $indexSuccessora < count($successorsa); $indexSuccessora++) {
                                $em->remove($successorsa[$indexSuccessora]);
                            }
            
                            $successorsb = $successorRepository->findBy(['activityb' => $activity]);
                            for ($indexSuccessorb = 0; $indexSuccessorb < count($successorsb); $indexSuccessorb++) {
                                $em->remove($successorsb[$indexSuccessorb]);
                            }
                            $em->flush();       
                
                        
                            //$activity = $activityRepository->findOneBy(['id' => $resourcesByActivities[$indexActivity]->id]);

                            $em->remove($activity);
                            $em->flush();
                        }
                    }
                }
            }
            
            for($indexSuccessor = 0; $indexSuccessor < $nbSuccessor; $indexSuccessor++){
                // Creating of the successor between the 2 activities
                $successor = new Successor();

                $idA = intval(explode("activity", $successors[$indexSuccessor]->idActivityA)[1]);
                $idB = intval(explode("activity", $successors[$indexSuccessor]->idActivityB)[1]);
                $activitya = $activityRepository->findOneBy(['id' => $activitiesIdArray[$idA-1]]);
                $activityb = $activityRepository->findOneBy(['id' => $activitiesIdArray[$idB-1]]);
                $successor->setActivitya($activitya);
                $successor->setActivityb($activityb);
                
                $successor->setDelaymin($successors[$indexSuccessor]->delayMin);
                $successor->setDelaymax($successors[$indexSuccessor]->delayMax);
                
                // Check if the successor already exist in database
                // If no, create it; else update the delays
                $successorDB = $successorRepository->findOneBy(['activitya' => $activitya, 'activityb' => $activityb]);
                if($successorDB != null){
                    $successorDB->setDelaymin($successors[$indexSuccessor]->delayMin);
                    $successorDB->setDelaymax($successors[$indexSuccessor]->delayMax);
                }
                else{
                    $pathwaySuccessors[] = $successor;
                    $successorRepository->add($successor, true);
                }
                $em->flush();
            }
            for($i = 0; $i < count($pathwaySuccessors); $i++){
                $succ_found = false;
                for($j = 0; $j < count($successors); $j++){
                    $idA = intval(explode("activity", $successors[$j]->idActivityA)[1]);
                    $idB = intval(explode("activity", $successors[$j]->idActivityB)[1]);
                    $activitya = $activityRepository->findOneBy(['id' => $activitiesIdArray[$idA-1]]);
                    $activityb = $activityRepository->findOneBy(['id' => $activitiesIdArray[$idB-1]]);
                    if($pathwaySuccessors[$i]->getActivitya() == $activitya && $pathwaySuccessors[$i]->getActivityb() == $activityb){
                        $succ_found = true;
                    }
                }
                if(!$succ_found){
                    $em->remove($pathwaySuccessors[$i]);
                    $em->flush();
                }
            }
            return $this->redirectToRoute('Pathways', [], Response::HTTP_SEE_OTHER);
        }
    }


    public function pathwayDelete(Request $request, ManagerRegistry $doctrine): Response
    {
        if ($request->getMethod() === 'POST') {
            
            /*
            Order of deletion :
            1)
                HumanResourceScheduled
                MaterialResourceScheduled
                ActivityHumanResource
                ActvityMaterialResource
                Successor
            2)
                ScheduledActivity
            3)
                Appointment
                Activity
            4)
                Pathway
            */

            $em =$doctrine->getManager();

            $activityRepository = $doctrine->getRepository("App\Entity\Activity");
            $pathwayRepository = $doctrine->getRepository("App\Entity\Pathway");
            $successorRepository = $doctrine->getRepository("App\Entity\Successor");
            $appointmentRepository = $doctrine->getRepository("App\Entity\Appointment");

            $activityHumanResourceRepository = $doctrine->getRepository("App\Entity\ActivityHumanResource");
            $activityMaterialResourceRepository = $doctrine->getRepository("App\Entity\ActivityMaterialResource");
            $unavailabilityMaterialResourceRepository = $doctrine->getRepository("App\Entity\UnavailabilityHumanResource");
            $unavailabilityHumanResourceRepository = $doctrine->getRepository("App\Entity\UnavailabilityMaterialResource");
            
            // We get all the data from the resuest
            $param = $request->request->all();

            // Get the pathway we want to delete
            $pathway = $pathwayRepository->findOneBy(['id' => $param['pathwayid']]);


            // --------- DELETION OF THE APPOINTMENTS --------- //

            $appointmentsInPathway = $appointmentRepository->findBy(['pathway' => $pathway]);


            foreach ($appointmentsInPathway as $appointment) {

                // We get all the activities associated with the appointment
                $scheduledActivityRepository = $doctrine->getManager()->getRepository("App\Entity\ScheduledActivity");
                $scheduledActivities = $scheduledActivityRepository->findBy(['appointment' => $appointment]);

                foreach ($scheduledActivities as $scheduledActivity) {
                    $date = $appointment->getDayappointment()->format('Y-m-d');

                    // Deletion of the data associated with the appointment in the table MaterialResourceScheduled
                    $materialResourceScheduledRepository = $doctrine->getManager()->getRepository("App\Entity\MaterialResourceScheduled");
                    $allMaterialResourceScheduled = $materialResourceScheduledRepository->findBy(['scheduledactivity' => $scheduledActivity]);

                    foreach ($allMaterialResourceScheduled as $materialResourceScheduled) {
                        $materialResourceScheduledRepository->remove($materialResourceScheduled, true);
                    }


                    //suppression des données associées au rendez-vous de la table HumanResourceScheduled
                    $humanResourceScheduledRepository = $doctrine->getManager()->getRepository("App\Entity\HumanResourceScheduled");
                    $allHumanResourceScheduled = $humanResourceScheduledRepository->findBy(['scheduledactivity' => $scheduledActivity]);

                    foreach ($allHumanResourceScheduled as $humanResourceScheduled) {
                        $humanResourceScheduledRepository->remove($humanResourceScheduled, true);
                    }

                    $commentsScheduledActivityRepository = $doctrine->getManager()->getRepository("App\Entity\CommentScheduledActivity");
                    $commentsScheduledActivity = $commentsScheduledActivityRepository->findBy(['scheduledactivity' => $scheduledActivity]);

                    foreach ($commentsScheduledActivity as $commentScheduledActivity) {
                        $commentsScheduledActivityRepository->remove($commentScheduledActivity, true);
                    }

                    //suppression des données associées au rendez-vous de la table ScheduledActivity
                    $scheduledActivityRepository->remove($scheduledActivity, true);
                }

                // deletion of the appointment
                $appointmentRepository->remove($appointment, true);

            }

            
            // get the activities of the pathway  
            $activitiesInPathway = $activityRepository->findBy(['pathway' => $pathway]);
            


            // --------- DELETION OF SUCCESSORS  --------- //
            // --------- DELETION OF LINKS BETWEEN ACTIVITIES AND CATEGORIES --------- //

        
            for ($indexActivity = 0; $indexActivity < count($activitiesInPathway); $indexActivity++) {

                $successorsa = $successorRepository->findBy(['activitya' => $activitiesInPathway[$indexActivity]]);
                for ($indexSuccessora = 0; $indexSuccessora < count($successorsa); $indexSuccessora++) {
                    $em->remove($successorsa[$indexSuccessora]);
                }

                $successorsb = $successorRepository->findBy(['activityb' => $activitiesInPathway[$indexActivity]]);
                for ($indexSuccessorb = 0; $indexSuccessorb < count($successorsb); $indexSuccessorb++) {
                    $em->remove($successorsb[$indexSuccessorb]);
                }
                $em->flush();

                $activityHumanResources = $activityHumanResourceRepository->findBy(['activity' => $activitiesInPathway[$indexActivity]]);
                for ($indexAHR = 0; $indexAHR < count($activityHumanResources); $indexAHR++) {
                    //echo 'on supprime'.$indexAHR;
                    $em->remove($activityHumanResources[$indexAHR]);
                }

                $activityMaterialResources = $activityMaterialResourceRepository->findBy(['activity' => $activitiesInPathway[$indexActivity]]);
                for ($indexAMR = 0; $indexAMR < count($activityMaterialResources); $indexAMR++) {
                    $em->remove($activityMaterialResources[$indexAMR]);
                }
                $em->flush();

            }


            // --------- DELETION OF ACTIVITIES --------- //

            for ($indexActivity = 0; $indexActivity < count($activitiesInPathway); $indexActivity++) {
                $em->remove($activitiesInPathway[$indexActivity]);
                $em->flush();

            } 

            // To finish we delete the pathway
            $pathwayRepository->remove($pathway, true);
        }

        return $this->redirectToRoute('Pathways', [], Response::HTTP_SEE_OTHER);
    }

    public function getActivitiesByPathwayId(ManagerRegistry $doctrine)
    {
        if(isset($_POST['idPathway'])){
            $id = $_POST['idPathway'];
        }
        else{
            return new JsonResponse('');
        }
        $pathway = $doctrine->getManager()->getRepository("App\Entity\Pathway")->findOneBy(["id"=>$id]);
        
        $activities = $doctrine->getManager()->getRepository("App\Entity\Activity")->findBy(["pathway"=>$pathway]);
        $activityArray=[];
        foreach ($activities as $activity) {
            $HRCRequired = $doctrine->getManager()->getRepository("App\Entity\ActivityHumanResource")->findBy(["activity"=>$activity]);
            $MRCRequired = $doctrine->getManager()->getRepository("App\Entity\ActivityMaterialResource")->findBy(["activity"=>$activity]);
            $activityArray[] = $this->activityToArray($doctrine, $activity, $HRCRequired, $MRCRequired);
        }
        $successors = $doctrine->getManager()->getRepository("App\Entity\Successor")->findAll();
        $arraySuccessor = [];
        foreach($successors as $successor){
            $arraySuccessor[] = [
                'idA' => $successor->getActivityA()->getId(),
                'idB' => $successor->getActivityb()->getId(),
                'name' => $successor->getActivityb()->getActivityName(),
                'delaymin' => $successor->getDelaymin(),
                'delaymax' => $successor->getDelaymax(),
            ];
        }

        if ($activityArray == null){
            return new JsonResponse((null));
        }

        $data = $this->sortActivities($activityArray, $arraySuccessor, $doctrine);
        $data = $this->checkDuplicate($data);
        return new JsonResponse($data);
    }

    public function sortActivities($activityArray, $arraySuccessor, ManagerRegistry $doctrine){
        $activitiesSortedByLevel = [];
        
        for($i=0; $i < count($activityArray); $i++){
            $racine = true;
            for($j=0; $j < count($arraySuccessor); $j++){
                if($activityArray[$i]['id'] == $arraySuccessor[$j]['idB']){
                    $racine = false;
                }
            }
            if($racine){
                $activitiesSortedByLevel[0][] = $activityArray[$i];
            }
        }
        $level = 0;
        while(isset($activitiesSortedByLevel[$level]) && $activitiesSortedByLevel[$level] != null){
            for($i = 0; $i < count($activitiesSortedByLevel[$level]); $i++){
                $listSuccessors = $activitiesSortedByLevel[$level][$i]['successor'];
                for($j = 0; $j < count($listSuccessors); $j++){
                    $activityToAdd = $doctrine->getManager()->getRepository("App\Entity\Activity")->findOneBy(['id'=>$listSuccessors[$j]['idB']]);
                    $HRCRequired = $doctrine->getManager()->getRepository("App\Entity\ActivityHumanResource")->findBy(["activity"=>$activityToAdd]);
                    $MRCRequired = $doctrine->getManager()->getRepository("App\Entity\ActivityMaterialResource")->findBy(["activity"=>$activityToAdd]);
                    $activityToAddArray = $this->activityToArray($doctrine, $activityToAdd, $HRCRequired, $MRCRequired);
                    if(!isset($activitiesSortedByLevel[$level+1])){
                        $activitiesSortedByLevel[$level+1][] = $activityToAddArray;
                    }
                    else{
                        $found = false; 
                        for($k = 0; $k < count($activitiesSortedByLevel[$level+1]); $k++){
                            if($activitiesSortedByLevel[$level+1][$k] == $activityToAddArray){
                                $found = true;
                            }
                        }
                        if(!$found){
                            $activitiesSortedByLevel[$level+1][] = $activityToAddArray;
                        }
                    }
                }
            }
            $level++;
        }
        return $activitiesSortedByLevel;
    }

    public function checkDuplicate($activities){
        for($level = 0; $level < count($activities); $level++){
            foreach($activities[$level] as $activity){
                foreach($activity['successor'] as $successor){
                    for($i = 0; $i <= $level; $i++){
                        for($j = count($activities[$i])-1; $j >= 0; $j--){
                            if($successor['idB'] ==  $activities[$i][$j]['id']){
                                array_splice($activities[$i], $j, 1);
                            }
                        }
                    }
                }
            }
        }
        return $activities; 
    }

    public function activityToArray(ManagerRegistry $doctrine, $activity, $HRCRequired, $MRCRequired){
        $successors = $doctrine->getManager()->getRepository("App\Entity\Successor")->findBy(["activitya"=>$activity]);
        $arraySuccessor = [];
        $arrayHRC = [];
        $arrayMRC = [];
        foreach($successors as $successor){
            $arraySuccessor[] = [
                'idB' => $successor->getActivityb()->getId(),
                'delaymin' => $successor->getDelaymin(),
                'delaymax' => $successor->getDelaymax(),
            ];
        }
        foreach($HRCRequired as $HRC){
            $arrayHRC[] = [
                'categoryname' => $HRC->getHumanresourcecategory()->getCategoryname(),
                'quantity' => $HRC->getQuantity(),
            ];
        }
        foreach($MRCRequired as $MRC){
            $arrayMRC[] = [
                'categoryname' => $MRC->getMaterialresourcecategory()->getCategoryname(),
                'quantity' => $MRC->getQuantity(),
            ];
        }
        $activityArray = [
            'id' => $activity->getId(),
            'name' => $activity->getActivityname(),
            'duration' => $activity->getDuration(),
            'successor' => $arraySuccessor,
            'hrc' => $arrayHRC,
            'mrc' => $arrayMRC
        ];
        return $activityArray;
    }

    public function getAppointmentsByPathwayId(ManagerRegistry $doctrine)
    {
        if(isset($_POST['idPathway'])){
            $id = $_POST['idPathway'];
        }
        else{
            return new JsonResponse('');
        }
        $appointments = $doctrine->getManager()->getRepository("App\Entity\Appointment")->findAppointmentByPathway($id, date(('Y-m-d')));
        $appointmentArray=[];
        foreach ($appointments as $appointment) {
            $appointmentArray[] = [
                'lastname' => $appointment['lastname'],
                'firstname' => $appointment['firstname'],
                'date' => $appointment['dayappointment']->format('d-m-Y'),
            ];
        }

        return new JsonResponse($appointmentArray);
    }

    public function autocompletePathway(Request $request, PathwayRepository $pathwayRepository){
        $utf8 = array( 
            "œ"=>"oe",
            "æ"=>"ae",
            "à" => "a",
            "á" => "a",
            "â" => "a",
            "à" => "a",
            "ä" => "a",
            "å" => "a",
            "&#257;" => "a",
            "&#259;" => "a",
            "&#462;" => "a",
            "&#7841;" => "a",
            "&#7843;" => "a",
            "&#7845;" => "a",
            "&#7847;" => "a",
            "&#7849;" => "a",
            "&#7851;" => "a",
            "&#7853;" => "a",
            "&#7855;" => "a",
            "&#7857;" => "a",
            "&#7859;" => "a",
            "&#7861;" => "a",
            "&#7863;" => "a",
            "&#507;" => "a",
            "&#261;" => "a",
            "ç" => "c",
            "&#263;" => "c",
            "&#265;" => "c",
            "&#267;" => "c",
            "&#269;" => "c",
            "&#271;" => "d",
            "&#273;" => "d",
            "è" => "e",
            "é" => "e",
            "ê" => "e",
            "ë" => "e",
            "&#275;" => "e",
            "&#277;" => "e",
            "&#279;" => "e",
            "&#281;" => "e",
            "&#283;" => "e",
            "&#7865;" => "e",
            "&#7867;" => "e",
            "&#7869;" => "e",
            "&#7871;" => "e",
            "&#7873;" => "e",
            "&#7875;" => "e",
            "&#7877;" => "e",
            "&#7879;" => "e",
            "&#285;" => "g",
            "&#287;" => "g",
            "&#289;" => "g",
            "&#291;" => "g",
            "&#293;" => "h",
            "&#295;" => "h",
            "&#309;" => "j",
            "&#314;" => "l",
            "&#316;" => "l",
            "&#318;" => "l",
            "&#320;" => "l",
            "&#322;" => "l",
            "ñ" => "n",
            "&#324;" => "n",
            "&#326;" => "n",
            "&#328;" => "n",
            "&#329;" => "n",
            "ò" => "o",
            "ó" => "o",
            "ô" => "o",
            "õ" => "o",
            "ö" => "o",
            "ø" => "o",
            "&#333;" => "o",
            "&#335;" => "o",
            "&#337;" => "o",
            "&#417;" => "o",
            "&#466;" => "o",
            "&#511;" => "o",
            "&#7885;" => "o",
            "&#7887;" => "o",
            "&#7889;" => "o",
            "&#7891;" => "o",
            "&#7893;" => "o",
            "&#7895;" => "o",
            "&#7897;" => "o",
            "&#7899;" => "o",
            "&#7901;" => "o",
            "&#7903;" => "o",
            "&#7905;" => "o",
            "&#7907;" => "o",
            "ð" => "o",
            "&#341;" => "r",
            "&#343;" => "r",
            "&#345;" => "r",
            "&#347;" => "s",
            "&#349;" => "s",
            "&#351;" => "s",
            "&#355;" => "t",
            "&#357;" => "t",
            "&#359;" => "t",
            "ù" => "u",
            "ú" => "u",
            "û" => "u",
            "ü" => "u",
            "&#361;" => "u",
            "&#363;" => "u",
            "&#365;" => "u",
            "&#367;" => "u",
            "&#369;" => "u",
            "&#371;" => "u",
            "&#432;" => "u",
            "&#468;" => "u",
            "&#470;" => "u",
            "&#472;" => "u",
            "&#474;" => "u",
            "&#476;" => "u",
            "&#7909;" => "u",
            "&#7911;" => "u",
            "&#7913;" => "u",
            "&#7915;" => "u",
            "&#7917;" => "u",
            "&#7919;" => "u",
            "&#7921;" => "u",
            "&#373;" => "w",
            "&#7809;" => "w",
            "&#7811;" => "w",
            "&#7813;" => "w",
            "ý" => "y",
            "ÿ" => "y",
            "&#375;" => "y",
            "&#7929;" => "y",
            "&#7925;" => "y",
            "&#7927;" => "y",
            "&#7923;" => "y",
            );
        $term = strtr(mb_strtolower($request->query->get('term'),'UTF-8'), $utf8);
        $patwhays = $pathwayRepository->findAll();
        $results = array();
        foreach ($patwhays as $pathway) {
            $name = strtr(mb_strtolower($pathway->getPathwayname(),'UTF-8'), $utf8);
            if (strpos($name, $term) !== false){
                $results[] = [
                    'id' => $pathway->getId(),
                    'value' => $pathway->getPathwayname()

                ];
            }
        }
        if(count($results)==0){
            $results[] = [
                'id' => "notfound",
                'value' => 'Aucun résultat',
            ];
        }
        return new JsonResponse($results);
    }
}
