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

/* Global/Menu.html */
class __TwigTemplate_c0afc5d386180ac846d970363b7bd4c48a9c804a8f6d11955c4209669be19f5f extends Template
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
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "Global/Menu.html"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "Global/Menu.html"));

        // line 1
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
                <a href=\"";
        // line 25
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("app_user_edit", ["id" => twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 25, $this->source); })()), "user", [], "any", false, false, false, 25), "id", [], "any", false, false, false, 25)]), "html", null, true);
        echo "\"></a>\" class=\"dashboard-nav-item\"><i class=\"fas fa-user\"></i> Mon profil </a>
                <a href=\"/consult_users\" class=\"dashboard-nav-item\"><i class=\"fas fa-user\"></i> Utilisateurs </a>
                <a href=\"#\" class=\"dashboard-nav-item\"><i class=\"fas fa-sign-out-alt\"></i> Se d??connecter </a>
            </div>

          
        </nav>
    </div>

";
        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

    }

    public function getTemplateName()
    {
        return "Global/Menu.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  69 => 25,  43 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("
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
                <a href=\"{{ path('app_user_edit', {'id': app.user.id}) }}\"></a>\" class=\"dashboard-nav-item\"><i class=\"fas fa-user\"></i> Mon profil </a>
                <a href=\"/consult_users\" class=\"dashboard-nav-item\"><i class=\"fas fa-user\"></i> Utilisateurs </a>
                <a href=\"#\" class=\"dashboard-nav-item\"><i class=\"fas fa-sign-out-alt\"></i> Se d??connecter </a>
            </div>

          
        </nav>
    </div>

", "Global/Menu.html", "C:\\Users\\Clement\\Desktop\\Projet Stage DI4\\Projet_Stage_DI4\\templates\\global\\menu.html");
    }
}
