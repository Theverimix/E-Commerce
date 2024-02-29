package com.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/post")
public class PostController {

    @GetMapping(value = "/saludo")
    public String saludo() {
        return "Hola Mundo!";
    }

    @PostMapping("/mensaje")
    public String recibirMensaje(@RequestBody String mensaje) {
        return "Mensaje recibido: " + mensaje;
    }
}
