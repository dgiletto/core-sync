FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# Copy build files and download dependencies first (for caching)
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2 — Runtime image
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose application port
EXPOSE 8080

# Use a non-root user for security
RUN useradd -m spring
USER spring

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]