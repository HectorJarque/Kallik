package com.kallik.portfolio.email.infrastructure.inbound.rest

import com.kallik.portfolio.email.domain.model.ContactMessage
import com.kallik.portfolio.email.domain.port.inbound.SendContactMessageUseCase
import com.kallik.portfolio.email.infrastructure.config.RateLimiterService
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/contact")
@Validated
class ContactController(
    private val useCase: SendContactMessageUseCase,
    private val rateLimiter: RateLimiterService
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @PostMapping
    fun sendMessage(
        @Valid @RequestBody dto: ContactRequestDto,
        request: HttpServletRequest
    ): ResponseEntity<Map<String, String>> {

        if (!dto.website.isNullOrBlank()) {
            log.warn("Honeypot activado — posible bot descartado")
            return ResponseEntity.ok(mapOf("status" to "ok"))
        }

        val clientIp = resolveClientIp(request)
        if (!rateLimiter.isAllowed(clientIp)) {
            log.warn("Rate limit alcanzado para una IP")
            return ResponseEntity
                .status(429)
                .body(mapOf("error" to "Demasiadas solicitudes. Inténtalo más tarde."))
        }

        val message = ContactMessage(
            name    = sanitize(dto.name),
            email   = sanitize(dto.email),
            subject = sanitize(dto.subject),
            message = dto.message.trim()
        )

        useCase.send(message)
        return ResponseEntity.ok(mapOf("status" to "ok"))
    }

    private fun sanitize(input: String): String =
        input.replace(Regex("[\r\n\t]"), " ").trim()

    private fun resolveClientIp(request: HttpServletRequest): String =
        request.getHeader("X-Real-IP")?.takeIf { it.isNotBlank() }
            ?: request.remoteAddr
}