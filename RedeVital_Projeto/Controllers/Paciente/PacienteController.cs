using Microsoft.AspNetCore.Mvc;

public class PacienteController : Controller
{
    public IActionResult Index()
    {
        return View("Views/Paciente/Index.cshtml");
    }
}