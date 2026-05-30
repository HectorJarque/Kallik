package com.kallik.portfolio

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KallikApplication

fun main(args: Array<String>) {
	runApplication<KallikApplication>(*args)
}