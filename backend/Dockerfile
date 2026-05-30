# Etapa 1 – Build
FROM gradle:8.7-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon -x test

# Etapa 2 – Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]