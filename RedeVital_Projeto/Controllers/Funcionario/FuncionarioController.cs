using Microsoft.AspNetCore.Mvc;

public class FuncionarioController : Controller
{
    public IActionResult Index()
    {
        return View("Views/Funcionario/Index.cshtml");
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