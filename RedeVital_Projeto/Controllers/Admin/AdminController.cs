﻿using Microsoft.AspNetCore.Mvc;

public class AdminController : Controller
{
    public IActionResult Index()
    {
        return View("Views/Admin/Index.cshtml");
    }
}