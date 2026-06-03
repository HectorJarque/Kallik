package com.kallik.portfolio.email.application.service

import com.kallik.portfolio.email.domain.model.ContactMessage
import com.kallik.portfolio.email.domain.port.inbound.SendContactMessageUseCase
import com.kallik.portfolio.email.domain.port.outbound.EmailSenderPort
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class SendContactMessageService(
    private val emailSenderPort: EmailSenderPort
) : SendContactMessageUseCase {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun send(message: ContactMessage) {
        log.info("Processing new contact message")
        emailSenderPort.sendContactEmail(message)
        log.info("Contact message sent")
    }
}