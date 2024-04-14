.PHONY: help docker-up docker-down

help: ## Show this help.
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

docker-up: ## Start docker containers
	@echo "|- Starting docker containers -|"
	@cd docker && docker-compose up -d
	@echo "✅ Docker containers started successfully"

docker-down: ## Stop docker containers
	@echo "|- Stopping docker containers -|"
	@docker rm -f $(shell docker ps -aq)
	@echo "✅ Docker containers stopped successfully"
