using Microsoft.AspNetCore.Mvc;
using RedeVital_Projeto.Models.Login;

namespace RedeVital_Projeto.Controllers.Login
{
    public class LoginController : Controller
    {
        public IActionResult Login()
        {
            return View(new MdLogin());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(MdLogin model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // Lógica de autenticação
            if (model.Email == "admin@rede.com" && model.Password == "admin123")
            {
                return RedirectToAction("Index", "Admin");
            }
            else if (model.Email == "Funcionario@BBTS.com" && model.Password == "123")
            {
                return RedirectToAction("Index", "Funcionario");
            }
            else if (model.Email == "Cliente@BBTS.com" && model.Password == "123")
            {
                return RedirectToAction("Index", "Paciente");
            }

            ModelState.AddModelError(string.Empty, "Credenciais inválidas");
            return View(model);
        }
    }
}