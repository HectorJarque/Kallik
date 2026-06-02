package com.kallik.portfolio.email.domain.port.inbound

import com.kallik.portfolio.email.domain.model.ContactMessage

interface SendContactMessageUseCase {
    fun send(message: ContactMessage)
}