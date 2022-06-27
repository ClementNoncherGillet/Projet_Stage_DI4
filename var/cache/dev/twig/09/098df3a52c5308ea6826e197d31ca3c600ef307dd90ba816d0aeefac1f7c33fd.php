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

/* planning/modification-planning.html.twig */
class __TwigTemplate_8d05cfffa3914b0abd2e978eadb61b189583d53df9bb870374a4a4d7a4de2af2 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'title' => [$this, 'block_title'],
            'stylesheets' => [$this, 'block_stylesheets'],
            'body' => [$this, 'block_body'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "planning/modification-planning.html.twig"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "planning/modification-planning.html.twig"));

        $this->parent = $this->loadTemplate("base.html.twig", "planning/modification-planning.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

    }

    // line 3
    public function block_title($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        echo "Modification du Planning";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    // line 5
    public function block_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        // line 6
        echo "
  <!-- insertion de bootstrap et fullcalendar-scheduler -->
  <link href='js/fullcalendar-scheduler/lib/main.css' rel='stylesheet' />
  <script src='js/fullcalendar-scheduler/lib/main.js'></script>
  <script src=\"js/planning/modification-planning.js\"></script>
  <script src=\"js/jquery-3.6.0.js\"></script>
  <script src=\"js/bootstrap/bootstrap.min.js\" integrity=\"sha384-3nhVhzgkAiK+aRAouB5S914cEx9yGFCeToSirPZfaTPyy6g+RbDkzkmojJymfCBY sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13 sha256-SUzPu+ewjZCj6CtwVs9sNh6Q/LMFi1w1RZ9TxpKmVkE=\" crossorigin=\"anonymous\"></script>
  
  <link rel=\"stylesheet\" href=\"";
        // line 14
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("CSS/Calendrier/Calendrier.css"), "html", null, true);
        echo "\">    
";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    // line 17
    public function block_body($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body"));

        // line 18
        echo "  
<!-- modify-planning-modal -->

<div class=\"modal\" id=\"modify-planning-modal\">
  <div class=\"modal-dialog\">
    <div class=\"modal-content\">
      <div class=\"modal-header\">
        <h2 class=\"modal-title\">Modifier <span id=\"show-title\"></span></h2>
      </div>
        <form method=\"post\" action=\"/ModificationPlanning\">
            <div class=\"modal-body\">
                <input name=\"form\" type=\"hidden\" value=\"modify\">
                <input id=\"id\" name=\"id\" type=\"hidden\">
                <input id=\"length\" name=\"length\" type=\"hidden\">
                <input id=\"title\" name=\"title\" type=\"hidden\">

                <label>Date de début de l'activité : </label>
                <div class=\"input-container onWhite\">
                    <input class=\"input-field\" type=\"datetime-local\" id=\"new-start\" name=\"start\" required>
                </div>

                <div class=\"modal-footer\">
                    <button type=\"button\" class=\"btn-consult btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>
                    <button type=\"submit\" class=\"btn-valide btn-secondary\" onclick=\"modifyEvent()\">Valider</button>
                </div>
            </div>
\t    </form>
    </div>
  </div>
</div>


<!-- add-planning-modal -->

<div class=\"modal\" id=\"add-planning-modal\"> <!-- div qui représente la modal -->
  <div class=\"modal-dialog\"> <!-- permet d'afficher la modal en mode dialog -->
    <div class=\"modal-content\"> <!-- permet de structurer le contenu de la modal -->
      <div class=\"modal-header\"> <!-- sépare le header de la modal -->
        <h2 class=\"modal-title\">Ajouter un parcours</h2>
      </div>
      <form method=\"post\" action=\"/ModificationPlanning\"> <!-- créer un form qui renvoie une méthode post au controller -->
        <div class=\"modal-body\"> <!-- sépare le body de la modal -->
          <input name=\"form\" type=\"hidden\" value=\"add\">
          <input id=\"length\" name=\"length\" type=\"hidden\">
          <input id=\"title\" name=\"title\" type=\"hidden\">

          <label>Choisissez le patient</label>
            <div id=\"select-container\"> 
              <select onchange=\"\" id=\"select-patient\" name=\"select-patient\"> 

                <option value=\"null\"> Selection patient </option>
                ";
        // line 69
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["listepatients"]) || array_key_exists("listepatients", $context) ? $context["listepatients"] : (function () { throw new RuntimeError('Variable "listepatients" does not exist.', 69, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["patient"]) {
            echo " 
                  <option value=\"";
            // line 70
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["patient"], "id", [], "any", false, false, false, 70), "html", null, true);
            echo "\"> ";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["patient"], "lastname", [], "any", false, false, false, 70), "html", null, true);
            echo " ";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["patient"], "firstname", [], "any", false, false, false, 70), "html", null, true);
            echo " </option>
                ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['patient'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 72
        echo "
              </select>
            </div>

            <div id=\"select-container\"
            style=\"display:flex; flex-direction:column;\"> 
            <label>Choisissez le parcours</label>
              <select id=\"select-circuit\" name=\"select-circuit\"> 

                <option value=\"null\"> Selection circuit </option>
                ";
        // line 82
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["listecircuitpatients"]) || array_key_exists("listecircuitpatients", $context) ? $context["listecircuitpatients"] : (function () { throw new RuntimeError('Variable "listecircuitpatients" does not exist.', 82, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["circuitpatient"]) {
            echo " 
                  <option value=\"";
            // line 83
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, $context["circuitpatient"], "circuit", [], "any", false, false, false, 83), "id", [], "any", false, false, false, 83), "html", null, true);
            echo "\"> ";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, $context["circuitpatient"], "circuit", [], "any", false, false, false, 83), "circuitname", [], "any", false, false, false, 83), "html", null, true);
            echo " </option>
                ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['circuitpatient'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 85
        echo "
              </select>
            </div>

          <label>Date de début du parcours : </label>
            <div class=\"input-container onWhite\">
              <input class=\"input-field\" type=\"datetime-local\" id=\"start\" name=\"start\" value=\"";
        // line 91
        echo twig_escape_filter($this->env, (isset($context["datetoday"]) || array_key_exists("datetoday", $context) ? $context["datetoday"] : (function () { throw new RuntimeError('Variable "datetoday" does not exist.', 91, $this->source); })()), "html", null, true);
        echo "\" required>
            </div>

            <div class=\"modal-footer\">
              <button type=\"button\" class=\"btn-consult btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>
              <button type=\"submit\" class=\"btn-valide btn-secondary\" onclick=\"modifyEvent()\">Valider</button>
            </div>
          </div>
\t    </form>
    </div>
  </div>
</div>

    <input type=hidden id=\"date\" value=\"<?php echo \$\$_GET['date']; ?>\"/>
    <input type=hidden id=\"resources\" value='";
        // line 105
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeResourcesJSON"]) || array_key_exists("listeResourcesJSON", $context) ? $context["listeResourcesJSON"] : (function () { throw new RuntimeError('Variable "listeResourcesJSON" does not exist.', 105, $this->source); })()), "content", [], "any", false, false, false, 105), "html", null, true);
        echo "'/>
  

    <!-- affichage du haut de la page -->

    
    <div class=\"all-container\">
    <h1>Modification du Planning</h1>
    <div id=\"container-top\">
    <div class=\"CRUD-div\">
      <button type=\"button\" class=\"btn-consult btn-secondary\" onclick=\"addEvent()\">Ajouter</button>
      <select class=\"list-edit\" id=\"displayList\" onchange=\"changePlanning()\">
\t\t\t\t<option value=\"0\" selected disabled>Changer l'affichage
\t\t\t\t</option>
\t\t\t\t<option value=\"parcours\">Parcours</option>
\t\t\t\t<option value=\"patients\">Patients</option>
\t\t\t\t<option value=\"rh\">Ressources humaines</option>
\t\t\t\t<option value=\"rm\">Ressources Matérielles</option>
\t\t\t</select>
      <button id=\"filterbutton\" onclick=\"filterShow()\" class=\"btn-edit\" title=\"Filtrer l'affichage\">
\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\"><g><path d=\"M0,0h24 M24,24H0\" fill=\"none\"/><path d=\"M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z\"/><path d=\"M0,0h24v24H0V0z\" fill=\"none\"/></g></svg></button>
\t\t\t<div id=\"filterId\" class=\"filter-container\" style=\"display:none\">
\t\t\t\t<div>
\t\t\t\t\t<input type=\"checkbox\" id=\"scales\" name=\"scales\" checked>
\t\t\t\t\t<label for=\"scales\">J'aime</label>
\t\t\t\t</div>

\t\t\t\t<div>
\t\t\t\t\t<input type=\"checkbox\" id=\"horns\" name=\"horns\">
\t\t\t\t\t<label for=\"horns\">Manger</label>
\t\t\t\t</div>
\t\t\t</div>
      </div>
      <div class=\"CRUD-right\">
      <button type=\"button\" class=\"btn-delete btn-secondary\" onclick=\"window.location.href='";
        // line 139
        echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("ConsultationPlanning");
        echo "'\">Annuler</button>
      <button type=\"button\" class=\"btn-valide btn-secondary\" onclick=\"window.location.href='";
        // line 140
        echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("ConsultationPlanning");
        echo "'\">Valider</button>
      </div>
      </div>
<div class=\"calendar-container\">

    <!-- affichage du calendar -->
    <div id = 'calendar'>
    </div>
</div>
</div>
";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    public function getTemplateName()
    {
        return "planning/modification-planning.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  286 => 140,  282 => 139,  245 => 105,  228 => 91,  220 => 85,  210 => 83,  204 => 82,  192 => 72,  180 => 70,  174 => 69,  121 => 18,  111 => 17,  99 => 14,  89 => 6,  79 => 5,  60 => 3,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends 'base.html.twig' %}

{% block title %}Modification du Planning{% endblock %}

{% block stylesheets %}

  <!-- insertion de bootstrap et fullcalendar-scheduler -->
  <link href='js/fullcalendar-scheduler/lib/main.css' rel='stylesheet' />
  <script src='js/fullcalendar-scheduler/lib/main.js'></script>
  <script src=\"js/planning/modification-planning.js\"></script>
  <script src=\"js/jquery-3.6.0.js\"></script>
  <script src=\"js/bootstrap/bootstrap.min.js\" integrity=\"sha384-3nhVhzgkAiK+aRAouB5S914cEx9yGFCeToSirPZfaTPyy6g+RbDkzkmojJymfCBY sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13 sha256-SUzPu+ewjZCj6CtwVs9sNh6Q/LMFi1w1RZ9TxpKmVkE=\" crossorigin=\"anonymous\"></script>
  
  <link rel=\"stylesheet\" href=\"{{ asset('CSS/Calendrier/Calendrier.css') }}\">    
{% endblock %}

{% block body %}
  
<!-- modify-planning-modal -->

<div class=\"modal\" id=\"modify-planning-modal\">
  <div class=\"modal-dialog\">
    <div class=\"modal-content\">
      <div class=\"modal-header\">
        <h2 class=\"modal-title\">Modifier <span id=\"show-title\"></span></h2>
      </div>
        <form method=\"post\" action=\"/ModificationPlanning\">
            <div class=\"modal-body\">
                <input name=\"form\" type=\"hidden\" value=\"modify\">
                <input id=\"id\" name=\"id\" type=\"hidden\">
                <input id=\"length\" name=\"length\" type=\"hidden\">
                <input id=\"title\" name=\"title\" type=\"hidden\">

                <label>Date de début de l'activité : </label>
                <div class=\"input-container onWhite\">
                    <input class=\"input-field\" type=\"datetime-local\" id=\"new-start\" name=\"start\" required>
                </div>

                <div class=\"modal-footer\">
                    <button type=\"button\" class=\"btn-consult btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>
                    <button type=\"submit\" class=\"btn-valide btn-secondary\" onclick=\"modifyEvent()\">Valider</button>
                </div>
            </div>
\t    </form>
    </div>
  </div>
</div>


<!-- add-planning-modal -->

<div class=\"modal\" id=\"add-planning-modal\"> <!-- div qui représente la modal -->
  <div class=\"modal-dialog\"> <!-- permet d'afficher la modal en mode dialog -->
    <div class=\"modal-content\"> <!-- permet de structurer le contenu de la modal -->
      <div class=\"modal-header\"> <!-- sépare le header de la modal -->
        <h2 class=\"modal-title\">Ajouter un parcours</h2>
      </div>
      <form method=\"post\" action=\"/ModificationPlanning\"> <!-- créer un form qui renvoie une méthode post au controller -->
        <div class=\"modal-body\"> <!-- sépare le body de la modal -->
          <input name=\"form\" type=\"hidden\" value=\"add\">
          <input id=\"length\" name=\"length\" type=\"hidden\">
          <input id=\"title\" name=\"title\" type=\"hidden\">

          <label>Choisissez le patient</label>
            <div id=\"select-container\"> 
              <select onchange=\"\" id=\"select-patient\" name=\"select-patient\"> 

                <option value=\"null\"> Selection patient </option>
                {% for patient in listepatients %} 
                  <option value=\"{{ patient.id }}\"> {{ patient.lastname }} {{ patient.firstname }} </option>
                {% endfor %}

              </select>
            </div>

            <div id=\"select-container\"
            style=\"display:flex; flex-direction:column;\"> 
            <label>Choisissez le parcours</label>
              <select id=\"select-circuit\" name=\"select-circuit\"> 

                <option value=\"null\"> Selection circuit </option>
                {% for circuitpatient in listecircuitpatients %} 
                  <option value=\"{{ circuitpatient.circuit.id }}\"> {{ circuitpatient.circuit.circuitname }} </option>
                {% endfor %}

              </select>
            </div>

          <label>Date de début du parcours : </label>
            <div class=\"input-container onWhite\">
              <input class=\"input-field\" type=\"datetime-local\" id=\"start\" name=\"start\" value=\"{{datetoday}}\" required>
            </div>

            <div class=\"modal-footer\">
              <button type=\"button\" class=\"btn-consult btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>
              <button type=\"submit\" class=\"btn-valide btn-secondary\" onclick=\"modifyEvent()\">Valider</button>
            </div>
          </div>
\t    </form>
    </div>
  </div>
</div>

    <input type=hidden id=\"date\" value=\"<?php echo \$\$_GET['date']; ?>\"/>
    <input type=hidden id=\"resources\" value='{{listeResourcesJSON.content}}'/>
  

    <!-- affichage du haut de la page -->

    
    <div class=\"all-container\">
    <h1>Modification du Planning</h1>
    <div id=\"container-top\">
    <div class=\"CRUD-div\">
      <button type=\"button\" class=\"btn-consult btn-secondary\" onclick=\"addEvent()\">Ajouter</button>
      <select class=\"list-edit\" id=\"displayList\" onchange=\"changePlanning()\">
\t\t\t\t<option value=\"0\" selected disabled>Changer l'affichage
\t\t\t\t</option>
\t\t\t\t<option value=\"parcours\">Parcours</option>
\t\t\t\t<option value=\"patients\">Patients</option>
\t\t\t\t<option value=\"rh\">Ressources humaines</option>
\t\t\t\t<option value=\"rm\">Ressources Matérielles</option>
\t\t\t</select>
      <button id=\"filterbutton\" onclick=\"filterShow()\" class=\"btn-edit\" title=\"Filtrer l'affichage\">
\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\"><g><path d=\"M0,0h24 M24,24H0\" fill=\"none\"/><path d=\"M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z\"/><path d=\"M0,0h24v24H0V0z\" fill=\"none\"/></g></svg></button>
\t\t\t<div id=\"filterId\" class=\"filter-container\" style=\"display:none\">
\t\t\t\t<div>
\t\t\t\t\t<input type=\"checkbox\" id=\"scales\" name=\"scales\" checked>
\t\t\t\t\t<label for=\"scales\">J'aime</label>
\t\t\t\t</div>

\t\t\t\t<div>
\t\t\t\t\t<input type=\"checkbox\" id=\"horns\" name=\"horns\">
\t\t\t\t\t<label for=\"horns\">Manger</label>
\t\t\t\t</div>
\t\t\t</div>
      </div>
      <div class=\"CRUD-right\">
      <button type=\"button\" class=\"btn-delete btn-secondary\" onclick=\"window.location.href='{{ path('ConsultationPlanning') }}'\">Annuler</button>
      <button type=\"button\" class=\"btn-valide btn-secondary\" onclick=\"window.location.href='{{ path('ConsultationPlanning') }}'\">Valider</button>
      </div>
      </div>
<div class=\"calendar-container\">

    <!-- affichage du calendar -->
    <div id = 'calendar'>
    </div>
</div>
</div>
{% endblock %}
", "planning/modification-planning.html.twig", "C:\\Users\\Clement\\Desktop\\Projet Stage DI4\\Projet_Stage_DI4\\templates\\planning\\modification-planning.html.twig");
    }
}
