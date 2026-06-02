package com.kallik.portfolio.email.infrastructure.inbound.rest

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class ContactRequestDto(

    @field:NotBlank(message = "El nombre es obligatorio")
    @field:Size(min = 2, max = 100, message = "Nombre entre 2 y 100 caracteres")
    @field:Pattern(
        regexp = "^[\\p{L}\\s'\\-]+$",
        message = "El nombre contiene caracteres no permitidos"
    )
    val name: String,

    @field:NotBlank(message = "El email es obligatorio")
    @field:Email(message = "El email no es válido")
    @field:Size(max = 254)
    val email: String,

    @field:NotBlank(message = "El asunto es obligatorio")
    @field:Size(min = 3, max = 150, message = "Asunto entre 3 y 150 caracteres")
    val subject: String,

    @field:NotBlank(message = "El mensaje es obligatorio")
    @field:Size(min = 10, max = 2000, message = "Mensaje entre 10 y 2000 caracteres")
    val message: String,

    val website: String? = null
)