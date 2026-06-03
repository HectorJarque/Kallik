package com.kallik.portfolio.email.infrastructure.inbound.rest

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class ContactRequestDto(

    //TODO: Poner los errores en traducción en BD

    @field:NotBlank(message = "Name is required")
    @field:Size(min = 2, max = 100, message = "Name between 2 and 100 characters.")
    @field:Pattern(
        regexp = "^[\\p{L}\\s'\\-]+$",
        message = "Name has unauthorized words"
    )
    val name: String,

    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Email not valid")
    @field:Size(max = 254)
    val email: String,

    @field:NotBlank(message = "Subject is required")
    @field:Size(min = 3, max = 150, message = "Subject between 3 and 150 characters.")
    val subject: String,

    @field:NotBlank(message = "Message is required")
    @field:Size(min = 10, max = 2000, message = "Mensaje between 10 characters and 2000 characters.")
    val message: String,

    val website: String? = null
)