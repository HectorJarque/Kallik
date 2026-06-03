package com.kallik.portfolio.email.infrastructure.outbound.email

import com.kallik.portfolio.email.domain.model.ContactMessage
import com.kallik.portfolio.email.domain.port.outbound.EmailSenderPort
import jakarta.mail.internet.InternetAddress
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service

@Service
class JavaMailEmailSender(
    private val mailSender: JavaMailSender,
    @Value("\${kallik.mail.to}") private val toAddress: String,
    @Value("\${kallik.mail.from}") private val fromAddress: String
) : EmailSenderPort {

    override fun sendContactEmail(message: ContactMessage) {
        val mime = mailSender.createMimeMessage()
        val helper = MimeMessageHelper(mime, false, "UTF-8")

        helper.setTo(toAddress)
        helper.setFrom(InternetAddress(fromAddress, "Kallik Contact Form"))
        helper.setReplyTo(InternetAddress(message.email, message.name))
        helper.setSubject("[Kallik] ${message.subject}")
        helper.setText(buildBody(message))

        mailSender.send(mime)
    }

    private fun buildBody(msg: ContactMessage) = """
        Nuevo mensaje desde el formulario de contacto de jarquebusiness.com del Portfolio
        ─────────────────────────────────────────
        Nombre:  ${msg.name}
        Email:   ${msg.email}
        Asunto:  ${msg.subject}
        ─────────────────────────────────────────
        ${msg.message}
        ─────────────────────────────────────────
    """.trimIndent()
}