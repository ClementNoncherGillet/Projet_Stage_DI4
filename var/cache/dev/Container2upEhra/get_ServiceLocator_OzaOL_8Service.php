<?php

namespace Container2upEhra;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_OzaOL_8Service extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.ozaOL.8' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.ozaOL.8'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'activity' => ['privates', '.errored..service_locator.ozaOL.8.App\\Entity\\Activity', NULL, 'Cannot autowire service ".service_locator.ozaOL.8": it references class "App\\Entity\\Activity" but no such service exists.'],
        ], [
            'activity' => 'App\\Entity\\Activity',
        ]);
    }
}
