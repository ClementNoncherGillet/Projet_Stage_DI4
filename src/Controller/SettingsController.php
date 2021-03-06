<?php

namespace App\Controller;

use App\Entity\Settings;
use App\Repository\SettingsRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

class SettingsController extends AbstractController
{
    public function settingsGet(SettingsRepository $settingRepository): Response
    {
        //créer la page de gestion des patients en envoyant la liste de tous les patients stockés en database
        return $this->render('settings/settings.html.twig', [
            'settings' => $settingRepository->findAll()
        ]);
    }

    public function settingsEdit(Request $request, SettingsRepository $settingRepository, EntityManagerInterface $entityManager): Response
    {
        $idAlert = $request->request->get("idAlert");

        $alertTimeMin = $request->request->get("alertTimeMin");
        $alertTime = 60 * $alertTimeMin * 1000;

        $reloadTimeMin = $request->request->get("reloadTimeMin");
        $reloadTime = 60 * $reloadTimeMin * 1000;

        $settings = $settingRepository->findOneBy(['id' => $idAlert]);

        $settings->setAlertmodificationtimer($alertTime);
        $settings->setReloadtime($reloadTime);

        $entityManager->persist($settings);
        $entityManager->flush();

        return $this->redirectToRoute('Settings', [], Response::HTTP_SEE_OTHER);
    }

    public function settingsAddDefault(EntityManagerInterface $entityManager): Response
    {
        $settings = new Settings();

        $settings->setAlertmodificationtimer(480000);
        $settings->setZoommultiplier(1);
        $settings->setReloadtime(600000);

        $entityManager->persist($settings);
        $entityManager->flush();

        return $this->redirectToRoute('Settings', [], Response::HTTP_SEE_OTHER);
    }
}
