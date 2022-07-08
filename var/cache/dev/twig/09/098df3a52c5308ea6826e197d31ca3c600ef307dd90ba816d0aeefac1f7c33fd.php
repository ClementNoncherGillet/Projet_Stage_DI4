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
            'javascripts' => [$this, 'block_javascripts'],
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

        echo "Modification du Planning
";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    // line 6
    public function block_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        // line 7
        echo "
\t<!-- insertion de bootstrap, jquery et fullcalendar-scheduler -->
\t<link href='js/fullcalendar-scheduler/lib/main.css' rel='stylesheet'/>
\t<script src='js/fullcalendar-scheduler/lib/main.js'></script>
\t<script src=\"js/jquery-3.6.0.js\"></script>
  <script src=\"js/popper.min.js\"></script>  
\t<script src=\"js/bootstrap/bootstrap.min.js\" integrity=\"sha384-3nhVhzgkAiK+aRAouB5S914cEx9yGFCeToSirPZfaTPyy6g+RbDkzkmojJymfCBY sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13 sha256-SUzPu+ewjZCj6CtwVs9sNh6Q/LMFi1w1RZ9TxpKmVkE=\" crossorigin=\"anonymous\"></script>

\t<!-- insertion des fichier js et css spécifique à modification planning -->
\t<script src=\"js/planning/modification-planning.js\"></script>
\t<link rel=\"stylesheet\" href=\"";
        // line 17
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("CSS/Calendrier/Calendrier.css"), "html", null, true);
        echo "\">

";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    // line 21
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        echo " 
    ";
        // line 22
        if ((0 === twig_compare(twig_get_attribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 22, $this->source); })()), "user", [], "any", false, false, false, 22), null))) {
            echo "<script type=\"text/javascript\">document.location.href=\"/login\"</script>
\t";
        }
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    // line 26
    public function block_body($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body"));

        // line 27
        echo "
\t";
        // line 28
        echo twig_include($this->env, $context, "planning/modal_popup.html.twig");
        echo "

\t<!-- modify-planning-modal -->

\t<div class=\"modal\" id=\"modify-planning-modal\">
\t\t<div class=\"modal-dialog\">
\t\t\t<div class=\"modal-content\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h2 class=\"modal-title\">Modifier
\t\t\t\t\t\t<span id=\"show-title\"></span>
\t\t\t\t\t</h2>
\t\t\t\t</div>
\t\t\t\t<div
\t\t\t\t\t<div class=\"modal-body\">
\t\t\t\t\t<label class=\"label-event\">Début de l'activité
\t\t\t\t\t</label>
\t\t\t\t\t<div class=\"input-container onWhite\">
\t\t\t\t\t<!-- création d'input caché permettant de transmettre des informations entre le php, le twig et le js -->
\t\t\t\t\t<input name=\"form\" type=\"hidden\" value=\"modify\">
\t\t\t\t\t<input id=\"id\" name=\"id\" type=\"hidden\">
\t\t\t\t\t<input id=\"length\" name=\"length\" type=\"hidden\">
\t\t\t\t\t<inputid=\"title\" name=\"title\" type=\"hidden\">

\t\t\t\t\t<input class=\"input-modal-date\" type=\"time\" id=\"start\" name=\"start\" required>
\t\t\t\t\t</br>
\t\t\t\t\t<label class=\"label-event\">Parcours :</label>
\t\t\t\t\t</br>
\t\t\t\t\t<input class=\"input-modal\" type=\"text\" id=\"parcours\" name=\"parcours\" disabled></input>
\t\t\t\t\t</br>
\t\t\t\t\t<label class=\"label-event\">Patient :</label>
\t\t\t\t\t</br>
\t\t\t\t\t<input class=\"input-modal\" type=\"text\" id=\"patient\" name=\"patient\" disabled></input>
\t\t\t\t\t</br>
\t\t\t\t\t<label class=\"label-event\">Ressource Humaine :</label>
\t\t\t\t\t</br>
\t\t\t\t\t<input class=\"input-modal\" type=\"text\" id=\"rh\" name=\"rh\" disabled></input>
\t\t\t\t\t</br>
\t\t\t\t\t<label class=\"label-event\">Ressource Matérielle :</label>
\t\t\t\t\t</br>
\t\t\t\t\t<input class=\"input-modal\" type=\"text\" id=\"rm\" name=\"rm\" disabled></input>
\t\t\t\t\t</div>
\t\t\t\t\t<div
\t\t\t\t\t\tclass=\"modal-footer\">
\t\t\t\t\t\t<!-- bouton de suppression à revoir, permet pour le moment d'être redirigé vers la gestion des rendez-vous pour en supprimer un -->
\t\t\t\t\t\t<form method=\"get\" action=\"";
        // line 72
        echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("Appointment");
        echo "\">
\t\t\t\t\t\t\t<button class=\"btn-delete btn-secondary\" onclick=\"return confirm('Voulez-vous être redirigé vers la gestion des rendez-vous ? Vos modifications vont être perdues');\">Supprimer le rendez-vous</button>
\t\t\t\t\t\t</form>

\t\t\t\t\t\t<!-- bouton permettant de fermer la modal ou de valider les modification -->
\t\t\t\t\t\t<button type=\"button\" class=\"btn-consult btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>
\t\t\t\t\t\t<button type=\"submit\" class=\"btn-valide btn-secondary\" onclick=\"modifyEvent()\">Valider</button>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t</div>


\t<!-- add-planning-modal -->

\t<div
\t\tclass=\"modal\" id=\"add-planning-modal\">
\t\t<!-- div qui représente la modal -->
\t\t<div
\t\t\tclass=\"modal-dialog\">
\t\t\t<!-- permet d'afficher la modal en mode dialog -->
\t\t\t<div
\t\t\t\tclass=\"modal-content\">
\t\t\t\t<!-- permet de structurer le contenu de la modal -->
\t\t\t\t<div
\t\t\t\t\tclass=\"modal-header\">
\t\t\t\t\t<!-- sépare le header de la modal -->
\t\t\t\t\t<h2 class=\"modal-title\">Ajouter un rendez-vous</h2>
\t\t\t\t</div>
\t\t\t\t<div
\t\t\t\t\tclass=\"modal-body\">
\t\t\t\t\t<!-- sépare le body de la modal -->
\t\t\t\t\t<input id=\"date\" name=\"date\" type=\"hidden\" value=";
        // line 105
        echo twig_escape_filter($this->env, (isset($context["datetoday"]) || array_key_exists("datetoday", $context) ? $context["datetoday"] : (function () { throw new RuntimeError('Variable "datetoday" does not exist.', 105, $this->source); })()), "html", null, true);
        echo ">
\t\t\t\t\t<input id=\"listeAppointments\" name=\"listeAppointments\" type='hidden' value=";
        // line 106
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listAppointmentsJSON"]) || array_key_exists("listAppointmentsJSON", $context) ? $context["listAppointmentsJSON"] : (function () { throw new RuntimeError('Variable "listAppointmentsJSON" does not exist.', 106, $this->source); })()), "content", [], "any", false, false, false, 106), "html", null, true);
        echo ">
\t\t\t\t\t<input id=\"listeSuccessors\" name=\"listeSuccessors\" type='hidden' value=";
        // line 107
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeSuccessorsJSON"]) || array_key_exists("listeSuccessorsJSON", $context) ? $context["listeSuccessorsJSON"] : (function () { throw new RuntimeError('Variable "listeSuccessorsJSON" does not exist.', 107, $this->source); })()), "content", [], "any", false, false, false, 107), "html", null, true);
        echo ">
\t\t\t\t\t<input id=\"listeActivities\" name=\"listeActivities\" type='hidden' value=";
        // line 108
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeActivitiesJSON"]) || array_key_exists("listeActivitiesJSON", $context) ? $context["listeActivitiesJSON"] : (function () { throw new RuntimeError('Variable "listeActivitiesJSON" does not exist.', 108, $this->source); })()), "content", [], "any", false, false, false, 108), "html", null, true);
        echo ">

\t\t\t\t\t<div
\t\t\t\t\t\tid=\"select-container-patient\">
\t\t\t\t\t\t<!-- Selection du rendez-vous -->
\t\t\t\t\t\t<label>Choisissez le rendez-vous</label>
\t\t\t\t\t\t<select id=\"select-appointment\" name=\"select-appointment\" required>
\t\t\t\t\t\t</select>
\t\t\t\t\t</div>

\t\t\t\t\t<div
\t\t\t\t\t\tid=\"select-container-date\" class=\"input-container onWhite\">
\t\t\t\t\t\t<!-- Selection de l'heure de début du rdv -->
\t\t\t\t\t\t<label>Heure de début du parcours :
\t\t\t\t\t\t</label>
\t\t\t\t\t\t<input class=\"input-field\" type=\"time\" id=\"timeBegin\" name=\"timeBegin\" required>
\t\t\t\t\t</div>

\t\t\t\t\t<div
\t\t\t\t\t\tid=\"time-selected-error\" class=\"alert alert-danger\" role=\"alert\">
\t\t\t\t\t\t<!-- Affichage du message d'erreur si l'utilisateur ne rentre pas une heure correcte par rapport à la table appointment -->
\t\t\t\t\t\tVeuillez renseigner une heure de début de parcours correcte pour ce rendez-vous.
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t\t<button type=\"button\" class=\"btn-consult btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>
\t\t\t\t\t\t<button type=\"submit\" class=\"btn-valide btn-secondary\" onclick=\"AddEventValider()\">Valider</button>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>

<input type=\"hidden\" id=\"material\" value='";
        // line 141
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listMaterialResourceJSON"]) || array_key_exists("listMaterialResourceJSON", $context) ? $context["listMaterialResourceJSON"] : (function () { throw new RuntimeError('Variable "listMaterialResourceJSON" does not exist.', 141, $this->source); })()), "content", [], "any", false, false, false, 141), "html", null, true);
        echo "'/>
<input type=\"hidden\" id=\"human\" value='";
        // line 142
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listHumanResourceJSON"]) || array_key_exists("listHumanResourceJSON", $context) ? $context["listHumanResourceJSON"] : (function () { throw new RuntimeError('Variable "listHumanResourceJSON" does not exist.', 142, $this->source); })()), "content", [], "any", false, false, false, 142), "html", null, true);
        echo "'/>
<input type='hidden' id=\"listeAppointments\" name=\"listeAppointments\" value='";
        // line 143
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listAppointmentsJSON"]) || array_key_exists("listAppointmentsJSON", $context) ? $context["listAppointmentsJSON"] : (function () { throw new RuntimeError('Variable "listAppointmentsJSON" does not exist.', 143, $this->source); })()), "content", [], "any", false, false, false, 143), "html", null, true);
        echo "'>
<input type=\"hidden\" id=\"listScheduledActivitiesJSON\" value='";
        // line 144
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listScheduledActivitiesJSON"]) || array_key_exists("listScheduledActivitiesJSON", $context) ? $context["listScheduledActivitiesJSON"] : (function () { throw new RuntimeError('Variable "listScheduledActivitiesJSON" does not exist.', 144, $this->source); })()), "content", [], "any", false, false, false, 144), "html", null, true);
        echo "'/>
<input id=\"date\" name=\"date\" type=\"hidden\" value=";
        // line 145
        echo twig_escape_filter($this->env, (isset($context["datetoday"]) || array_key_exists("datetoday", $context) ? $context["datetoday"] : (function () { throw new RuntimeError('Variable "datetoday" does not exist.', 145, $this->source); })()), "html", null, true);
        echo ">
<input id=\"listeSuccessors\" name=\"listeSuccessors\" type='hidden' value=";
        // line 146
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeSuccessorsJSON"]) || array_key_exists("listeSuccessorsJSON", $context) ? $context["listeSuccessorsJSON"] : (function () { throw new RuntimeError('Variable "listeSuccessorsJSON" does not exist.', 146, $this->source); })()), "content", [], "any", false, false, false, 146), "html", null, true);
        echo ">
<input id=\"listeActivities\" name=\"listeActivities\" type='hidden' value=";
        // line 147
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeActivitiesJSON"]) || array_key_exists("listeActivitiesJSON", $context) ? $context["listeActivitiesJSON"] : (function () { throw new RuntimeError('Variable "listeActivitiesJSON" does not exist.', 147, $this->source); })()), "content", [], "any", false, false, false, 147), "html", null, true);
        echo ">
<input id=\"listeActivityHumanResource\" name=\"listeActivityHumanResource\" type=\"hidden\" value=";
        // line 148
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeActivityHumanResourcesJSON"]) || array_key_exists("listeActivityHumanResourcesJSON", $context) ? $context["listeActivityHumanResourcesJSON"] : (function () { throw new RuntimeError('Variable "listeActivityHumanResourcesJSON" does not exist.', 148, $this->source); })()), "content", [], "any", false, false, false, 148), "html", null, true);
        echo ">
<input id=\"listeActivityMaterialResource\" name=\"listeActivityMaterialResource\" type='hidden' value=";
        // line 149
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeActivityMaterialResourcesJSON"]) || array_key_exists("listeActivityMaterialResourcesJSON", $context) ? $context["listeActivityMaterialResourcesJSON"] : (function () { throw new RuntimeError('Variable "listeActivityMaterialResourcesJSON" does not exist.', 149, $this->source); })()), "content", [], "any", false, false, false, 149), "html", null, true);
        echo ">
<input type=\"hidden\" id=\"MaterialUnavailables\" value='";
        // line 150
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeMaterialResourcesUnavailables"]) || array_key_exists("listeMaterialResourcesUnavailables", $context) ? $context["listeMaterialResourcesUnavailables"] : (function () { throw new RuntimeError('Variable "listeMaterialResourcesUnavailables" does not exist.', 150, $this->source); })()), "content", [], "any", false, false, false, 150), "html", null, true);
        echo "'/>
<input type=\"hidden\" id=\"HumanUnavailables\" value='";
        // line 151
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, (isset($context["listeHumanResourcesUnavailables"]) || array_key_exists("listeHumanResourcesUnavailables", $context) ? $context["listeHumanResourcesUnavailables"] : (function () { throw new RuntimeError('Variable "listeHumanResourcesUnavailables" does not exist.', 151, $this->source); })()), "content", [], "any", false, false, false, 151), "html", null, true);
        echo "'/>

<div class=\"all-container\">
\t<h1>Modification du Planning</h1>
\t<div id=\"container-top\">
\t\t<div
\t\t\tclass=\"CRUD-div\">
\t\t\t<!-- bouton d'ajout d'un rendez-vous dans le planning -->
\t\t\t<button type=\"button\" class=\"btn-consult btn-secondary\" onclick=\"addEvent()\">Ajouter</button>

\t\t\t<!-- filtre de l'affichage par catégorie -->
\t\t\t<select class=\"list-edit\" id=\"displayList\" onchange=\"changePlanning()\">
\t\t\t\t<option value=\"0\" selected disabled>Changer l'affichage
\t\t\t\t</option>
\t\t\t\t<option value=\"rh\">Ressources Humaines</option>
\t\t\t\t<option value=\"rm\">Ressources Matérielles</option>
\t\t\t</select>

\t\t\t<!-- bouton pour filtrer l'affichage (pas encore opérationnel) -->
\t\t\t<button id=\"filterbutton\" onclick=\"filterShow()\" class=\"btn-calendar-edit\" title=\"Filtrer l'affichage\">
\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24px\" viewbox=\"0 0 24 24\" width=\"24px\">
\t\t\t\t\t<g><path d=\"M0,0h24 M24,24H0\" fill=\"none\"/><path d=\"M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z\"/><path d=\"M0,0h24v24H0V0z\" fill=\"none\"/></g>
\t\t\t\t</svg>
\t\t\t</button>
\t\t\t<div id=\"filterId\" class=\"filter-container\" style=\"display:none\"></div>
\t\t</div>
\t\t<!-- liste des boutons pour annuler ou valider les modifications -->
\t\t<div id='container-top-right'>
\t\t\t<button type=\"button\" class=\"btn-delete btn-secondary\" onclick=\"window.location.assign('/ModificationDeleteOnUnload?dateModified=' + \$_GET('date'))\">Annuler</button>
\t\t\t<form method=\"post\" action=\"";
        // line 180
        echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("ModificationPlanningValidation");
        echo "\">
\t\t\t\t<button type=\"submit\" class=\"btn-edit btn-secondary\" onclick=\"setEvents()\">Valider</button>
\t\t\t\t<input type=\"hidden\" id='events' name=\"events\"/>
\t\t\t\t<input type=\"hidden\" id='validation-date' name=\"validation-date\"/>
\t\t\t\t<input type=\"hidden\" id='list-resource' name=\"list-resource\"/>
\t\t\t</form>
\t\t</div>
\t</div>
\t<div
\t\tid=\"calendar-container\" class=\"calendar-container\">

\t\t<!-- affichage du calendar -->
\t\t<div id='calendar'></div>
\t</div>
</div>";
        
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
        return array (  357 => 180,  325 => 151,  321 => 150,  317 => 149,  313 => 148,  309 => 147,  305 => 146,  301 => 145,  297 => 144,  293 => 143,  289 => 142,  285 => 141,  249 => 108,  245 => 107,  241 => 106,  237 => 105,  201 => 72,  154 => 28,  151 => 27,  141 => 26,  128 => 22,  116 => 21,  103 => 17,  91 => 7,  81 => 6,  61 => 3,  38 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends 'base.html.twig' %}

{% block title %}Modification du Planning
{% endblock %}

{% block stylesheets %}

\t<!-- insertion de bootstrap, jquery et fullcalendar-scheduler -->
\t<link href='js/fullcalendar-scheduler/lib/main.css' rel='stylesheet'/>
\t<script src='js/fullcalendar-scheduler/lib/main.js'></script>
\t<script src=\"js/jquery-3.6.0.js\"></script>
  <script src=\"js/popper.min.js\"></script>  
\t<script src=\"js/bootstrap/bootstrap.min.js\" integrity=\"sha384-3nhVhzgkAiK+aRAouB5S914cEx9yGFCeToSirPZfaTPyy6g+RbDkzkmojJymfCBY sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13 sha256-SUzPu+ewjZCj6CtwVs9sNh6Q/LMFi1w1RZ9TxpKmVkE=\" crossorigin=\"anonymous\"></script>

\t<!-- insertion des fichier js et css spécifique à modification planning -->
\t<script src=\"js/planning/modification-planning.js\"></script>
\t<link rel=\"stylesheet\" href=\"{{ asset('CSS/Calendrier/Calendrier.css') }}\">

{% endblock %}

{% block javascripts %} 
    {% if app.user == null %}<script type=\"text/javascript\">document.location.href=\"/login\"</script>
\t{% endif %}
{% endblock %}

{% block body %}

\t{{include('planning/modal_popup.html.twig')}}

\t<!-- modify-planning-modal -->

\t<div class=\"modal\" id=\"modify-planning-modal\">
\t\t<div class=\"modal-dialog\">
\t\t\t<div class=\"modal-content\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h2 class=\"modal-title\">Modifier
\t\t\t\t\t\t<span id=\"show-title\"></span>
\t\t\t\t\t</h2>
\t\t\t\t</div>
\t\t\t\t<div
\t\t\t\t\t<div class=\"modal-body\">
\t\t\t\t\t<label class=\"label-event\">Début de l'activité
\t\t\t\t\t</label>
\t\t\t\t\t<div class=\"input-container onWhite\">
\t\t\t\t\t<!-- création d'input caché permettant de transmettre des informations entre le php, le twig et le js -->
\t\t\t\t\t<input name=\"form\" type=\"hidden\" value=\"modify\">
\t\t\t\t\t<input id=\"id\" name=\"id\" type=\"hidden\">
\t\t\t\t\t<input id=\"length\" name=\"length\" type=\"hidden\">
\t\t\t\t\t<inputid=\"title\" name=\"title\" type=\"hidden\">

\t\t\t\t\t<input class=\"input-modal-date\" type=\"time\" id=\"start\" name=\"start\" required>
\t\t\t\t\t</br>
\t\t\t\t\t<label class=\"label-event\">Parcours :</label>
\t\t\t\t\t</br>
\t\t\t\t\t<input class=\"input-modal\" type=\"text\" id=\"parcours\" name=\"parcours\" disabled></input>
\t\t\t\t\t</br>
\t\t\t\t\t<label class=\"label-event\">Patient :</label>
\t\t\t\t\t</br>
\t\t\t\t\t<input class=\"input-modal\" type=\"text\" id=\"patient\" name=\"patient\" disabled></input>
\t\t\t\t\t</br>
\t\t\t\t\t<label class=\"label-event\">Ressource Humaine :</label>
\t\t\t\t\t</br>
\t\t\t\t\t<input class=\"input-modal\" type=\"text\" id=\"rh\" name=\"rh\" disabled></input>
\t\t\t\t\t</br>
\t\t\t\t\t<label class=\"label-event\">Ressource Matérielle :</label>
\t\t\t\t\t</br>
\t\t\t\t\t<input class=\"input-modal\" type=\"text\" id=\"rm\" name=\"rm\" disabled></input>
\t\t\t\t\t</div>
\t\t\t\t\t<div
\t\t\t\t\t\tclass=\"modal-footer\">
\t\t\t\t\t\t<!-- bouton de suppression à revoir, permet pour le moment d'être redirigé vers la gestion des rendez-vous pour en supprimer un -->
\t\t\t\t\t\t<form method=\"get\" action=\"{{ path('Appointment') }}\">
\t\t\t\t\t\t\t<button class=\"btn-delete btn-secondary\" onclick=\"return confirm('Voulez-vous être redirigé vers la gestion des rendez-vous ? Vos modifications vont être perdues');\">Supprimer le rendez-vous</button>
\t\t\t\t\t\t</form>

\t\t\t\t\t\t<!-- bouton permettant de fermer la modal ou de valider les modification -->
\t\t\t\t\t\t<button type=\"button\" class=\"btn-consult btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>
\t\t\t\t\t\t<button type=\"submit\" class=\"btn-valide btn-secondary\" onclick=\"modifyEvent()\">Valider</button>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t</div>


\t<!-- add-planning-modal -->

\t<div
\t\tclass=\"modal\" id=\"add-planning-modal\">
\t\t<!-- div qui représente la modal -->
\t\t<div
\t\t\tclass=\"modal-dialog\">
\t\t\t<!-- permet d'afficher la modal en mode dialog -->
\t\t\t<div
\t\t\t\tclass=\"modal-content\">
\t\t\t\t<!-- permet de structurer le contenu de la modal -->
\t\t\t\t<div
\t\t\t\t\tclass=\"modal-header\">
\t\t\t\t\t<!-- sépare le header de la modal -->
\t\t\t\t\t<h2 class=\"modal-title\">Ajouter un rendez-vous</h2>
\t\t\t\t</div>
\t\t\t\t<div
\t\t\t\t\tclass=\"modal-body\">
\t\t\t\t\t<!-- sépare le body de la modal -->
\t\t\t\t\t<input id=\"date\" name=\"date\" type=\"hidden\" value={{datetoday}}>
\t\t\t\t\t<input id=\"listeAppointments\" name=\"listeAppointments\" type='hidden' value={{listAppointmentsJSON.content}}>
\t\t\t\t\t<input id=\"listeSuccessors\" name=\"listeSuccessors\" type='hidden' value={{listeSuccessorsJSON.content}}>
\t\t\t\t\t<input id=\"listeActivities\" name=\"listeActivities\" type='hidden' value={{listeActivitiesJSON.content}}>

\t\t\t\t\t<div
\t\t\t\t\t\tid=\"select-container-patient\">
\t\t\t\t\t\t<!-- Selection du rendez-vous -->
\t\t\t\t\t\t<label>Choisissez le rendez-vous</label>
\t\t\t\t\t\t<select id=\"select-appointment\" name=\"select-appointment\" required>
\t\t\t\t\t\t</select>
\t\t\t\t\t</div>

\t\t\t\t\t<div
\t\t\t\t\t\tid=\"select-container-date\" class=\"input-container onWhite\">
\t\t\t\t\t\t<!-- Selection de l'heure de début du rdv -->
\t\t\t\t\t\t<label>Heure de début du parcours :
\t\t\t\t\t\t</label>
\t\t\t\t\t\t<input class=\"input-field\" type=\"time\" id=\"timeBegin\" name=\"timeBegin\" required>
\t\t\t\t\t</div>

\t\t\t\t\t<div
\t\t\t\t\t\tid=\"time-selected-error\" class=\"alert alert-danger\" role=\"alert\">
\t\t\t\t\t\t<!-- Affichage du message d'erreur si l'utilisateur ne rentre pas une heure correcte par rapport à la table appointment -->
\t\t\t\t\t\tVeuillez renseigner une heure de début de parcours correcte pour ce rendez-vous.
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t\t<button type=\"button\" class=\"btn-consult btn-secondary\" data-bs-dismiss=\"modal\">Annuler</button>
\t\t\t\t\t\t<button type=\"submit\" class=\"btn-valide btn-secondary\" onclick=\"AddEventValider()\">Valider</button>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>

<input type=\"hidden\" id=\"material\" value='{{listMaterialResourceJSON.content}}'/>
<input type=\"hidden\" id=\"human\" value='{{listHumanResourceJSON.content}}'/>
<input type='hidden' id=\"listeAppointments\" name=\"listeAppointments\" value='{{listAppointmentsJSON.content}}'>
<input type=\"hidden\" id=\"listScheduledActivitiesJSON\" value='{{listScheduledActivitiesJSON.content}}'/>
<input id=\"date\" name=\"date\" type=\"hidden\" value={{datetoday}}>
<input id=\"listeSuccessors\" name=\"listeSuccessors\" type='hidden' value={{listeSuccessorsJSON.content}}>
<input id=\"listeActivities\" name=\"listeActivities\" type='hidden' value={{listeActivitiesJSON.content}}>
<input id=\"listeActivityHumanResource\" name=\"listeActivityHumanResource\" type=\"hidden\" value={{listeActivityHumanResourcesJSON.content}}>
<input id=\"listeActivityMaterialResource\" name=\"listeActivityMaterialResource\" type='hidden' value={{listeActivityMaterialResourcesJSON.content}}>
<input type=\"hidden\" id=\"MaterialUnavailables\" value='{{listeMaterialResourcesUnavailables.content}}'/>
<input type=\"hidden\" id=\"HumanUnavailables\" value='{{listeHumanResourcesUnavailables.content}}'/>

<div class=\"all-container\">
\t<h1>Modification du Planning</h1>
\t<div id=\"container-top\">
\t\t<div
\t\t\tclass=\"CRUD-div\">
\t\t\t<!-- bouton d'ajout d'un rendez-vous dans le planning -->
\t\t\t<button type=\"button\" class=\"btn-consult btn-secondary\" onclick=\"addEvent()\">Ajouter</button>

\t\t\t<!-- filtre de l'affichage par catégorie -->
\t\t\t<select class=\"list-edit\" id=\"displayList\" onchange=\"changePlanning()\">
\t\t\t\t<option value=\"0\" selected disabled>Changer l'affichage
\t\t\t\t</option>
\t\t\t\t<option value=\"rh\">Ressources Humaines</option>
\t\t\t\t<option value=\"rm\">Ressources Matérielles</option>
\t\t\t</select>

\t\t\t<!-- bouton pour filtrer l'affichage (pas encore opérationnel) -->
\t\t\t<button id=\"filterbutton\" onclick=\"filterShow()\" class=\"btn-calendar-edit\" title=\"Filtrer l'affichage\">
\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24px\" viewbox=\"0 0 24 24\" width=\"24px\">
\t\t\t\t\t<g><path d=\"M0,0h24 M24,24H0\" fill=\"none\"/><path d=\"M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z\"/><path d=\"M0,0h24v24H0V0z\" fill=\"none\"/></g>
\t\t\t\t</svg>
\t\t\t</button>
\t\t\t<div id=\"filterId\" class=\"filter-container\" style=\"display:none\"></div>
\t\t</div>
\t\t<!-- liste des boutons pour annuler ou valider les modifications -->
\t\t<div id='container-top-right'>
\t\t\t<button type=\"button\" class=\"btn-delete btn-secondary\" onclick=\"window.location.assign('/ModificationDeleteOnUnload?dateModified=' + \$_GET('date'))\">Annuler</button>
\t\t\t<form method=\"post\" action=\"{{ path('ModificationPlanningValidation') }}\">
\t\t\t\t<button type=\"submit\" class=\"btn-edit btn-secondary\" onclick=\"setEvents()\">Valider</button>
\t\t\t\t<input type=\"hidden\" id='events' name=\"events\"/>
\t\t\t\t<input type=\"hidden\" id='validation-date' name=\"validation-date\"/>
\t\t\t\t<input type=\"hidden\" id='list-resource' name=\"list-resource\"/>
\t\t\t</form>
\t\t</div>
\t</div>
\t<div
\t\tid=\"calendar-container\" class=\"calendar-container\">

\t\t<!-- affichage du calendar -->
\t\t<div id='calendar'></div>
\t</div>
</div>{% endblock %}
", "planning/modification-planning.html.twig", "C:\\Users\\Clement\\Desktop\\New projet stage\\Projet_Stage_DI4\\templates\\planning\\modification-planning.html.twig");
    }
}
