<?php

namespace App\Controller;

use App\Entity\HumanResource;
use App\Form\HumanResourceType;
use App\Repository\HumanResourceRepository;
use App\Repository\MaterialResourceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/human/resource")
 */
class HumanResourceController extends AbstractController
{
    /**
     * @Route("/", name="app_human_resource_index", methods={"GET"})
     */
    public function index(HumanResourceRepository $humanResourceRepository): Response
    {
        $materialResourceRepository = new MaterialResourceRepository($this->getDoctrine());
        $materialResources = $materialResourceRepository->findAll();
        return $this->render('human_resource/index.html.twig', [
            'human_resources' => $humanResourceRepository->findAll(),
            'material_resources' => $materialResources
        ]);
    }

    /**
     * @Route("/new", name="app_human_resource_new", methods={"GET", "POST"})
     */
    public function new(Request $request, HumanResourceRepository $humanResourceRepository): Response
    {
        $humanResource = new HumanResource();
        $form = $this->createForm(HumanResourceType::class, $humanResource);
        $form->handleRequest($request);
        $param = $request->request->all();
        if ($form->isSubmitted() && $form->isValid()) {
            $humanResourceRepository->add($humanResource, true);

            return $this->redirectToRoute('app_human_resource_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('human_resource/new.html.twig', [
            'human_resource' => $humanResource,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}", name="app_human_resource_show", methods={"GET"})
     */
    public function show(HumanResource $humanResource): Response
    {
        return $this->render('human_resource/show.html.twig', [
            'human_resource' => $humanResource,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="app_human_resource_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, HumanResource $humanResource, HumanResourceRepository $humanResourceRepository): Response
    {
        $form = $this->createForm(HumanResourceType::class, $humanResource);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $humanResourceRepository->add($humanResource, true);

            return $this->redirectToRoute('app_human_resource_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('human_resource/edit.html.twig', [
            'human_resource' => $humanResource,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}", name="app_human_resource_delete", methods={"POST"})
     */
    public function delete(Request $request, HumanResource $humanResource, HumanResourceRepository $humanResourceRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$humanResource->getId(), $request->request->get('_token'))) {
            $humanResourceRepository->remove($humanResource, true);
        }

        return $this->redirectToRoute('app_human_resource_index', [], Response::HTTP_SEE_OTHER);
    }
}