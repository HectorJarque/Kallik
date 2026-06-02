package com.kallik.portfolio.email.domain.port.outbound

import com.kallik.portfolio.email.domain.model.ContactMessage

interface EmailSenderPort {
    fun sendContactEmail(message: ContactMessage)
}