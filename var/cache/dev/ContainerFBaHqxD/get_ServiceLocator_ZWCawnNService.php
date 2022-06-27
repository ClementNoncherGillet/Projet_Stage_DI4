<?php

namespace ContainerFBaHqxD;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_ZWCawnNService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.zWCawnN' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.zWCawnN'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'resourceRepository' => ['privates', 'App\\Repository\\ResourceRepository', 'getResourceRepositoryService', true],
        ], [
            'resourceRepository' => 'App\\Repository\\ResourceRepository',
        ]);
    }
}