package com.kallik.portfolio.email.domain.model

data class ContactMessage(
    val name: String,
    val email: String,
    val subject: String,
    val message: String
)