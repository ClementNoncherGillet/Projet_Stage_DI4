<?php

namespace Container2upEhra;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_Errored_7ATrJLService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.errored.7_aTrJL' shared service.
     *
     * @return \App\Repository\CircuitTypeRepository
     */
    public static function do($container, $lazyLoad = true)
    {
        $container->throw('Cannot determine controller argument for "App\\Controller\\CircuitTypeController::delete()": the $circuitTypeRepository argument is type-hinted with the non-existent class or interface: "App\\Repository\\CircuitTypeRepository".');
    }
}
