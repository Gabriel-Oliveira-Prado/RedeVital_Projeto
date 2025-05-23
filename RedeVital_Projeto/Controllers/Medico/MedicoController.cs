using Microsoft.AspNetCore.Mvc;

public class MedicoController : Controller
{
    public IActionResult Index()
    {
        return View("Views/Medico/Index.cshtml");
    }
    public IActionResult Login()
    {
        return View();
    }
    public IActionResult Vacinas()
    {
        return View();
    }
}