ifeq ($(shell command -v docker-compose 2> /dev/null),)
    ifeq ($(shell docker compose version 2> /dev/null),)
        $(error "Neither docker-compose nor docker compose found")
    else
        DOCKER_COMPOSE = docker compose
    endif
else
    DOCKER_COMPOSE = docker-compose
endif
DOCKER_COMPOSE_FILE = ./docker/docker-compose.yml
ENV_FILE = .env.local

# Default target
.PHONY: help
help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

.PHONY: build
build: ## Build the Docker containers
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) -f $(DOCKER_COMPOSE_FILE) build --no-cache

.PHONY: up
up: ## Start the Docker containers
	$(DOCKER_COMPOSE) --env-file $(ENV_FILE) -f $(DOCKER_COMPOSE_FILE) up -d

.PHONY: logs
logs: ## Show the Docker containers logs
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

.PHONY: down
down: ## Stop the Docker containers
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down