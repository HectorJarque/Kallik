package com.kallik.portfolio.email.infrastructure.config

import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap

/**
 * Rate limiter en memoria por IP.
 * Límite: 3 mensajes por hora y por IP.
 *
 * Para producción con múltiples instancias, sustituir por Redis + Bucket4j.
 */
@Service
class RateLimiterService {

    private val maxRequests = 3
    private val windowMs = 60 * 60 * 1000L
    private val store = ConcurrentHashMap<String, MutableList<Long>>()

    fun isAllowed(key: String): Boolean {
        val now = System.currentTimeMillis()
        val timestamps = store.getOrPut(key) { mutableListOf() }
        synchronized(timestamps) {
            timestamps.removeIf { it < now - windowMs }
            if (timestamps.size >= maxRequests) return false
            timestamps.add(now)
            return true
        }
    }
}