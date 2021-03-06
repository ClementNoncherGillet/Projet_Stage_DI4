<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* Global/Menu.html.twig */
class __TwigTemplate_8c61cb8434b47d827fa93a72459f505f9b00fa8f0732d61757f0a86b92e0aaf4 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "Global/Menu.html.twig"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "Global/Menu.html.twig"));

        // line 2
        echo "                 
    <div class=\"dashboard-nav\">
        <nav class=\"dashboard-nav-list\">
            <div id=\"menu-top\"> 
                <header>
                    <a href=\"#!\" class=\"menu-toggle\">
                        <i class=\"fas fa-bars\"></i>
                    </a>
                    <a href=\"/\" class=\"brand-logo\">
                        <i class=\"fas fa-anchor\"></i> <span>HOPITAL</span>
                    </a>
                </header>
                <a href=\"/ConsultationPlanning\" class=\"dashboard-nav-item\"><i class=\"fas fa-file-upload\"></i> Planning </a>
                <a href=\"/activities\" class=\"dashboard-nav-item\"><i class=\"fas fa-tachometer-alt\"></i> Activit??s</a>
                <a href=\"/circuits\" class=\"dashboard-nav-item\"><i class=\"fas fa-tachometer-alt\"></i> Parcours</a>
                <a href=\"/patients\" class=\"dashboard-nav-item\"><i class=\"fas fa-tachometer-alt\"></i> Patients</a>
                <a href=\"#\" class=\"dashboard-nav-item\"><i class=\"fas fa-file-upload\"></i> ??thique </a>
                <a href=\"/resources\" class=\"dashboard-nav-item\"><i class=\"fas fa-file-upload\"></i> Ressources </a>
                <a href=\"/resources-types\" class=\"dashboard-nav-item\"><i class=\"fas fa-file-upload\"></i> Types de Ressource </a>
            </div>
            <div id='menu-bottom'>
                <div class=\"nav-item-divider\"></div>
                    <a href=\"/consult_users\" class=\"dashboard-nav-item\"><i class=\"fas fa-user\"></i> Utilisateurs </a>
                 ";
        // line 26
        echo "                    <a href = \"/logout\" class=\"dashboard-nav-item\"><i class=\"fas fa-sign-out-alt\"></i> Se d??connecter </a>   
                     ";
        // line 27
        echo "  
     
        </nav>
    </div>

";
        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

    }

    public function getTemplateName()
    {
        return "Global/Menu.html.twig";
    }

    public function getDebugInfo()
    {
        return array (  71 => 27,  68 => 26,  43 => 2,);
    }

    public function getSourceContext()
    {
        return new Source("{#{% if  app.user != null %}#}
                 
    <div class=\"dashboard-nav\">
        <nav class=\"dashboard-nav-list\">
            <div id=\"menu-top\"> 
                <header>
                    <a href=\"#!\" class=\"menu-toggle\">
                        <i class=\"fas fa-bars\"></i>
                    </a>
                    <a href=\"/\" class=\"brand-logo\">
                        <i class=\"fas fa-anchor\"></i> <span>HOPITAL</span>
                    </a>
                </header>
                <a href=\"/ConsultationPlanning\" class=\"dashboard-nav-item\"><i class=\"fas fa-file-upload\"></i> Planning </a>
                <a href=\"/activities\" class=\"dashboard-nav-item\"><i class=\"fas fa-tachometer-alt\"></i> Activit??s</a>
                <a href=\"/circuits\" class=\"dashboard-nav-item\"><i class=\"fas fa-tachometer-alt\"></i> Parcours</a>
                <a href=\"/patients\" class=\"dashboard-nav-item\"><i class=\"fas fa-tachometer-alt\"></i> Patients</a>
                <a href=\"#\" class=\"dashboard-nav-item\"><i class=\"fas fa-file-upload\"></i> ??thique </a>
                <a href=\"/resources\" class=\"dashboard-nav-item\"><i class=\"fas fa-file-upload\"></i> Ressources </a>
                <a href=\"/resources-types\" class=\"dashboard-nav-item\"><i class=\"fas fa-file-upload\"></i> Types de Ressource </a>
            </div>
            <div id='menu-bottom'>
                <div class=\"nav-item-divider\"></div>
                    <a href=\"/consult_users\" class=\"dashboard-nav-item\"><i class=\"fas fa-user\"></i> Utilisateurs </a>
                 {#   <a onclick=\"window.location.href='{{ path('app_user_edit_profile', {'id': app.user.id}) }}'\" class=\"dashboard-nav-item\"><i class=\"fas fa-user\"></i> Mon profil </a>  #}
                    <a href = \"/logout\" class=\"dashboard-nav-item\"><i class=\"fas fa-sign-out-alt\"></i> Se d??connecter </a>   
                     {# {% endif %}   #}  
     
        </nav>
    </div>

", "Global/Menu.html.twig", "C:\\Users\\Clement\\Desktop\\Projet Stage DI4\\Projet_Stage_DI4\\templates\\global\\menu.html.twig");
    }
}
